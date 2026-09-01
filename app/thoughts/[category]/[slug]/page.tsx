import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ShareButtons } from "@/components/thoughts/share-buttons";
import {
  buildRelatedPosts,
  buildShareUrls,
  getPublishedPosts,
  getPost,
  todayInSingapore,
} from "@/lib/thoughts";
import { AUTHOR_FOUNDER, founderId } from "@/lib/founders";

/**
 * Revalidate every 15 minutes so publish-date gating stays in sync with the
 * calendar without a redeploy. A scheduled post 404s until its date, then
 * starts serving within 15 minutes of the date landing; related-post lists
 * pick it up on the same cycle.
 */
export const revalidate = 900;

const SITE_URL = "https://mochicollective.com";

type Params = { category: string; slug: string };

export function generateStaticParams(): Params[] {
  // Published only. A scheduled post must not be pre-rendered, or its URL
  // serves the finished essay to anyone who guesses or is forwarded the link.
  // Unknown slugs fall through to on-demand rendering, where the publish-date
  // check below turns them into a real 404 until their date.
  return getPublishedPosts().map((p) => ({
    category: p.categorySlug,
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) return {};
  // Scheduled posts 404 (see the page component), so emit no metadata for
  // them at all — no title, description or OG card to leak the piece early.
  //
  // Singapore date, not UTC — the same definition getPublishedPosts(), the
  // sitemap and the postbuild verifier use. When this was UTC it disagreed
  // with all three for the first eight hours of every publish day.
  if (post.publish_date > todayInSingapore()) return {};
  const url = `${SITE_URL}${post.urlPath}`;
  return {
    title: post.meta_title ?? `${post.title} | Mochi Collective`,
    description: post.meta_description,
    alternates: { canonical: post.urlPath },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.meta_title ?? post.title,
      description: post.meta_description,
      url,
      siteName: "Mochi Collective",
      type: "article",
      publishedTime: `${post.publish_date}T00:00:00+08:00`,
      authors: [AUTHOR_FOUNDER.name],
      tags: post.tags,
      locale: "en_SG",
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${post.title} — Mochi Collective`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta_title ?? post.title,
      description: post.meta_description,
    },
  };
}

function formatFullDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00+08:00`);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Singapore",
  });
}

export default async function ThoughtsPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  // A scheduled post is a real 404 until its publish date. `revalidate` below
  // means it starts serving within 15 minutes of the date landing.
  if (!post || post.publish_date > todayInSingapore()) notFound();

  const share = buildShareUrls(post);
  const related = buildRelatedPosts(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${post.urlPath}`,
    },
    headline: post.title,
    description: post.meta_description,
    datePublished: `${post.publish_date}T09:00:00+08:00`,
    dateModified: `${post.publish_date}T09:00:00+08:00`,
    // Author is a Person, not the organisation. Author authority is a real
    // factor in whether an answer engine quotes a page, and six essays
    // attributed to a company entity build authority for nobody. The @id
    // resolves to the Person node emitted in the root layout's graph.
    author: {
      "@id": founderId(SITE_URL, AUTHOR_FOUNDER.name),
    },
    publisher: { "@id": `${SITE_URL}/#org` },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-SG",
  };

  return (
    <>
      <Nav />
      <main id="main" className="th-post" data-category={post.categorySlug}>
        <article className="wrap">
          <Link href="/thoughts" className="th-back">
            ← All Thoughts
          </Link>

          <header className="th-art-head">
            <Link
              href={`/thoughts?tag=${post.categorySlug}`}
              className="th-art-tag"
              data-tag={post.categorySlug}
            >
              {post.category}
            </Link>
            {post.title_display ? (
              <h1
                className="th-art-title"
                dangerouslySetInnerHTML={{ __html: post.title_display }}
              />
            ) : (
              <h1 className="th-art-title">{post.title}</h1>
            )}
            {post.deck && <p className="th-art-deck">{post.deck}</p>}
            <div className="th-art-meta">
              <span>
                <strong>{AUTHOR_FOUNDER.name}</strong>
              </span>
              <span className="dot">·</span>
              <span>{formatFullDate(post.publish_date)}</span>
              <span className="dot">·</span>
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          </header>

          <div
            className="th-prose"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="th-post-cta">
            <a
              href={share.bookDiscovery}
              target="_blank"
              rel="noopener noreferrer"
              className="th-post-cta-btn"
            >
              Book a Brief Diagnostic <span aria-hidden="true">→</span>
            </a>
            <span className="th-post-cta-lab">
              Free · 30 min · we'll ask what you're planning
            </span>
          </div>

          <div className="th-art-foot">
            <ShareButtons
              linkedinUrl={share.linkedin}
              copyUrl={share.copyLink}
              emailUrl={share.email}
              postTitle={post.title}
            />

            {related.length > 0 && (
              <div>
                <div className="th-related-h">Continue reading</div>
                <div className="th-related-grid">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={r.urlPath}
                      className="th-related-card"
                    >
                      <span
                        className="th-related-tag"
                        data-tag={r.categorySlug}
                      >
                        {r.category}
                      </span>
                      {r.title_display ? (
                        <div
                          className="th-related-title"
                          dangerouslySetInnerHTML={{ __html: r.title_display }}
                        />
                      ) : (
                        <div className="th-related-title">{r.title}</div>
                      )}
                      <div className="th-related-meta">
                        {r.readingTimeMinutes} min ·{" "}
                        {formatFullDate(r.publish_date)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ShareButtons } from "@/components/thoughts/share-buttons";
import {
  buildShareUrls,
  getAllPosts,
  getPost,
  getPublishedPosts,
} from "@/lib/thoughts";

/**
 * Revalidate every 15 minutes so the noindex meta and related-post
 * gating stay in sync with the current date. Without this, a post
 * pre-generated when publish_date > today would keep noindex forever
 * until the next full deploy.
 */
export const revalidate = 900;

const SITE_URL = "https://mochicollective.com";

type Params = { category: string; slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({
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
  const url = `${SITE_URL}${post.urlPath}`;
  // Don't let Google index a post before its publish date lands — a direct
  // URL preview is fine for humans, but we don't want early snapshots in
  // the SERP.
  const today = new Date().toISOString().slice(0, 10);
  const isPublished = post.publish_date <= today;
  return {
    title: post.meta_title ?? `${post.title} | Mochi Collective`,
    description: post.meta_description,
    alternates: { canonical: post.urlPath },
    robots: isPublished
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: post.meta_title ?? post.title,
      description: post.meta_description,
      url,
      siteName: "Mochi Collective",
      type: "article",
      publishedTime: `${post.publish_date}T00:00:00+08:00`,
      authors: ["Mochi Collective"],
      tags: post.tags,
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
  });
}

export default async function ThoughtsPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) notFound();

  const share = buildShareUrls(post);
  // Related shows only posts that have already published. Future-dated
  // drafts must stay off the page until their publish_date lands, so a
  // live post doesn't leak titles of pieces that haven't been announced.
  const related = getPublishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

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
    author: {
      "@id": `${SITE_URL}/#org`,
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
                <strong>Mochi Collective</strong>
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
              Book a Discovery <span aria-hidden="true">→</span>
            </a>
            <span className="th-post-cta-lab">
              30 min · we'll ask what you're planning
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

import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { FilterChips } from "@/components/thoughts/filter-chips";
import { getPublishedPosts, getPublishedCategories } from "@/lib/thoughts";

const SITE_URL = "https://mochicollective.com";

export const metadata: Metadata = {
  title: "Mochi Thoughts | Mochi Collective",
  description:
    "Short takes and longer essays on brand experience, program design, and running events in Southeast Asia — how we approach the work, what we look for in a brief, and what we've learned along the way.",
  alternates: { canonical: "/thoughts" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Mochi Thoughts | Mochi Collective",
    description:
      "Short takes and longer essays on brand experience, program design, and running events in Southeast Asia.",
    url: `${SITE_URL}/thoughts`,
    siteName: "Mochi Collective",
    type: "website",
  },
};

const CATEGORY_TAG_COLOR: Record<string, string> = {
  "thought-leadership": "brand",
  "brand-strategy": "brand",
  measurement: "measurement",
  "events-craft": "events-craft",
};

function formatShortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00+08:00`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
function formatFullDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00+08:00`);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ThoughtsIndexPage() {
  const posts = getPublishedPosts();
  const categories = getPublishedCategories();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const hasPosts = posts.length > 0;

  return (
    <>
      <Nav />
      <main id="main" className="th-page">
        <div className="wrap">
          <header className="th-head">
            <div className="eyebrow">Mochi Thoughts</div>
            <h1 className="h1">
              <em className="accent">Notes</em> on brand, measurement, and the
              craft of events.
            </h1>
            <p className="lede">
              Short takes and longer essays on how we think about the work —
              what we've stopped saying to clients, why measurement fails when
              it fails, and what we've learned about running events in
              Southeast Asia. Updated when we have something worth saying.
            </p>
          </header>

          {hasPosts ? (
            <FilterChips
              posts={posts}
              categories={categories}
              renderCard={(post, i) => {
                const isFeatured = post === featured && i === 0;
                const tagColor = CATEGORY_TAG_COLOR[post.categorySlug] ?? "brand";
                return (
                  <Link
                    key={post.slug}
                    href={post.urlPath}
                    className={`th-card${isFeatured ? " th-card--featured" : ""}`}
                    data-tag={tagColor}
                  >
                    <span className="th-card-tag">{post.category}</span>
                    <h2 className="th-card-title">{post.title}</h2>
                    <p className="th-card-excerpt">
                      {post.deck ?? post.meta_description}
                    </p>
                    <div className="th-card-foot">
                      <span>{post.readingTimeMinutes} min read</span>
                      <span>
                        {formatShortDate(post.publish_date)}
                        <span className="th-card-arrow" aria-hidden="true">
                          {" "}
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                );
              }}
            />
          ) : (
            <div className="th-empty">
              <div className="th-empty-h">First posts landing this month.</div>
              <p className="th-empty-p">
                Three pieces on how we read briefs — the questions we ask, the
                red flags we watch for, and the ten minutes that decide whether
                we can help. First lands <strong>8 July</strong>, then every
                Wednesday.
              </p>
            </div>
          )}

          <div className="th-foot-cta">
            <div>
              <div className="th-foot-cta-h">
                If any of this is landing, come{" "}
                <em className="accent">talk to us</em> about your next event.
              </div>
              <p className="th-foot-cta-p">
                30-minute discovery call. We'll ask what you're planning and
                where the pressure is coming from. If we can help, you'll know
                by the end.
              </p>
            </div>
            <a
              href="https://zcal.co/mochicollective/consultation?utm_source=website&utm_medium=thoughtsindex&utm_campaign=thoughts"
              target="_blank"
              rel="noopener noreferrer"
              className="th-foot-cta-btn"
            >
              Book a Discovery →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

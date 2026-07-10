import Link from "next/link";
import { getPublishedPosts } from "@/lib/thoughts";
import { SectionEyebrow } from "./section-eyebrow";

/**
 * Homepage tease for Mochi Thoughts. Renders the three most recent
 * published posts as a card grid using the same `.th-card` treatment
 * as the /thoughts index, then links to the full index. Server-rendered
 * so as posts publish on their scheduled dates, the homepage refreshes
 * without any manual intervention.
 *
 * Returns null when nothing has published yet — the empty state stays
 * off the homepage entirely rather than showing a placeholder.
 */

const CATEGORY_TAG_COLOR: Record<string, string> = {
  "thought-leadership": "brand",
  "brand-strategy": "brand-strategy",
  measurement: "measurement",
  "events-craft": "events-craft",
};

function formatShortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00+08:00`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function HomeThoughts() {
  const posts = getPublishedPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="home-thoughts" id="thoughts">
      <div className="wrap">
        <div className="home-thoughts-head">
          <SectionEyebrow id="thoughts" label="Mochi Thoughts" />
          <h2 className="h2 reveal reveal-d1">
            <span className="accent">How we think</span> about the work.
          </h2>
          <p className="lede reveal reveal-d2">
            Short takes and longer essays on brand experience, program design,
            and running events in Southeast Asia.
          </p>
        </div>

        <div className="th-grid home-thoughts-grid">
          {posts.map((post) => {
            const tagColor =
              CATEGORY_TAG_COLOR[post.categorySlug] ?? "brand";
            return (
              <Link
                key={post.slug}
                href={post.urlPath}
                className="th-card reveal"
                data-tag={tagColor}
              >
                <span className="th-card-tag">{post.category}</span>
                {post.title_display ? (
                  <h3
                    className="th-card-title"
                    dangerouslySetInnerHTML={{ __html: post.title_display }}
                  />
                ) : (
                  <h3 className="th-card-title">{post.title}</h3>
                )}
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
          })}
        </div>

        <div className="home-thoughts-foot reveal">
          <Link href="/thoughts" className="home-thoughts-more">
            All Thoughts <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

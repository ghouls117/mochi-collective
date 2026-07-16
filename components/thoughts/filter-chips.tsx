"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/thoughts";

type CategoryFacet = { name: string; slug: string; count: number };

type Props = {
  posts: Post[];
  categories: CategoryFacet[];
};

const CATEGORY_TAG_COLOR: Record<string, string> = {
  "thought-leadership": "brand",
  "brand-strategy": "brand-strategy",
  "events-craft": "events-craft",
};

function formatShortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00+08:00`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

/**
 * Category filter + card grid. Filtering is client-side: fast, no URL
 * shuffling, and the whole post set is already in the DOM.
 *
 * All card rendering lives inside this client component because React 19
 * disallows passing functions across the server/client boundary. The parent
 * server component only hands us serializable data.
 */
export function FilterChips({ posts, categories }: Props) {
  const [active, setActive] = useState<string>("all");

  const visible = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.categorySlug === active);
  }, [posts, active]);

  const featured = posts.find((p) => p.featured) ?? posts[0];

  return (
    <>
      <div className="th-filter-bar">
        <div className="th-filters">
          <button
            type="button"
            className={`th-filter-chip${active === "all" ? " active" : ""}`}
            onClick={() => setActive("all")}
          >
            All · {posts.length}
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              className={`th-filter-chip${active === c.slug ? " active" : ""}`}
              onClick={() => setActive(c.slug)}
            >
              {c.name} · {c.count}
            </button>
          ))}
        </div>
        <div className="th-filter-count">
          Showing {visible.length} · newest first
        </div>
      </div>

      <div className="th-grid">
        {visible.map((post, i) => {
          const isFeatured = post === featured && active === "all";
          const tagColor = CATEGORY_TAG_COLOR[post.categorySlug] ?? "brand";
          return (
            <Link
              key={post.slug}
              href={post.urlPath}
              className={`th-card${isFeatured ? " th-card--featured" : ""}`}
              data-tag={tagColor}
            >
              <span className="th-card-tag">{post.category}</span>
              {post.title_display ? (
                <h2
                  className="th-card-title"
                  dangerouslySetInnerHTML={{ __html: post.title_display }}
                />
              ) : (
                <h2 className="th-card-title">{post.title}</h2>
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
    </>
  );
}

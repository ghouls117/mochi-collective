"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/lib/thoughts";

type CategoryFacet = { name: string; slug: string; count: number };

type Props = {
  posts: Post[];
  categories: CategoryFacet[];
  renderCard: (post: Post, index: number) => React.ReactNode;
};

/**
 * Category filter + card grid. Filtering is client-side: fast, no URL
 * shuffling, and the whole post set is already in the DOM.
 */
export function FilterChips({ posts, categories, renderCard }: Props) {
  const [active, setActive] = useState<string>("all");

  const visible = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.categorySlug === active);
  }, [posts, active]);

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
        {visible.map((p, i) => renderCard(p, i))}
      </div>
    </>
  );
}

#!/usr/bin/env node
/**
 * Post-build assertions on the generated discovery files.
 *
 * Exists because of a real regression: the sitemap silently dropped every
 * article when the markdown stopped being traced into its serverless bundle.
 * The build stayed green and nothing surfaced until an external audit caught
 * it weeks later. These checks turn that class of failure into a build error.
 *
 * Checks:
 *   1. sitemap.xml lists every core page + every published essay
 *   2. llms.txt lists every published essay, and keeps the entity
 *      disambiguation note (it is the antidote to two live entity-confusion
 *      problems and must survive every regeneration)
 *   3. llms-full.txt is generated and substantive
 *
 * Runs as `postbuild`, so `npm run build` fails loudly if any of it breaks.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP_OUT = path.join(ROOT, ".next", "server", "app");
const CONTENT_DIR = path.join(ROOT, "content", "thoughts");

/** Core pages that must always be in the sitemap. */
const CORE_PATHS = [
  "/",
  "/thoughts",
  "/impact-measurement",
  "/three-reports",
  "/brand-experience",
  "/hackathons",
  "/conferences-and-events",
  "/sponsor-programs",
  "/community-and-membership",
  "/privacy",
  "/terms",
];

const failures = [];
const notes = [];

function read(file) {
  const p = path.join(APP_OUT, file);
  if (!fs.existsSync(p)) {
    failures.push(`missing build output: ${file} (expected at ${p})`);
    return null;
  }
  return fs.readFileSync(p, "utf8");
}

/** Published = publish_date on or before today (Asia/Singapore). */
function publishedPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Singapore",
  });
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf8");
      const g = (k) => (raw.match(new RegExp(`^${k}:\\s*(.+)$`, "m")) || [])[1]?.trim();
      return { file: f, slug: g("slug"), date: g("publish_date"), title: g("title") };
    })
    .filter((p) => p.slug && p.date && p.date <= today);
}

const posts = publishedPosts();
notes.push(`published essays: ${posts.length}`);

/* 1. sitemap ------------------------------------------------------------- */
const sitemap = read("sitemap.xml.body");
if (sitemap) {
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  notes.push(`sitemap <loc> count: ${locs.length}`);

  for (const p of CORE_PATHS) {
    const want = `https://mochicollective.com${p === "/" ? "" : p}`;
    if (!locs.includes(want)) failures.push(`sitemap missing core page: ${p}`);
  }
  for (const post of posts) {
    if (!locs.some((l) => l.endsWith(`/${post.slug}`)))
      failures.push(`sitemap missing published essay: ${post.slug}`);
  }
  const expected = CORE_PATHS.length + posts.length;
  if (locs.length < expected)
    failures.push(`sitemap has ${locs.length} URLs, expected at least ${expected}`);

  // Guard the other half of the old regression: one uniform build timestamp.
  const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
  const distinct = new Set(lastmods).size;
  notes.push(`sitemap distinct lastmods: ${distinct}/${lastmods.length}`);
  if (lastmods.length > 3 && distinct === 1)
    failures.push("every sitemap <lastmod> is identical — per-URL content dates regressed");
}

/* 2. llms.txt ------------------------------------------------------------ */
const llms = read("llms.txt.body");
if (llms) {
  for (const post of posts) {
    if (!llms.includes(`/${post.slug}`))
      failures.push(`llms.txt missing published essay: ${post.slug}`);
  }
  for (const p of CORE_PATHS) {
    if (p === "/") continue;
    if (!llms.includes(p)) failures.push(`llms.txt missing page: ${p}`);
  }
  if (!/unrelated to mochi dessert brands/i.test(llms))
    failures.push("llms.txt lost the entity disambiguation note");
  if (!/^Last updated: \d{4}-\d{2}-\d{2}$/m.test(llms))
    failures.push("llms.txt missing a `Last updated: YYYY-MM-DD` line");
  if (!llms.includes("/llms-full.txt"))
    failures.push("llms.txt does not reference llms-full.txt");
  notes.push(`llms.txt: ${llms.length} bytes`);
}

/* 3. llms-full.txt ------------------------------------------------------- */
const full = read("llms-full.txt.body");
if (full) {
  const words = full.split(/\s+/).filter(Boolean).length;
  notes.push(`llms-full.txt: ${words} words`);
  if (words < 2000)
    failures.push(`llms-full.txt looks truncated (${words} words) — content sources may not be bundled`);
  for (const post of posts) {
    if (!full.includes(`/${post.slug}`))
      failures.push(`llms-full.txt missing published essay: ${post.slug}`);
  }
  if (!/## Home/.test(full)) failures.push("llms-full.txt missing the Home section");
}

/* ------------------------------------------------------------------------ */
for (const n of notes) console.log(`  ✓ ${n}`);
if (failures.length) {
  console.error("\n✗ build output verification FAILED:");
  for (const f of failures) console.error(`   - ${f}`);
  process.exit(1);
}
console.log("✓ build output verified (sitemap + llms.txt + llms-full.txt)");

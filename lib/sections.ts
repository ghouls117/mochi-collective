/**
 * Central registry of numbered homepage sections. Section eyebrows read
 * from this list to compute their `NN — Label` prefix, so inserting or
 * reordering a section here automatically renumbers every downstream
 * eyebrow without touching component code.
 *
 * The keys map to the `<section id="…">` values in each component. Keep
 * them in the visual top-to-bottom order that matches `app/page.tsx`.
 */
export const SECTIONS = [
  "manifesto",
  "work",
  "method",
  "founders",
  "concierge",
  "thoughts",
  "contact",
  "faq",
] as const;

export type SectionId = (typeof SECTIONS)[number];

export function getSectionNumber(id: SectionId): string {
  const idx = (SECTIONS as readonly string[]).indexOf(id);
  return idx >= 0 ? String(idx + 1).padStart(2, "0") : "";
}

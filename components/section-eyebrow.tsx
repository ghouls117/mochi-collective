import { getSectionNumber, type SectionId } from "@/lib/sections";

/**
 * Shared eyebrow for numbered homepage sections. Reads the section's
 * position from lib/sections.ts so the "NN —" prefix stays consistent
 * whenever a section is added, removed, or reordered.
 */
export function SectionEyebrow({
  id,
  label,
  className,
}: {
  id: SectionId;
  label: string;
  className?: string;
}) {
  const num = getSectionNumber(id);
  const classes = ["eyebrow", "reveal", className].filter(Boolean).join(" ");
  return (
    <div className={classes}>
      {num} &mdash; {label}
    </div>
  );
}

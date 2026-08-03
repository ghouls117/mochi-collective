import type { Metadata } from "next";
import { PracticePage, buildPracticeMetadata } from "@/components/practice-page";
import { PRACTICES } from "@/lib/practices";

const CONTENT = PRACTICES["brand-experience"];

export const metadata: Metadata = buildPracticeMetadata(CONTENT);

export default function Page() {
  return <PracticePage content={CONTENT} />;
}

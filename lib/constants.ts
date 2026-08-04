export const BOOKING_URL = "https://zcal.co/mochicollective/consultation";
export const EMAIL = "hello@mochicollective.com";

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/mochi.collective",
  linkedin: "https://www.linkedin.com/company/mochi-collective",
  tiktok: "https://tiktok.com/@mochicollective",
} as const;

/**
 * Agency-directory profiles. Single source for the ProfessionalService
 * `sameAs` graph in app/layout.tsx and the Profiles list in llms.txt — the two
 * must agree, since consistent citations across sources are what let Google's
 * Knowledge Graph (and AI answers) consolidate the entity.
 *
 * All three 403 to automated fetchers — that's their bot protection, not a
 * dead link: Clutch returns 403 to curl while being verifiably live.
 */
export const DIRECTORY_PROFILES = {
  clutch: "https://clutch.co/profile/mochi-collective-pte",
  sortlist: "https://www.sortlist.com/agency/mochicollective",
  goodfirms: "https://www.goodfirms.co/company/mochi-collective-pte-ltd",
} as const;

/**
 * Minimum engagement, as published on the Clutch profile ("$5,000+").
 * Stated here in our own words so AI answers quote us rather than a directory.
 */
export const MIN_ENGAGEMENT = "$5,000";

export const ORB_COLORS = {
  pink: "#F6BEC9",
  blue: "#7ECADF",
  sage: "#BFDEA3",
  honey: "#F9C84A",
  slate: "#93ADBF",
} as const;

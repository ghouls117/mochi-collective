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
 * Engagement price band, in Singapore dollars.
 *
 * Currency is explicit on purpose: the Clutch profile publishes "$5,000+" with
 * no currency marker, which reads as USD to most visitors and overstates the
 * floor by roughly a third. The site, the structured data and llms.txt all
 * source the number from here so they can't disagree.
 */
export const PRICE_BAND_MIN = "S$5,000";
export const PRICE_BAND_MAX = "S$10,000";

/** Floor of the band — what llms.txt and the schema publish. */
export const MIN_ENGAGEMENT = PRICE_BAND_MIN;

export const ORB_COLORS = {
  pink: "#F6BEC9",
  blue: "#7ECADF",
  sage: "#BFDEA3",
  honey: "#F9C84A",
  slate: "#93ADBF",
} as const;

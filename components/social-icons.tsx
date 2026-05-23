/**
 * Filled monochrome social icons for the footer.
 *
 * Each icon is a 20×20 inline SVG using `currentColor` so it inherits the
 * footer's `--ink-soft` colour and brightens to `--ink` on hover (via the
 * `.social-link:hover` style in globals.css).
 *
 * SVG paths are simplified renders of each platform's official mark.
 */

import { EMAIL, SOCIAL_LINKS } from "@/lib/constants";

const ICON_SIZE = 20;

type IconProps = { size?: number };

function InstagramIcon({ size = ICON_SIZE }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 01-1.38-.9 3.71 3.71 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.5.01-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.26.82a3.4 3.4 0 00-.82 1.26c-.15.39-.33.97-.38 2.04C2.7 8.79 2.7 9.14 2.7 12.29c0 3.16 0 3.5.06 4.74.05 1.07.23 1.65.38 2.04.2.51.44.88.82 1.26.38.38.75.62 1.26.82.39.15.97.33 2.04.38 1.24.06 1.59.07 4.74.07 3.16 0 3.5-.01 4.74-.07 1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.26-.82a3.4 3.4 0 00.82-1.26c.15-.39.33-.97.38-2.04.06-1.24.07-1.58.07-4.74s-.01-3.5-.07-4.74c-.05-1.07-.23-1.65-.38-2.04a3.4 3.4 0 00-.82-1.26 3.4 3.4 0 00-1.26-.82c-.39-.15-.97-.33-2.04-.38-1.24-.06-1.59-.07-4.74-.07zm0 3.07a5.05 5.05 0 110 10.1 5.05 5.05 0 010-10.1zm0 1.8a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zm5.27-3.23a1.18 1.18 0 110 2.36 1.18 1.18 0 010-2.36z" />
    </svg>
  );
}

function LinkedInIcon({ size = ICON_SIZE }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43A2.06 2.06 0 113.27 5.37a2.06 2.06 0 012.07 2.06zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function TikTokIcon({ size = ICON_SIZE }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.4a8.16 8.16 0 004.77 1.52V6.7s-1.45.05-1.84-.01z" />
    </svg>
  );
}

function EnvelopeIcon({ size = ICON_SIZE }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.2 5.5h17.6c.94 0 1.7.76 1.7 1.7v9.6c0 .94-.76 1.7-1.7 1.7H3.2c-.94 0-1.7-.76-1.7-1.7V7.2c0-.94.76-1.7 1.7-1.7zm-.2 2.3v.07L12 13.45l9-5.58V7.8c0-.06-.04-.1-.1-.1H3.1a.1.1 0 00-.1.1zm18 1.94l-8.45 5.24a1.05 1.05 0 01-1.1 0L3 9.74V16.7c0 .06.04.1.1.1h17.8a.1.1 0 00.1-.1V9.74z" />
    </svg>
  );
}

const ICONS = [
  { key: "instagram", href: SOCIAL_LINKS.instagram, label: "Instagram", Icon: InstagramIcon, external: true },
  { key: "linkedin", href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: LinkedInIcon, external: true },
  { key: "tiktok", href: SOCIAL_LINKS.tiktok, label: "TikTok", Icon: TikTokIcon, external: true },
  { key: "email", href: `mailto:${EMAIL}`, label: `Email Mochi Collective at ${EMAIL}`, Icon: EnvelopeIcon, external: false },
] as const;

export function SocialIcons() {
  return (
    <div className="social-links" aria-label="Social media and contact">
      {ICONS.map(({ key, href, label, Icon, external }) => (
        <a
          key={key}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="social-link"
          aria-label={external ? `Mochi Collective on ${label}` : label}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

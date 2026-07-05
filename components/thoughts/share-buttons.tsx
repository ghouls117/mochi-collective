"use client";

import { useState } from "react";

/**
 * Three-button share row (LinkedIn / Copy link / Email).
 *
 * The parent server component pre-computes UTM-tagged URLs via
 * lib/thoughts.buildShareUrls() so this client component stays lean —
 * it just handles the LinkedIn window-open, the clipboard copy state,
 * and the mailto composition.
 *
 * UTM medium per button:
 *   LinkedIn    → sharelinkedin
 *   Copy link   → sharelink
 *   Email       → shareemail
 * (campaign = post's category, source = website)
 */

type Props = {
  linkedinUrl: string;
  copyUrl: string;
  emailUrl: string;
  postTitle: string;
};

export function ShareButtons({
  linkedinUrl,
  copyUrl,
  emailUrl,
  postTitle,
}: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    // Try the modern async clipboard first; if that's blocked (permissions,
    // http contexts, sandboxed frames), fall back to the legacy execCommand
    // pattern before giving up. Either path flashes "Copied!" on success.
    let ok = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(copyUrl);
        ok = true;
      } catch {
        // fall through to legacy
      }
    }
    if (!ok) {
      try {
        const t = document.createElement("textarea");
        t.value = copyUrl;
        t.style.position = "fixed";
        t.style.opacity = "0";
        document.body.appendChild(t);
        t.select();
        ok = document.execCommand("copy");
        document.body.removeChild(t);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const subject =
    "Sharing an interesting team that you should know about - Mochi Collective: brand-experience, program design and events agency";
  const body = `Thought you might find this piece interesting:\n\n${postTitle}\n${emailUrl}\n\n— from mochicollective.com`;
  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="share-row">
      <div className="share-lab">Share this piece</div>
      <div className="share-btns">
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
        >
          LinkedIn
        </a>
        <button
          type="button"
          className={`share-btn${copied ? " copied" : ""}`}
          onClick={onCopy}
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
        <a href={mailto} className="share-btn">
          Email
        </a>
      </div>
    </div>
  );
}

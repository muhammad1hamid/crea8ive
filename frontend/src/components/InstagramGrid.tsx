'use client';

import { useEffect, useState } from "react";
import { SOCIAL_LINKS } from "@/lib/social-links";

/**
 * Native Instagram feed grid — renders posts from a Behold.so JSON feed
 * (https://behold.so). Behold handles the Instagram OAuth + token refresh and
 * serves a public, cached JSON feed, so this works on a static host with no
 * backend and no exposed token. Set the feed id via NEXT_PUBLIC_BEHOLD_FEED_ID.
 *
 * Until a feed id is configured (or if the fetch fails), a graceful
 * "Follow us on Instagram" card is shown instead.
 */

const FEED_ID = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID || "UumpMQs9AlgghHkk8Sw0";
const IG_PROFILE = SOCIAL_LINKS.instagram;

type BeholdPost = {
  id: string;
  mediaType?: string;
  permalink?: string;
  caption?: string;
  prunedCaption?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  likeCount?: number | null;
  commentsCount?: number | null;
  sizes?: Record<string, { mediaUrl?: string } | undefined>;
};

const fmt = (n?: number | null) => (typeof n === "number" ? n.toLocaleString() : null);

function thumb(p: BeholdPost): string {
  return (
    p.sizes?.medium?.mediaUrl ||
    p.sizes?.small?.mediaUrl ||
    p.sizes?.large?.mediaUrl ||
    p.thumbnailUrl ||
    p.mediaUrl ||
    ""
  );
}

export default function InstagramGrid({ count = 12 }: { count?: number }) {
  const [posts, setPosts] = useState<BeholdPost[] | null>(null);
  const [error, setError] = useState(!FEED_ID);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://feeds.behold.so/${FEED_ID}`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list: BeholdPost[] = Array.isArray(data) ? data : data.posts || [];
        setPosts(list.slice(0, count));
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [count]);

  if (error || (posts && posts.length === 0)) {
    return <FollowCard />;
  }

  if (!posts) {
    return (
      <div className="grid grid-cols-3 gap-1 sm:gap-2" role="status" aria-busy="true" aria-label="Loading Instagram posts">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-[3px] bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-2">
      {posts.map((p) => (
        <a
          key={p.id}
          href={p.permalink || IG_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-[4/5] overflow-hidden rounded-[3px] bg-white/[0.03]"
          aria-label={p.prunedCaption || p.caption || "View Instagram post"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb(p)}
            alt={p.prunedCaption || p.caption || "Instagram post by Crea8iv Media"}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-lux group-hover:scale-[1.06]"
          />

          {/* Media-type badge (video / carousel) */}
          {p.mediaType === "VIDEO" && <MediaBadge kind="video" />}
          {p.mediaType === "CAROUSEL_ALBUM" && <MediaBadge kind="album" />}

          {/* Hover overlay — Instagram-style centered like / comment counts */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-5 bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {fmt(p.likeCount) && (
              <span className="flex items-center gap-1.5 font-inter text-[13px] font-semibold text-white drop-shadow">
                <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 21s-7.5-4.6-10-9.2C.6 8.9 2 5.5 5.2 5.5c2 0 3.3 1.2 3.8 2.3.5-1.1 1.8-2.3 3.8-2.3 3.2 0 4.6 3.4 3.2 6.3C19.5 16.4 12 21 12 21z" />
                </svg>
                {fmt(p.likeCount)}
              </span>
            )}
            {fmt(p.commentsCount) && (
              <span className="flex items-center gap-1.5 font-inter text-[13px] font-semibold text-white drop-shadow">
                <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24" aria-hidden>
                  <path d="M21 11.5a8.5 8.5 0 01-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1121 11.5z" />
                </svg>
                {fmt(p.commentsCount)}
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}

function MediaBadge({ kind }: { kind: "video" | "album" }) {
  return (
    <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm">
      {kind === "video" ? (
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden>
          <path d="M7 7h12v12H7z" opacity="0.5" />
          <path d="M3 3h12v12H3z" />
        </svg>
      )}
    </span>
  );
}

function FollowCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-14 text-center">
      <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-[#FF6801]/30 bg-[#FF6801]/10">
        <svg className="h-7 w-7 fill-[#FF6801]" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.06A6.74 6.74 0 1018.74 12 6.74 6.74 0 0012 5.26zm0 11.12A4.38 4.38 0 1116.38 12 4.38 4.38 0 0112 16.38zm6.96-11.39a1.58 1.58 0 11-1.57-1.57 1.58 1.58 0 011.57 1.57z" />
        </svg>
      </div>
      <p className="font-orbitron text-[15px] font-semibold uppercase tracking-[0.12em] text-white">
        Follow us on Instagram
      </p>
      <a
        href={IG_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#FF6801] px-6 py-3 font-orbitron text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1c0d00] shadow-[0_0_15px_rgba(255,104,1,0.3)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
      >
        @crea8ivmedia
      </a>
    </div>
  );
}

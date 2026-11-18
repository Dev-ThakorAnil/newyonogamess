"use client";

import DownloadButton from "@/components/game/DownloadButton";

export default function StickyDownloadBanner({
  slug,
  title,
  bonus,
  isComingSoon = false,
  releaseDate,
}: {
  slug: string;
  title: string;
  bonus?: string;
  isComingSoon?: boolean;
  releaseDate?: string;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass-panel/95 backdrop-blur-sm border-t border-white/10 p-2.5 sticky-banner-enter md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="container-main flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-foreground font-semibold text-sm truncate">{title}</p>
          {bonus && <p className="text-orange-500 text-xs font-medium">{bonus}</p>}
        </div>
        <DownloadButton slug={slug} size="sm" isComingSoon={isComingSoon} releaseDate={releaseDate} />
      </div>
    </div>
  );
}

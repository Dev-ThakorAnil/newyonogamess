"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";

interface ScreenshotGalleryProps {
  screenshots: string[];
  gameTitle: string;
}

export default function ScreenshotGallery({ screenshots, gameTitle }: ScreenshotGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const navigateLightbox = useCallback(
    (direction: 1 | -1) => {
      if (lightboxIndex === null) return;
      const newIndex = lightboxIndex + direction;
      if (newIndex >= 0 && newIndex < screenshots.length) {
        setLightboxIndex(newIndex);
      }
    },
    [lightboxIndex, screenshots.length]
  );

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <>
      {/* Scrollable thumbnail gallery */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin"
        role="region"
        aria-label={`${gameTitle} screenshots gallery`}
      >
        {screenshots.map((url, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="flex-shrink-0 rounded-lg border border-border overflow-hidden hover:border-green-cta/50 transition-colors cursor-pointer snap-start focus:outline-none focus:ring-2 focus:ring-green-cta/50"
            aria-label={`View ${gameTitle} screenshot ${i + 1} of ${screenshots.length}`}
          >
            <Image
              src={url}
              alt={`${gameTitle} screenshot ${i + 1}`}
              width={192}
              height={340}
              className="w-48 h-auto object-cover"
              loading="lazy"
              sizes="192px"
            />
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-2 transition-colors z-10"
            aria-label="Close screenshot viewer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full p-3 transition-colors"
              aria-label="Previous screenshot"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()} className="max-w-3xl max-h-[85vh] relative">
            <Image
              src={screenshots[lightboxIndex]}
              alt={`${gameTitle} screenshot ${lightboxIndex + 1}`}
              width={600}
              height={1067}
              className="max-h-[85vh] w-auto object-contain rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, 600px"
            />
            <p className="text-center text-white/60 text-xs mt-2">
              {lightboxIndex + 1} / {screenshots.length}
            </p>
          </div>

          {/* Next button */}
          {lightboxIndex < screenshots.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full p-3 transition-colors"
              aria-label="Next screenshot"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}

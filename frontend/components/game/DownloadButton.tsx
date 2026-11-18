"use client";

import { useState } from "react";
import { trackDownload } from "@/lib/api";
import CountdownTimer from "./CountdownTimer";

export default function DownloadButton({
  slug,
  bonus,
  size = "lg",
  isComingSoon = false,
  releaseDate,
}: {
  slug: string;
  bonus?: string;
  size?: "sm" | "lg";
  isComingSoon?: boolean;
  releaseDate?: string | null;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await trackDownload(slug);

      // Priority: referralUrl first, then downloadUrl
      const redirectUrl = data.referralUrl || data.downloadUrl;

      if (redirectUrl && redirectUrl !== "#" && redirectUrl.trim() !== "") {
        window.open(redirectUrl, "_blank", "noopener,noreferrer");
      } else {
        setError("Download link coming soon!");
      }
    } catch (err: any) {
      const msg = err.message || "Could not connect. Please try again.";
      if (msg.includes("Game not found")) {
        setError("Game no longer available.");
      } else {
        setError(msg);
      }
    }
    setLoading(false);
  };

  const isLarge = size === "lg";

  if (isComingSoon) {
    return (
      <div className="flex flex-col items-center gap-3 w-full">
        <button
          disabled
          className={`
            bg-gray-400 text-white font-bold rounded-lg
            cursor-not-allowed flex items-center justify-center gap-2
            ${isLarge ? "w-full max-w-sm py-3 px-6 text-base" : "py-2 px-5 text-xs"}
          `}
          id={`download-btn-${slug}`}
        >
          COMING SOON
        </button>
        {releaseDate && (
          <div className="w-full flex flex-col items-center">
            <span className="text-xs text-muted-foreground font-semibold mb-2 tracking-widest uppercase">Launching In</span>
            <CountdownTimer targetDate={releaseDate} size={isLarge ? "md" : "sm"} />
            {isLarge && (
              <span className="text-[11px] text-muted-foreground/80 mt-1.5 font-medium">
                Scheduled for: {new Date(releaseDate).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`
          bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg
          transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2 shadow-md hover:shadow-lg animate-pulse-soft btn-shimmer-effect
          ${isLarge ? "w-full max-w-sm py-3 px-6 text-base" : "py-2 px-5 text-xs"}
        `}
        id={`download-btn-${slug}`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Redirecting...
          </span>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width={isLarge ? 20 : 14} height={isLarge ? 20 : 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            DOWNLOAD
          </>
        )}
      </button>
      {error && (
        <p className="text-[10px] text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/types";

interface Props {
  allGames: Game[];
  newGames: Game[];
}

type TabType = "all" | "new" | "yono" | "diwa";

export default function HomeGameSection({ allGames, newGames }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as TabType;
      if (tabParam === "yono" || tabParam === "diwa" || tabParam === "new" || tabParam === "all") {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab === "all") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", tab);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const yonoGames = allGames.filter((g) => g.gameType === "yono");
  const diwaGames = allGames.filter((g) => g.gameType !== "yono");

  const currentGames =
    activeTab === "all"
      ? allGames
      : activeTab === "new"
      ? newGames.length > 0 ? newGames : allGames.slice(0, 10)
      : activeTab === "yono"
      ? yonoGames
      : diwaGames;

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: "all", label: "Directory List", count: allGames.length },
    { id: "new", label: `New Launches (${newGames.length || 10})`, count: newGames.length || 10 },
    { id: "yono", label: "Yono Games", count: yonoGames.length },
    { id: "diwa", label: "Diwa Games", count: diwaGames.length },
  ];

  return (
    <section id="games-section" className="mt-8 mb-10 space-y-5">
      {/* ── Section Divider & Header (Screenshot 3 & 4) ── */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 w-full absolute"></div>
        <span className="bg-[#f8fafc] px-4 text-xs font-bold uppercase tracking-widest text-slate-500 relative z-10">
          ALL YONO BONUS APPS
        </span>
      </div>

      {/* ── Pill Navigation Tabs (Screenshot 3 & 4) ── */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                isActive
                  ? "bg-green-700 text-white shadow-sm hover:bg-green-800"
                  : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Mobile-First Directory App List Rows (Screenshot 3 & 4) ── */}
      {currentGames.length > 0 ? (
        <div className="space-y-3 pt-2">
          {currentGames.map((game, index) => {
            const rank = index + 1;
            const bonusText = game.bonus ? (game.bonus.startsWith("₹") ? game.bonus : `₹${game.bonus}`) : "₹51";
            const downloadLink = game.slug ? `/game/${game.slug}` : "/";

            return (
              <div
                key={game._id || game.slug || index}
                className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 group"
              >
                {/* Left: Rank + Icon + Info */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Icon with Rank Badge */}
                  <div className="relative shrink-0">
                    <span className="absolute -top-1.5 -left-1.5 bg-green-700 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-md shadow-xs z-10">
                      #{rank}
                    </span>
                    <Link href={downloadLink} className="block w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                      <Image
                        src={game.logo || "/logo1.png"}
                        alt={game.title}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </Link>
                  </div>

                  {/* Title and Badges */}
                  <div className="min-w-0">
                    <Link href={downloadLink} className="hover:text-green-700 transition-colors">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug truncate">
                        {game.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="inline-flex items-center text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                        Bonus: <strong className="ml-1 text-emerald-700">{bonusText}</strong>
                      </span>
                      <span className="inline-flex items-center text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        Min: ₹100
                      </span>
                      {game.downloads && (
                        <span className="hidden sm:inline-flex text-[11px] text-slate-400">
                          {game.downloads}+ Downloads
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Solid Green Download Pill CTA */}
                <Link
                  href={downloadLink}
                  className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full flex items-center gap-1.5 shrink-0 shadow-xs transition-transform active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <span>Download</span>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-300 bg-white my-4">
          <p className="text-3xl mb-2">🎮</p>
          <h3 className="text-sm font-bold text-slate-800">
            No games found in this directory
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Check back soon for new releases and updates.
          </p>
        </div>
      )}
    </section>
  );
}

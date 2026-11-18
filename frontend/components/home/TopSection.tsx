import Link from "next/link";
import Image from "next/image";
import type { Game } from "@/lib/types";

export interface PlatformSlotConfig {
  slotNumber: number;
  gameSlug: string;
  gameId?: string;
  badge: string;
  subtitle: string;
  rating: string;
  highlights?: string[];
}

interface TopSectionProps {
  topGames?: Game[];
  allGames?: Game[];
  topPlatformsConfig?: {
    slots: PlatformSlotConfig[];
  };
}

export default function TopSection({ topGames = [], allGames = [], topPlatformsConfig }: TopSectionProps) {
  // Resolve games for the 3 slots based on admin configuration or fallback
  const configSlots = topPlatformsConfig?.slots || [];

  const getGameForSlot = (slotIndex: number, fallbackGame?: Game) => {
    const slotConfig = configSlots[slotIndex];
    if (slotConfig?.gameSlug) {
      const match = allGames.find((g) => g.slug === slotConfig.gameSlug || g._id === slotConfig.gameId);
      if (match) return match;
    }
    return fallbackGame || topGames[slotIndex] || allGames[slotIndex] || {
      title: slotIndex === 0 ? "Yono VIP" : slotIndex === 1 ? "Spin Crush" : "Cash Rummy",
      slug: slotIndex === 0 ? "yono-vip" : slotIndex === 1 ? "spin-crush" : "cash-rummy",
      logo: "/logo1.png",
      bonus: "₹500",
      downloadUrl: "/",
    };
  };

  const slot1Game = getGameForSlot(0, topGames[0]);
  const slot2Game = getGameForSlot(1, topGames[1]);
  const slot3Game = getGameForSlot(2, topGames[2]);

  const slot1Config = configSlots[0] || {
    badge: "🏆 #1 TOP CHOICE",
    subtitle: "Most Popular Experience",
    rating: "9.9",
  };

  const slot2Config = configSlots[1] || {
    badge: "🥈 #2 RECOMMENDED",
    subtitle: "Trusted Starting Platform",
    rating: "9.7",
  };

  const slot3Config = configSlots[2] || {
    badge: "🥉 #3 TOP REWARD",
    subtitle: "High Bonus Alternative",
    rating: "9.6",
  };

  return (
    <div className="w-full space-y-6 pt-3 pb-2 font-sans">
      {/* ── 1. Hero Title & Trust Badges ── */}
      <div className="text-center space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          NewYonoGamess &ndash; All Yono Apps &amp; Games 2026
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          India&apos;s verified directory for official All Yono games, Diwa apps, Rummy APK downloads, and signup bonuses.
        </p>

        {/* 3 Pill Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span>🛡️</span> 100% Safe
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span>⭐</span> RNG Certified
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200">
            <span>⚡</span> Instant UPI
          </span>
        </div>
      </div>

      {/* ── 2. Official Telegram Channel Banner ── */}
      <div className="bg-[#15803d] text-white p-4 sm:p-5 rounded-2xl shadow-xs border border-green-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                Join Our Official Telegram Channel
              </h3>
              <p className="text-xs text-green-100 mt-0.5">
                Daily Bonus Codes, APK Updates &amp; Instant Loot Deals
              </p>
            </div>
          </div>
          <Link
            href="https://t.me/diwagamekatufan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white text-green-800 hover:bg-slate-100 font-bold text-xs sm:text-sm px-5 py-2 rounded-full shadow-xs transition-all hover:scale-105 shrink-0"
          >
            <span>✈️</span> Join Now
          </Link>
        </div>
      </div>

      {/* ── 3. Distinct Modern Top 3 Platforms Section ── */}
      <div className="space-y-4 pt-2">
        <div className="text-center space-y-1">
          <span className="inline-block px-3 py-0.5 text-[11px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800 rounded-full">
            ⭐ 2026 TOP VERIFIED APPS
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Top 3 Verified Platforms
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Audited and rated by Indian players for fastest UPI withdrawals and top sign-up bonuses.
          </p>
        </div>

        {/* 3-Card Modern Grid (Slot 2 Left, Slot 1 Center Winner, Slot 3 Right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 items-stretch">
          
          {/* 🥈 SLOT 2 (Rank #2 - Left Card) */}
          <div className="order-2 md:order-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {slot2Config.badge || "🥈 #2 RECOMMENDED"}
                </span>
                <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  ★ {slot2Config.rating || "9.7"}/10
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-xs">
                  <Image
                    src={slot2Game.logo || "/logo1.png"}
                    alt={slot2Game.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900 text-base leading-tight truncate">
                    {slot2Game.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{slot2Config.subtitle || "Trusted Starting Platform"}</p>
                </div>
              </div>

              {/* Bonus Highlight Chip */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-2.5 mb-4 text-center">
                <span className="text-[11px] text-emerald-800 font-medium block">Verified Sign-Up Bonus</span>
                <span className="text-base font-black text-emerald-700">
                  {slot2Game.bonus ? (slot2Game.bonus.startsWith("₹") ? slot2Game.bonus : `₹${slot2Game.bonus}`) : "₹500 Bonus"}
                </span>
              </div>

              {/* Feature Chips */}
              <div className="space-y-2 text-xs text-slate-600 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Instant UPI &amp; Bank Payout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>100% Certified RNG Fair Play</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Real Indian Players Only</span>
                </div>
              </div>
            </div>

            <Link
              href={slot2Game.slug ? `/game/${slot2Game.slug}` : "/"}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-colors block text-center shadow-xs"
            >
              Get Started →
            </Link>
          </div>

          {/* 🏆 SLOT 1 (Rank #1 - Center WINNER Card) */}
          <div className="order-1 md:order-2 bg-white border-2 border-green-600 rounded-2xl p-5 shadow-lg flex flex-col justify-between relative md:-translate-y-2 ring-2 ring-green-600/20">
            {/* Top Winner Crown Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green-700 text-white text-[11px] font-black uppercase tracking-wider px-4 py-0.5 rounded-full shadow-xs flex items-center gap-1.5 whitespace-nowrap">
              <span>👑</span> {slot1Config.badge || "🏆 #1 TOP CHOICE"}
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mt-2 mb-3">
                <span className="text-[11px] font-extrabold text-green-800 bg-green-100 px-2.5 py-0.5 rounded-full">
                  MOST POPULAR
                </span>
                <span className="text-xs font-black text-green-800 bg-green-50 px-2 py-0.5 rounded border border-green-300">
                  ★ {slot1Config.rating || "9.9"}/10
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-green-600 shadow-xs relative">
                  <Image
                    src={slot1Game.logo || "/logo1.png"}
                    alt={slot1Game.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-green-700 text-white text-[9px] font-bold px-1 rounded-tl">
                    ✓
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-slate-900 text-lg leading-tight truncate">
                    {slot1Game.title}
                  </h3>
                  <p className="text-xs text-green-700 font-bold mt-0.5">{slot1Config.subtitle || "Most Popular Experience"}</p>
                </div>
              </div>

              {/* Bonus Highlight Chip */}
              <div className="bg-green-700 text-white rounded-xl p-3 mb-4 text-center shadow-xs">
                <span className="text-[11px] text-green-100 font-medium block">Highest Welcome Bonus</span>
                <span className="text-lg font-black tracking-wide">
                  {slot1Game.bonus ? (slot1Game.bonus.startsWith("₹") ? slot1Game.bonus : `₹${slot1Game.bonus}`) : "₹500 Bonus"}
                </span>
              </div>

              {/* Feature Chips */}
              <div className="space-y-2 text-xs text-slate-700 font-medium mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>5-Minute Lightning UPI Withdrawal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>100% Certified RNG Fair Deal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>24/7 Dedicated VIP Care Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Zero Ban Risk &bull; Encrypted Wallet</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href={slot1Game.slug ? `/game/${slot1Game.slug}` : "/"}
                className="w-full py-3 px-4 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs sm:text-sm font-extrabold shadow-md transition-all block text-center"
              >
                Download &amp; Claim Bonus →
              </Link>
              <p className="text-[10px] text-slate-400 font-medium text-center mt-1.5">
                Official Android APK &bull; 100% Free Download
              </p>
            </div>
          </div>

          {/* 🥉 SLOT 3 (Rank #3 - Right Card) */}
          <div className="order-3 md:order-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  {slot3Config.badge || "🥉 #3 TOP REWARD"}
                </span>
                <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  ★ {slot3Config.rating || "9.6"}/10
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-xs">
                  <Image
                    src={slot3Game.logo || "/logo1.png"}
                    alt={slot3Game.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900 text-base leading-tight truncate">
                    {slot3Game.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{slot3Config.subtitle || "High Bonus Alternative"}</p>
                </div>
              </div>

              {/* Bonus Highlight Chip */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 mb-4 text-center">
                <span className="text-[11px] text-amber-800 font-medium block">Special Reward Cash</span>
                <span className="text-base font-black text-amber-700">
                  {slot3Game.bonus ? (slot3Game.bonus.startsWith("₹") ? slot3Game.bonus : `₹${slot3Game.bonus}`) : "₹500 Bonus"}
                </span>
              </div>

              {/* Feature Chips */}
              <div className="space-y-2 text-xs text-slate-600 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Minimum ₹100 Easy Withdrawal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Daily Free Spin Wheels &amp; Cashback</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Lightweight &bull; Fast Smooth Tables</span>
                </div>
              </div>
            </div>

            <Link
              href={slot3Game.slug ? `/game/${slot3Game.slug}` : "/"}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-colors block text-center shadow-xs"
            >
              Get Started →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

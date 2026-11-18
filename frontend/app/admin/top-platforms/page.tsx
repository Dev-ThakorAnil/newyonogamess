"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../auth";
import { getAdminGames, updateGame } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Game } from "@/lib/types";

interface PlatformSlot {
  slotNumber: number;
  gameSlug: string;
  gameId: string;
  badge: string;
  subtitle: string;
  rating: string;
  highlights?: string[];
}

export default function TopPlatformsAdminPage() {
  const { token } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [slots, setSlots] = useState<PlatformSlot[]>([
    {
      slotNumber: 1,
      gameSlug: "yono-vip",
      gameId: "",
      badge: "🏆 #1 TOP CHOICE",
      subtitle: "Most Popular Experience",
      rating: "9.9",
      highlights: ["⚡ Instant UPI", "🛡️ 100% Secure RNG", "🎧 24/7 VIP Support", "🎁 ₹500 Bonus"],
    },
    {
      slotNumber: 2,
      gameSlug: "spin-crush",
      gameId: "",
      badge: "🥈 #2 RECOMMENDED",
      subtitle: "Trusted Starting Platform",
      rating: "9.7",
      highlights: ["⚡ Instant Withdrawal", "🛡️ 100% Secure RNG", "🎁 ₹500 Bonus", "🎮 Real Players"],
    },
    {
      slotNumber: 3,
      gameSlug: "cash-rummy",
      gameId: "",
      badge: "🥉 #3 TOP REWARD",
      subtitle: "High Bonus Alternative",
      rating: "9.6",
      highlights: ["⚡ Low ₹100 Min Cashout", "🛡️ Verified Payouts", "🎁 ₹500 Bonus", "⭐ Top Rated"],
    },
  ]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Load all games
        if (token) {
          const gamesRes = await getAdminGames(token, 1, 100, "active");
          setGames(gamesRes.games || []);
        }

        // Load current config
        const configRes = await fetch("/api/top-platforms", { cache: "no-store" });
        if (configRes.ok) {
          const data = await configRes.json();
          if (Array.isArray(data.slots) && data.slots.length === 3) {
            setSlots(data.slots);
          }
        }
      } catch (err: any) {
        console.error("Failed to load top platforms admin data", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token]);

  const updateSlot = (index: number, field: keyof PlatformSlot, value: any) => {
    setSlots((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleGameSelect = (index: number, selectedSlug: string) => {
    const selectedGame = games.find((g) => g.slug === selectedSlug);
    setSlots((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        gameSlug: selectedSlug,
        gameId: selectedGame?._id || "",
      };
      return copy;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      // 1. Save to Next.js API
      const res = await fetch("/api/top-platforms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slots }),
      });

      if (!res.ok) {
        throw new Error("Failed to save top platforms configuration");
      }

      // 2. Also update position on backend for each selected game
      if (token) {
        for (const slot of slots) {
          const game = games.find((g) => g.slug === slot.gameSlug || g._id === slot.gameId);
          if (game && game._id) {
            try {
              await updateGame(token, game._id, { position: slot.slotNumber });
            } catch (backendErr) {
              console.warn("Backend position update non-fatal:", backendErr);
            }
          }
        }
      }

      setMessage({ type: "success", text: "Top 3 Platforms updated successfully! The homepage now displays your selection." });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <div className="animate-spin h-8 w-8 border-2 border-green-700 border-t-transparent rounded-full" />
        <p className="text-xs text-slate-500 font-medium">Loading top platforms configuration...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans flex items-center gap-2">
            <span>⭐</span> Top 3 Platforms Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Choose which 3 games appear in the homepage comparison section and customize their positions, ranking badges, and subtitles.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs sm:text-sm px-6 shadow-xs"
        >
          {saving ? "Saving Changes..." : "Save Configuration"}
        </Button>
      </div>

      {/* Alert Notification */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm font-medium border ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 3 Slot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {slots.map((slot, index) => {
          const selectedGame = games.find((g) => g.slug === slot.gameSlug || g._id === slot.gameId);
          const isWinner = slot.slotNumber === 1;

          return (
            <Card
              key={slot.slotNumber}
              className={`bg-white border transition-shadow ${
                isWinner ? "border-green-600 shadow-md ring-2 ring-green-600/20" : "border-slate-200 shadow-xs"
              }`}
            >
              <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    isWinner ? "bg-green-700 text-white" : "bg-slate-200 text-slate-700"
                  }`}>
                    Slot #{slot.slotNumber} {isWinner && "(Center / Winner)"}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Position #{slot.slotNumber}</span>
                </div>
                <CardTitle className="text-sm font-bold text-slate-800 mt-2">
                  {slot.subtitle || `Slot ${slot.slotNumber}`}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 pt-4 text-xs">
                {/* Game Selector */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Select Game
                  </label>
                  <select
                    value={slot.gameSlug}
                    onChange={(e) => handleGameSelect(index, e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-green-600"
                  >
                    <option value="">-- Choose a Game --</option>
                    {games.map((g) => (
                      <option key={g._id || g.slug} value={g.slug}>
                        {g.title} {g.bonus ? `(${g.bonus})` : ""} - [{g.gameType?.toUpperCase() || "GAME"}]
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Game Preview Info */}
                {selectedGame ? (
                  <div className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                      <Image
                        src={selectedGame.logo || "/logo1.png"}
                        alt={selectedGame.title}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{selectedGame.title}</p>
                      <p className="text-[11px] text-emerald-700 font-semibold">{selectedGame.bonus || "Bonus Active"}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[11px]">
                    No game selected. Will use fallback.
                  </div>
                )}

                {/* Badge Label */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Badge Title
                  </label>
                  <Input
                    type="text"
                    value={slot.badge}
                    onChange={(e) => updateSlot(index, "badge", e.target.value)}
                    placeholder="e.g. 🏆 #1 TOP CHOICE"
                    className="text-xs h-8"
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Subtitle Description
                  </label>
                  <Input
                    type="text"
                    value={slot.subtitle}
                    onChange={(e) => updateSlot(index, "subtitle", e.target.value)}
                    placeholder="e.g. Most Popular Experience"
                    className="text-xs h-8"
                  />
                </div>

                {/* Rating Score */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Rating Score
                  </label>
                  <Input
                    type="text"
                    value={slot.rating}
                    onChange={(e) => updateSlot(index, "rating", e.target.value)}
                    placeholder="e.g. 9.9"
                    className="text-xs h-8"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Save Bottom CTA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Ready to publish your top 3 selection?</h4>
          <p className="text-xs text-slate-500">The changes will be reflected instantly on the website homepage.</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-700 hover:bg-green-800 text-white font-bold text-xs sm:text-sm px-8 shadow-xs w-full sm:w-auto"
        >
          {saving ? "Saving..." : "Save Configuration"}
        </Button>
      </div>
    </div>
  );
}


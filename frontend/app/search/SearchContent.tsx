"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { searchGames } from "@/lib/api";
import GameGrid from "@/components/game/GameGrid";
import type { Game } from "@/lib/types";

export default function SearchPageContent({ defaultGames = [] }: { defaultGames?: Game[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchGames(q);
      setResults(data.games);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="container-main py-4">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
        🔍 Search Games
      </h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex max-w-lg">
          <input
            type="search"
            placeholder="Search by game name, category, or tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 glass-panel border-2 border-gray-300 rounded-l-md text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:border-green-600"
            id="search-page-input"
            autoFocus
          />
          <button type="submit" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-r-md transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" x2="16.65" y1="21" y2="16.65" />
            </svg>
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-10">
          <div className="animate-spin h-8 w-8 border-2 border-green-700 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Searching...</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <GameGrid games={results} title={`Results for "${query}"`} />
      )}

      {!loading && !searched && !query && defaultGames && defaultGames.length > 0 && (
        <GameGrid games={defaultGames} title="All Games" icon="🎮" />
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-3xl mb-2">😕</p>
          <p className="text-muted-foreground text-sm">No games found for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}

import { Suspense } from "react";
import { Metadata } from "next";
import SearchPageContent from "./SearchContent";
import { getGames } from "@/lib/api";

export const metadata: Metadata = {
  title: "Search Games & Apps",
  description: "Search and find the best APK games and apps to download.",
  alternates: { canonical: "/search" },
};

export default async function SearchPage() {
  let defaultGames: any[] = [];
  try {
    // Fetch popular games to show by default
    const res = await getGames({ sort: "-downloads", limit: 100 });
    defaultGames = res.games || [];
  } catch (e) {
    // ignore
  }

  return (
    <Suspense
      fallback={
        <div className="container-main py-8">
          <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            🔍 Search Games
          </h1>
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-green-cta border-t-transparent rounded-full" />
          </div>
        </div>
      }
    >
      <SearchPageContent defaultGames={defaultGames} />
    </Suspense>
  );
}

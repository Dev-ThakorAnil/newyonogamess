import fs from "fs";
import path from "path";
import HomeGameSection from "@/components/home/HomeGameSection";
import { getGames } from "@/lib/api";
import TopSection from "@/components/home/TopSection";
import HomeSeoContent from "@/components/home/HomeSeoContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://newyonogamess.tech";

export const revalidate = 300;

export const metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NewYonoGamess",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo1.png`
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "NewYonoGamess",
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default async function HomePage() {
  let allGames: import("@/lib/types").Game[] = [];
  let newGames: import("@/lib/types").Game[] = [];
  let topPlatformsConfig: any = null;

  try {
    const [allRes, newRes] = await Promise.all([
      getGames({ limit: 100 }),
      getGames({ featured: "true", limit: 50 }),
    ]);
    allGames = allRes.games;
    newGames = newRes.games;
  } catch {
    allGames = [];
    newGames = [];
  }

  // Load Admin-Configured Top 3 Platforms
  try {
    const configPath = path.join(process.cwd(), "data", "top-platforms.json");
    if (fs.existsSync(configPath)) {
      const rawData = fs.readFileSync(configPath, "utf8");
      topPlatformsConfig = JSON.parse(rawData);
    }
  } catch {
    topPlatformsConfig = null;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="container-main py-4">
        {/* Top Section: Hero, Search, Dynamic Banners */}
        <TopSection
          topGames={allGames.slice(0, 3)}
          allGames={allGames}
          topPlatformsConfig={topPlatformsConfig}
        />

        {/* Games Grid with Tabs */}
        {allGames.length > 0 && (
          <HomeGameSection allGames={allGames} newGames={newGames} />
        )}

        {/* SEO Content Section */}
        <HomeSeoContent />

        {/* Empty state */}
        {allGames.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-3">🎮</p>
            <h2 className="text-xl font-bold mb-2 text-foreground">
              Coming Soon
            </h2>
            <p className="text-muted-foreground text-sm">
              We are adding new games and apps. Please check back later!
            </p>
          </div>
        )}
      </div>
    </>
  );
}

import type { MetadataRoute } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://diwalatestgames.onrender.com/api";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://newyonogamess.tech";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    // Homepage
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },

    // SEO Landing Pages (high priority)
    { url: `${SITE_URL}/diwa-apk-download`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/diwa-games`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/diwa-rummy`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },

    // Search
    { url: `${SITE_URL}/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },

    // Static / Trust pages
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms-of-use`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  // Fetch games
  try {
    const gamesRes = await fetch(`${API_BASE}/games?limit=500`, { next: { revalidate: 3600 } });
    if (gamesRes.ok) {
      const { games } = await gamesRes.json();
      if (Array.isArray(games) && games.length > 0) {
        for (const game of games) {
          if (game.slug) {
            entries.push({
              url: `${SITE_URL}/game/${game.slug}`,
              lastModified: new Date(game.updatedAt || game.createdAt),
              changeFrequency: "weekly",
              priority: 0.8,
            });
          }
        }
      }
    } else {
      console.error(`[Sitemap] Games API returned HTTP ${gamesRes.status}`);
    }
  } catch (err) {
    console.error("[Sitemap] Failed to fetch games from API:", err);
  }

  // Fetch categories
  try {
    const catRes = await fetch(`${API_BASE}/categories`, { next: { revalidate: 3600 } });
    if (catRes.ok) {
      const { categories } = await catRes.json();
      if (Array.isArray(categories) && categories.length > 0) {
        for (const cat of categories) {
          if (cat.slug) {
            entries.push({
              url: `${SITE_URL}/category/${cat.slug}`,
              lastModified: new Date(),
              changeFrequency: "weekly",
              priority: 0.7,
            });
          }
        }
      }
    } else {
      console.error(`[Sitemap] Categories API returned HTTP ${catRes.status}`);
    }
  } catch (err) {
    console.error("[Sitemap] Failed to fetch categories from API:", err);
  }

  return entries;
}

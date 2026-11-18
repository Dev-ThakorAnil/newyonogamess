import { Metadata } from "next";
import Link from "next/link";
import { getGames } from "@/lib/api";
import GameGrid from "@/components/game/GameGrid";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `#${slug} Games & Apps APK Download`,
    description: `Download ${slug} tagged APK games and apps. Free and safe downloads.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://newyonogamess.tech"}/tag/${slug}`,
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  let games: import("@/lib/types").Game[] = [];

  try {
    const data = await getGames({ tag: slug, limit: 50 });
    games = data.games;
  } catch {}

  return (
    <div className="container-main py-8">
      <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>›</span>
        <span className="text-foreground font-medium">#{slug}</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        🏷️ #{slug}
      </h1>

      {games.length > 0 ? (
        <GameGrid games={games} />
      ) : (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-muted-foreground">No games found with this tag.</p>
        </div>
      )}
    </div>
  );
}

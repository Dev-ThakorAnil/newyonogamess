import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryGames } from "@/lib/api";
import GameGrid from "@/components/game/GameGrid";
import Breadcrumb from "@/components/seo/Breadcrumb";
import InternalLinkSection from "@/components/seo/InternalLinkSection";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  return [
    { slug: "rummy" },
    { slug: "teen-patti" },
    { slug: "casino" },
    { slug: "slots" },
    { slug: "all" },
  ];
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ");
  return {
    title: `Best ${name} Games APK Download 2026`,
    description: `Download the best ${name} APK games. Free, safe, and fast downloads with exclusive bonuses.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://newyonogamess.tech"}/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  let category, games;

  try {
    const data = await getCategoryGames(slug);
    category = data.category;
    games = data.games;
  } catch {
    notFound();
  }

  if (!category) notFound();

    return (
    <div className="container-main py-8">
      {/* Breadcrumb with Schema */}
      <Breadcrumb items={[
        { label: category.name },
      ]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3" style={{ fontFamily: "var(--font-heading)" }}>
          <span className="text-3xl">{category.icon}</span>
          {category.name} Games
        </h1>
        {category.description && (
          <p className="text-muted-foreground mt-2">{category.description}</p>
        )}
      </div>

      {/* Games Grid */}
      {games && games.length > 0 ? (
        <GameGrid games={games} />
      ) : (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-muted-foreground">No games in this category yet.</p>
        </div>
      )}

      {/* Internal Links */}
      <InternalLinkSection />
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGame, getGames } from "@/lib/api";
import DownloadButton from "@/components/game/DownloadButton";
import FAQSection from "@/components/game/FAQSection";
import GameCard from "@/components/game/GameCard";
import StickyDownloadBanner from "@/components/layout/StickyDownloadBanner";
import Breadcrumb from "@/components/seo/Breadcrumb";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const res = await getGames({ limit: 200 });
    return (res.games || []).filter(g => g.slug).map((g) => ({ slug: g.slug }));
  } catch (err) {
    console.error("[StaticParams] Failed to fetch games for static generation:", err);
    return [];
  }
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { game } = await getGame(slug);
    return {
      title: game.seoTitle || `${game.title} APK Download - Latest Version`,
      description: game.seoDescription || `Download ${game.title} APK latest version. Play top diwa games, diwa app, and get ${game.bonus || "free bonus"}. Fast, secure, and official download link.`,
      keywords: [game.title, `${game.title} APK`, `${game.title} Download`, "diwa games", "diwa app", "diwa rummy app", "latest diwa games", ...(game.tags || [])],
      openGraph: {
        title: game.seoTitle || `${game.title} APK Download - Latest Version`,
        description: game.seoDescription || `Download ${game.title} APK latest version. Play top diwa games and diwa app.`,
        images: game.logo ? [{ url: game.logo }] : [],
        type: "article",
      },
      twitter: { card: "summary_large_image" },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://newyonogamess.tech"}/game/${game.slug}`,
      },
    };
  } catch {
    return { title: "Game Not Found" };
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="stars-display text-base">{"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}</span>
      <span className="text-xs text-muted-foreground">({rating})</span>
    </div>
  );
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  let game: any, related: any[] = [];
  let latest: any[] = [];

  try {
    const data = await getGame(slug);
    game = data.game;
    related = data.related || [];

    try {
      const latestRes = await getGames({ sort: "-createdAt", limit: 5 });
      latest = latestRes.games || [];
    } catch {
      // Ignore
    }
  } catch {
    notFound();
  }

  if (!game) notFound();

  const formatDownloads = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M+`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K+`;
    return `${n}+`;
  };

  const categoryLabel = (game.category || "").replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

  const schemaMarkup: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": game.title,
    "operatingSystem": "ANDROID",
    "applicationCategory": "GameApplication",
    "image": game.logo || `${process.env.NEXT_PUBLIC_SITE_URL || "https://newyonogamess.tech"}/logo1.png`,
    "description": game.seoDescription || game.title,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  if (game.rating && game.ratingCount) {
    schemaMarkup.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": game.rating.toString(),
      "ratingCount": game.ratingCount.toString()
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="container-main py-4 pb-24 md:pb-6">
        {/* Search Bar at the top */}
        <div className="mb-4">
          <form action="/search" method="GET" className="flex">
            <input
              type="text"
              name="q"
              placeholder="diwa App Search"
              className="flex-1 px-4 py-2 glass-panel border-2 border-gray-300 rounded-l-md text-sm text-foreground placeholder-gray-400 focus:outline-none focus:border-green-600"
            />
            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-r-md transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" />
              </svg>
            </button>
          </form>
        </div>

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: categoryLabel, href: `/category/${game.category}` },
            { label: game.title },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-5 mt-3">
          {/* Left Column - Main Content */}
          <div className="space-y-5">
            {/* Game Header / Hero */}
            <div className="glass-panel rounded-lg border border-white/10 p-5">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-green-700/30 shadow-lg relative bg-white/5">
                  {game.logo ? (
                    <Image src={game.logo} alt={`${game.title} app icon`} fill className="object-cover" sizes="112px" priority />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">🎮</div>
                  )}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-2xl font-extrabold text-foreground leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    {game.title} <span className="text-green-700">APK Download</span>
                  </h1>
                  {game.shortDescription && (
                    <p className="text-muted-foreground text-sm mt-1">{game.shortDescription}</p>
                  )}
                  {game.bonus && (
                    <p className="text-orange-500 font-bold text-sm mt-2">🎁 Signup Bonus: {game.bonus}</p>
                  )}
                  <div className="mt-2">
                    <StarRating rating={game.rating || 4.5} />
                  </div>
                  <div className="mt-3">
                    <DownloadButton slug={game.slug} bonus={game.bonus} size="lg" isComingSoon={game.isComingSoon} releaseDate={game.releaseDate} />
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-5 gap-2 text-center mt-4 text-xs">
                <div>
                  <div className="font-bold text-foreground">Updated</div>
                  <div className="text-orange-500">Today</div>
                </div>
                <div>
                  <div className="font-bold text-foreground">Size</div>
                  <div className="text-muted-foreground">{game.size || "40 MB"}</div>
                </div>
                <div>
                  <div className="font-bold text-foreground">Version</div>
                  <div className="text-muted-foreground">{game.version || "Latest"}</div>
                </div>
                <div>
                  <div className="font-bold text-foreground">Requirements</div>
                  <div className="text-muted-foreground">Android</div>
                </div>
                <div>
                  <div className="font-bold text-foreground">Downloads</div>
                  <div className="text-muted-foreground">{formatDownloads(game.downloads || 1000000)}</div>
                </div>
              </div>
            </div>

            {/* About Game (Content Section) */}
            {game.contentSections?.aboutGame?.visible !== false && game.contentSections?.aboutGame?.content && (
              <div className="glass-panel rounded-lg border border-white/10 p-5">
                <h2 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                  About {game.title}
                </h2>
                <div className="w-12 h-1 bg-green-700 mb-4"></div>
                <div
                  className="content-section-html prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{ __html: game.contentSections.aboutGame.content }}
                />
              </div>
            )}

            {/* Description */}
            {game.description && (
              <div className="glass-panel rounded-lg border border-white/10 p-5">
                <h2 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                  Description
                </h2>
                <div className="w-12 h-1 bg-green-700 mb-4"></div>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-bold prose-a:text-blue-600"
                  dangerouslySetInnerHTML={{ __html: game.description }}
                />
                <div className="flex flex-wrap gap-3 mt-6">
                  <DownloadButton slug={game.slug} bonus={game.bonus} size="lg" isComingSoon={game.isComingSoon} releaseDate={game.releaseDate} />
                </div>
              </div>
            )}

            {/* Key Features (Content Section) */}
            {game.contentSections?.keyFeatures?.visible !== false && game.contentSections?.keyFeatures?.content && (
              <div className="glass-panel rounded-lg border border-white/10 p-5">
                <h2 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                  Key Features & Benefits
                </h2>
                <div className="w-12 h-1 bg-green-700 mb-4"></div>
                <div
                  className="content-section-html prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: game.contentSections.keyFeatures.content }}
                />
              </div>
            )}

            {/* How To Download */}
            {game.howToDownload && (
              <div className="glass-panel rounded-lg border border-white/10 p-5">
                <h2 className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  How To Download {game.title} APK
                </h2>
                <div className="w-12 h-1 bg-green-700 mb-4"></div>
                <div
                  className="how-to-download-steps"
                  dangerouslySetInnerHTML={{ __html: game.howToDownload }}
                />
              </div>
            )}

            {/* System Requirements (Content Section) */}
            {game.contentSections?.systemRequirements?.visible !== false && game.contentSections?.systemRequirements?.content && (
              <div className="glass-panel rounded-lg border border-white/10 p-5">
                <h2 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                  System Requirements
                </h2>
                <div className="w-12 h-1 bg-green-700 mb-4"></div>
                <div
                  className="content-section-html system-requirements-table text-sm"
                  dangerouslySetInnerHTML={{ __html: game.contentSections.systemRequirements.content }}
                />
              </div>
            )}

            {/* Screenshots */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div className="glass-panel rounded-lg border border-white/10 p-5">
                <h2 className="text-base font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Screenshots
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {game.screenshots.map((url: string, i: number) => (
                    <Image
                      key={i}
                      src={url}
                      alt={`${game.title} screenshot ${i + 1}`}
                      width={160}
                      height={320}
                      className="w-40 h-auto rounded-lg border border-white/10 flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Why Choose (Content Section) */}
            {game.contentSections?.whyChoose?.visible !== false && game.contentSections?.whyChoose?.content && (
              <div className="glass-panel rounded-lg border border-white/10 p-5">
                <h2 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                  Why Choose {game.title}?
                </h2>
                <div className="w-12 h-1 bg-green-700 mb-4"></div>
                <div
                  className="content-section-html prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: game.contentSections.whyChoose.content }}
                />
              </div>
            )}

            {/* Safety & Security (Content Section) */}
            {game.contentSections?.safetyAndSecurity?.visible !== false && game.contentSections?.safetyAndSecurity?.content && (
              <div className="glass-panel rounded-lg border border-white/10 p-5">
                <h2 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                  Safety & Security
                </h2>
                <div className="w-12 h-1 bg-green-700 mb-4"></div>
                <div
                  className="content-section-html prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{ __html: game.contentSections.safetyAndSecurity.content }}
                />
              </div>
            )}

            {/* FAQ */}
            {game.faq && game.faq.length > 0 && (
              <div className="glass-panel rounded-lg border border-white/10 p-5">
                <FAQSection faq={game.faq} gameTitle={game.title} />
              </div>
            )}

            {/* Related Apps - Show all (up to 24) */}
            {related && related.length > 0 && (
              <div className="glass-panel rounded-lg border border-white/10 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-foreground uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                    More {categoryLabel} Games
                  </h2>
                  <span className="text-xs text-muted-foreground font-medium">{related.length} Games</span>
                </div>
                <div className="w-12 h-1 bg-green-700 mb-4"></div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                  {related.map((g) => (
                    <GameCard key={g._id || g.slug} game={g} />
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    href={`/category/${game.category}`}
                    className="inline-flex items-center justify-center w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-green-700 hover:bg-green-800 text-white transition-colors"
                  >
                    View All {categoryLabel} Games →
                  </Link>
                </div>
              </div>
            )}

            {/* Tags */}
            {game.tags && game.tags.length > 0 && (
              <div className="glass-panel rounded-lg border border-white/10 p-5">
                <h2 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                  Tags
                </h2>
                <div className="w-12 h-1 bg-green-700 mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag: string) => (
                    <Link key={tag} href={`/tag/${tag}`} className="bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-green-800 transition-colors">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar (hidden on mobile, shows on md+) */}
          <div className="hidden md:block space-y-5">
            {/* Sidebar Search */}
            <div className="glass-panel rounded-lg border border-white/10 p-4">
              <form action="/search" method="GET" className="flex">
                <input
                  type="text"
                  name="q"
                  placeholder="Search..."
                  className="flex-1 px-3 py-2 bg-white/5 border border-gray-300 rounded-l text-sm text-foreground placeholder-gray-400 focus:outline-none focus:border-green-600"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r text-xs font-bold transition-colors">
                  Search
                </button>
              </form>
            </div>

            {/* Recent Posts */}
            {latest && latest.length > 0 && (
              <div className="glass-panel rounded-lg border border-white/10 p-4">
                <h3 className="font-bold text-foreground text-sm mb-3 uppercase tracking-wide">
                  Recent Posts
                </h3>
                <div className="space-y-3">
                  {latest.map((g) => (
                    <Link key={g._id || g.slug} href={`/game/${g.slug}`} className="flex items-start gap-3 group">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 relative">
                        {g.logo ? (
                          <Image src={g.logo} alt={g.title} fill className="object-cover" sizes="48px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl bg-white/10">🎮</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground group-hover:text-green-700 transition-colors leading-tight line-clamp-2">
                          {g.title} Download & Get {g.bonus || "Bonus Free"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Banner (mobile) */}
      <StickyDownloadBanner slug={game.slug} title={game.title} bonus={game.bonus} isComingSoon={game.isComingSoon} releaseDate={game.releaseDate} />
    </>
  );
}

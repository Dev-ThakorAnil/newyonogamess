import { Metadata } from "next";
import Link from "next/link";
import { getGames, getCategories } from "@/lib/api";
import GameGrid from "@/components/game/GameGrid";
import Breadcrumb from "@/components/seo/Breadcrumb";
import ArticleSchema from "@/components/seo/ArticleSchema";
import InternalLinkSection from "@/components/seo/InternalLinkSection";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Diwa Games – Download Best Diwa Game APKs for Android (2026)",
  description:
    "Explore and download the best Diwa Games for Android. Play rummy, teen patti, slots, spin games and more. Free APK downloads with exclusive bonuses at Diwa Games.",
  keywords: [
    "Diwa Games",
    "Diwa Game download",
    "Diwa Games list",
    "Diwa Game apk",
    "diwa bazaar games",
    "best Diwa Games",
    "Diwa Games 2026",
  ],
  alternates: { canonical: "/diwa-games" },
};

const faqData = [
  {
    question: "What are Diwa Games?",
    answer:
      "Diwa Games are a category of mobile gaming applications available for Android. They include popular games like rummy, teen patti, slots, poker, and spin-to-win games. Many of these games offer real cash prizes and bonuses.",
  },
  {
    question: "Which is the best Diwa Game?",
    answer:
      "The best Diwa Game depends on your preferences. For card game lovers, diwa Rummy is the most popular. For casual gaming, spin and slots games are great. Browse Diwa Games to explore all options.",
  },
  {
    question: "Are Diwa Games free to play?",
    answer:
      "Yes, most Diwa Games are free to download and play. Many offer free sign-up bonuses so you can start playing without investing any money. However, some games may offer in-app purchases.",
  },
  {
    question: "How many Diwa Games are available?",
    answer:
      "Diwa Games lists hundreds of Diwa Games across multiple categories. We add new games regularly, so check back often for the latest additions.",
  },
  {
    question: "Can I earn real money from Diwa Games?",
    answer:
      "Many Diwa Games offer real cash prizes that can be withdrawn to your bank account or UPI. However, please play responsibly and only wager money you can afford to lose.",
  },
];

export default async function diwaGamesPage() {
  let popularGames: import("@/lib/types").Game[] = [];
  let latestGames: import("@/lib/types").Game[] = [];
  let categories: import("@/lib/types").Category[] = [];

  try {
    const [popRes, latRes, catRes] = await Promise.all([
      getGames({ sort: "-downloads", limit: 10 }),
      getGames({ sort: "-createdAt", limit: 10 }),
      getCategories(),
    ]);
    popularGames = popRes.games || [];
    latestGames = latRes.games || [];
    categories = catRes.categories || [];
  } catch {}

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <ArticleSchema
        title="Diwa Games – Download Best Diwa Game APKs for Android (2026)"
        description="Explore and download the best Diwa Games for Android. Complete guide with game categories, top picks, and free APK downloads."
        url="/diwa-games"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-main py-8">
        <Breadcrumb items={[{ label: "Diwa Games" }]} />

        <article className="max-w-4xl">
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Diwa Games – Download Best Diwa Game APKs for Android (2026)
          </h1>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Discover the best <strong>Diwa Games</strong> available for Android in 2026. From exciting rummy tournaments to thrilling slot machines, Diwa Games brings you the most popular Diwa Game APKs with free downloads and exclusive bonuses.
          </p>

          {/* About Diwa Games */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              About Diwa Games
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Diwa Games</strong> have revolutionized mobile gaming in India. These games combine classic card and casino gameplay with modern app features like instant withdrawals, referral programs, and daily bonuses. The Diwa Game ecosystem includes everything from traditional Indian card games like rummy and teen patti to modern slot machines and spin wheels.
              </p>
              <p>
                What makes Diwa Games unique is their focus on accessibility and rewards. Most games offer generous sign-up bonuses (typically ₹50 to ₹500), easy-to-understand gameplay, and real cash withdrawal options. Whether you&apos;re a beginner or an experienced gamer, there&apos;s always a Diwa Game that matches your skill level and preferences.
              </p>
              <p>
                Diwa Games serves as your complete guide to the diwa gaming ecosystem. We list, verify, and provide download links for all popular Diwa Games. Browse our categories to find the perfect game, or check out our curated picks below.
              </p>
            </div>
          </section>

          {/* Game Categories */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Diwa Game Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: "🃏", name: "Rummy Games", desc: "Classic Indian rummy with real cash prizes", link: "/diwa-rummy" },
                { icon: "🎰", name: "Slots & Casino", desc: "Exciting slot machines and casino games" },
                { icon: "🂡", name: "Teen Patti", desc: "India's favorite 3-card poker game" },
                { icon: "🎡", name: "Spin & Win", desc: "Spin the wheel and win instant rewards" },
                { icon: "♠️", name: "Poker", desc: "Texas Hold'em and Omaha poker" },
                { icon: "🎲", name: "Board Games", desc: "Ludo, carrom, and classic board games" },
              ].map((cat, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 hover:border-green-cta/50 transition-colors">
                  {cat.link ? (
                    <Link href={cat.link} className="block">
                      <span className="text-3xl block mb-2">{cat.icon}</span>
                      <h3 className="font-bold text-foreground text-sm">{cat.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
                    </Link>
                  ) : (
                    <>
                      <span className="text-3xl block mb-2">{cat.icon}</span>
                      <h3 className="font-bold text-foreground text-sm">{cat.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Diwa Games */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Why Choose Diwa Games from Diwa Games?
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                With hundreds of gaming apps available online, choosing the right Diwa Game can be overwhelming. That&apos;s where Diwa Games comes in. We simplify your search by providing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">Verified Downloads:</strong> Every Diwa Game APK on our platform is verified for safety and authenticity.</li>
                <li><strong className="text-foreground">Detailed Reviews:</strong> Each game listing includes a comprehensive description, screenshots, ratings, and user reviews.</li>
                <li><strong className="text-foreground">Bonus Information:</strong> We clearly list all sign-up bonuses, referral bonuses, and promotional offers for each Diwa Game.</li>
                <li><strong className="text-foreground">Latest Versions:</strong> Our team updates listings daily to ensure you always download the most recent version with the newest features.</li>
                <li><strong className="text-foreground">Category Browsing:</strong> Find games by category, popularity, or newest additions with our easy-to-use browsing system.</li>
              </ul>
              <p>
                Ready to start? Browse our <Link href="/diwa-apk-download" className="text-green-cta hover:underline">Diwa Games Download</Link> page for the latest games, or check out the <Link href="/diwa-rummy" className="text-green-cta hover:underline">diwa Rummy games</Link> for premium gaming experiences.
              </p>
            </div>
          </section>
        </article>

        {/* Live API Categories */}
        {categories.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
              📂 Browse by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="game-card-hover flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-xl text-center hover:border-green-cta/50 transition-colors"
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="font-semibold text-sm">{cat.name}</span>
                  <Badge variant="secondary" className="text-xs">{cat.gameCount} apps</Badge>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Game Grids */}
        {popularGames.length > 0 && (
          <GameGrid games={popularGames} title="Most Popular Diwa Games" icon="🔥" />
        )}
        {latestGames.length > 0 && (
          <GameGrid games={latestGames} title="Newest Diwa Games" icon="🆕" />
        )}

        {/* FAQ */}
        <section className="max-w-4xl mt-10">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            ❓ Frequently Asked Questions About Diwa Games
          </h2>
          <div className="space-y-3">
            {faqData.map((item, i) => (
              <details key={i} className="bg-card border border-border rounded-xl group">
                <summary className="p-4 font-medium cursor-pointer hover:bg-muted/50 transition-colors text-sm list-none flex items-center justify-between">
                  <span>{item.question}</span>
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <InternalLinkSection currentPath="/diwa-games" />
      </div>
    </>
  );
}

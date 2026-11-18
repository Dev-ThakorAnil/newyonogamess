import { Metadata } from "next";
import Link from "next/link";
import { getGames } from "@/lib/api";
import GameGrid from "@/components/game/GameGrid";
import Breadcrumb from "@/components/seo/Breadcrumb";
import ArticleSchema from "@/components/seo/ArticleSchema";
import InternalLinkSection from "@/components/seo/InternalLinkSection";

export const metadata: Metadata = {
  title: "diwa Rummy APK Download (2026) – Play & Earn Real Cash",
  description:
    "Download diwa Rummy APK for Android. Play Indian rummy online, win real cash, and get up to ₹500 sign-up bonus. Safe and free diwa Rummy download at Diwa Games.",
  keywords: [
    "diwa rummy",
    "diwa rummy apk",
    "diwa rummy download",
    "diwa rummy app",
    "rummy apk download",
    "diwa rummy 2026",
    "best rummy app",
    "online rummy apk",
  ],
  alternates: { canonical: "/diwa-rummy" },
};

const faqData = [
  {
    question: "What is diwa Rummy?",
    answer:
      "diwa Rummy refers to rummy card game applications available as APK downloads. These apps allow you to play Indian rummy (13-card rummy) online against real players and win real cash prizes.",
  },
  {
    question: "How to play diwa Rummy?",
    answer:
      "In diwa Rummy, each player is dealt 13 cards. The objective is to arrange your cards into valid sets (3 or 4 cards of same rank, different suits) and sequences (3 or more consecutive cards of same suit). At least one pure sequence (without joker) is mandatory to declare.",
  },
  {
    question: "Can I win real money in diwa Rummy?",
    answer:
      "Yes, most diwa Rummy apps offer real cash games where you can win real money. Winnings can be withdrawn to your bank account or UPI. However, please play responsibly.",
  },
  {
    question: "Is diwa Rummy legal in India?",
    answer:
      "Rummy is considered a game of skill by the Supreme Court of India and is legal in most states. However, some states like Andhra Pradesh, Telangana, Assam, and Odisha have restrictions. Please check your local laws before playing.",
  },
  {
    question: "What is the minimum withdrawal in diwa Rummy apps?",
    answer:
      "Minimum withdrawal amounts vary by app, typically ranging from ₹100 to ₹200. Most apps support instant withdrawal to bank accounts and UPI IDs.",
  },
  {
    question: "Do I get a bonus for downloading diwa Rummy?",
    answer:
      "Yes! Most diwa Rummy apps offer welcome bonuses of ₹50 to ₹500 upon registration. Some also offer referral bonuses when you invite friends. Check individual game pages on Diwa Games for specific bonus amounts.",
  },
];

export default async function diwaRummyPage() {
  let rummyGames: import("@/lib/types").Game[] = [];
  let allGames: import("@/lib/types").Game[] = [];

  try {
    const [rummyRes, allRes] = await Promise.all([
      getGames({ category: "rummy", limit: 10 }),
      getGames({ sort: "-downloads", limit: 5 }),
    ]);
    rummyGames = rummyRes.games || [];
    allGames = allRes.games || [];
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
        title="diwa Rummy APK Download (2026) – Play & Earn Real Cash"
        description="Complete guide to diwa Rummy APK downloads. Play Indian rummy online and win real cash with free sign-up bonuses."
        url="/diwa-rummy"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-main py-8">
        <Breadcrumb items={[{ label: "Diwa Games", href: "/diwa-games" }, { label: "diwa Rummy" }]} />

        <article className="max-w-4xl">
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            diwa Rummy APK Download (2026) – Play & Earn Real Cash
          </h1>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Looking for the best <strong>diwa Rummy</strong> apps? Download top-rated rummy APKs for Android, play 13-card Indian rummy against real players, and win real cash prizes. Get started with free sign-up bonuses up to ₹500.
          </p>

          {/* What is diwa Rummy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              What is diwa Rummy?
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">diwa Rummy</strong> is a collection of online rummy card game applications that allow you to play traditional Indian rummy (also known as 13-card rummy or Paplu) on your Android smartphone. These apps connect you with millions of players across India for exciting real-time card game matches.
              </p>
              <p>
                Rummy is one of India&apos;s most beloved card games, and diwa Rummy apps bring this classic game to the digital world. Players can join practice tables to learn, participate in cash games to win real money, or enter tournaments for massive prize pools. The best part? Most diwa Rummy apps offer generous welcome bonuses just for signing up.
              </p>
              <p>
                At <strong className="text-foreground">Diwa Games</strong>, we list the best diwa Rummy apps with verified download links, detailed reviews, and accurate bonus information. Browse our curated collection below or visit our <Link href="/diwa-apk-download" className="text-green-cta hover:underline">Diwa Games Download</Link> page for all types of Diwa Games.
              </p>
            </div>
          </section>

          {/* How to Play */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              How to Play Rummy – Rules & Guide
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>Indian Rummy (13-card rummy) is a game of skill. Here&apos;s a quick guide:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {[
                  { title: "🎯 Objective", desc: "Arrange all 13 cards into valid sets and sequences, with at least one pure sequence." },
                  { title: "🃏 Pure Sequence", desc: "Three or more consecutive cards of the same suit (e.g., 3♥ 4♥ 5♥). No jokers allowed." },
                  { title: "🎴 Impure Sequence", desc: "A sequence that uses a joker as a substitute for a missing card." },
                  { title: "📦 Sets", desc: "Three or four cards of the same rank but different suits (e.g., 7♥ 7♠ 7♦)." },
                  { title: "🏆 Declaration", desc: "When your cards are properly arranged, tap 'Declare' to show your hand and win." },
                  { title: "💡 Pro Tip", desc: "Focus on forming your pure sequence first. This is mandatory and reduces your penalty if you lose." },
                ].map((rule, i) => (
                  <div key={i} className="bg-background/50 border border-border/50 rounded-xl p-4">
                    <h3 className="font-bold text-foreground text-sm mb-1">{rule.title}</h3>
                    <p className="text-xs text-muted-foreground">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Benefits of Playing diwa Rummy
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6">
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Real cash winnings – withdraw to bank account or UPI instantly",
                  "Free sign-up bonuses up to ₹500 on most diwa Rummy apps",
                  "Play anytime, anywhere on your Android smartphone",
                  "Multiple game formats: Points Rummy, Pool Rummy, Deals Rummy",
                  "Practice mode available for beginners to learn without risk",
                  "Daily tournaments with massive prize pools",
                  "Referral bonuses – earn extra cash by inviting friends",
                  "Secure and fair gameplay with certified random number generators",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-cta mt-0.5">✅</span>
                    <span className="text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Safety */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Is diwa Rummy Legal & Safe?
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Rummy has been declared a <strong className="text-foreground">game of skill</strong> by the Supreme Court of India, making it legal in most Indian states. However, some states have specific restrictions on real-money gaming:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Andhra Pradesh – Real money rummy is restricted</li>
                <li>Telangana – Real money rummy is restricted</li>
                <li>Assam – Restrictions on online gaming</li>
                <li>Odisha – Restrictions on online gaming</li>
              </ul>
              <p>
                Always check your local laws before playing real-money rummy games. Play responsibly and only with amounts you can afford to lose. For more details, visit our <Link href="/disclaimer" className="text-green-cta hover:underline">Disclaimer</Link> page.
              </p>
            </div>
          </section>
        </article>

        {/* Rummy Game Listings */}
        {rummyGames.length > 0 && (
          <GameGrid games={rummyGames} title="Best diwa Rummy APK Downloads" icon="🃏" />
        )}
        {allGames.length > 0 && (
          <GameGrid games={allGames} title="Other Popular Diwa Games" icon="🔥" />
        )}

        {/* FAQ */}
        <section className="max-w-4xl mt-10">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            ❓ Frequently Asked Questions About diwa Rummy
          </h2>
          <div className="space-y-3">
            {faqData.map((item, i) => (
              <details key={i} className="bg-card border border-border rounded-xl group">
                <summary className="p-4 font-medium cursor-pointer hover:bg-muted/50 transition-colors text-sm list-none flex items-center justify-between">
                  <span>{item.question}</span>
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{item.answer}</div>
              </details>
            ))}
          </div>
        </section>

        <InternalLinkSection currentPath="/diwa-rummy" />
      </div>
    </>
  );
}

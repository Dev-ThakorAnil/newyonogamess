import { Metadata } from "next";
import Link from "next/link";
import { getGames } from "@/lib/api";
import GameGrid from "@/components/game/GameGrid";
import Breadcrumb from "@/components/seo/Breadcrumb";
import ArticleSchema from "@/components/seo/ArticleSchema";
import InternalLinkSection from "@/components/seo/InternalLinkSection";

export const metadata: Metadata = {
  title: "Diwa Games Download Latest Version (2026) – Free & Safe",
  description:
    "Download the latest diwa APK for Android. Get safe, fast, and free Diwa Games Downloads with exclusive bonuses. Updated Diwa Games, rummy apps, and more at Diwa Games.",
  keywords: [
    "Diwa Games Download",
    "diwa apk",
    "diwa apk latest version",
    "diwa app download",
    "download diwa apk",
    "diwa apk 2026",
    "Diwa Game apk download",
  ],
  alternates: { canonical: "/diwa-apk-download" },
};

const faqData = [
  {
    question: "What is diwa APK?",
    answer:
      "diwa APK is an Android application package that lets you download and play various Diwa Games including rummy, teen patti, slots, and more. These APKs are available for free download from trusted sources like Diwa Games.",
  },
  {
    question: "Is diwa APK safe to download?",
    answer:
      "At Diwa Games, we provide verified and scanned APK download links. However, we recommend downloading APKs only from trusted sources and enabling security settings on your Android device.",
  },
  {
    question: "How to install diwa APK on Android?",
    answer:
      "To install diwa APK: 1) Download the APK file from the download link, 2) Open your device Settings > Security > Enable 'Unknown Sources', 3) Open the downloaded APK file and tap 'Install', 4) Once installed, open the app and start playing.",
  },
  {
    question: "What is the latest version of diwa APK?",
    answer:
      "diwa APK is regularly updated with new features, games, and bug fixes. Visit this page for the most recent version. We update our listings daily to ensure you always get the latest version.",
  },
  {
    question: "Can I get bonuses with Diwa Games Download?",
    answer:
      "Yes! Many diwa APKs come with exclusive sign-up bonuses, referral bonuses, and daily rewards. Check individual game pages on Diwa Games for specific bonus amounts.",
  },
  {
    question: "Is diwa APK available for iOS?",
    answer:
      "Currently, most diwa APKs are designed for Android devices. Some may have iOS versions available. Check the specific game page for platform availability.",
  },
];

export default async function diwaApkDownloadPage() {
  let games: import("@/lib/types").Game[] = [];
  try {
    const res = await getGames({ sort: "-downloads", limit: 10 });
    games = res.games || [];
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
        title="Diwa Games Download Latest Version (2026) – Free & Safe"
        description="Complete guide to downloading diwa APK for Android. Safe, fast, free downloads with exclusive bonuses."
        url="/diwa-apk-download"
        image={`${process.env.NEXT_PUBLIC_SITE_URL || "https://newyonogamess.tech"}/logo1.png`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-main py-8">
        <Breadcrumb items={[{ label: "Diwa Games Download" }]} />

        <article className="max-w-4xl">
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Diwa Games Download Latest Version (2026) – Free & Safe
          </h1>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Looking for the latest <strong>Diwa Games Download</strong>? You&apos;re in the right place. Diwa Games provides safe, verified, and 100% free APK downloads for the best Diwa Games and apps available on Android.
          </p>

          {/* What is diwa APK */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              What is diwa APK?
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">diwa APK</strong> refers to a collection of Android application packages (APKs) that offer exciting gaming experiences including rummy, teen patti, slots, spin-to-win, and many more casino-style games. These apps are widely popular in India and offer real cash winnings, sign-up bonuses, and referral rewards.
              </p>
              <p>
                The term &quot;diwa&quot; has become synonymous with a new generation of mobile gaming apps that combine entertainment with earning potential. Whether you&apos;re a casual gamer looking for fun or someone who enjoys competitive card games like rummy, there&apos;s a diwa APK for everyone.
              </p>
              <p>
                At <strong className="text-foreground">Diwa Games</strong>, we curate the best gaming APKs, verify their safety, and provide direct download links so you can start playing within minutes. Our platform lists hundreds of games across multiple categories including <Link href="/diwa-rummy" className="text-green-cta hover:underline">rummy</Link>, card games, slots, and <Link href="/diwa-games" className="text-green-cta hover:underline">many more</Link>.
              </p>
            </div>
          </section>

          {/* Key Features */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Key Features of diwa APK Games
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: "🎁", title: "Sign-Up Bonuses", desc: "Get free bonus cash when you register. Many diwa apps offer ₹50 to ₹500 welcome bonuses." },
                { icon: "💰", title: "Real Cash Winnings", desc: "Play games and win real money. Withdraw your winnings directly to your bank account or UPI." },
                { icon: "🛡️", title: "Safe & Verified", desc: "All APKs on Diwa Games are scanned and verified. Download with confidence from trusted sources." },
                { icon: "🔄", title: "Regular Updates", desc: "We update our game listings daily. Always get access to the latest versions with newest features." },
                { icon: "📱", title: "Android Compatible", desc: "Works on all Android devices running Android 5.0 and above. Optimized for smooth performance." },
                { icon: "🤝", title: "Referral Rewards", desc: "Earn extra cash by referring friends. Most diwa apps offer generous referral bonus programs." },
              ].map((f, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 hover:border-green-cta/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{f.icon}</span>
                    <h3 className="font-bold text-foreground">{f.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How to Download */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              How to Download diwa APK (Step-by-Step)
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6">
              <ol className="space-y-4">
                {[
                  "Visit Diwa Games and browse our collection of diwa APK games or use the search bar to find a specific game.",
                  "Click on the game you want to download to open its detail page with full description, screenshots, and bonus information.",
                  "Tap the green \"Download APK\" button to start downloading the latest version of the diwa APK file.",
                  "Before installing, go to your Android Settings → Security → Enable \"Install from Unknown Sources\" to allow APK installation.",
                  "Open the downloaded APK file from your notifications or file manager and tap \"Install\" to begin the installation process.",
                  "Once installed, open the app, register with your mobile number, claim your sign-up bonus, and start playing!",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="bg-green-cta text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Safety Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Is Diwa Games Download Safe?
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Safety is a top priority at Diwa Games. We understand that downloading APKs from the internet can be risky, which is why we take extra precautions to ensure every APK listed on our platform is safe and verified.
              </p>
              <p>
                However, it&apos;s important to remember that all third-party APK downloads carry some level of risk. We strongly recommend:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Only downloading APKs from trusted platforms like Diwa Games</li>
                <li>Keeping your Android device&apos;s security settings up to date</li>
                <li>Reading user reviews and checking ratings before downloading</li>
                <li>Never sharing your banking or personal login credentials within any app</li>
                <li>Playing responsibly and only with money you can afford to lose</li>
              </ul>
              <p>
                For more information about our safety practices, please visit our <Link href="/disclaimer" className="text-green-cta hover:underline">Disclaimer</Link> and <Link href="/privacy-policy" className="text-green-cta hover:underline">Privacy Policy</Link> pages.
              </p>
            </div>
          </section>
        </article>

        {/* Game Listings */}
        {games.length > 0 && (
          <GameGrid games={games} title="Popular Diwa Games Downloads" icon="🔥" />
        )}

        {/* FAQ */}
        <section className="max-w-4xl mt-10">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            ❓ Frequently Asked Questions About Diwa Games Download
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

        {/* Internal Links */}
        <InternalLinkSection currentPath="/diwa-apk-download" />
      </div>
    </>
  );
}

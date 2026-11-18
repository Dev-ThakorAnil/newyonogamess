"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Are these apps free to download on NewYonoGamess?",
    a: "Yes, 100% free! Every Yono, Rummy, and Diwa APK listed on NewYonoGamess is completely free to download for Android devices. There are no download charges, registration fees, or hidden costs."
  },
  {
    q: "How do I withdraw my winnings to UPI or Bank Account?",
    a: "Withdrawing is simple: open the game wallet, select 'Withdraw', enter your UPI ID (PhonePe, Paytm, Google Pay) or Bank Account details with IFSC code, enter your withdrawal amount (minimum ₹100), and tap submit. Winnings are typically credited within 5 to 15 minutes."
  },
  {
    q: "Can I play these Yono games on iPhone (iOS)?",
    a: "Most Yono and Rummy applications are distributed as native Android APK packages. However, select platforms offer official iOS web apps or TestFlight versions. Android 5.0+ smartphones remain the recommended platform for optimal gameplay."
  },
  {
    q: "Is it safe to install an APK file from NewYonoGamess?",
    a: "Yes. Every APK on NewYonoGamess is checked, scanned against malware, and verified from official developers. Since real-money gaming apps are not distributed via Google Play Store in India, installing via official APK from a trusted directory like NewYonoGamess is standard."
  },
  {
    q: "What is the signup bonus and how do I get it?",
    a: "A signup bonus is complimentary game cash credited immediately after you install the APK and register your mobile number with OTP. Welcome bonuses range from ₹51 to ₹500+, allowing you to start playing real cash games without depositing your own money."
  },
  {
    q: "My phone says 'Install blocked' or 'Unknown sources'. What do I do?",
    a: "This is a standard Android security prompt for any APK downloaded outside Google Play. Simply go to your phone's Settings > Security (or Apps > Special Access) and enable 'Allow installs from Unknown Sources' or tap 'Settings' on the prompt and toggle 'Allow from this source', then proceed with the installation."
  },
  {
    q: "Do I need to add money to play games?",
    a: "No deposit is required to start! You can use your instant signup bonus, daily login rewards, and referral earnings to play real games. If you wish to enter high-stake cash tables later, you can add funds securely via UPI, Paytm, PhonePe, or Net Banking."
  },
  {
    q: "How do I update the app to the latest 2026 version?",
    a: "You can bookmark NewYonoGamess and check back for new releases. Whenever an update is launched, we provide the fresh APK with updated bonuses, performance improvements, and bug fixes."
  },
  {
    q: "Is it legal to play these games in my state?",
    a: "Rummy and fantasy contests have been recognized by the Hon'ble Supreme Court of India as games of skill. However, specific states—including Andhra Pradesh, Telangana, Assam, Nagaland, Odisha, and Sikkim—restrict online cash gaming. Players from these states must not participate in real-money contests."
  }
];

export default function HomeSeoContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <section className="mt-10 mb-12 text-slate-900 space-y-10" aria-label="About NewYonoGamess Directory">
      {/* FAQ Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── 1. Welcome Introduction (Content matching user ref) ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome to NewYonoGamess
        </h2>
        <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-3">
          <p>
            <strong>NewYonoGamess</strong> is a simple, trusted directory of All Yono and Rummy gaming apps for Indian players. Every app on this page is free to download for Android devices. Most apps give you an instant signup bonus when you register, and you can withdraw your winnings directly to UPI or your bank account.
          </p>
          <p>
            Whether you are looking for classic 13-card Points Rummy, high-speed Yono slots, or multiplayer casual games, NewYonoGamess provides safe, direct APK downloads with daily verified links.
          </p>
        </div>
      </div>

      {/* ── 2. How to Download All Yono Rummy Games (3-Step Guide) ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            How to Download All Yono Rummy Games?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Follow these 3 simple steps to start playing and claiming bonuses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5 relative">
            <div className="w-8 h-8 rounded-full bg-green-700 text-white font-extrabold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
              Pick an app from the list
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Browse our directory above. Every app shows its verified bonus and file size, so you know exactly what you are getting.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5 relative">
            <div className="w-8 h-8 rounded-full bg-green-700 text-white font-extrabold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
              Download the official APK
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Open its page and tap the Download button. The APK file downloads straight to your phone. No redirects, no waiting on other websites.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5 relative">
            <div className="w-8 h-8 rounded-full bg-green-700 text-white font-extrabold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
              Install and register
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Open the APK file, install it, and register with your mobile number to claim your signup bonus. You do not need an account on this website for any of this.
            </p>
          </div>
        </div>
      </div>

      {/* ── 3. Browse All Yono Apps by Category ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs space-y-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Browse All Yono Apps by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Link
            href="/category/rummy"
            className="p-4 rounded-xl border border-slate-200 hover:border-green-600 hover:bg-green-50/40 transition-colors block group"
          >
            <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-green-700 text-sm sm:text-base">
              <span>🃏</span> Rummy Apps
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Classic card games like Points Rummy, Pool Rummy, and Deals Rummy. Best if you enjoy skill-based games.
            </p>
          </Link>

          <Link
            href="/category/slots"
            className="p-4 rounded-xl border border-slate-200 hover:border-green-600 hover:bg-green-50/40 transition-colors block group"
          >
            <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-green-700 text-sm sm:text-base">
              <span>🎰</span> Yono Slots Games
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Spin-based games with jackpots and daily rewards. Best for quick, casual play and instant spins.
            </p>
          </Link>

          <Link
            href="/?tab=all"
            className="p-4 rounded-xl border border-slate-200 hover:border-green-600 hover:bg-green-50/40 transition-colors block group"
          >
            <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-green-700 text-sm sm:text-base">
              <span>🎮</span> All Yono Games
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Browse the complete Yono games directory and find verified games for Android in one place.
            </p>
          </Link>

          <Link
            href="/?tab=yono"
            className="p-4 rounded-xl border border-slate-200 hover:border-green-600 hover:bg-green-50/40 transition-colors block group"
          >
            <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-green-700 text-sm sm:text-base">
              <span>📱</span> All Yono Apps
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Browse the Yono apps directory and download every updated app for Android in one safe place.
            </p>
          </Link>

          <Link
            href="/?tab=diwa"
            className="p-4 rounded-xl border border-slate-200 hover:border-green-600 hover:bg-green-50/40 transition-colors block group sm:col-span-2"
          >
            <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-green-700 text-sm sm:text-base">
              <span>🎯</span> Arcade and Casual Games
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Ludo, crash games, Aviator, fishing games, and more. Best if you want multiple variety games inside one single app.
            </p>
          </Link>
        </div>
      </div>

      {/* ── 4. Start Smart: Tips for New Players (5 Tips) ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs space-y-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Start Smart: Tips for New Players
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Getting started is easy, but these five tips will help you enjoy your first games even more.
          </p>
        </div>

        <ol className="space-y-3.5 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <span className="font-extrabold text-green-700 shrink-0 text-base">1.</span>
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Start with simple games:</strong>
              If you are new, pick games with easy rules first, like classic rummy. Once you feel confident, try slots and arcade games.
            </div>
          </li>
          <li className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <span className="font-extrabold text-green-700 shrink-0 text-base">2.</span>
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Claim your signup bonus:</strong>
              Almost every app gives a free bonus when you register. Use it to try games before adding your own money.
            </div>
          </li>
          <li className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <span className="font-extrabold text-green-700 shrink-0 text-base">3.</span>
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Check the withdrawal rules:</strong>
              Every app has a minimum withdrawal amount, usually Rs.100. Read the rules once so you know how and when you can cash out.
            </div>
          </li>
          <li className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <span className="font-extrabold text-green-700 shrink-0 text-base">4.</span>
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Play in short sessions:</strong>
              Gaming is more fun when you take breaks. Short sessions keep you fresh and help you make better decisions.
            </div>
          </li>
          <li className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <span className="font-extrabold text-green-700 shrink-0 text-base">5.</span>
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Play responsibly:</strong>
              Set a daily limit for yourself and never chase losses. These games are for entertainment first.
            </div>
          </li>
        </ol>
      </div>

      {/* ── 5. Why Download Yono Games From NewYonoGamess? ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Why Download Yono Games From NewYonoGamess?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
            <div className="text-2xl mb-1.5">🗂️</div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">One place for all apps</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instead of searching ten websites, you find every Yono and Rummy app here with its bonus and size listed accurately.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
            <div className="text-2xl mb-1.5">⚡</div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">Direct APK downloads</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The file comes straight from fast CDN servers. No middlemen, no spammy popups, and no broken links.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
            <div className="text-2xl mb-1.5">🔍</div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">Real app details</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Version, file size, and update date are verified directly from the actual APK file, not copied from unverified sources.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
            <div className="text-2xl mb-1.5">🇮🇳</div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">Made for India</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every listed app supports fast UPI payments, along with Paytm, PhonePe, and Google Pay for instant deposit and withdrawal.
            </p>
          </div>
        </div>
      </div>

      {/* ── 6. Common Questions (FAQ Accordion) ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Common Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Frequently asked questions about downloading, playing, and withdrawing on NewYonoGamess.
          </p>
        </div>

        <div className="divide-y divide-slate-200 pt-2">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-3 sm:py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex items-center justify-between w-full text-left font-bold text-slate-900 text-xs sm:text-sm hover:text-green-700 gap-3 cursor-pointer"
                >
                  <span>{item.q}</span>
                  <span className={`text-slate-400 font-bold text-base transform transition-transform duration-200 ${isOpen ? "rotate-180 text-green-700" : ""}`}>
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6 animate-fadeIn">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 7. Hindi Regional Content Section ── */}
      <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇮🇳</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            भारत के सबसे भरोसेमंद ऑल योनों और रम्मी बोनस ऐप्स
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong>NewYonoGamess</strong> पर आपको भारत के सर्वश्रेष्ठ और वेरिफाइड योनों गेम्स मिलते हैं। यहाँ लिस्टेड हर एक गेम में 100% असली खिलाड़ी हिस्सा लेते हैं। सभी गेम्स में RNG सर्टिफाइड कार्ड डीलिंग और तुरंत UPI या बैंक खाते में विड्रॉल की सुविधा मिलती है।
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          नया अकाउंट बनाने पर तुरंत ₹51 से लेकर ₹500 तक का साइनअप बोनस प्राप्त करें। रोज़ाना डेली लॉगिन रिवॉर्ड और सुरक्षित गेमिंग का आनंद लें। किसी भी सहायता के लिए हर गेम में 24/7 लाइव कस्टमर केयर उपलब्ध रहता है।
        </p>
      </div>

      {/* ── 8. Notice & Statutory Disclaimer ── */}
      <div className="bg-slate-100 border border-slate-300 rounded-2xl p-5 sm:p-6 text-xs text-slate-600 space-y-2.5 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
          <span>⚠️</span> Notice &amp; Statutory Disclaimer
        </div>
        <p>
          <strong>NewYonoGamess</strong> (newyonogamess.tech) is an independent informational and auditing directory for real-money gaming apps. We do not host, develop, or operate games directly. Playing skill-based card and casual games involves financial risk and can be addictive. Please play responsibly and within your means.
        </p>
        <p>
          Our platform is strictly intended for users aged <strong>18 years and above</strong>. Real-money gaming is restricted or prohibited in certain states, including <strong>Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana</strong>. We are not liable for any financial transactions or disputes on third-party platforms.
        </p>
      </div>
    </section>
  );
}

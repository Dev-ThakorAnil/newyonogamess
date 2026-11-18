import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NewYonoGamess - Latest Yono & Diwa Games APK Download",
  description: "Learn about NewYonoGamess, your trusted platform for downloading the latest Yono APK games and Diwa apps securely.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-main py-12">
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          About NewYonoGamess
        </h1>
        
        <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
          <p>
            Welcome to <strong>NewYonoGamess</strong>, your ultimate destination for discovering and downloading the latest and most popular APK games, Yono apps, and Diwa games. We are dedicated to providing a safe, fast, and user-friendly platform for gamers and app enthusiasts.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }} className="text-xl font-bold mt-8 mb-4">Our Mission</h2>
          <p>
            At <strong>NewYonoGamess</strong>, our mission is to simplify the way you find and install high-quality applications. We understand the thrill of finding that perfect game or utility app, which is why we meticulously curate our collection to ensure you have access to the best titles, complete with exclusive bonuses and features.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)" }} className="text-xl font-bold mt-8 mb-4">Why Choose NewYonoGamess?</h2>
          <ul>
            <li><strong>Verified & Secure:</strong> Safety is our top priority. Every APK available on NewYonoGamess undergoes strict security checks to ensure it is 100% free from malware and viruses.</li>
            <li><strong>Fast Downloads:</strong> Experience blazing-fast download speeds so you can start playing your favorite games without delay.</li>
            <li><strong>Latest Versions:</strong> We continuously update our library to bring you the newest versions and latest features of all your favorite apps.</li>
            <li><strong>Exclusive Bonuses:</strong> Many of our featured games come with exclusive in-game bonuses and rewards that you won't find anywhere else.</li>
          </ul>

          <h2 style={{ fontFamily: "var(--font-heading)" }} className="text-xl font-bold mt-8 mb-4">Join Our Community</h2>
          <p>
            NewYonoGamess is more than just a download platform; it's a growing community of passionate gamers. We encourage you to connect with us on our social media and Telegram channels to stay updated on the latest releases, tips, and exclusive offers.
          </p>

          <p className="mt-8">
            Thank you for choosing <strong>NewYonoGamess</strong>. We are thrilled to have you here and look forward to enhancing your mobile gaming experience!
          </p>
        </div>
      </div>
    </div>
  );
}

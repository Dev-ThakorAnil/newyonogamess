import Link from "next/link";

const SEO_PAGES = [
  { href: "/diwa-apk-download", label: "Diwa Games Download", icon: "📥" },
  { href: "/diwa-games", label: "Diwa Games", icon: "🎮" },
  { href: "/diwa-rummy", label: "diwa Rummy", icon: "🃏" },
];

export default function InternalLinkSection({ currentPath }: { currentPath?: string }) {
  const links = SEO_PAGES.filter((p) => p.href !== currentPath);

  return (
    <section className="mt-10 mb-6">
      <h2
        className="text-xl font-bold mb-4 flex items-center gap-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        🔗 Explore More
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 p-3 bg-card border border-border rounded-xl hover:border-green-cta/50 hover:bg-green-cta/5 transition-all text-sm font-medium group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
            <span className="text-foreground group-hover:text-green-cta transition-colors">{link.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export { SEO_PAGES };

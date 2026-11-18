"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { AuthContext } from "./auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    setToken(stored);
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    router.push("/admin");
  };

  const handleSetToken = (t: string | null) => {
    if (t) localStorage.setItem("admin_token", t);
    else localStorage.removeItem("admin_token");
    setToken(t);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-2 border-green-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/games", label: "Games", icon: "🎮" },
    { href: "/admin/top-platforms", label: "Top 3 Platforms", icon: "⭐" },
    { href: "/admin/games/new", label: "Add Game", icon: "➕" },
  ];

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken, logout }}>
      {token ? (
        <div className="min-h-[60vh]">
          {/* Admin Nav Bar */}
          <div className="bg-white border-b border-slate-200 overflow-x-auto scrollbar-hide shadow-xs">
            <div className="container-main flex items-center min-w-max h-14 gap-2 md:gap-4">
              <div className="flex items-center gap-1 md:gap-2 shrink-0">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-4 ml-auto shrink-0 pl-4 border-l border-slate-200">
                <Link href="/" className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">
                  <span>↗</span>
                  <span className="whitespace-nowrap">View Site</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3.5 py-1.5 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="container-main py-6">{children}</div>
        </div>
      ) : (
        <div className="container-main py-6">{children}</div>
      )}
    </AuthContext.Provider>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 mt-12">
      <div className="container-main py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold text-lg sm:text-xl text-slate-900 mb-3"
            >
              <Image
                src="/logo1.png"
                alt="NewYonoGamess Logo"
                width={36}
                height={36}
                className="h-8 w-8 object-contain rounded-lg"
              />
              <span>NewYono<span className="text-green-700">Gamess</span></span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed mt-3">
              India&apos;s leading directory to discover and download the latest All Yono games, Diwa apps, and Rummy APKs. Safe, fast, and verified downloads with signup bonuses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-green-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/?tab=all" className="hover:text-green-700 transition-colors">
                  All Yono Games
                </Link>
              </li>
              <li>
                <Link href="/?tab=yono" className="hover:text-green-700 transition-colors">
                  All Yono Apps
                </Link>
              </li>
              <li>
                <Link href="/?tab=diwa" className="hover:text-green-700 transition-colors">
                  Diwa Games
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-green-700 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/category/rummy" className="hover:text-green-700 transition-colors">
                  Yono Rummy Apps
                </Link>
              </li>
              <li>
                <Link href="/category/slots" className="hover:text-green-700 transition-colors">
                  Yono Slots Games
                </Link>
              </li>
              <li>
                <Link href="/?tab=diwa" className="hover:text-green-700 transition-colors">
                  Diwa Apps &amp; Games
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-green-700 transition-colors">
                  Search All Apps
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Legal &amp; Info
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-green-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-green-700 transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:text-green-700 transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-700 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-200" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NewYonoGamess. All Rights Reserved. 18+ Only.</p>
          <p className="text-[11px] text-slate-400">Play responsibly. Not affiliated with official banks or gambling operators.</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Game } from "@/lib/types";

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <span className="stars-display text-xs" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      {half ? "★" : ""}
      {"☆".repeat(empty)}
    </span>
  );
}

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link href={`/game/${game.slug}`} id={`game-card-${game.slug}`} className="block h-full group">
      <div className="bg-white rounded-xl border border-slate-200 hover:border-green-600 p-3 flex flex-col items-center text-center gap-1.5 h-full cursor-pointer relative overflow-hidden shadow-xs hover:shadow-md transition-all">
        
        {/* NEW ribbon */}
        {game.isNewGame && (
          <div className="absolute top-1 left-1 z-10">
            <span className="bg-green-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
              NEW
            </span>
          </div>
        )}

        {/* Coming Soon badge */}
        {game.isComingSoon && (
          <div className="absolute top-1 right-1 z-10">
            <span className="bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
              SOON
            </span>
          </div>
        )}

        {/* Game Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 relative border border-slate-100 bg-slate-50">
          {game.logo ? (
            <Image src={game.logo} alt={game.title} fill className="object-cover rounded-xl group-hover:scale-105 transition-transform" sizes="(max-width: 640px) 64px, 80px" />
          ) : (
            <span className="text-4xl">🎮</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-xs sm:text-sm leading-tight line-clamp-2 text-slate-900 group-hover:text-green-700 transition-colors">
          {game.title}
        </h3>

        {/* Star Rating */}
        <StarRating rating={game.rating || 5} />

        {/* Bonus */}
        {game.bonus && (
          <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
            {game.bonus.startsWith("₹") ? game.bonus : `₹${game.bonus}`}
          </span>
        )}
      </div>
    </Link>
  );
}

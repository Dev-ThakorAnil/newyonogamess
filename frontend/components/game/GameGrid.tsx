import GameCard from "./GameCard";
import type { Game } from "@/lib/types";

export default function GameGrid({
  games,
  title,
  icon,
}: {
  games: Game[];
  title?: string;
  icon?: string;
}) {
  if (!games || games.length === 0) return null;

  return (
    <section className="mb-6">
      {title && (
        <h2 className="text-base font-bold mb-3 text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          {icon && <span className="mr-1">{icon}</span>}
          {title}
        </h2>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
        {games.map((game) => (
          <GameCard key={game._id || game.slug} game={game} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../auth";
import {
  getAdminGames,
  deleteGame,
  restoreGame,
  permanentDeleteGame,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import type { Game } from "@/lib/types";
import {
  RotateCcw,
  Trash2,
  Eye,
  Pencil,
  Search,
  X,
  AlertTriangle,
  CheckCircle2,
  Plus,
} from "lucide-react";

type StatusTab = "all" | "active" | "inactive";
type GameTypeTab = "all" | "diwa" | "yono";

export default function AdminGamesPage() {
  const { token } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGames, setTotalGames] = useState(0);

  const [statusFilter, setStatusFilter] = useState<StatusTab>("all");
  const [gameTypeFilter, setGameTypeFilter] = useState<GameTypeTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [counts, setCounts] = useState({ all: 0, active: 0, inactive: 0 });

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    action: "deactivate" | "restore" | "permanent";
    id: string;
    title: string;
  } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showFeedback = (type: "success" | "error", text: string) => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedback({ type, text });
    feedbackTimerRef.current = setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  const fetchGames = useCallback(
    async (
      currentPage = 1,
      status = statusFilter,
      search = searchQuery,
      gameType = gameTypeFilter
    ) => {
      if (!token) return;
      setLoading(true);
      setError("");
      try {
        const typeParam = gameType === "all" ? undefined : gameType;
        const data = await getAdminGames(
          token,
          currentPage,
          50,
          status,
          search,
          typeParam
        );
        setGames(data.games || []);
        setPage(data.pagination?.page || 1);
        setTotalPages(data.pagination?.pages || 1);
        setTotalGames(data.pagination?.total || 0);
        if (data.counts) {
          setCounts(data.counts);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load games");
      }
      setLoading(false);
    },
    [token, statusFilter, searchQuery, gameTypeFilter]
  );

  useEffect(() => {
    fetchGames(page, statusFilter, searchQuery, gameTypeFilter);
  }, [page, statusFilter, gameTypeFilter]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      fetchGames(1, statusFilter, searchQuery, gameTypeFilter);
    }, 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleTabChange = (tab: StatusTab) => {
    if (tab === statusFilter) return;
    setStatusFilter(tab);
    setPage(1);
  };

  const handleTypeChange = (type: GameTypeTab) => {
    if (type === gameTypeFilter) return;
    setGameTypeFilter(type);
    setPage(1);
  };

  const handleConfirmAction = async () => {
    if (!confirmModal || !token) return;
    const { action, id, title } = confirmModal;
    setActionLoading(true);

    try {
      if (action === "deactivate") {
        await deleteGame(token, id);
        showFeedback(
          "success",
          `"${title}" deactivated and hidden from the website.`
        );
      } else if (action === "restore") {
        await restoreGame(token, id);
        showFeedback(
          "success",
          `"${title}" restored successfully and is now live on the site!`
        );
      } else if (action === "permanent") {
        await permanentDeleteGame(token, id);
        showFeedback(
          "success",
          `"${title}" has been permanently deleted from the database.`
        );
      }
      setConfirmModal(null);
      fetchGames(page, statusFilter, searchQuery, gameTypeFilter);
    } catch (err: any) {
      showFeedback("error", err.message || "Action failed. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
            🎮 Games Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage active games, restore inactive games, or permanently delete items.
          </p>
        </div>
        <Link href="/admin/games/new">
          <Button className="bg-green-cta hover:bg-green-cta-hover text-white shadow-xs gap-1.5">
            <Plus className="w-4 h-4" /> Add Game
          </Button>
        </Link>
      </div>

      {/* Action Notification Banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl text-xs font-medium border flex items-center justify-between gap-3 animate-in fade-in-0 duration-200 ${
            feedback.type === "success"
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
              : "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="opacity-70 hover:opacity-100 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between flex-wrap">
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="inline-flex bg-muted/60 p-1 rounded-xl border border-border">
            <button
              type="button"
              onClick={() => handleTabChange("all")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                statusFilter === "all"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All{" "}
              <span className="ml-1 opacity-75 font-normal">
                ({counts.all || totalGames})
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("active")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === "active"
                  ? "bg-card text-emerald-600 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Active (Live){" "}
              <span className="ml-0.5 opacity-75 font-normal">
                ({counts.active})
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("inactive")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === "inactive"
                  ? "bg-card text-red-600 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              Inactive / Trash{" "}
              <span className="ml-0.5 opacity-75 font-normal">
                ({counts.inactive})
              </span>
            </button>
          </div>

          {/* Game Type Filter Tabs */}
          <div className="inline-flex bg-muted/60 p-1 rounded-xl border border-border">
            <button
              type="button"
              onClick={() => handleTypeChange("all")}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                gameTypeFilter === "all"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Types
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("diwa")}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                gameTypeFilter === "diwa"
                  ? "bg-card text-orange-600 dark:text-orange-400 shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Diwa
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("yono")}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                gameTypeFilter === "yono"
                  ? "bg-card text-purple-600 dark:text-purple-400 shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yono
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, slug, category..."
            className="pl-9 pr-8 h-9 text-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-2">
          <div className="animate-spin h-8 w-8 border-2 border-green-cta border-t-transparent rounded-full" />
          <p className="text-xs text-muted-foreground">Loading games...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-4xl">⚠️</p>
          <p className="text-red-500 text-sm">{error}</p>
          <Button
            onClick={() => fetchGames(page, statusFilter, searchQuery, gameTypeFilter)}
            variant="outline"
            size="sm"
          >
            Retry
          </Button>
        </div>
      ) : games.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/40">
          <p className="text-4xl mb-3">
            {statusFilter === "inactive" ? "🗑️" : "🎮"}
          </p>
          <h3 className="font-semibold text-sm text-foreground">
            {statusFilter === "inactive"
              ? "No inactive games found"
              : searchQuery
              ? "No games match your search"
              : "No games found"}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            {statusFilter === "inactive"
              ? "Deactivated games will appear here where you can restore or permanently delete them."
              : searchQuery
              ? "Try clearing the search query or changing filters."
              : "Get started by adding your first game."}
          </p>
          {statusFilter !== "inactive" && !searchQuery && (
            <Link href="/admin/games/new">
              <Button className="bg-green-cta hover:bg-green-cta-hover text-white text-xs">
                Add Your First Game
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {games.map((game) => (
            <div
              key={game._id}
              className={`bg-card border rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-colors ${
                game.isActive
                  ? "border-border hover:border-border/80"
                  : "border-red-500/20 bg-red-500/[0.02]"
              }`}
            >
              {/* Logo */}
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden border border-border/40">
                {game.logo ? (
                  <img
                    src={game.logo}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">🎮</span>
                )}
              </div>

              {/* Game Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm text-foreground truncate">
                    {game.title}
                  </h3>
                  <Badge variant="secondary" className="text-[10px] capitalize">
                    {game.category}
                  </Badge>

                  {/* Game Type Badge */}
                  {game.gameType === "yono" ? (
                    <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-600 dark:text-purple-400">
                      Yono
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-600 dark:text-orange-400">
                      Diwa
                    </Badge>
                  )}

                  {/* Active / Inactive Badge */}
                  {game.isActive ? (
                    <Badge className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-medium">
                      ✓ Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="text-[10px] font-medium"
                    >
                      ✕ Inactive
                    </Badge>
                  )}

                  {/* Flags */}
                  {game.featured && (
                    <Badge className="text-[10px] bg-gold/20 text-gold-dark border-gold/30">
                      ⭐ Featured
                    </Badge>
                  )}
                  {game.trending && (
                    <Badge className="text-[10px] bg-amber-500/15 text-amber-600 border-amber-500/30">
                      🔥 Trending
                    </Badge>
                  )}
                  {game.isNewGame && (
                    <Badge className="text-[10px] bg-emerald-500/15 text-emerald-600 border-emerald-500/30">
                      ✨ New
                    </Badge>
                  )}
                  {game.isComingSoon && (
                    <Badge className="text-[10px] bg-blue-500/15 text-blue-600 border-blue-500/30">
                      ⏳ Coming Soon
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1 flex-wrap">
                  <span>Slug: <strong className="text-foreground">{game.slug}</strong></span>
                  <span>Position: <strong className="text-foreground">{game.position ?? 1000}</strong></span>
                  <span>Downloads: <strong className="text-foreground">{game.downloads?.toLocaleString() || 0}</strong></span>
                  {game.bonus && <span>Bonus: <strong className="text-green-600">{game.bonus}</strong></span>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {game.isActive ? (
                  <>
                    <Link href={`/game/${game.slug}`} target="_blank">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 px-2.5 gap-1 text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/admin/games/${game._id}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 px-2.5 gap-1"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 px-2.5 text-amber-600 hover:text-amber-700 hover:bg-amber-500/10 gap-1 cursor-pointer"
                      onClick={() =>
                        setConfirmModal({
                          open: true,
                          action: "deactivate",
                          id: game._id,
                          title: game.title,
                        })
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Deactivate
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 px-2.5 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-700 gap-1 font-semibold cursor-pointer"
                      onClick={() =>
                        setConfirmModal({
                          open: true,
                          action: "restore",
                          id: game._id,
                          title: game.title,
                        })
                      }
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Restore
                    </Button>
                    <Link href={`/admin/games/${game._id}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 px-2.5 gap-1 text-muted-foreground"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 px-2.5 text-red-600 hover:text-red-700 hover:bg-red-500/10 gap-1 cursor-pointer"
                      onClick={() =>
                        setConfirmModal({
                          open: true,
                          action: "permanent",
                          id: game._id,
                          title: game.title,
                        })
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Permanent Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-xs font-medium text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && confirmModal.open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-0 duration-200">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div
                className={`p-2.5 rounded-full shrink-0 ${
                  confirmModal.action === "permanent"
                    ? "bg-red-500/10 text-red-600"
                    : confirmModal.action === "deactivate"
                    ? "bg-amber-500/10 text-amber-600"
                    : "bg-emerald-500/10 text-emerald-600"
                }`}
              >
                {confirmModal.action === "permanent" ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : confirmModal.action === "deactivate" ? (
                  <Trash2 className="w-5 h-5" />
                ) : (
                  <RotateCcw className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-foreground">
                  {confirmModal.action === "permanent"
                    ? "Permanently Delete Game?"
                    : confirmModal.action === "deactivate"
                    ? "Deactivate Game?"
                    : "Restore Game to Website?"}
                </h3>
                <div className="text-xs text-muted-foreground mt-1.5 space-y-1.5 leading-relaxed">
                  {confirmModal.action === "permanent" ? (
                    <>
                      <p>
                        Are you sure you want to permanently delete{" "}
                        <strong className="text-foreground">
                          "{confirmModal.title}"
                        </strong>
                        ?
                      </p>
                      <p className="text-red-500 font-semibold bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                        ⚠️ Danger: This action cannot be undone. This game will be permanently removed from the database.
                      </p>
                    </>
                  ) : confirmModal.action === "deactivate" ? (
                    <>
                      <p>
                        Do you want to deactivate{" "}
                        <strong className="text-foreground">
                          "{confirmModal.title}"
                        </strong>
                        ?
                      </p>
                      <p>
                        It will immediately be hidden from the website and moved to the{" "}
                        <span className="font-semibold text-foreground">
                          Inactive / Trash
                        </span>{" "}
                        tab. You can easily restore it anytime.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Restore{" "}
                        <strong className="text-foreground">
                          "{confirmModal.title}"
                        </strong>{" "}
                        back to active status?
                      </p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                        ✓ It will immediately become live and visible to visitors on the website again.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                disabled={actionLoading}
                onClick={() => setConfirmModal(null)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={actionLoading}
                className={
                  confirmModal.action === "permanent"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : confirmModal.action === "deactivate"
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }
                onClick={handleConfirmAction}
              >
                {actionLoading
                  ? "Processing..."
                  : confirmModal.action === "permanent"
                  ? "Delete Permanently"
                  : confirmModal.action === "deactivate"
                  ? "Deactivate"
                  : "Restore Game"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


import { useState } from "react";
import type { GameEntry } from "../data/games";
import { FALLBACK_IMAGE } from "../data/games";

interface Props {
  game: GameEntry;
  index: number;
  onOpen: (game: GameEntry, el: HTMLDivElement) => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function GameCard({ game, index, onOpen }: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [hovering, setHovering] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left - 30, y: e.clientY - rect.top - 30 }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    onOpen(game, e.currentTarget);
  };

  return (
    <div
      className="card-enter group relative flex cursor-pointer flex-col overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-[#1c1226] to-[#120a18] shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.97]"
      style={{
        animationDelay: `${120 * index + 150}ms`,
        boxShadow: hovering
          ? `0 10px 34px ${game.glow}, 0 0 0 1px ${game.btnFrom}55`
          : undefined,
      }}
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="relative h-[110px] w-full overflow-hidden">
        <img
          src={game.image}
          alt={game.name}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-[#120a18]/80" />
        <span
          className="absolute bottom-2 left-2 rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] backdrop-blur-sm"
          style={{ color: game.catColor, background: game.catBg, border: `1px solid ${game.catColor}55` }}
        >
          {game.cat}
        </span>
        <span className="absolute right-2 top-2 text-lg drop-shadow-[0_0_6px_rgba(0,0,0,0.7)] animate-flicker">
          {game.emoji}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-2.5 pb-3">
        <div>
          <div className="font-spooky text-[15px] leading-snug text-white" style={{ letterSpacing: "0.02em" }}>
            {game.name}
          </div>
          <div className="mt-1 line-clamp-3 text-[10px] leading-relaxed text-gray-400">{game.desc}</div>
        </div>
        <button
          className="btn-shimmer relative mt-auto flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-xl border-none py-2 text-[11px] font-black uppercase tracking-wide text-white transition-transform hover:scale-[1.03] active:scale-[0.96]"
          style={{
            background: `linear-gradient(135deg, ${game.btnFrom}, ${game.btnTo})`,
            boxShadow: `0 4px 14px ${game.glow}`,
          }}
        >
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 3v13m0 0l-4-4m4 4l4-4" />
          </svg>
          Get Script
        </button>

        {ripples.map((r) => (
          <span
            key={r.id}
            className="ripple-el pointer-events-none absolute rounded-full opacity-60"
            style={{ left: r.x, top: r.y, width: 60, height: 60, background: `${game.btnFrom}55` }}
          />
        ))}
      </div>
    </div>
  );
}

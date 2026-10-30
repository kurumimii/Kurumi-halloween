import { useEffect, useState } from "react";
import type { GameEntry } from "../data/games";
import { FALLBACK_IMAGE } from "../data/games";

interface Props {
  game: GameEntry | null;
  open: boolean;
  onClose: () => void;
  onCopy: (game: GameEntry) => void;
}

export default function ScriptModal({ game, open, onClose, onCopy }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) setCopied(false);
  }, [open, game]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!game) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(game.script);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = game.script;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    onCopy(game);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
      <div
        className={`modal-sheet relative w-full max-w-[480px] overflow-hidden rounded-t-[24px] border-t border-white/10 bg-gradient-to-b from-[#20132b] to-[#120a18] shadow-[0_-8px_60px_rgba(0,0,0,0.5)] ${
          open ? "open" : ""
        }`}
        style={{ borderTopColor: `${game.btnFrom}44`, boxShadow: `0 -8px 60px ${game.glow}` }}
      >
        <div className="flex justify-center pb-1 pt-3">
          <span className="block h-1 w-10 rounded-full bg-white/20" />
        </div>

        <div className="relative mx-4 h-[170px] overflow-hidden rounded-2xl">
          <img
            src={game.image}
            alt={game.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120a18] to-transparent" />
          <span className="absolute right-3 top-3 text-3xl animate-flicker">{game.emoji}</span>
        </div>

        <div className="px-5 pb-7 pt-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-spooky text-xl text-white" style={{ letterSpacing: "0.02em" }}>
              {game.emoji} {game.name}
            </span>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-white/10 bg-white/5 text-gray-400 transition hover:bg-white/15 active:scale-90"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <span
            className="mb-4 inline-block rounded-md px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.18em]"
            style={{ color: game.catColor, background: game.catBg, border: `1px solid ${game.catColor}44` }}
          >
            {game.cat}
          </span>

          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
            Script — Copy &amp; Paste into your Executor
          </div>
          <div className="relative mb-4 overflow-hidden rounded-2xl border border-white/5 bg-black/50 p-3.5 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
            <pre className="whitespace-pre-wrap break-all font-mono text-[11.5px] leading-relaxed text-slate-400">
              {game.script}
            </pre>
          </div>

          <button
            onClick={handleCopy}
            className="btn-shimmer relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[18px] border-none py-3.5 text-[13px] font-black uppercase tracking-wide text-white transition-transform hover:scale-[1.02] active:scale-[0.97]"
            style={{
              background: copied
                ? "linear-gradient(135deg, #22c55e, #16a34a)"
                : `linear-gradient(135deg, ${game.btnFrom}, ${game.btnTo})`,
              boxShadow: copied ? "0 6px 24px rgba(34,197,94,0.45)" : `0 6px 24px ${game.glow}`,
            }}
          >
            {copied ? (
              <>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy Script
              </>
            )}
          </button>
          <div className="mt-2.5 text-center text-[10px] text-white/20">
            🎃 Use responsibly. Educational purposes only.
          </div>
        </div>
      </div>
    </div>
  );
}

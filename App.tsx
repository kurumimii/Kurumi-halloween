import { useRef, useState } from "react";
import SpookyBackground from "./components/SpookyBackground";
import GameCard from "./components/GameCard";
import ScriptModal from "./components/ScriptModal";
import Toast from "./components/Toast";
import { games, type GameEntry } from "./data/games";

export default function App() {
  const [selectedGame, setSelectedGame] = useState<GameEntry | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const toastTimer = useRef<number | null>(null);

  const openModal = (game: GameEntry) => {
    setSelectedGame(game);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const notify = (msg: string) => {
    setToastMsg(msg);
    setToastShow(true);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastShow(false), 3000);
  };

  const handleCopy = (game: GameEntry) => {
    notify(`✅ ${game.emoji} ${game.name} script copied!`);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <SpookyBackground />

      {/* HEADER */}
      <header className="relative z-10 px-4 pb-2 pt-7">
        <div className="mx-auto mb-5 flex max-w-[480px] items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-orange-400" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-orange-300">
              Roblox Script Hub
            </span>
          </div>
          <span className="text-xl animate-flicker">🎃</span>
        </div>

        <div className="mx-auto max-w-[480px] px-4 pb-7 text-center">
          <h1 className="title-glow font-spooky mb-3 text-[34px] leading-tight text-orange-300 sm:text-[42px]">
            Kurumi Script Hub
          </h1>
          <p className="mx-auto max-w-[300px] text-sm leading-relaxed text-gray-400">
            Pick a haunted game to summon its script — copy with one click and unleash it in your executor.
          </p>
        </div>
      </header>

      {/* CARDS GRID */}
      <main className="relative z-10 mx-auto grid max-w-[480px] grid-cols-2 gap-3.5 px-3 pb-10">
        {games.map((game, i) => (
          <GameCard key={game.id} game={game} index={i} onOpen={() => openModal(game)} />
        ))}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 px-4 pb-8 text-center text-[10px] tracking-wide text-gray-600">
        🕸️ © 2025 Kurumi Script Hub • For educational purposes only 🕸️
      </footer>

      <ScriptModal game={selectedGame} open={modalOpen} onClose={closeModal} onCopy={handleCopy} />
      <Toast message={toastMsg} show={toastShow} />
    </div>
  );
}

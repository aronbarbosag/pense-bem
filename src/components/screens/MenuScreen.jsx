import { motion } from "framer-motion";
import { HelpCircle, Trophy } from "lucide-react";
import { BOOK_CODES } from "../../constants/books";
import { SonicDark } from "../common/SonicDark";

export function MenuScreen({
  mascotGlow = true,
  mascotImage,
  onOpenHelp,
  onOpenScores,
  onPlay,
  onSelectBook,
  selectedBookCode,
}) {
  return (
    <motion.div
      key="menu"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      className="text-center"
    >
      <div className="mx-auto mb-4 flex w-fit items-center gap-3 rounded-full border border-cyan-300/10 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[.45em] text-slate-400">
        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#00f6ff]" />
        Tec Toy Digital
        <span className="h-2 w-2 rounded-full bg-pink-600 shadow-[0_0_12px_#ff007a]" />
      </div>

      <SonicDark glow={mascotGlow} src={mascotImage} />

      <h1 className="mt-2 text-5xl font-black uppercase leading-none tracking-[.12em] text-cyan-300 drop-shadow-[0_0_14px_rgba(0,246,255,.75)] sm:text-6xl">
        Pense
        <span className="block text-pink-600 drop-shadow-[0_0_14px_rgba(255,0,122,.75)]">
          Bem
        </span>
      </h1>

      <p className="mt-6 text-sm font-bold uppercase tracking-[.45em] text-amber-300 drop-shadow-[0_0_12px_rgba(255,184,0,.55)]">
        Uma aventura científica com Sonic
      </p>

      <div className="mt-3 text-[10px] uppercase tracking-[.2em] text-slate-500">
        Código dos livros
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {BOOK_CODES.map((bookCode, bookCodeIndex) => (
          <button
            key={bookCode}
            onClick={() => onSelectBook(bookCode)}
            className={`rounded-md border px-3 py-2 text-[9px] font-bold transition hover:-translate-y-0.5 ${
              selectedBookCode === bookCode
                ? "border-amber-400 bg-amber-400/12 text-amber-300"
                : bookCodeIndex % 2
                  ? "border-pink-600/50 text-pink-400 hover:bg-pink-600/10"
                  : "border-cyan-300/50 text-cyan-300 hover:bg-cyan-300/10"
            }`}
          >
            {bookCode}
          </button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onPlay}
        className="mt-7 w-full max-w-xs rounded-xl bg-gradient-to-b from-amber-300 to-orange-500 px-7 py-4 text-xl font-black uppercase tracking-[.2em] text-black shadow-[0_0_28px_rgba(255,184,0,.35)]"
      >
        ▶ Jogar
      </motion.button>

      <button
        onClick={onOpenHelp}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/50 bg-cyan-300/8 px-7 py-3 text-sm font-black uppercase tracking-[.18em] text-cyan-300 transition hover:bg-cyan-300/15"
      >
        <HelpCircle size={16} />
        Como jogar
      </button>

      <button
        onClick={onOpenScores}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/60 bg-amber-300/8 px-7 py-3 text-sm font-black uppercase tracking-[.18em] text-amber-300 transition hover:bg-amber-300/15"
      >
        <Trophy size={16} />
        Pontuações
      </button>

      <p className="mt-6 text-[10px] uppercase tracking-[.35em] text-slate-600">
        V1.0 • 6 programas • 150 questões
      </p>
    </motion.div>
  );
}

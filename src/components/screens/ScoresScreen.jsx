import { motion } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import { BOOK_CODES } from "../../constants/books";
import { getTotalScore } from "../../services/scoreStorage";

export function ScoresScreen({ highestScoresByBookCode, onBack }) {
  const totalScore = getTotalScore(highestScoresByBookCode);

  return (
    <motion.div
      key="scores"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
    >
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-cyan-300 transition hover:text-amber-300"
      >
        <ArrowLeft size={15} />
        Voltar
      </button>

      <div className="rounded-xl border border-amber-300/15 bg-black/45 p-5 shadow-[inset_0_0_25px_rgba(0,0,0,.85)]">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[.3em] text-amber-300">
          <Trophy size={17} />
          Pontuações
        </div>

        <div className="mt-5 grid gap-3">
          {BOOK_CODES.map((bookCode) => (
            <div
              key={bookCode}
              className="flex items-center justify-between rounded-lg border border-slate-700/80 bg-white/[.03] px-4 py-3"
            >
              <span className="text-xs font-black uppercase tracking-[.25em] text-cyan-300">
                Livro {bookCode}
              </span>
              <strong className="text-lg text-amber-300">
                {String(highestScoresByBookCode[bookCode]).padStart(3, "0")}
              </strong>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-lg border border-pink-600/50 bg-pink-600/10 px-4 py-4">
          <span className="text-xs font-black uppercase tracking-[.25em] text-pink-400">
            Total
          </span>
          <strong className="text-xl text-pink-400">
            {String(totalScore).padStart(3, "0")}
          </strong>
        </div>
      </div>
    </motion.div>
  );
}

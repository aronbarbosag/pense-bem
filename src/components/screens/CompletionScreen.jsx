import { motion } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import sonicDancing from "../../assets/sonic_dancing.gif";
import { SonicDark } from "../common/SonicDark";

export function CompletionScreen({ completedBookResult, onBackToMenu, onOpenScores }) {
  return (
    <motion.div
      key="complete"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      className="text-center"
    >
      <SonicDark alt="Sonic dançando" src={sonicDancing} />

      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-amber-300 bg-amber-300/10 text-amber-300 shadow-[0_0_24px_rgba(255,184,0,.28)]">
        <Trophy size={34} />
      </div>

      <h2 className="mt-5 text-2xl font-black uppercase tracking-[.2em] text-cyan-300">
        Livro finalizado
      </h2>

      <p className="mt-4 text-sm leading-relaxed tracking-[.12em] text-slate-300">
        Você terminou o livro {completedBookResult?.bookCode}. Sua pontuação nessa rodada foi:
      </p>

      <div className="mt-5 text-5xl font-black text-amber-300 drop-shadow-[0_0_14px_rgba(255,184,0,.45)]">
        {String(completedBookResult?.score ?? 0).padStart(3, "0")}
      </div>

      <button
        onClick={onBackToMenu}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/50 bg-cyan-300/8 px-7 py-3 text-sm font-black uppercase tracking-[.18em] text-cyan-300 transition hover:bg-cyan-300/15"
      >
        <ArrowLeft size={16} />
        Voltar ao menu
      </button>

      <button
        onClick={onOpenScores}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/60 bg-amber-300/8 px-7 py-3 text-sm font-black uppercase tracking-[.18em] text-amber-300 transition hover:bg-amber-300/15"
      >
        <Trophy size={16} />
        Ver pontuações
      </button>
    </motion.div>
  );
}

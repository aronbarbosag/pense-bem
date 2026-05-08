import { AnimatePresence, motion } from "framer-motion";
import { Skull, Zap } from "lucide-react";

export function FeedbackBanner({ feedback }) {
  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          className={`mt-5 flex items-center justify-center gap-2 rounded-xl border p-4 text-sm font-black uppercase tracking-[.22em] ${
            feedback === "correct"
              ? "border-emerald-400/70 bg-emerald-400/10 text-emerald-300"
              : "border-pink-600/70 bg-pink-600/10 text-pink-400"
          }`}
        >
          {feedback === "correct" ? <Zap size={18} /> : <Skull size={18} />}
          {feedback === "correct" ? "Esmeralda do Caos coletada!" : "Anéis perdidos!"}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

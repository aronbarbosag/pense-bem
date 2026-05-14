import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, HelpCircle } from "lucide-react";

export function HowToPlayScreen({ onBack }) {
  return (
    <motion.div
      key="how"
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

      <div className="rounded-xl border border-cyan-300/10 bg-black/45 p-5 shadow-[inset_0_0_25px_rgba(0,0,0,.85)]">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[.3em] text-cyan-300">
          <HelpCircle size={17} />
          Como jogar
        </div>

        <div className="mt-5 space-y-4 text-sm leading-relaxed tracking-[.08em] text-slate-300">
          <p>Escolha um código de livro na tela inicial para começar direto na primeira questão daquele livro.</p>
          <p>Leia a pergunta, escolha uma alternativa na lista ou use os atalhos A, B, C, D, E e F quando aparecerem.</p>
          <p>Cada acerto aumenta sua pontuação. Cada erro tira uma vida, até o limite de 3 erros na rodada.</p>
          <p>Quando a última questão do livro terminar, o jogo grava sua maior pontuação daquele livro no navegador.</p>
        </div>
      </div>

      <a
        href="https://example.com/livro-pense-bem-sonic"
        target="_blank"
        rel="noreferrer"
        className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-amber-300/60 bg-amber-300/8 px-5 py-4 text-xs font-black uppercase tracking-[.2em] text-amber-300 transition hover:bg-amber-300/15"
      >
        <BookOpen size={16} />
        Livro de apoio
      </a>
    </motion.div>
  );
}

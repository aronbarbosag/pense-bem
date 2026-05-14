import { FlaskConical } from "lucide-react";

export function QuestionCard({ question }) {
  return (
    <section className="rounded-xl border border-cyan-300/5 bg-black/45 p-4 shadow-[inset_0_0_25px_rgba(0,0,0,.85)]">
      <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[.35em] text-cyan-300">
        <FlaskConical size={16} />
        {question.theme}
      </div>

      <p className="mt-3 min-h-12 text-sm leading-relaxed tracking-[.12em] text-slate-400">
        {question.question}
      </p>
    </section>
  );
}

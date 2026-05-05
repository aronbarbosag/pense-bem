export function GameHeader({ bookCode, errors, progress, questionId, score }) {
  return (
    <header className="mb-4 grid grid-cols-5 items-start gap-2 text-xs uppercase tracking-[.16em] text-slate-500">
      <div className="text-left">
        <span className="block text-[9px]">Id</span>
        <strong className="text-base text-cyan-300">
          {String(questionId).padStart(3, "0")}
        </strong>
      </div>

      <div className="text-right">
        <span className="block text-[9px]">Questões</span>
        <strong className="text-base text-emerald-300">{progress}</strong>
      </div>

      <div className="text-right">
        <span className="block text-[9px]">Score</span>
        <strong className="text-base text-amber-300">
          {String(score).padStart(3, "0")}
        </strong>
      </div>

      <div className="text-right">
        <span className="block text-[9px]">Livro</span>
        <strong className="text-base text-cyan-300">{bookCode}</strong>
      </div>

      <div className="text-right">
        <span className="block text-[9px]">Erros</span>
        <strong className="text-base text-pink-600">{errors}/3</strong>
      </div>
    </header>
  );
}

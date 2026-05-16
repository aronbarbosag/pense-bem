import { ANSWER_LETTERS } from "../../constants/answerLetters";

export function ShortcutPanel({ onAnswer, question }) {
  return (
    <section className="mt-6 rounded-xl border border-cyan-300/5 bg-black/45 p-4 text-center shadow-[inset_0_0_25px_rgba(0,0,0,.85)]">
      <p className="text-[10px] font-black uppercase tracking-[.5em] text-pink-600">
        Atalhos
      </p>

      {question.image ? (
        <div className="mt-4 flex h-64 w-full items-center justify-center overflow-hidden rounded-lg border border-cyan-300/20 bg-black/35 sm:h-48 md:h-32">
          <img
            src={question.image}
            alt={`Imagem da questão ${question.id}`}
            className="h-full w-full object-contain"
            draggable="false"
          />
        </div>
      ) : (
        <div className={`mt-4 grid gap-3 ${question.options.length > 4 ? "grid-cols-3" : "grid-cols-4"}`}>
          {question.options.map((answerOption, answerOptionIndex) => {
            const shortcutLetter = ANSWER_LETTERS[answerOptionIndex];

            return (
              <button
                key={shortcutLetter.letter}
                onClick={() => onAnswer(answerOption)}
                className={`aspect-square rounded-full border-2 ${shortcutLetter.bg} text-lg font-black text-white shadow-[0_0_16px_rgba(52,211,153,.25)] transition hover:-translate-y-1 hover:opacity-80`}
              >
                {shortcutLetter.letter}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

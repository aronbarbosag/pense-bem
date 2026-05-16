import { motion } from "framer-motion";
import { ANSWER_LETTERS } from "../../constants/answerLetters";

export function AnswerOptions({ feedback, onAnswer, question, selectedAnswerOption }) {
  return (
    <div className="mt-5 grid gap-3">
      {question.options.map((answerOption, answerOptionIndex) => {
        const isSelectedAnswerOption = selectedAnswerOption === answerOption;
        const isCorrectAnswerOption = feedback === "correct" && answerOption === question.answer;
        const isWrongSelectedAnswerOption = feedback === "wrong" && isSelectedAnswerOption;

        return (
          <motion.button
            key={`${answerOption}-${answerOptionIndex}`}
            whileHover={{ x: 4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            animate={isWrongSelectedAnswerOption ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
            onClick={() => onAnswer(answerOption)}
            className={`group flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
              isCorrectAnswerOption
                ? "border-emerald-400 bg-emerald-400/15 shadow-[0_0_22px_rgba(52,211,153,.35)]"
                : isWrongSelectedAnswerOption
                  ? "border-pink-600 bg-pink-600/15 shadow-[0_0_22px_rgba(255,0,122,.35)]"
                  : isSelectedAnswerOption
                    ? "border-amber-400 bg-amber-400/12"
                    : "border-slate-700/80 bg-white/[.03] hover:border-cyan-300/70 hover:bg-cyan-300/8 hover:shadow-[0_0_18px_rgba(0,246,255,.18)]"
            }`}
          >
            <span className={`grid h-6 w-6 place-items-center rounded-full border border-cyan-300/70 text-xs font-black ${ANSWER_LETTERS[answerOptionIndex].bg} text-cyan-300 group-hover:border-amber-300 group-hover:text-amber-300`} />

            <span className="text-sm font-bold tracking-[.08em] text-slate-300">
              {answerOption}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

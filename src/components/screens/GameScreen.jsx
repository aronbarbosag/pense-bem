import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { AnswerOptions } from "../game/AnswerOptions";
import { FeedbackBanner } from "../game/FeedbackBanner";
import { GameHeader } from "../game/GameHeader";
import { QuestionCard } from "../game/QuestionCard";
import { ShortcutPanel } from "../game/ShortcutPanel";

export function GameScreen({
  bookCode,
  errors,
  feedback,
  isQuestionTransitionActive,
  onAnswer,
  onReset,
  question,
  questionIndex,
  score,
  selectedAnswerOption,
  totalQuestions,
}) {
  return (
    <motion.div
      key="game"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
    >
      <GameHeader
        bookCode={bookCode}
        errors={errors}
        progress={`${questionIndex + 1}/${totalQuestions}`}
        questionId={question.id}
        score={score}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, x: isQuestionTransitionActive ? 120 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -120 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <QuestionCard question={question} />
          <AnswerOptions
            feedback={feedback}
            onAnswer={onAnswer}
            question={question}
            selectedAnswerOption={selectedAnswerOption}
          />
        </motion.div>
      </AnimatePresence>

      <FeedbackBanner feedback={feedback} />
      <ShortcutPanel onAnswer={onAnswer} question={question} />

      <button
        onClick={onReset}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-pink-600/70 bg-pink-600/5 px-4 py-3 text-xs font-black uppercase tracking-[.25em] text-pink-500 transition hover:bg-pink-600/15"
      >
        <RotateCcw size={15} />
        Finalizar rodada
      </button>
    </motion.div>
  );
}

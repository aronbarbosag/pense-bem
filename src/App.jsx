import { AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Shell } from "./components/layout/Shell";
import { CompletionScreen } from "./components/screens/CompletionScreen";
import { GameScreen } from "./components/screens/GameScreen";
import { HowToPlayScreen } from "./components/screens/HowToPlayScreen";
import { MenuScreen } from "./components/screens/MenuScreen";
import { ScoresScreen } from "./components/screens/ScoresScreen";
import { useQuizGame } from "./hooks/useQuizGame";
import shadowMascot from "./assets/shadow.gif";

const getTopLabel = ({ completedBookResult, currentQuestion, isPlaying, view }) => {
  if (isPlaying && currentQuestion) {
    return `Questão ${String(currentQuestion.id).padStart(3, "0")}`;
  }

  if (view === "how") return "Como Jogar";
  if (view === "scores") return "Pontuações";
  if (view === "complete" && completedBookResult) return `Livro ${completedBookResult.bookCode}`;

  return "Pense Bem®";
};

export default function App() {
  const game = useQuizGame();

  return (
    <Shell
      isGlitchEffectActive={game.isGlitchEffectActive}
      theme={game.isSecretMascotUnlocked ? "dark" : "normal"}
      topLabel={getTopLabel({
        completedBookResult: game.completedBookResult,
        currentQuestion: game.currentQuestion,
        isPlaying: game.isPlaying,
        view: game.view,
      })}
    >
      <button
        onClick={game.toggleMusic}
        className="absolute -top-10 right-10 z-20 rounded-full border border-cyan-300/30 bg-[#070711]/90 p-1.5 text-cyan-300 shadow-[0_0_12px_rgba(0,246,255,.18)] transition hover:bg-cyan-300/20"
        aria-label={game.music ? "Desativar som" : "Ativar som"}
      >
        {game.music ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      <AnimatePresence mode="wait">
        {game.view === "menu" && (
          <MenuScreen
            mascotGlow={!game.isSecretMascotUnlocked}
            mascotImage={game.isSecretMascotUnlocked ? shadowMascot : undefined}
            selectedBookCode={game.bookCode}
            onOpenHelp={() => game.setView("how")}
            onOpenScores={() => game.setView("scores")}
            onPlay={() => game.startBook(game.bookCode)}
            onSelectBook={game.startBook}
          />
        )}

        {game.view === "how" && (
          <HowToPlayScreen onBack={() => game.setView("menu")} />
        )}

        {game.view === "scores" && (
          <ScoresScreen
            highestScoresByBookCode={game.highestScoresByBookCode}
            onBack={() => game.setView(game.completedBookResult ? "complete" : "menu")}
          />
        )}

        {game.view === "complete" && (
          <CompletionScreen
            completedBookResult={game.completedBookResult}
            onBackToMenu={game.resetToMenu}
            onOpenScores={() => game.setView("scores")}
          />
        )}

        {game.view === "game" && game.currentQuestion && (
          <GameScreen
            bookCode={game.bookCode}
            errors={game.errors}
            feedback={game.feedback}
            isQuestionTransitionActive={game.isQuestionTransitionActive}
            onAnswer={game.answerQuestion}
            onReset={game.resetToMenu}
            question={game.currentQuestion}
            questionIndex={game.questionIndex}
            score={game.score}
            selectedAnswerOption={game.selectedAnswerOption}
            totalQuestions={game.totalQuestions}
          />
        )}
      </AnimatePresence>
    </Shell>
  );
}

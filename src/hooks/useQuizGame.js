import { useCallback, useEffect, useState } from "react";
import { ANSWER_KEY_MAP } from "../constants/answerLetters";
import { BOOK_CODES, DEFAULT_BOOK_CODE } from "../constants/books";
import { Quiz } from "../domain/entities/quiz";
import { getBookQuestions } from "../services/bookService";
import { readStoredScores, saveStoredScores } from "../services/scoreStorage";
import { useAudioEngine } from "./useAudioEngine";

const createBookQuiz = (bookCode) => new Quiz(getBookQuestions(bookCode));

const getAnswerPoints = (mistakes) => {
  if (mistakes === 0) return 3;
  if (mistakes === 1) return 2;
  if (mistakes === 2) return 1;
  return 0;
};

export function useQuizGame() {
  const { beep, startMusic, stopMusic } = useAudioEngine();

  const [view, setView] = useState("menu");
  const [music, setMusic] = useState(false);
  const [quiz, setQuiz] = useState(() => createBookQuiz(DEFAULT_BOOK_CODE));
  const [, refreshGame] = useState(0);
  const [selectedAnswerOption, setSelectedAnswerOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [bookCode, setBookCode] = useState(DEFAULT_BOOK_CODE);
  const [highestScoresByBookCode, setHighestScoresByBookCode] = useState(readStoredScores);
  const [completedBookResult, setCompletedBookResult] = useState(null);
  const [secretBookClicks, setSecretBookClicks] = useState(() => new Set());
  const [isGlitchEffectActive, setIsGlitchEffectActive] = useState(false);
  const [isQuestionTransitionActive, setIsQuestionTransitionActive] = useState(false);

  const questionIndex = quiz.currentQuestionIndex;
  const currentQuestion = quiz.getCurrentQuestion();
  const score =
    feedback === "correct" ? quiz.points.getTotal() + getAnswerPoints(quiz.mistakes) : quiz.points.getTotal();
  const errors = feedback === "wrong" ? Math.min(3, quiz.mistakes + 1) : quiz.mistakes;
  const isPlaying = view === "game";
  const isSecretMascotUnlocked = secretBookClicks.size === BOOK_CODES.length;

  const musicMode = isSecretMascotUnlocked ? "dark" : "normal";

  const toggleMusic = useCallback(() => {
    setMusic((currentMusic) => !currentMusic);
  }, []);

  useEffect(() => {
    if (view === "complete") {
      startMusic("completion");
      return;
    }

    if (music && view !== "game") {
      startMusic(musicMode);
      return;
    }

    stopMusic();
  }, [music, musicMode, startMusic, stopMusic, view]);

  const updateRecord = useCallback((finishedBookCode, finalScore) => {
    setHighestScoresByBookCode((currentHighestScoresByBookCode) => {
      const nextHighestScoresByBookCode = {
        ...currentHighestScoresByBookCode,
        [finishedBookCode]: Math.max(currentHighestScoresByBookCode[finishedBookCode] ?? 0, finalScore),
      };

      saveStoredScores(nextHighestScoresByBookCode);
      return nextHighestScoresByBookCode;
    });
  }, []);

  const showNextQuestion = useCallback((answer) => {
    setIsQuestionTransitionActive(true);

    setTimeout(() => {
      quiz.answerCurrentQuestion(answer);
      const finalScore = quiz.points.getTotal();

      if (quiz.isQuizFinished()) {
        updateRecord(bookCode, finalScore);
        setCompletedBookResult({ bookCode, score: finalScore });
        setView("complete");
        setQuiz(createBookQuiz(bookCode));
      } else {
        refreshGame((currentValue) => currentValue + 1);
      }

      setSelectedAnswerOption(null);
      setFeedback(null);
      setIsQuestionTransitionActive(false);
    }, 420);
  }, [bookCode, quiz, updateRecord]);

  const startBook = useCallback((nextBookCode) => {
    stopMusic();
    setMusic(false);
    setSecretBookClicks((currentClicks) => {
      const nextClicks = new Set(currentClicks);
      nextClicks.add(nextBookCode);
      return nextClicks;
    });
    setBookCode(nextBookCode);
    setQuiz(createBookQuiz(nextBookCode));
    setSelectedAnswerOption(null);
    setFeedback(null);
    setIsGlitchEffectActive(false);
    setIsQuestionTransitionActive(false);
    setView("game");
    setCompletedBookResult(null);
    beep("correct");
  }, [beep, stopMusic]);

  const answerQuestion = useCallback((selectedOption) => {
    if (feedback || !currentQuestion) return;

    const isCorrectAnswer = currentQuestion.isRightAnswer(selectedOption);

    setSelectedAnswerOption(selectedOption);
    setFeedback(isCorrectAnswer ? "correct" : "wrong");
    beep(isCorrectAnswer ? "correct" : "wrong");

    if (isCorrectAnswer) {
      setIsGlitchEffectActive(false);
    } else {
      setIsGlitchEffectActive(true);
      setTimeout(() => setIsGlitchEffectActive(false), 500);
    }

    setTimeout(() => showNextQuestion(selectedOption), 900);
  }, [beep, currentQuestion, feedback, showNextQuestion]);

  const resetToMenu = useCallback(() => {
    setView("menu");
    setQuiz(createBookQuiz(bookCode));
    setSelectedAnswerOption(null);
    setFeedback(null);
    setCompletedBookResult(null);
    setIsGlitchEffectActive(false);
    setIsQuestionTransitionActive(false);
  }, [bookCode]);

  useEffect(() => {
    const handleKey = (event) => {
      if (!isPlaying || !currentQuestion) return;

      const answerOptionIndex = ANSWER_KEY_MAP[event.key.toLowerCase()];

      if (answerOptionIndex !== undefined && currentQuestion.options[answerOptionIndex]) {
        answerQuestion(currentQuestion.options[answerOptionIndex]);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [answerQuestion, currentQuestion, isPlaying]);

  return {
    answerQuestion,
    bookCode,
    completedBookResult,
    currentQuestion,
    errors,
    feedback,
    highestScoresByBookCode,
    isGlitchEffectActive,
    isPlaying,
    isQuestionTransitionActive,
    isSecretMascotUnlocked,
    music,
    questionIndex,
    totalQuestions: quiz.questions.length,
    resetToMenu,
    score,
    selectedAnswerOption,
    setView,
    startBook,
    toggleMusic,
    view,
  };
}

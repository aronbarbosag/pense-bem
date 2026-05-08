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
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [bookCode, setBookCode] = useState(DEFAULT_BOOK_CODE);
  const [records, setRecords] = useState(readStoredScores);
  const [completion, setCompletion] = useState(null);
  const [secretBookClicks, setSecretBookClicks] = useState(() => new Set());
  const [glitch, setGlitch] = useState(false);
  const [dash, setDash] = useState(false);

  const questionIndex = quiz.currentQuestionIndex;
  const currentQuestion = quiz.getCurrentQuestion();
  const score =
    feedback === "correct" ? quiz.points.getPoint() + getAnswerPoints(quiz.mistakes) : quiz.points.getPoint();
  const errors = feedback === "wrong" ? Math.min(3, quiz.mistakes + 1) : quiz.mistakes;
  const isPlaying = view === "game";
  const isSecretMascotUnlocked = secretBookClicks.size === BOOK_CODES.length;

  const musicMode = isSecretMascotUnlocked ? "dark" : "normal";

  const toggleMusic = useCallback(() => {
    setMusic((currentMusic) => !currentMusic);
  }, []);

  useEffect(() => {
    if (music) {
      startMusic(musicMode);
      return;
    }

    stopMusic();
  }, [music, musicMode, startMusic, stopMusic]);

  const updateRecord = useCallback((finishedBookCode, finalScore) => {
    setRecords((currentRecords) => {
      const nextRecords = {
        ...currentRecords,
        [finishedBookCode]: Math.max(currentRecords[finishedBookCode] ?? 0, finalScore),
      };

      saveStoredScores(nextRecords);
      return nextRecords;
    });
  }, []);

  const showNextQuestion = useCallback((answer) => {
    setDash(true);

    setTimeout(() => {
      quiz.answerCurrentQuestion(answer);
      const finalScore = quiz.points.getPoint();

      if (quiz.isQuizFinished()) {
        updateRecord(bookCode, finalScore);
        setCompletion({ bookCode, score: finalScore });
        setView("complete");
        setQuiz(createBookQuiz(bookCode));
      } else {
        refreshGame((currentValue) => currentValue + 1);
      }

      setSelected(null);
      setFeedback(null);
      setDash(false);
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
    setSelected(null);
    setFeedback(null);
    setGlitch(false);
    setDash(false);
    setView("game");
    setCompletion(null);
    beep("correct");
  }, [beep, stopMusic]);

  const answerQuestion = useCallback((option) => {
    if (feedback || !currentQuestion) return;

    const correct = currentQuestion.isRightAnswer(option);

    setSelected(option);
    setFeedback(correct ? "correct" : "wrong");
    beep(correct ? "correct" : "wrong");

    if (correct) {
      setGlitch(false);
    } else {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 500);
    }

    setTimeout(() => showNextQuestion(option), 900);
  }, [beep, currentQuestion, feedback, showNextQuestion]);

  const resetToMenu = useCallback(() => {
    setView("menu");
    setQuiz(createBookQuiz(bookCode));
    setSelected(null);
    setFeedback(null);
    setCompletion(null);
    setGlitch(false);
    setDash(false);
  }, [bookCode]);

  useEffect(() => {
    const handleKey = (event) => {
      if (!isPlaying || !currentQuestion) return;

      const optionIndex = ANSWER_KEY_MAP[event.key.toLowerCase()];

      if (optionIndex !== undefined && currentQuestion.options[optionIndex]) {
        answerQuestion(currentQuestion.options[optionIndex]);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [answerQuestion, currentQuestion, isPlaying]);

  return {
    answerQuestion,
    bookCode,
    completion,
    currentQuestion,
    dash,
    errors,
    feedback,
    glitch,
    isPlaying,
    isSecretMascotUnlocked,
    music,
    questionIndex,
    totalQuestions: quiz.questions.length,
    records,
    resetToMenu,
    score,
    selected,
    setView,
    startBook,
    toggleMusic,
    view,
  };
}

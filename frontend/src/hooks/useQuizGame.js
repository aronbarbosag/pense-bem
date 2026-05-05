import { useCallback, useEffect, useState } from "react";
import { ANSWER_KEY_MAP } from "../constants/answerLetters";
import { BOOK_CODES, DEFAULT_BOOK_CODE } from "../constants/books";
import { getBookQuestions } from "../services/bookService";
import { getCorrectAnswerScore, INITIAL_SCORE } from "../services/scoreService";
import { readStoredScores, saveStoredScores } from "../services/scoreStorage";
import { useAudioEngine } from "./useAudioEngine";

export function useQuizGame() {
  const { beep, startMusic, stopMusic } = useAudioEngine();

  const [view, setView] = useState("menu");
  const [music, setMusic] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(INITIAL_SCORE);
  const [errors, setErrors] = useState(0);
  const [bookCode, setBookCode] = useState(DEFAULT_BOOK_CODE);
  const [activeQuestions, setActiveQuestions] = useState(() => getBookQuestions(DEFAULT_BOOK_CODE));
  const [records, setRecords] = useState(readStoredScores);
  const [completion, setCompletion] = useState(null);
  const [secretBookClicks, setSecretBookClicks] = useState(() => new Set());
  const [glitch, setGlitch] = useState(false);
  const [dash, setDash] = useState(false);

  const currentQuestion = activeQuestions[questionIndex];
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

  const showNextQuestion = useCallback((finalScore = score) => {
    setDash(true);

    setTimeout(() => {
      if (questionIndex >= activeQuestions.length - 1) {
        updateRecord(bookCode, finalScore);
        setCompletion({ bookCode, score: finalScore });
        setView("complete");
        setQuestionIndex(0);
      } else {
        setQuestionIndex((prev) => prev + 1);
      }

      setSelected(null);
      setFeedback(null);
      setDash(false);
    }, 420);
  }, [activeQuestions.length, bookCode, questionIndex, score, updateRecord]);

  const startBook = useCallback((nextBookCode) => {
    stopMusic();
    setMusic(false);
    setSecretBookClicks((currentClicks) => {
      const nextClicks = new Set(currentClicks);
      nextClicks.add(nextBookCode);
      return nextClicks;
    });
    setBookCode(nextBookCode);
    setActiveQuestions(getBookQuestions(nextBookCode));
    setQuestionIndex(0);
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

    const correct = option === currentQuestion.answer;
    const earned = correct ? getCorrectAnswerScore(questionIndex) : 0;
    const nextScore = score + earned;

    setSelected(option);
    setFeedback(correct ? "correct" : "wrong");
    beep(correct ? "correct" : "wrong");

    if (correct) {
      setGlitch(false);
      setScore(nextScore);
    } else {
      setErrors((prev) => Math.min(3, prev + 1));
      setGlitch(true);
      setTimeout(() => setGlitch(false), 500);
    }

    setTimeout(() => showNextQuestion(nextScore), 900);
  }, [beep, currentQuestion, feedback, questionIndex, score, showNextQuestion]);

  const resetToMenu = useCallback(() => {
    setView("menu");
    setQuestionIndex(0);
    setSelected(null);
    setFeedback(null);
    setScore(INITIAL_SCORE);
    setErrors(0);
    setActiveQuestions(getBookQuestions(bookCode));
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
    totalQuestions: activeQuestions.length,
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

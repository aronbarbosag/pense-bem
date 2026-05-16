import { BOOK_CODES } from "../constants/books";
import { SCORES_STORAGE_KEY } from "../constants/scores";

export const createEmptyScores = () =>
  BOOK_CODES.reduce((emptyScoresByBookCode, bookCode) => ({ ...emptyScoresByBookCode, [bookCode]: 0 }), {});

export const readStoredScores = () => {
  if (typeof window === "undefined") return createEmptyScores();

  try {
    const storedScoresByBookCode = JSON.parse(window.localStorage.getItem(SCORES_STORAGE_KEY) ?? "{}");

    return BOOK_CODES.reduce(
      (normalizedScoresByBookCode, bookCode) => ({
        ...normalizedScoresByBookCode,
        [bookCode]: Number(storedScoresByBookCode[bookCode] ?? 0),
      }),
      {},
    );
  } catch {
    return createEmptyScores();
  }
};

export const saveStoredScores = (scoresByBookCode) => {
  window.localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(scoresByBookCode));
};

export const getTotalScore = (scoresByBookCode) =>
  BOOK_CODES.reduce((totalScore, bookCode) => totalScore + scoresByBookCode[bookCode], 0);

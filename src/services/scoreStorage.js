import { BOOK_CODES } from "../constants/books";
import { SCORES_STORAGE_KEY } from "../constants/scores";

export const createEmptyScores = () =>
  BOOK_CODES.reduce((scores, bookCode) => ({ ...scores, [bookCode]: 0 }), {});

export const readStoredScores = () => {
  if (typeof window === "undefined") return createEmptyScores();

  try {
    const stored = JSON.parse(window.localStorage.getItem(SCORES_STORAGE_KEY) ?? "{}");

    return BOOK_CODES.reduce(
      (scores, bookCode) => ({
        ...scores,
        [bookCode]: Number(stored[bookCode] ?? 0),
      }),
      {},
    );
  } catch {
    return createEmptyScores();
  }
};

export const saveStoredScores = (scores) => {
  window.localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(scores));
};

export const getTotalScore = (scores) =>
  BOOK_CODES.reduce((total, bookCode) => total + scores[bookCode], 0);

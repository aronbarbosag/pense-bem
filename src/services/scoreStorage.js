import AsyncStorage from "@react-native-async-storage/async-storage";
import { BOOK_CODES } from "../constants/books";
import { SCORES_STORAGE_KEY } from "../constants/scores";

export const createEmptyScores = () =>
  BOOK_CODES.reduce((emptyScoresByBookCode, bookCode) => ({ ...emptyScoresByBookCode, [bookCode]: 0 }), {});

export const normalizeScores = (scoresByBookCode = {}) =>
  BOOK_CODES.reduce(
    (normalizedScoresByBookCode, bookCode) => ({
      ...normalizedScoresByBookCode,
      [bookCode]: Number(scoresByBookCode[bookCode] ?? 0),
    }),
    {},
  );

export const readStoredScores = async () => {
  try {
    const storedScoresByBookCode = JSON.parse((await AsyncStorage.getItem(SCORES_STORAGE_KEY)) ?? "{}");
    return normalizeScores(storedScoresByBookCode);
  } catch {
    return createEmptyScores();
  }
};

export const saveStoredScores = async (scoresByBookCode) => {
  await AsyncStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(normalizeScores(scoresByBookCode)));
};

export const getTotalScore = (scoresByBookCode) =>
  BOOK_CODES.reduce((totalScore, bookCode) => totalScore + scoresByBookCode[bookCode], 0);

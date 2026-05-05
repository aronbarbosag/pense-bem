import { BOOK_RANGES, DEFAULT_BOOK_CODE } from "../constants/books";
import { QUESTIONS } from "../data/questions";
import { shuffle } from "../utils/array";

const getQuestionsInRange = ([start, end]) =>
  QUESTIONS.filter((question) => question.id >= start && question.id <= end);

export const getBookQuestions = (bookCode) => {
  if (bookCode === "026") {
    return Object.values(BOOK_RANGES).flatMap((range) =>
      shuffle(getQuestionsInRange(range)).slice(0, 6),
    );
  }

  return getQuestionsInRange(BOOK_RANGES[bookCode] ?? BOOK_RANGES[DEFAULT_BOOK_CODE]);
};

import { BOOK_RANGES, DEFAULT_BOOK_CODE } from "../constants/books";
import { QUESTIONS } from "../data/questions";
import { Question } from "../domain/entities/question";
import { shuffle } from "../utils/array";

const getQuestionsInRange = ([start, end]) =>
  QUESTIONS.filter((question) => question.id >= start && question.id <= end);

const toDomainQuestion = (question) =>
  new Question(question.id, question.question, question.answer, question.options, {
    image: question.image,
    theme: question.theme,
  });

export const getBookQuestions = (bookCode) => {
  const questions =
    bookCode === "026"
      ? Object.values(BOOK_RANGES).flatMap((range) =>
          shuffle(getQuestionsInRange(range)).slice(0, 6),
        )
      : getQuestionsInRange(BOOK_RANGES[bookCode] ?? BOOK_RANGES[DEFAULT_BOOK_CODE]);

  return questions.map(toDomainQuestion);
};

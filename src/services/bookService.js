import { BOOK_RANGES, DEFAULT_BOOK_CODE } from "../constants/books";
import { QUESTIONS } from "../data/questions";
import { Question } from "../domain/entities/question";
import { shuffle } from "../utils/array";

const getQuestionsInRange = ([firstQuestionId, lastQuestionId]) =>
  QUESTIONS.filter((question) => question.id >= firstQuestionId && question.id <= lastQuestionId);

const toDomainQuestion = (questionData) =>
  new Question(questionData.id, questionData.question, questionData.answer, questionData.options, {
    image: questionData.image,
    theme: questionData.theme,
  });

export const getBookQuestions = (bookCode) => {
  const questionsForSelectedBook =
    bookCode === "026"
      ? Object.values(BOOK_RANGES).flatMap((bookQuestionRange) =>
          shuffle(getQuestionsInRange(bookQuestionRange)).slice(0, 6),
        )
      : getQuestionsInRange(BOOK_RANGES[bookCode] ?? BOOK_RANGES[DEFAULT_BOOK_CODE]);

  return questionsForSelectedBook.map(toDomainQuestion);
};

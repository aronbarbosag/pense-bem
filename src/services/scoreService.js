export const INITIAL_SCORE = 90;

export const getQuestionMultiplier = (questionIndex) =>
  1 + Math.floor(questionIndex / 2) * 0.25;

export const getCorrectAnswerScore = (questionIndex) =>
  Math.round(150 * getQuestionMultiplier(questionIndex));

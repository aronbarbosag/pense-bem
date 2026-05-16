export class Question {

  constructor(id, questionText, correctAnswer, answerOptions, metadata = {}) {
    this.id = id;
    this.questionText = questionText;
    this.correctAnswer = correctAnswer;
    this.answerOptions = answerOptions;
    this.theme = metadata.theme ?? "Sonic Pense Bem";
    this.image = metadata.image ?? null;

  }

  get question() {
    return this.questionText;
  }

  get answer() {
    return this.correctAnswer;
  }

  get options() {
    return this.answerOptions;
  }

  isRightAnswer(selectedAnswer) {
    this.validateAnswer(selectedAnswer);
    return this.correctAnswer === selectedAnswer;
  }

  validateAnswer(selectedAnswer) {
    if (!this.answerOptions.includes(selectedAnswer)) {
      throw new Error('Opção inválida');
    }

  }



}

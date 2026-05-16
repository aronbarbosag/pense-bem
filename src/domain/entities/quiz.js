import { Points } from "./points";


export class Quiz {

  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.points = new Points();
    this.mistakes = 0;

  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  answerCurrentQuestion(answer) {
    const currentQuestion = this.getCurrentQuestion();
    currentQuestion.validateAnswer(answer, currentQuestion);

    if (currentQuestion.isRightAnswer(answer)) {
      this.addPointsForCorrectAnswer();
      this.nextQuestion();


      this.mistakes = 0;

    } else {
      this.mistakes += 1;
      this.advanceAfterTooManyMistakes();
    }




  }

  addPointsForCorrectAnswer() {
    if (this.mistakes === 0) {
      this.points.addPoints(3);
    }
    else if (this.mistakes === 1) {
      this.points.addPoints(2);
    }
    else if (this.mistakes === 2) {
      this.points.addPoints();
    }

    else{
      this.mistakes = 0; // reset mistakes if the user answers correctly after 3 mistakes, to avoid skipping the next question
    }




  }

  advanceAfterTooManyMistakes() {
    if (this.mistakes > 2) {
      this.nextQuestion() ;
      this.mistakes = 0;
    }

  }

  nextQuestion() {
    this.currentQuestionIndex += 1;

  }

  isQuizFinished() {

    return this.currentQuestionIndex >= this.questions.length;
  }

}

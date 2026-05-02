import { getQuestions, getQuestionById } from '../src/domain/questions.js';

describe('Questions Domain', () => {

  it('Deve retornar um array de perguntas', () => {
    const questions = getQuestions();
    console.log(questions);
    expect(Array.isArray(questions)).toBe(true);
    expect(questions.length).toBeGreaterThan(0);
  });

  it('Deve retornar uma pergunta pelo id', () => {
    const question = getQuestionById(1);
    console.log(question);
    expect(question).toBeDefined();
    expect(question.id).toBe(1);
  });

  it('Deve retornar undefined para id não existente', () => {
    const question = getQuestionById(999);
    console.log(question);
    expect(question).toBeUndefined();
  });
});

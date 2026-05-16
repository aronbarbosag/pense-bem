import fs from 'fs';
import { Question } from './entities/question.js';

const rawQuestions = JSON.parse(fs.readFileSync('./src/resources/perguntas_sonic_pense_bem.json', 'utf-8'));

export function getQuestions(start = 0, limit = 30) {
  return rawQuestions.slice(start, start + limit).map(parseQuestion);
}

export function getQuestionById(id) {
  const rawQuestion = rawQuestions.find((questionFromJson) => questionFromJson.id === id);
  return rawQuestion ? parseQuestion(rawQuestion) : undefined;
}


function parseQuestion(rawQuestion) {
  return new Question(
    rawQuestion.id,
    rawQuestion.pergunta,
    rawQuestion.resposta,
    rawQuestion.opcoes
  );
};

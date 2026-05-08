import fs from 'fs';
import { Question } from './entities/question.js';

const data = JSON.parse(fs.readFileSync('./src/resources/perguntas_sonic_pense_bem.json', 'utf-8'));

export function getQuestions(start = 0, limit = 30) {
  return data.slice(start, start + limit).map(parseQuestion);
}

export function getQuestionById(id) {
  const question = data.find(q => q.id === id);
  return question ? parseQuestion(question) : undefined;
}


function parseQuestion(element) {
  return new Question(
    element.id,
    element.pergunta,
    element.resposta,
    element.opcoes
  );
};

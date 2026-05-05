import rawQuestions from "./perguntas_sonic_pense_bem.json";
import question25Image from "../assets/questions/questao_25.png";

const QUESTION_IMAGES = {
  "questao_25.png": question25Image,
};

export const QUESTIONS = rawQuestions.map((question, index) => ({
  id: question.id ?? index + 1,
  theme: question.tema ?? "Sonic Pense Bem",
  question: question.pergunta,
  options: question.opcoes,
  answer: question.resposta,
  image: question.imagem ? QUESTION_IMAGES[question.imagem] : null,
}));

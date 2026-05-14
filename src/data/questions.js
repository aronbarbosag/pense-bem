import rawQuestions from "./perguntas_sonic_pense_bem.json";
import question25Image from "../assets/questions/questao_25.png";
import question27282930Image from '../assets/questions/questao_27_28_29_30.png'
import question31a38Image from '../assets/questions/questao_31_a_38.png'
import question12Image from '../assets/questions/questao_12.png'
import question51a56Image from '../assets/questions/questao_51_a_56.png'
import question39Image from '../assets/questions/questao_39.png'
import question98a103Image from '../assets/questions/questao_98_a_103.png'

const QUESTION_IMAGES = {
  "questao_25.png": question25Image,
  "questao_27_28_29_30.png": question27282930Image,
  "questao_31_a_38.png": question31a38Image,
  "questao_12.png": question12Image,
  "questao_51_a_56.png": question51a56Image,
  "questao_39.png": question39Image,
  'questao_98_a_103.png':question98a103Image
};

export const QUESTIONS = rawQuestions.map((question, index) => ({
  id: question.id ?? index + 1,
  theme: question.tema ?? "Sonic Pense Bem",
  question: question.pergunta,
  options: question.opcoes,
  answer: question.resposta,
  image: question.imagem ? QUESTION_IMAGES[question.imagem] : null,
}));

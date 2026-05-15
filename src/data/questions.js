import rawQuestions from "./perguntas_sonic_pense_bem.json";
import question25Image from "../assets/questions/questao_25.jpg";
import question27282930Image from '../assets/questions/questao_27_28_29_30.jpg'
import question31a38Image from '../assets/questions/questao_31_a_38.jpg'
import question12Image from '../assets/questions/questao_12.jpg'
import question51a56Image from '../assets/questions/questao_51_a_56.jpg'
import question39Image from '../assets/questions/questao_39.jpg'
import question98a103Image from '../assets/questions/questao_98_a_103.jpg'
import question87a90Image from '../assets/questions/questao_87_a_90.jpg'
import question57a59Image from '../assets/questions/questão_57_a_59.png'

const QUESTION_IMAGES = {
  "questao_25.jpg": question25Image,
  "questao_27_28_29_30.jpg": question27282930Image,
  "questao_31_a_38.jpg": question31a38Image,
  "questao_12.jpg": question12Image,
  "questao_51_a_56.jpg": question51a56Image,
  "questao_39.jpg": question39Image,
  'questao_98_a_103.jpg': question98a103Image,
  'questao_87_a_90.jpg': question87a90Image,
  'questao_57_a_59.png': question57a59Image,
};

export const QUESTIONS = rawQuestions.map((question, index) => ({
  id: question.id ?? index + 1,
  theme: question.tema ?? "Sonic Pense Bem",
  question: question.pergunta,
  options: question.opcoes,
  answer: question.resposta,
  image: question.imagem ? QUESTION_IMAGES[question.imagem] : null,
}));

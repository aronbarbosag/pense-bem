import rawQuestions from "./perguntas_sonic_pense_bem.json";
import question25Image from "../assets/questions/questao_25.jpg";
import question27282930Image from '../assets/questions/questao_27_28_29_30.jpg'
import question31a38Image from '../assets/questions/questao_31_a_38.jpg'
import question12Image from '../assets/questions/questao_12.jpg'
import question51a56Image from '../assets/questions/questao_51_a_56.jpg'
import question39Image from '../assets/questions/questao_39.jpg'
import question98a103Image from '../assets/questions/questao_98_a_103.jpg'
import question87a90Image from '../assets/questions/questao_87_a_90.jpg'
import question57a59Image from '../assets/questions/questao_57_a_59.jpg'
import question141a146Image from '../assets/questions/questao_141_a_146.jpg'
import question147a150Image from '../assets/questions/questao_147_a_150.jpg'

const QUESTION_IMAGES = {
  "questao_25.jpg": question25Image,
  "questao_27_28_29_30.jpg": question27282930Image,
  "questao_31_a_38.jpg": question31a38Image,
  "questao_12.jpg": question12Image,
  "questao_51_a_56.jpg": question51a56Image,
  "questao_39.jpg": question39Image,
  'questao_98_a_103.jpg': question98a103Image,
  'questao_87_a_90.jpg': question87a90Image,
  'questao_57_a_59.jpg': question57a59Image,
  'questão_57_a_59.jpg': question57a59Image,
  'questao_141_a_146.jpg': question141a146Image,
  'questao_147_a_150.jpg': question147a150Image,
};

export const QUESTIONS = rawQuestions.map((rawQuestion, rawQuestionIndex) => ({
  id: rawQuestion.id ?? rawQuestionIndex + 1,
  theme: rawQuestion.tema ?? "Sonic Pense Bem",
  question: rawQuestion.pergunta,
  options: rawQuestion.opcoes,
  answer: rawQuestion.resposta,
  image: rawQuestion.imagem ? QUESTION_IMAGES[rawQuestion.imagem] : null,
}));

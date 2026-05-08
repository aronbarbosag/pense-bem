export class Question {

  constructor(id, pergunta, resposta, opcoes, metadata = {}) {
    this.id = id;
    this.pergunta = pergunta;
    this.resposta = resposta;
    this.opcoes = opcoes;
    this.theme = metadata.theme ?? "Sonic Pense Bem";
    this.image = metadata.image ?? null;

  }

  get question() {
    return this.pergunta;
  }

  get answer() {
    return this.resposta;
  }

  get options() {
    return this.opcoes;
  }

  isRightAnswer(answer) {
    this.validateAnswer(answer);
    return this.resposta === answer;
  }

  validateAnswer(answer) {
    if (!this.opcoes.includes(answer)) {
      throw new Error('Opção inválida');
    }

  }



}

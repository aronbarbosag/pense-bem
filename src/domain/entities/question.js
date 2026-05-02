export class Question {

      constructor(id, pergunta, resposta, opcoes) {
        this.id = id;
        this.pergunta = pergunta;
        this.resposta = resposta;
        this.opcoes = opcoes;

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

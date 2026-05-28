import { Question } from "../src/domain/entities/question";
import { Points } from "../src/domain/entities/points";
import { Quiz } from "../src/domain/entities/quiz";

describe('Deve retonar a resposta correta', () => {
  it('Deve retornar a resposta correta', () => {
    const question = new Question(1, 'Qual é a capital da França?', 'Paris', ['Paris', 'Londres', 'Berlim', 'Roma'])
    expect(question.isRightAnswer('Londres')).toBe(false);
    expect(question.isRightAnswer('Paris')).toBe(true);
  });

  it('Deve lançar um erro para uma opção inválida', () => {
    const question = new Question(1, 'Qual é a capital da França?', 'Paris', ['Paris', 'Londres', 'Berlim', 'Roma']);
    expect(() => question.isRightAnswer('Madrid')).toThrow('Opção inválida');
  });

  it('Deve registrar os pontos corretamente', () => {
    const points = new Points();
    expect(points.getTotal()).toBe(0);
    points.addPoints();
    expect(points.getTotal()).toBe(1);
    points.addPoints();
    expect(points.getTotal()).toBe(2);
    points.resetPoints();
    expect(points.getTotal()).toBe(0);
  });

  it('Deve validar o funcionamento do quiz', () => {
    const question1 = new Question(1, 'Qual é a capital da França?', 'Paris', ['Paris', 'Londres', 'Berlim', 'Roma']);
    const question2 = new Question(2, 'Qual é a capital da Alemanha?', 'Berlim', ['Paris', 'Londres', 'Berlim', 'Roma']);
    const question3 = new Question(3, 'Qual é a capital da Itália?', 'Roma', ['Paris', 'Londres', 'Berlim', 'Roma']);
    const question4 = new Question(4, 'Qual é a capital da Espanha?', 'Madrid', ['Paris', 'Londres', 'Madrid', 'Roma']);
    const question5 = new Question(5, 'Qual é a capital do Reino Unido?', 'Londres', ['Paris', 'Londres', 'Berlim', 'Roma']);
    const quiz = new Quiz([question1, question2, question3, question4, question5]);
    expect(quiz.getCurrentQuestion()).toBe(question1);
    // ACERTANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS
    quiz.answerCurrentQuestion('Paris');
    expect(quiz.points.getTotal()).toBe(3);
    expect(quiz.mistakes).toBe(0);
    expect(quiz.getCurrentQuestion()).toBe(question2);
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE ERROS, CONTINUA NA MESMA PERGUNTA CASO NAO ERRE 3X +
    quiz.answerCurrentQuestion('Londres');
    expect(quiz.points.getTotal()).toBe(3);
    expect(quiz.mistakes).toBe(1);
    expect(quiz.getCurrentQuestion()).toBe(question2);
    // ACERTANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS (MESMA QUESTAO)
    quiz.answerCurrentQuestion('Berlim');
    expect(quiz.points.getTotal()).toBe(5);
    expect(quiz.mistakes).toBe(0);
    expect(quiz.getCurrentQuestion()).toBe(question3);
    // NOVA QUESTAO (3)
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE ERROS
    quiz.answerCurrentQuestion('Londres');
    expect(quiz.points.getTotal()).toBe(5);
    expect(quiz.mistakes).toBe(1);
    expect(quiz.getCurrentQuestion()).toBe(question3);
    //  MESMA QUESTAO (3) 2X ERROS
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS
    quiz.answerCurrentQuestion('Londres');
    expect(quiz.points.getTotal()).toBe(5);
    expect(quiz.mistakes).toBe(2);
    expect(quiz.getCurrentQuestion()).toBe(question3);

    // MESMA QUESTAO (3) 3X ERROS, DEVE AVANÇAR PARA A PRÓXIMA QUESTÃO
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE ERROS
    quiz.answerCurrentQuestion('Londres');
    expect(quiz.points.getTotal()).toBe(5);
    expect(quiz.mistakes).toBe(0);
    expect(quiz.getCurrentQuestion()).toBe(question4);
  })

  it('Deve avançar para a próxima pergunta após 3 erros', () => {
    const question1 = new Question(1, 'Qual é a capital da França?', 'Paris', ['Paris', 'Londres', 'Berlim', 'Roma']);
    const question2 = new Question(2, 'Qual é a capital da Alemanha?', 'Berlim', ['Paris', 'Londres', 'Berlim', 'Roma']);
    const question3 = new Question(3, 'Qual é a capital da Itália?', 'Roma', ['Paris', 'Londres', 'Berlim', 'Roma']);
    const quiz = new Quiz([question1, question2, question3]);
    expect(quiz.getCurrentQuestion()).toBe(question1);
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE ERROS
    quiz.answerCurrentQuestion('Londres');
    expect(quiz.mistakes).toBe(1);
    expect(quiz.getCurrentQuestion()).toBe(question1);
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE ERROS
    quiz.answerCurrentQuestion('Berlim');
    expect(quiz.mistakes).toBe(2);
    expect(quiz.getCurrentQuestion()).toBe(question1);
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE ERROS, DEVE AVANÇAR PARA A PRÓXIMA QUESTÃO
    quiz.answerCurrentQuestion('Roma');
    expect(quiz.mistakes).toBe(0);
    expect(quiz.getCurrentQuestion()).toBe(question2);
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE ERROS, DEVE AVANÇAR PARA A PRÓXIMA QUESTÃO
    quiz.answerCurrentQuestion('Roma');
    expect(quiz.mistakes).toBe(1);
    expect(quiz.getCurrentQuestion()).toBe(question2);

  });

  it('Deve retornar a pontuação correta após várias respostas', () => {
    const question1 = new Question(1, 'Qual é a capital da França?', 'Paris', ['Paris', 'Londres', 'Berlim', 'Roma']);
    const question2 = new Question(2, 'Qual é a capital da Alemanha?', 'Berlim', ['Paris', 'Londres', 'Berlim', 'Roma']);
    const question3 = new Question(3, 'Qual é a capital da Itália?', 'Roma', ['Paris', 'Londres', 'Berlim', 'Roma']);
    const question4 = new Question(4, 'Qual é a capital da Espanha?', 'Madrid', ['Paris', 'Londres', 'Madrid', 'Roma']);
    const question5 = new Question(5, 'Qual é a capital do Reino Unido?', 'Londres', ['Paris', 'Londres', 'Berlim', 'Roma']);
    const question6 = new Question(6, 'Qual é a capital da Rússia?', 'Moscou', ['Paris', 'Londres', 'Moscou', 'Roma']);
    const question7 = new Question(7, 'Qual é a capital do Japão?', 'Tóquio', ['Paris', 'Londres', 'Tóquio', 'Roma']);
    const question8 = new Question(8, 'Qual é a capital da China?', 'Pequim', ['Paris', 'Londres', 'Pequim', 'Roma']);
    const question9 = new Question(9, 'Qual é a capital da Índia?', 'Nova Délhi', ['Paris', 'Londres', 'Nova Délhi', 'Roma']);
    const question10 = new Question(10, 'Qual é a capital do Brasil?', 'Brasília', ['Paris', 'Londres', 'Brasília', 'Roma']);
    const quiz = new Quiz([question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]);
    // ACERTANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS
    quiz.answerCurrentQuestion('Paris');
    expect(quiz.points.getTotal()).toBe(3);
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE ERROS
    quiz.answerCurrentQuestion('Londres');
    expect(quiz.points.getTotal()).toBe(3);
    // ACERTANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS (MESMA QUESTAO)
    quiz.answerCurrentQuestion('Berlim');
    expect(quiz.points.getTotal()).toBe(5);
    // NOVA QUESTAO (3)
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE ERROS
    quiz.answerCurrentQuestion('Londres');
    expect(quiz.points.getTotal()).toBe(5);
    //  MESMA QUESTAO (3) 2X ERROS
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS
    quiz.answerCurrentQuestion('Londres');
    expect(quiz.points.getTotal()).toBe(5);
    // MESMA QUESTAO (3) 3X ERROS, DEVE AVANÇAR PARA A PRÓXIMA QUESTÃO
    // ERRANDO A RESPOSTA PARA TESTAR O CONTADOR DE ERROS
    quiz.answerCurrentQuestion('Londres');
    expect(quiz.points.getTotal()).toBe(5);
    // NOVA QUESTAO (4)
    // ACERTANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS
    quiz.answerCurrentQuestion('Madrid');
    expect(quiz.points.getTotal()).toBe(8);
    // NOVA QUESTAO (5)
    // ACERTANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS
    quiz.answerCurrentQuestion('Londres');
    expect(quiz.points.getTotal()).toBe(11);
    // NOVA QUESTAO (6)
    // ACERTANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS
    quiz.answerCurrentQuestion('Moscou');
    expect(quiz.points.getTotal()).toBe(14);
    // NOVA QUESTAO (7)
    // ACERTANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS
    quiz.answerCurrentQuestion('Tóquio');
    expect(quiz.points.getTotal()).toBe(17);
    // NOVA QUESTAO (8)
    // ACERTANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS
    quiz.answerCurrentQuestion('Pequim');
    expect(quiz.points.getTotal()).toBe(20);
    // NOVA QUESTAO (9)
    // ACERTANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS
    quiz.answerCurrentQuestion('Nova Délhi');
    expect(quiz.points.getTotal()).toBe(23);
    // NOVA QUESTAO (10)
    // ACERTANDO A RESPOSTA PARA TESTAR O CONTADOR DE PONTOS
    quiz.answerCurrentQuestion('Brasília');
    expect(quiz.points.getTotal()).toBe(26);
  });
});

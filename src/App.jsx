import { useMemo, useState } from 'react'
import './App.css'
import heroImg from './assets/hero.png'
import questionsData from './resources/perguntas_sonic_pense_bem.json'
import { Quiz } from './domain/entities/quiz'
import { Question } from './domain/entities/question'

const OPTION_LABELS = ['A', 'B', 'C', 'D']
const DEFAULT_QUESTIONS_LIMIT = 30

function createDefaultQuiz() {
  const questions = questionsData
    .slice(0, DEFAULT_QUESTIONS_LIMIT)
    .map((question) => new Question(
      question.id,
      question.pergunta,
      question.resposta,
      question.opcoes,
    ))

  return new Quiz(questions)
}

function App() {
  const quiz = useMemo(createDefaultQuiz, [])
  const [isStopped, setIsStopped] = useState(false)
  const [lastAnswer, setLastAnswer] = useState('')
  const [, refreshScreen] = useState(0)

  const currentQuestion = quiz.getCurrentQuestion()
  const isFinished = isStopped || quiz.isQuizFinished()
  const currentQuestionNumber = Math.min(
    quiz.currentQuestionIndex + 1,
    quiz.questions.length,
  )

  function handleAnswer(option) {
    const wasCorrect = currentQuestion.isRightAnswer(option)

    quiz.answerCurrentQuestion(option)
    setLastAnswer(wasCorrect ? 'Resposta correta!' : 'Resposta incorreta.')
    refreshScreen((currentValue) => currentValue + 1)
  }

  function handleStopQuiz() {
    setIsStopped(true)
    setLastAnswer('Jogo finalizado.')
  }

  return (
    <main className="app-shell">
      <section className="game-panel" aria-labelledby="quiz-title">
        <div className="quiz-header">
          <div>
            <p className="eyebrow">Pense Bem</p>
            <h1 id="quiz-title">Quiz do Sonic</h1>
          </div>

          <img className="hero-image" src={heroImg} alt="Sonic" />
        </div>

        <div className="status-bar" aria-label="Status do jogo">
          <div>
            <span className="status-label">Pergunta</span>
            <strong>{currentQuestionNumber}/{quiz.questions.length}</strong>
          </div>
          <div>
            <span className="status-label">Erros</span>
            <strong>{quiz.mistakes}/3</strong>
          </div>
          <div className="points-box">
            <span className="status-label">Pontos</span>
            <strong>{quiz.points.getPoint()}</strong>
          </div>
        </div>

        {isFinished ? (
          <div className="finished-area" role="status">
            <h2>{isStopped ? 'Jogo encerrado' : 'Fim do quiz'}</h2>
            <p>Pontuação final: {quiz.points.getPoint()} pontos</p>
          </div>
        ) : (
          <div className="question-area">
            <p className="question-text">{currentQuestion.pergunta}</p>

            <div className="options-grid" aria-label="Opções de resposta">
              {currentQuestion.opcoes.map((option, index) => (
                <button
                  className="option-button"
                  key={`${currentQuestion.id}-${option}`}
                  type="button"
                  onClick={() => handleAnswer(option)}
                >
                  <span>{OPTION_LABELS[index]}</span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <footer className="game-actions">
          <p aria-live="polite">{lastAnswer}</p>
          <button
            className="stop-button"
            type="button"
            onClick={handleStopQuiz}
            disabled={isFinished}
          >
            Finalizar jogo
          </button>
        </footer>
      </section>
    </main>
  )
}

export default App

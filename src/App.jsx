import { Image, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { BOOK_CODES } from "./constants/books";
import { getTotalScore } from "./services/scoreStorage";
import { useQuizGame } from "./hooks/useQuizGame";
import shadowMascot from "./assets/shadow.gif";
import sonicMascot from "./assets/sonic.gif";
import sonicDancingMascot from "./assets/sonic_dancing.gif";

const ANSWER_LETTERS = ["A", "B", "C", "D"];

const getTopLabel = ({ completedBookResult, currentQuestion, isPlaying, view }) => {
  if (isPlaying && currentQuestion) return `Questao ${String(currentQuestion.id).padStart(3, "0")}`;
  if (view === "how") return "Como Jogar";
  if (view === "scores") return "Pontuacoes";
  if (view === "complete" && completedBookResult) return `Livro ${completedBookResult.bookCode}`;
  return "Pense Bem";
};

function AppButton({ children, disabled = false, onPress, tone = "cyan" }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[`${tone}Button`],
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
    >
      <Text style={[styles.buttonText, styles[`${tone}ButtonText`]]}>{children}</Text>
    </Pressable>
  );
}

function TopBar({ label, music, onToggleMusic, score }) {
  return (
    <View style={styles.topBar}>
      <View>
        <Text style={styles.kicker}>Tec Toy Digital</Text>
        <Text style={styles.topLabel}>{label}</Text>
      </View>
      <View style={styles.topActions}>
        {score !== undefined && (
          <View style={styles.scorePill}>
            <Text style={styles.scorePillLabel}>Pontos</Text>
            <Text style={styles.scorePillValue}>{score}</Text>
          </View>
        )}
        <Pressable accessibilityRole="switch" accessibilityState={{ checked: music }} onPress={onToggleMusic} style={styles.iconButton}>
          <Text style={styles.iconButtonText}>{music ? "Som" : "Mudo"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Mascot({ dark = false, dancing = false }) {
  const source = dark ? shadowMascot : dancing ? sonicDancingMascot : sonicMascot;
  return (
    <View style={[styles.mascotRing, dark && styles.darkMascotRing]}>
      <Image resizeMode="contain" source={source} style={styles.mascotImage} />
    </View>
  );
}

function MenuScreen({ game }) {
  return (
    <View style={styles.screenContent}>
      <Mascot dark={game.isSecretMascotUnlocked} />
      <Text style={styles.title}>Pense{"\n"}Bem</Text>
      <Text style={styles.subtitle}>Uma aventura cientifica com Sonic</Text>

      <Text style={styles.sectionLabel}>Codigos dos livros</Text>
      <View style={styles.bookGrid}>
        {BOOK_CODES.map((bookCode) => (
          <Pressable
            accessibilityRole="button"
            key={bookCode}
            onPress={() => game.startBook(bookCode)}
            style={({ pressed }) => [
              styles.bookButton,
              game.bookCode === bookCode && styles.selectedBookButton,
              pressed && styles.pressedButton,
            ]}
          >
            <Text style={[styles.bookButtonText, game.bookCode === bookCode && styles.selectedBookButtonText]}>
              {bookCode}
            </Text>
          </Pressable>
        ))}
      </View>

      <AppButton onPress={() => game.startBook(game.bookCode)} tone="amber">Jogar livro {game.bookCode}</AppButton>
      <AppButton onPress={() => game.setView("how")} tone="cyan">Como jogar</AppButton>
      <AppButton onPress={() => game.setView("scores")} tone="pink">Pontuacoes</AppButton>
      <Text style={styles.footerText}>6 programas - 150 questoes - progresso local</Text>
    </View>
  );
}

function HowToPlayScreen({ game }) {
  return (
    <View style={styles.screenContent}>
      <Mascot dancing />
      <Text style={styles.screenTitle}>Como jogar</Text>
      {[
        "Escolha um codigo de livro e responda as perguntas em sequencia.",
        "Cada questao permite ate 3 tentativas antes de avancar automaticamente.",
        "Acertos valem 3, 2 ou 1 ponto conforme a tentativa.",
        "O livro 026 mistura perguntas aleatorias dos outros livros.",
      ].map((instruction, index) => (
        <View key={instruction} style={styles.instructionRow}>
          <Text style={styles.instructionNumber}>{index + 1}</Text>
          <Text style={styles.instructionText}>{instruction}</Text>
        </View>
      ))}
      <AppButton onPress={() => game.setView("menu")} tone="cyan">Voltar</AppButton>
    </View>
  );
}

function ScoresScreen({ game }) {
  const totalScore = getTotalScore(game.highestScoresByBookCode);

  return (
    <View style={styles.screenContent}>
      <Text style={styles.screenTitle}>Pontuacoes</Text>
      <View style={styles.totalScoreBox}>
        <Text style={styles.totalScoreLabel}>Total acumulado</Text>
        <Text style={styles.totalScoreValue}>{totalScore}</Text>
      </View>
      {BOOK_CODES.map((bookCode) => (
        <View key={bookCode} style={styles.scoreRow}>
          <Text style={styles.scoreBook}>Livro {bookCode}</Text>
          <Text style={styles.scoreValue}>{game.highestScoresByBookCode[bookCode] ?? 0} pts</Text>
        </View>
      ))}
      <AppButton onPress={() => game.setView(game.completedBookResult ? "complete" : "menu")} tone="cyan">Voltar</AppButton>
    </View>
  );
}

function CompletionScreen({ game }) {
  return (
    <View style={styles.screenContent}>
      <Mascot dancing />
      <Text style={styles.screenTitle}>Livro finalizado</Text>
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Livro {game.completedBookResult?.bookCode}</Text>
        <Text style={styles.resultScore}>{game.completedBookResult?.score ?? 0}</Text>
        <Text style={styles.resultText}>Melhor pontuacao salva neste aparelho.</Text>
      </View>
      <AppButton onPress={() => game.setView("scores")} tone="amber">Ver pontuacoes</AppButton>
      <AppButton onPress={game.resetToMenu} tone="cyan">Menu inicial</AppButton>
    </View>
  );
}

function GameScreen({ game }) {
  const question = game.currentQuestion;
  if (!question) return null;

  return (
    <View style={styles.screenContent}>
      <View style={styles.gameStats}>
        <View>
          <Text style={styles.statLabel}>Livro</Text>
          <Text style={styles.statValue}>{game.bookCode}</Text>
        </View>
        <View>
          <Text style={styles.statLabel}>Progresso</Text>
          <Text style={styles.statValue}>{game.questionIndex + 1}/{game.totalQuestions}</Text>
        </View>
        <View>
          <Text style={styles.statLabel}>Erros</Text>
          <Text style={styles.statValue}>{game.errors}/3</Text>
        </View>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionTheme}>{question.theme}</Text>
        <Text style={styles.questionText}>{question.question}</Text>
        {question.image && <Image resizeMode="contain" source={question.image} style={styles.questionImage} />}
      </View>

      <View style={styles.answers}>
        {question.options.map((option, index) => {
          const isSelected = game.selectedAnswerOption === option;
          const isCorrect = game.feedback === "correct" && isSelected;
          const isWrong = game.feedback === "wrong" && isSelected;

          return (
            <Pressable
              accessibilityRole="button"
              disabled={Boolean(game.feedback)}
              key={option}
              onPress={() => game.answerQuestion(option)}
              style={({ pressed }) => [
                styles.answerButton,
                isCorrect && styles.correctAnswer,
                isWrong && styles.wrongAnswer,
                pressed && !game.feedback && styles.pressedButton,
              ]}
            >
              <Text style={styles.answerLetter}>{ANSWER_LETTERS[index]}</Text>
              <Text style={styles.answerText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      {game.feedback && (
        <Text style={[styles.feedbackText, game.feedback === "correct" ? styles.correctFeedback : styles.wrongFeedback]}>
          {game.feedback === "correct" ? "Resposta certa!" : "Tente de novo na proxima jogada."}
        </Text>
      )}

      <AppButton onPress={game.resetToMenu} tone="pink">Finalizar rodada</AppButton>
    </View>
  );
}

export default function App() {
  const game = useQuizGame();
  const label = getTopLabel({
    completedBookResult: game.completedBookResult,
    currentQuestion: game.currentQuestion,
    isPlaying: game.isPlaying,
    view: game.view,
  });

  return (
    <SafeAreaView style={[styles.safeArea, game.isSecretMascotUnlocked && styles.darkSafeArea]}>
      <StatusBar barStyle="light-content" />
      <TopBar label={label} music={game.music} onToggleMusic={game.toggleMusic} score={game.isPlaying ? game.score : undefined} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {game.view === "menu" && <MenuScreen game={game} />}
        {game.view === "how" && <HowToPlayScreen game={game} />}
        {game.view === "scores" && <ScoresScreen game={game} />}
        {game.view === "complete" && <CompletionScreen game={game} />}
        {game.view === "game" && <GameScreen game={game} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070711",
  },
  darkSafeArea: {
    backgroundColor: "#050309",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 36,
  },
  topBar: {
    alignItems: "center",
    borderBottomColor: "rgba(0,246,255,0.14)",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  kicker: {
    color: "#7dd3fc",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  topLabel: {
    color: "#e0f2fe",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 2,
  },
  topActions: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    borderColor: "rgba(125,211,252,0.42)",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  iconButtonText: {
    color: "#7dd3fc",
    fontSize: 12,
    fontWeight: "900",
  },
  scorePill: {
    alignItems: "center",
    borderColor: "rgba(251,191,36,0.48)",
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 62,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  scorePillLabel: {
    color: "#fbbf24",
    fontSize: 9,
    fontWeight: "800",
  },
  scorePillValue: {
    color: "#fef3c7",
    fontSize: 18,
    fontWeight: "900",
  },
  screenContent: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  mascotRing: {
    alignSelf: "center",
    backgroundColor: "rgba(0,246,255,0.08)",
    borderColor: "rgba(0,246,255,0.34)",
    borderRadius: 110,
    borderWidth: 2,
    height: 190,
    justifyContent: "center",
    marginBottom: 14,
    width: 190,
  },
  darkMascotRing: {
    backgroundColor: "rgba(244,63,94,0.1)",
    borderColor: "rgba(244,63,94,0.44)",
  },
  mascotImage: {
    height: 155,
    width: "100%",
  },
  title: {
    color: "#67e8f9",
    fontSize: 58,
    fontWeight: "900",
    lineHeight: 60,
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#fbbf24",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 14,
    textAlign: "center",
    textTransform: "uppercase",
  },
  sectionLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 10,
    marginTop: 28,
    textAlign: "center",
    textTransform: "uppercase",
  },
  bookGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  bookButton: {
    alignItems: "center",
    borderColor: "rgba(103,232,249,0.38)",
    borderRadius: 8,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    width: 78,
  },
  selectedBookButton: {
    backgroundColor: "rgba(251,191,36,0.16)",
    borderColor: "#fbbf24",
  },
  bookButtonText: {
    color: "#67e8f9",
    fontSize: 16,
    fontWeight: "900",
  },
  selectedBookButtonText: {
    color: "#fef3c7",
  },
  button: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 10,
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  amberButton: {
    backgroundColor: "#fbbf24",
    borderColor: "#fbbf24",
  },
  cyanButton: {
    backgroundColor: "rgba(8,145,178,0.16)",
    borderColor: "rgba(103,232,249,0.52)",
  },
  pinkButton: {
    backgroundColor: "rgba(219,39,119,0.12)",
    borderColor: "rgba(244,114,182,0.54)",
  },
  disabledButton: {
    opacity: 0.55,
  },
  pressedButton: {
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
  },
  amberButtonText: {
    color: "#111827",
  },
  cyanButtonText: {
    color: "#67e8f9",
  },
  pinkButtonText: {
    color: "#f472b6",
  },
  footerText: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 18,
    textAlign: "center",
    textTransform: "uppercase",
  },
  screenTitle: {
    color: "#e0f2fe",
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 18,
    textAlign: "center",
    textTransform: "uppercase",
  },
  instructionRow: {
    alignItems: "center",
    backgroundColor: "rgba(15,23,42,0.78)",
    borderColor: "rgba(148,163,184,0.16)",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    marginBottom: 10,
    padding: 14,
  },
  instructionNumber: {
    color: "#fbbf24",
    fontSize: 24,
    fontWeight: "900",
    width: 32,
  },
  instructionText: {
    color: "#cbd5e1",
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
  },
  totalScoreBox: {
    alignItems: "center",
    borderColor: "rgba(251,191,36,0.4)",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 18,
    padding: 18,
  },
  totalScoreLabel: {
    color: "#fbbf24",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  totalScoreValue: {
    color: "#fef3c7",
    fontSize: 46,
    fontWeight: "900",
  },
  scoreRow: {
    alignItems: "center",
    backgroundColor: "rgba(15,23,42,0.78)",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 16,
  },
  scoreBook: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "900",
  },
  scoreValue: {
    color: "#67e8f9",
    fontSize: 16,
    fontWeight: "900",
  },
  resultBox: {
    alignItems: "center",
    borderColor: "rgba(103,232,249,0.35)",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: 22,
  },
  resultLabel: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  resultScore: {
    color: "#67e8f9",
    fontSize: 60,
    fontWeight: "900",
  },
  resultText: {
    color: "#cbd5e1",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  gameStats: {
    borderColor: "rgba(103,232,249,0.2)",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    padding: 14,
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  statValue: {
    color: "#e0f2fe",
    fontSize: 18,
    fontWeight: "900",
  },
  questionCard: {
    backgroundColor: "rgba(15,23,42,0.86)",
    borderColor: "rgba(148,163,184,0.18)",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  questionTheme: {
    color: "#fbbf24",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  questionText: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 30,
  },
  questionImage: {
    alignSelf: "center",
    borderRadius: 8,
    height: 190,
    marginTop: 14,
    width: "100%",
  },
  answers: {
    gap: 10,
    marginTop: 16,
  },
  answerButton: {
    alignItems: "center",
    backgroundColor: "rgba(8,47,73,0.6)",
    borderColor: "rgba(103,232,249,0.25)",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 58,
    padding: 12,
  },
  correctAnswer: {
    backgroundColor: "rgba(22,163,74,0.24)",
    borderColor: "#22c55e",
  },
  wrongAnswer: {
    backgroundColor: "rgba(220,38,38,0.24)",
    borderColor: "#f43f5e",
  },
  answerLetter: {
    color: "#111827",
    backgroundColor: "#67e8f9",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 11,
    paddingVertical: 7,
    textAlign: "center",
  },
  answerText: {
    color: "#e0f2fe",
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 22,
  },
  feedbackText: {
    fontSize: 15,
    fontWeight: "900",
    marginTop: 14,
    textAlign: "center",
    textTransform: "uppercase",
  },
  correctFeedback: {
    color: "#86efac",
  },
  wrongFeedback: {
    color: "#fda4af",
  },
});

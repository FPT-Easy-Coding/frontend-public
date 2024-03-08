import {
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Progress,
  Text,
  Transition,
} from "@mantine/core";
import {
  CORRECT_SENTENCES,
  INCORRECT_SENTENCES,
  QuizData,
} from "../../../pages/study-mode/learn/LearnPage";
import { useContext, useEffect, useMemo, useState } from "react";
import { StudyModeContext } from "../../../store/study-mode-context";
import LearnSummary from "./LearnSummary";
import { QuizInfoContext } from "../../../store/quiz-info-context";
import EndScreen from "./EndScreen";

const QUESTION_PER_ROUND = 5;

function MultipleChoices({ data }: { data: QuizData }) {
  const { changeRoundIndicator, settings } = useContext(StudyModeContext);
  const { assignQuizInfo } = useContext(QuizInfoContext);
  const [quizData, setQuizData] = useState([...(data.questions ?? [])]);

  const CORRECT_SENTENCE = CORRECT_SENTENCES.sort(() => Math.random() - 0.5)[0];
  const INCORRECT_SENTENCE = INCORRECT_SENTENCES.sort(
    () => Math.random() - 0.5
  )[0];
  const applySortingOrShuffling = () => {
    let mutatedData = [...quizData];

    if (settings.learn.isShuffled) {
      mutatedData = mutatedData.sort(() => 0.5 - Math.random());
    } else if (settings.learn.isSorted) {
      mutatedData = mutatedData.sort((a, b) =>
        a.questionContent!.localeCompare(b.questionContent!)
      );
    } else {
      mutatedData = [...(data.questions ?? [])];
    }

    setQuizData(mutatedData);
  };

  useEffect(() => {
    assignQuizInfo({
      id: data?.quizId,
      name: data?.quizName,
      totalQuestion: data?.numberOfQuestions,
    });
    changeRoundIndicator(1);
  }, [data]);

  useEffect(() => {
    applySortingOrShuffling();
  }, [settings.learn.isShuffled, settings.learn.isSorted]);

  const [currentRound, setCurrentRound] = useState(0);
  const [currentGlobalQuestionIndex, setCurrentGlobalQuestionIndex] =
    useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // track selected answer
  const [userAnswers, setUserAnswers] = useState<string[]>([]); // track user answers
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<
    boolean | null
  >(null);
  const activeQuestionIndex = userAnswers.length; // get the index of the active question
  const isComplete = currentGlobalQuestionIndex === quizData.length; // check if all questions have been answered
  const roundsQuestions = useMemo(() => {
    // split the questions into rounds relaying on QUESTION_PER_ROUND
    const rounds = [];
    for (let i = 0; i < quizData.length; i += QUESTION_PER_ROUND) {
      rounds.push(quizData.slice(i, i + QUESTION_PER_ROUND));
    }
    return rounds;
  }, [quizData, QUESTION_PER_ROUND]);

  const isRoundComplete =
    activeQuestionIndex === roundsQuestions[currentRound].length;

  function handleSelectAnswer(selectedAnswer: string) {
    const correctAnswer = roundsQuestions[currentRound][
      activeQuestionIndex
    ]?.answers.find((answer) => answer.isCorrect);

    // Check if the selected answer is correct
    const isCorrect = selectedAnswer === correctAnswer?.content;

    // Update the selected answer
    setSelectedAnswer(selectedAnswer);

    if (isCorrect) {
      setIsAnsweredCorrectly(true);
      setTimeout(() => {
        setUserAnswers((prevUserAnswers) => {
          return [...prevUserAnswers, selectedAnswer];
        });
        setCurrentGlobalQuestionIndex(currentGlobalQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnsweredCorrectly(null);
        setIsRetrying(false);
      }, 1000);
    } else {
      setIsAnsweredCorrectly(false);
    }
  }

  function handleNextRound() {
    setCurrentRound((prevRound) => {
      const nextRound = prevRound + 1;
      changeRoundIndicator(nextRound + 1);
      return nextRound;
    });
    setUserAnswers([]);
  }

  function handleRetry() {
    setSelectedAnswer(null);
    setIsAnsweredCorrectly(null);
    setIsRetrying(true);
  }

  if (isComplete) {
    return <EndScreen />;
  }

  if (isRoundComplete) {
    return (
      <>
        <LearnSummary
          questionsData={
            roundsQuestions[currentRound] as [
              {
                questionContent: string | null;
                answers: [
                  { content: string | null; isCorrect: boolean | null }
                ];
              }
            ]
          }
          globalQuestionIndex={currentGlobalQuestionIndex}
          handleNextRound={handleNextRound}
        />
      </>
    );
  }

  return (
    <>
      <Progress
        value={
          (activeQuestionIndex / roundsQuestions[currentRound].length) * 100
        }
        size="xs"
      />
      <Container>
        <Paper shadow="lg" radius="md" withBorder p="xl" className="mt-3">
          <Group>
            <Text c={"dimmed"}>Question</Text>
            <Badge color="orange" className={isRetrying ? "block" : "hidden"}>
              Let's try again
            </Badge>
          </Group>
          <div className="mt-6 mb-16">
            <Text className="text-2xl">
              {
                roundsQuestions[currentRound][activeQuestionIndex]
                  ?.questionContent
              }
            </Text>
          </div>

          {isAnsweredCorrectly === null && (
            <Text c={"dimmed"}>Choose matching answer</Text>
          )}
          {isAnsweredCorrectly && (
            <Text c={"green"} className="font-bold">
              {CORRECT_SENTENCE}
            </Text>
          )}
          {isAnsweredCorrectly === false && (
            <Text c={"red"} className="font-bold">
              {INCORRECT_SENTENCE}
            </Text>
          )}

          <Grid className="mt-5">
            {roundsQuestions[currentRound][activeQuestionIndex]?.answers?.map(
              (answer, index) => (
                <Grid.Col span={6} key={index}>
                  <Button
                    variant={
                      isAnsweredCorrectly
                        ? answer.isCorrect // Check if it's the correct answer
                          ? "filled"
                          : "default"
                        : selectedAnswer === answer.content
                        ? "filled"
                        : "default"
                    }
                    color={
                      isAnsweredCorrectly
                        ? answer.isCorrect // Check if it's the correct answer
                          ? "green"
                          : undefined
                        : selectedAnswer === answer.content
                        ? "red"
                        : undefined
                    }
                    size="xl"
                    radius="md"
                    fullWidth
                    onClick={() => handleSelectAnswer(answer.content as string)}
                    styles={{
                      label: {
                        fontSize: "1rem",
                      },
                    }}
                    disabled={
                      isAnsweredCorrectly !== null || selectedAnswer !== null
                        ? selectedAnswer !== answer.content
                        : false
                    }
                  >
                    {answer.content}
                  </Button>
                </Grid.Col>
              )
            )}
          </Grid>
        </Paper>
      </Container>
      <Transition
        mounted={isAnsweredCorrectly === false}
        transition="slide-up"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Paper
            shadow="lg"
            radius="md"
            withBorder
            p="md"
            className="mt-3 absolute w-full bottom-0"
            style={styles}
          >
            <Group className="justify-evenly mx-3">
              <Text c={"dimmed"}>Press any key to try again</Text>
              <Button
                autoContrast
                variant="filled"
                radius={"lg"}
                color="red"
                onClick={handleRetry}
              >
                Try again
              </Button>
            </Group>
          </Paper>
        )}
      </Transition>
    </>
  );
}

export default MultipleChoices;

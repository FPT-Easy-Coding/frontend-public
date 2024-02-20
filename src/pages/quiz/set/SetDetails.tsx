import { Carousel, Embla } from "@mantine/carousel";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Progress,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Params, useLoaderData } from "react-router-dom";
import axios from "axios";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconUsers,
} from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./SetDetails.module.css";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "react-toastify";

interface SetDetails {
  userId: number | null;
  userImg: string | null;
  quizId: number | null;
  userName: string | null;
  userFirstName: string | null;
  userLastName: string | null;
  categoryId: number | null;
  categoryName: string | null;
  quizName: string | null;
  rate: number | undefined;
  numberOfQuestions: number | null;
  createAt: string | null;
  view: number | null;
  timeRecentViewQuiz: string | number | null;
  questions:
    | [
        {
          questionContent: string | null;
          answers: [
            {
              content: string | null;
              isCorrect: boolean | null;
            }
          ];
        }
      ]
    | null;
}
function SetDetails() {
  const loaderData = useLoaderData() as SetDetails;
  const questionsData = loaderData?.questions;
  const [isQuestion, setIsQuestion] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  if (!isAutoPlaying) {
    autoplay.current.stop();
  } else {
    autoplay.current.reset();
  }

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla]);

  function handleFlashcardClick() {
    setIsQuestion(!isQuestion);
  }

  useEffect(() => {
    isAutoPlaying
      ? toast.info("Flashcard autoplay is on")
      : toast.info("Flashcard autoplay is off");
  }, [isAutoPlaying]);

  const rows = questionsData?.map((question, index) => (
    <Paper shadow="md" radius="lg" p="xl" withBorder key={index}>
      <Group>
        <div className="basis-2/3">
          <Text>{question.questionContent}</Text>
        </div>
        <Divider orientation="vertical" />
        <div className="basis-1/4">
          <Text>
            {question.answers.map((answer) => (
              <Text key={answer.content} fw={700}>
                {answer.isCorrect && answer.content}
              </Text>
            ))}
          </Text>
        </div>
      </Group>
    </Paper>
  ));

  const flashcards = questionsData?.map((question, index) => (
    <Carousel.Slide>
      {isQuestion ? (
        <Paper
          shadow="md"
          radius="lg"
          p="xl"
          withBorder
          h={"100%"}
          className="flex flex-col items-center justify-center"
          key={index}
          onClick={() => handleFlashcardClick()}
        >
          <Text className="text-3xl text-justify" fw={600}>
            {question.questionContent}
          </Text>
        </Paper>
      ) : (
        <Paper
          shadow="md"
          radius="lg"
          p="xl"
          withBorder
          h={"100%"}
          className="flex flex-col items-center justify-center"
          key={index}
          onClick={() => handleFlashcardClick()}
        >
          {question.answers.map((answer) => (
            <Text className="text-3xl text-justify" fw={600}>
              {answer.isCorrect && answer.content}
            </Text>
          ))}
        </Paper>
      )}
    </Carousel.Slide>
  ));

  return (
    <>
      <Container>
        {/* infomation section */}
        <Stack>
          <Text c={"dimmed"} size="sm">
            {loaderData?.categoryName}
          </Text>
          <Title order={1}>{loaderData?.quizName}</Title>
          <Group>
            <Badge leftSection={<IconUsers size={14} />}>999 learners</Badge>
            <Rating size={"sm"} value={loaderData?.rate} fractions={2} readOnly/>
          </Group>
        </Stack>
        {/* Button section */}
        <Group className="mt-10">
          <Button.Group>
            <Button variant="filled">Flashcard</Button>
            <Button variant="filled">Learn</Button>
            <Button variant="filled">Practice</Button>
          </Button.Group>
        </Group>
        {/* Flashcard section */}
        <Carousel
          withIndicators
          align={"start"}
          height={500}
          className="mt-10 rounded-md"
          onSlideChange={() => {
            setIsQuestion(true);
          }}
          getEmblaApi={setEmbla}
          classNames={classes}
          plugins={[autoplay.current]}
        >
          {flashcards}
        </Carousel>
        <Group className="justify-between mt-5">
          <Progress value={scrollProgress} size="sm" className="basis-2/3" />
          <ActionIcon
            variant="subtle"
            size="lg"
            radius="xl"
            aria-label="autoplay"
            onClick={() => {
              setIsAutoPlaying(!isAutoPlaying);
            }}
          >
            {isAutoPlaying ? (
              <IconPlayerPause size={24} />
            ) : (
              <IconPlayerPlay size={24} />
            )}
          </ActionIcon>
        </Group>

        {/* Author section */}
        <Group className="mt-10">
          <Avatar
            src={loaderData?.userImg ? loaderData?.userImg : ""}
            size={"lg"}
          >
            {loaderData?.userFirstName!.charAt(0).toUpperCase() +
              loaderData?.userLastName!.charAt(0).toUpperCase()}
          </Avatar>

          <Stack gap={0}>
            <Text c={"dimmed"} size="sm">
              Created by
            </Text>
            <Text className="capitalize">
              {loaderData?.userFirstName + " " + loaderData?.userLastName}
            </Text>
          </Stack>
        </Group>

        {/* Question details */}
        <Group className="my-10">
          <Title order={3}>
            Terms in this set ({loaderData?.numberOfQuestions})
          </Title>
        </Group>
        <Stack>{rows}</Stack>
      </Container>
    </>
  );
}

export default SetDetails;

export async function loader({ params }: { params: Readonly<Params> }) {
  const { id } = params;
  try {
    const res = await axios
      .get(`http://localhost:8080/api/v1/quiz/get-quiz?id=${id}`)
      .catch(() => {
        throw new Error("Error while fetching data");
      });
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}

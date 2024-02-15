import { Carousel } from "@mantine/carousel";
import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Avatar,
  Flex,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./Carousel.module.css";

function RecentQuiz() {
  interface Quiz {
    quizId: string;
    quizName: string;
    numberOfQuestions: number;
    userName: string;
    view: number;
    timeRecentViewQuiz: string; // Change the type to string
    // Add other properties as needed
  }

  const [listQuiz, setListQuiz] = useState<Quiz[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/quiz/get-all-quiz')
      .then(res => {
        const sortedList = res && res.data ? res.data.sort((a: { timeRecentViewQuiz: string | number | Date; }, b: { timeRecentViewQuiz: string | number | Date; }) => {
          const currentTime = new Date().getTime();
          const timeA = new Date(a.timeRecentViewQuiz).getTime();
          const timeB = new Date(b.timeRecentViewQuiz).getTime();
          const diffA = Math.abs(currentTime - timeA);
          const diffB = Math.abs(currentTime - timeB);
          return diffA - diffB;
        }) : [];
        setListQuiz(sortedList);
      })
  }, []);

  const handleClickUpdateTime = async (quizId: any) => {
    await axios.put(`http://localhost:8080/api/v1/quiz/update-time-quiz/${quizId}`);
    alert("Update successful!");
  };

  const handleClickIncreaseView = async (quizId: any) => {
    alert("me");
    await axios.put(`http://localhost:8080/api/v1/quiz/increase-view/${quizId}`);
  };
  return (
    <>
      <div>
        <Carousel
          slideSize={"33.333333%"}
          height={"150px"}
          align={"start"}
          slideGap="lg"
          controlsOffset="xs"
          controlSize={30}
          dragFree
          classNames={classes}
        >
          {listQuiz.map((quiz, index) => (
            <Carousel.Slide key={index}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                component="a"
                className="h-full"
              >
                <Flex
                  className="flex-col px-5 h-full"
                  justify="space-between"
                  onClick={() => {
                    handleClickUpdateTime(quiz.quizId);
                    handleClickIncreaseView(quiz.quizId);
                  }}
                  onMouseEnter={() => {
                    document.body.style.cursor = "pointer";
                  }}
                  onMouseLeave={() => {
                    document.body.style.cursor = "auto";
                  }}
                >
                  <Card.Section>
                    <Stack className="gap-2">
                      <Text fw={500}>{quiz.quizName}</Text>
                      <Badge color="indigo">{quiz.numberOfQuestions} Question</Badge>
                    </Stack>
                  </Card.Section>
                  <Card.Section>
                    <Group gap={"xs"}>
                      <Avatar variant="filled" radius="xl" size="sm" />
                      <Text size="sm">{quiz.userName}</Text>
                    </Group>
                  </Card.Section>
                </Flex>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default RecentQuiz;

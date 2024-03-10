import { useEffect, useState } from "react";
import {
  Question,
  fetchQuestionData,
  fetchCommentsData,
  Comments,
} from "../../pages/class/ClassQuestionPage";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Group,
  Input,
  Menu,
  Paper,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { IconPencil, IconSend, IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import CommentSection from "./CommentSection";

function ClassQuestionDetail({ questionId }: { questionId: number }) {
  const [question, setQuestion] = useState<Question | null>(null); // Changed to single object, not an array
  const [comments, setComments] = useState<Comments[]>([]);
  const currentUserId = localStorage.uid;
  useEffect(() => {
    fetchQuestion(questionId);
    fetchComments(questionId);
  }, [questionId]);

  async function fetchQuestion(questionId: number) {
    try {
      const questionData = await fetchQuestionData(questionId);
      console.log("questions data from server: ", questionData);
      setQuestion(questionData); // Ensure questionData is an array

      // Fetch comments for each question
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  async function fetchComments(questionId: number) {
    console.log(`Fetching comments for question ID: ${questionId}`);

    try {
      const commentsData = await fetchCommentsData(questionId);
      console.log("Comments data from server: ", commentsData);
      // Check if commentsData is defined and not empty
      if (commentsData && commentsData.length > 0) {
        setComments((prevComments) => [...prevComments, ...commentsData]);
      } else {
        console.log("Comments not found for question ID:", questionId);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  // Check if question exists before rendering
  if (!question) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  return (
    <Container className="flex justify-center">
      <div className="mb-8" style={{ width: "90%" }}>
        <Paper
          className="shadow-lg rounded-md border p-6"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Group
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <Avatar
              src={null}
              alt={`Avatar of ${question.userFirstName} ${question.userLastName}`}
              size="lg"
            >
              {`${question.userFirstName
                .charAt(0)
                .toUpperCase()}${question.userLastName
                .charAt(0)
                .toUpperCase()}`}
            </Avatar>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                marginLeft: "1rem",
              }}
            >
              <Text className="font-semibold text-md">{`${question.userFirstName} ${question.userLastName}`}</Text>
              <Text className="text-xs">
                {format(question.createAt, "MM/dd/yyyy")}
              </Text>
            </div>
            <Text className="text-xs justify-end">
              {question.answered ? "Answered" : "Unanswered"}
            </Text>
            {question.userId == currentUserId && (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button
                    variant="white"
                    className=" text-black text-md justify-end"
                  >
                    ...
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconPencil style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconTrash style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
          <Divider size="xs" />
          <Stack className="my-5" style={{ marginBottom: "1rem" }}>
            <Text className="font-bold text-xl">{question.title}</Text>
            <Text className="font-normal text-sm">{question.content}</Text>
          </Stack>

          {/* Render answer section */}
          {question.answered && (
            <div className="bg-blue-100 p-4 rounded-md mb-4 flex justify-between items-center">
              <div>
                <Text className="font-semibold text-lg">Answer:</Text>
                <Text className="font-normal text-md">
                  {question.classroomAnswerResponse?.content}
                </Text>
              </div>
              {question.classroomAnswerResponse?.userId == currentUserId && (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button variant="light" className="bg-blue-100 text-black">
                      ...
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={
                        <IconPencil
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      leftSection={
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </div>
          )}
          <Divider my="md" />
          {/* Render comments for this question */}
          <CommentSection comments={comments} question={question} />

          <Group style={{ marginTop: "auto" }}>
            <Input radius="xl" placeholder="Comment" className="w-[90%]" />
            <Button variant="white">
              <IconSend
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            </Button>
          </Group>
        </Paper>
      </div>
    </Container>
  );
}

export default ClassQuestionDetail;

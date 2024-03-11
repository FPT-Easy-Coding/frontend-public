import { useEffect, useState } from "react";
import {
  Question,
  fetchQuestionData,
  fetchCommentsData,
  Comments,
} from "../../pages/class/ClassQuestionPage";
import {
  ActionIcon,
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
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { IconDots, IconPencil, IconSend, IconTrash } from "@tabler/icons-react";
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
    <Container className="container">
      <Paper withBorder radius="md" p={"xl"} shadow="md">
        <Group className="justify-between">
          <Group gap={"xs"}>
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
            <Stack gap={0}>
              <Text className="font-semibold text-md">{`${question.userFirstName} ${question.userLastName}`}</Text>
              <Text className="text-xs" c={"dimmed"}>
                {format(question.createAt, "MM/dd/yyyy")}
              </Text>
            </Stack>
          </Group>
          <Group>
            <Text className="text-xs justify-end" c={"yellow"}>
              {question.answered ? "Answered" : "Unanswered"}
            </Text>
            {question.userId == currentUserId && (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon variant="light" color="orange">
                    <IconDots size={14} />
                  </ActionIcon>
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
        </Group>
        <Divider size="xs" className="mt-5" />
        <Stack className="my-5">
          <Title order={4}>{question.title}</Title>
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
                      <IconPencil size={14} />
                    }
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconTrash size={14} />
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

        <Group className="mt-5">
          <TextInput
            placeholder="Comment about this question"
            className="grow"
          />
          <ActionIcon variant="subtle">
            <IconSend size={20} />
          </ActionIcon>
        </Group>
      </Paper>
    </Container>
  );
}

export default ClassQuestionDetail;

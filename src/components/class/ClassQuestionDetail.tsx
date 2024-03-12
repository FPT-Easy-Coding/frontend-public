import { useContext, useEffect, useState } from "react";
import { Question, Comments } from "../../pages/class/ClassQuestionPage";
import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  Divider,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconDots, IconPencil, IconSend, IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import CommentSection from "./CommentSection";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  useSubmit,
  useNavigation,
  useActionData,
  useLoaderData,
  Form,
} from "react-router-dom";
import { UserCredentialsContext } from "../../store/user-credentials-context";
import { toast } from "react-toastify";

export interface FormValues {
  comment: string;
  reply: string;
  editComment: string;
  editReply: string;
}
const formValidationSchema = z.object({
  comment: z.string().max(2000, "Comment must be less than 2000 characters"),
  reply: z.string().max(2000, "Reply must be less than 2000 characters"),
});
function ClassQuestionDetail() {
  const { info } = useContext(UserCredentialsContext);
  const currentUserId = info?.userId;
  const loaderData = useLoaderData() as {
    questionsData: Question | null;
    commentsData: Comments[] | null;
  };
  const actionData = useActionData() as { error: boolean; msg: string };
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const question: Question | null = loaderData?.questionsData;
  const comments: Comments[] | null = loaderData?.commentsData;

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.msg);
    }
    if (!actionData?.error) {
      toast.success(actionData?.msg);
    }
  }, [actionData]);

  const form = useForm<FormValues>({
    initialValues: {
      comment: "",
      reply: "",
      editComment: "",
      editReply: "",
    },
    validate: zodResolver(formValidationSchema),
  });

  const handleSubmit = (values: FormValues) => {
    const payload = {
      requestField: "comment",
      content: values.comment,
      questionId: question?.classQuestionId ?? 0,
      userId: currentUserId ?? 0,
    };
    submit(payload, { method: "post" });
  };

  return (
    <Container className="container">
      <Paper withBorder radius="md" p={"xl"} shadow="md">
        <Group className="justify-between">
          <Group gap={"xs"}>
            <Avatar
              src={null}
              alt={`Avatar of ${question?.userFirstName} ${question?.userLastName}`}
              size="lg"
            >
              {`${question?.userFirstName
                .charAt(0)
                .toUpperCase()}${question?.userLastName
                .charAt(0)
                .toUpperCase()}`}
            </Avatar>
            <Stack gap={0}>
              <Text className="font-semibold text-md">{`${question?.userFirstName} ${question?.userLastName}`}</Text>
              <Text className="text-xs" c={"dimmed"}>
                {format(question!.createAt, "MM/dd/yyyy")}
              </Text>
            </Stack>
          </Group>
          <Group>
            <Text className="text-xs justify-end" c={"yellow"}>
              {question?.answered ? "Answered" : "Unanswered"}
            </Text>
            {question?.userId == currentUserId && (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon variant="light" color="orange">
                    <IconDots size={14} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconPencil size={14} />}>
                    Edit
                  </Menu.Item>
                  <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Group>
        <Divider size="xs" className="mt-5" />
        <Stack className="my-5">
          <Title order={4}>{question?.title}</Title>
          <Text className="font-normal text-sm">{question?.content}</Text>
        </Stack>

        {/* Render answer section */}
        {question?.answered && (
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
                  <ActionIcon variant="light" color="orange">
                    <IconDots size={14} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconPencil size={14} />}>
                    Edit
                  </Menu.Item>
                  <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
        )}
        <Divider my="md" />
        {/* render comment section */}
        {question && (
          <CommentSection
            comments={comments}
            question={question}
            form={form}
            submit={submit}
          />
        )}
        {/* render comment form */}
        <Form onSubmit={form.onSubmit(handleSubmit)}>
          <Group className="mt-5">
            <TextInput
              placeholder="Comment about this question"
              className="grow"
              {...form.getInputProps("comment")}
            />
            <ActionIcon
              variant="subtle"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              <IconSend size={20} />
            </ActionIcon>
          </Group>
        </Form>
      </Paper>
    </Container>
  );
}

export default ClassQuestionDetail;

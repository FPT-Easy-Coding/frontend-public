import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { Form } from "react-router-dom";

function QuizQuestionModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      allowInvites: false,
    },
    validate: {
      title: isNotEmpty("Question title is required"),
    },
  });
  return (
    <>
      <Modal
        radius={"lg"}
        opened={opened}
        onClose={close}
        centered
        size="xl"
        title="Create a new class"
      >
        <Form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              placeholder="Enter question title"
              variant="filled"
              name="title"
              radius={"lg"}
              {...form.getInputProps("title")}
            />
            <TextInput
              placeholder="Enter a description (optional)"
              variant="filled"
              name="content"
              radius={"lg"}
              {...form.getInputProps("content")}
            />
            <Button className="self-end" variant="filled" type="submit">
              Create question
            </Button>
          </Stack>
        </Form>
      </Modal>
    </>
  );
}

export default QuizQuestionModal;

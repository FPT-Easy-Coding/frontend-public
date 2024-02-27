import {
  Button,
  Checkbox,
  Input,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { Form } from "react-router-dom";

function ClassModal({ opened, close }: { opened: boolean; close: () => void }) {
  const form = useForm({
    initialValues: {
      className: "",
      classDescription: "",
      allowInvites: false,
    },
    validate: {
      className: isNotEmpty("Class name is required"),
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
              placeholder="Enter class name (course, teacher, year, section etc.)"
              variant="filled"
              name="className"
              radius={"lg"}
              {...form.getInputProps("className")}
            />
            <TextInput
              placeholder="Enter a description (optional)"
              variant="filled"
              name="classDescription"
              radius={"lg"}
              {...form.getInputProps("classDescription")}
            />
            <Checkbox
              label="Allow class members to invite new members"
              name="allowInvites"
              {...form.getInputProps("allowInvites")}
            />
            <Button className="self-end" variant="filled" type="submit">
              Create class
            </Button>
          </Stack>
        </Form>
      </Modal>
    </>
  );
}

export default ClassModal;

import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { Form, useSubmit } from "react-router-dom";

function FolderModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const submit = useSubmit();
  const form = useForm({
    initialValues: {
      folderTitle: "",
      folderDescription: "",
    },
    validate: {
      folderTitle: isNotEmpty("Folder title is required"),
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
        title="Create a new folder"
      >
        <Form
          onSubmit={form.onSubmit(() => {
            submit(
              {
                folderTitle: form.values.folderTitle,
                folderDescription: form.values.folderDescription,
                action: "create-folder",
              },
              { method: "post" }
            );
          })}
        >
          <Stack gap={"md"}>
            <TextInput
              placeholder="Enter folder title"
              variant="filled"
              name="folderTitle"
              {...form.getInputProps("folderTitle")}
            />
            <TextInput
              placeholder="Enter a description (optional)"
              variant="filled"
              name="folderDescription"
              {...form.getInputProps("folderDescription")}
            />
            <Button
              className="self-end"
              type="submit"
              name="action"
              value="create-folder"
            >
              Create folder
            </Button>
          </Stack>
        </Form>
      </Modal>
    </>
  );
}

export default FolderModal;

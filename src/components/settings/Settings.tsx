import {
  Avatar,
  Container,
  Group,
  Stack,
  Title,
  Text,
  Divider,
  Card,
  Button,
  Select,
} from "@mantine/core";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
function Settings(props: Partial<DropzoneProps>) {
  return (
    <>
      <Container size="md">
        <Stack>
          <Stack>
            <Title order={4}>Personal infomation</Title>
            <Card shadow="xs" withBorder p="xl" radius={"md"}>
              <Group>
                <Avatar src={null} size={"xl"}></Avatar>
                <Dropzone {...props} onDrop={() => {}} className="grow">
                  <Group>
                    <Dropzone.Accept>
                      <IconUpload size={32} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX size={32} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto size={32} />
                    </Dropzone.Idle>
                    <Stack gap={0}>
                      <Text size="xl" inline>
                        Drag images here or click to select files
                      </Text>
                      <Text size="sm" c="dimmed" inline mt={7}>
                        File should not exceed 5mb
                      </Text>
                    </Stack>
                  </Group>
                </Dropzone>
              </Group>
              <Divider my="xl" />
              <Group className="justify-between">
                <Stack gap={"xs"}>
                  <Title order={5}>Name</Title>
                  <Text>John Doe</Text>
                </Stack>
                <Button variant="outline" color="orange">
                  Edit
                </Button>
              </Group>
              <Divider my="xl" />
              <Group className="justify-between">
                <Stack gap={"xs"}>
                  <Title order={5}>Email</Title>
                  <Text>example@gmail.com</Text>
                </Stack>
                <Button variant="outline" color="orange">
                  Edit
                </Button>
              </Group>
              <Divider my="xl" />
              <Group className="justify-between">
                <Title order={5}>Account type</Title>
                <Select
                  defaultValue={"Student"}
                  data={["Student", "Teacher"]}
                  allowDeselect={false}
                />
              </Group>
            </Card>
          </Stack>
          <Stack>
            <Title order={4}>Appearance</Title>
            <Card shadow="xs" withBorder p="xl" radius={"md"}>
              <Group className="justify-between">
                <Title order={5}>Theme</Title>
                <Select
                  defaultValue={"Dark"}
                  data={["Light", "Dark"]}
                  allowDeselect={false}
                />
              </Group>
            </Card>
          </Stack>
          <Stack>
            <Title order={4}>Account and privacy</Title>
            <Card shadow="xs" withBorder p="xl" radius={"md"}>
              <Group className="justify-between">
                <Title order={5}>Password</Title>
                <Button variant="outline" color="orange">
                  Edit
                </Button>
              </Group>
            </Card>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Settings;

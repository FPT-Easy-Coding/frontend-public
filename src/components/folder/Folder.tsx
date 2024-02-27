import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  JsonInput,
  Menu,
  Modal,
  Paper,
  rem,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import {
  IconAlertTriangleFilled,
  IconBook,
  IconBookmarkPlus,
  IconCirclePlus,
  IconDots,
  IconEdit,
  IconEraser,
  IconFolder,
  IconPlus,
  IconSearch,
  IconSettings,
  IconShare2,
  IconXboxX,
} from "@tabler/icons-react";
import { useState } from "react";
function Folder() {
  const iconSearch = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
  const [inviteModalOpened, setInviteModalOpened] = useState(false);
  const [addSetsModalOpened, setAddSetsModalOpened] = useState(false);
  const [jsonContent, setJsonContent] = useState("");
  const inviteMembers = () => {
    // Logic to create a folder
    console.log("invite", jsonContent);
    // You can put your logic here to create the folder
  };
  return (
    <>
      {/* Invite members modal */}
      <Modal.Root
        opened={inviteModalOpened}
        onClose={() => setInviteModalOpened(false)}
        centered
        size="lg"
      >
        <Modal.Overlay />
        <Modal.Content>
          <div className="modal-header bg-blue-600 p-4">
            <Modal.Header className="bg-blue-600 p-4">
              <Modal.Title className="text-white font-bold text-size text-3xl">
                Invite members
              </Modal.Title>
              <Modal.CloseButton
                icon={
                  <IconXboxX
                    size={60}
                    stroke={1.5}
                    className="hover:text-red-500"
                  />
                }
                className="text-white bg-blue-600"
              />
            </Modal.Header>
          </div>
          <Modal.Body>
            <Text className="my-5 mx-4">
              To invite members to this class, add their Quiztoast usernames or
              emails below (separate by commas or line breaks).
            </Text>
            <JsonInput
              className="my-5 mx-4"
              size="lg"
              placeholder="Enter usernames or email addresses (separated by commas or new lines)"
              validationError="Invalid JSON"
              formatOnBlur
              autosize
              minRows={4}
              value={jsonContent}
              onChange={(value) => setJsonContent(value)}
            />
            <div className="flex justify-end">
              <Button
                className="mb-5 mx-4 w-[100%] h-[50px] rounded-xl"
                variant="filled"
                disabled={!jsonContent.trim()}
                onClick={inviteMembers}
              >
                Send invites
              </Button>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      {/* Add quiz sets modal */}
      <Modal.Root
        opened={addSetsModalOpened}
        onClose={() => setAddSetsModalOpened(false)}
        centered
        size="lg"
      >
        <Modal.Overlay />
        <Modal.Content>
          <div className="p-4">
            <Modal.Header>
              <Modal.Title className="font-bold text-size text-2xl">
                Add quiz sets
              </Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
          </div>

          <Modal.Body>
            <Stack p={"xl"}>
              <Button variant="subtle" size="sm" leftSection={<IconPlus />}>
                Create new sets
              </Button>
              <div>
                <Select
                  className="w-1/4"
                  checkIconPosition="right"
                  data={["Your sets", "Folder sets", "Study sets"]}
                  defaultValue={"Your sets"}
                  allowDeselect={false}
                />
              </div>
              <Paper shadow="lg" radius="md" withBorder p="xl" className="py-4">
                <Group className="justify-between">
                  <Text className="font-bold text-lg">Quiz Set 1</Text>
                  <Button variant="default" size="sm" radius="md">
                    <IconPlus size={12} />
                  </Button>
                </Group>
              </Paper>
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Container className="container">
        <Grid gutter={"lg"}>
          <Grid.Col span={12}>
            <Stack gap={"lg"}>
              <Group>
                <Text c={"dimmed"}>0 sets</Text>
                <Divider orientation="vertical" />
                <Text>created by</Text>
                <Group gap={0}>
                  <Avatar size={"sm"} />
                  <Text>username</Text>
                </Group>
              </Group>
              <Group className="justify-between">
                <Group>
                  <IconFolder size={35} color="blue" />
                  <Text className="font-bold text-3xl uppercase">
                    Folder name
                  </Text>
                </Group>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button variant="light" color="gray" className="w-[50px]">
                      <IconDots />
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Actions</Menu.Label>
                    <Menu.Item
                      leftSection={
                        <IconBook style={{ width: rem(14), height: rem(14) }} />
                      }
                      color="blue"
                    >
                      Study
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconShare2
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Share
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconBookmarkPlus
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Bookmark
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconAlertTriangleFilled
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      color="red"
                    >
                      Report
                    </Menu.Item>

                    <Menu.Divider />
                    <Menu.Item
                      leftSection={
                        <IconSettings
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      <Menu trigger="hover" position="right">
                        <Menu.Target>
                          <Group className="ml-[2px]"> Settings</Group>
                        </Menu.Target>
                        <Menu.Dropdown className="ml-2">
                          <Menu.Item
                            leftSection={
                              <IconCirclePlus
                                style={{ width: rem(14), height: rem(14) }}
                              />
                            }
                            onClick={() => setAddSetsModalOpened(true)}
                          >
                            Add sets
                          </Menu.Item>
                          <Menu.Item
                            leftSection={
                              <IconEdit
                                style={{ width: rem(14), height: rem(14) }}
                              />
                            }
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Item
                            color="red"
                            leftSection={
                              <IconEraser
                                style={{ width: rem(14), height: rem(14) }}
                              />
                            }
                          >
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
              <Group className="justify-between">
                <Select
                  checkIconPosition="right"
                  data={["Latest", "Alphabetical"]}
                  defaultValue={"Latest"}
                  allowDeselect={false}
                />
                <TextInput
                  variant="filled"
                  radius="xl"
                  placeholder="Filter by title"
                  rightSectionPointerEvents="none"
                  rightSection={iconSearch}
                  className="w-[375px]"
                />
              </Group>
              <Divider />
              <Stack>
                <Paper
                  shadow="lg"
                  radius="md"
                  withBorder
                  p="xl"
                  className="py-4"
                >
                  <Group>
                    <Text className="font-semibold text-sm">
                      5 {5 > 1 ? "terms" : "term"}
                    </Text>
                    <Group>
                      <Avatar src={null} alt="no image here" size={"sm"}>
                        HH
                      </Avatar>
                      <Text className="font-semibold text-sm ">author</Text>
                    </Group>
                  </Group>
                  <Text className="font-bold text-xl">quiz name</Text>
                </Paper>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

export default Folder;

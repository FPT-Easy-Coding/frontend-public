import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Input,
  JsonInput,
  Menu,
  Modal,
  Paper,
  rem,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import {
  IconAlertTriangleFilled,
  IconBellFilled,
  IconBook,
  IconCheck,
  IconCirclePlus,
  IconCopy,
  IconDots,
  IconEdit,
  IconEraser,
  IconLayersSubtract,
  IconPlus,
  IconSearch,
  IconSettings,
  IconShare2,
  IconUserPlus,
  IconUsers,
  IconUsersGroup,
  IconXboxX,
} from "@tabler/icons-react";
import { useState } from "react";

function Class() {
  const iconSearch = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
  const [inviteModalOpened, setInviteModalOpened] = useState(false);
  const [addSetsModalOpened, setAddSetsModalOpened] = useState(false);
  const [jsonContent, setJsonContent] = useState("");
  const clipboard = useClipboard();
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
          <Grid.Col span={8}>
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
                  <IconUsers size={35} color="blue" />
                  <Text className="font-bold text-3xl uppercase">
                    Class name
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
                        <IconBellFilled
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Notification
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
                        <IconAlertTriangleFilled
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      color="red"
                    >
                      Report
                    </Menu.Item>

                    <Menu.Divider />
                    <Menu.Item>
                      <Menu trigger="hover" position="right">
                        <Menu.Target>
                          <Group className="ml-[2px]">
                            <IconSettings
                              style={{ width: rem(14), height: rem(14) }}
                            />{" "}
                            Settings
                          </Group>
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
                              <IconUserPlus
                                style={{ width: rem(14), height: rem(14) }}
                              />
                            }
                            onClick={() => setInviteModalOpened(true)}
                          >
                            Invite members
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
              <Tabs color="indigo" defaultValue="gallery">
                <Tabs.List>
                  <Tabs.Tab value="sets">Sets</Tabs.Tab>
                  <Tabs.Tab value="members">Members</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="sets">
                  <Stack gap={"sm"} className="mt-5">
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
                            <Text className="font-semibold text-sm ">
                              author
                            </Text>
                          </Group>
                        </Group>
                        <Text className="font-bold text-xl">quiz name</Text>
                      </Paper>
                    </Stack>
                  </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="members">Under development</Tabs.Panel>
              </Tabs>
            </Stack>
          </Grid.Col>
          <Grid.Col span={4} className="flex justify-end">
            <Paper className="w-4/5" shadow="lg" radius="md" withBorder p="xl">
              <Stack>
                <Stack gap="xs">
                  <Title order={5} className="uppercase font-medium">
                    Invite link
                  </Title>
                  <Group>
                    <Input
                      value="link@example"
                      readOnly
                      radius="sm"
                      w={"100%"}
                      variant="filled"
                    />
                    <Tooltip
                      label="Link copied!"
                      offset={5}
                      position="bottom"
                      radius="xl"
                      transitionProps={{
                        duration: 100,
                        transition: "slide-down",
                      }}
                      opened={clipboard.copied}
                    >
                      <Button
                        variant="light"
                        rightSection={
                          clipboard.copied ? (
                            <IconCheck
                              style={{ width: rem(20), height: rem(20) }}
                              stroke={1.5}
                            />
                          ) : (
                            <IconCopy
                              style={{ width: rem(20), height: rem(20) }}
                              stroke={1.5}
                            />
                          )
                        }
                        fullWidth
                        radius="xl"
                        size="sm"
                        onClick={() =>
                          clipboard.copy(
                            "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                          )
                        }
                      >
                        Copy link to clipboard
                      </Button>
                    </Tooltip>
                  </Group>
                </Stack>
                <Divider />
                <Stack>
                  <Title order={5} className="uppercase font-normal">
                    Class details
                  </Title>
                  <Stack gap="xs">
                    <Group>
                      <IconLayersSubtract size={20} color="gray" />
                      <Text className="font-semibold text-[14px]">9 sets</Text>
                    </Group>
                    <Group>
                      <IconUsersGroup size={20} color="gray" />
                      <Text className="font-semibold text-[14px]">
                        9 members
                      </Text>
                    </Group>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

export default Class;

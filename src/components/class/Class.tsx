import {
  Avatar,
  Box,
  Button,
  Group,
  Input,
  JsonInput,
  Menu,
  Modal,
  rem,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import {
  IconAlertTriangleFilled,
  IconBellFilled,
  IconBook,
  IconCirclePlus,
  IconDots,
  IconEdit,
  IconEraser,
  IconLayersSubtract,
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
  const iconStyle = { width: rem(12), height: rem(12) };
  const iconSearch = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
  const [inviteModalOpened, setInviteModalOpened] = useState(false);
  const [addSetsModalOpened, setAddSetsModalOpened] = useState(false);
  const [jsonContent, setJsonContent] = useState("");
  const inviteMembers = () => {
    // Logic to create a folder
    console.log("invite", jsonContent);
    // You can put your logic here to create the folder
  };
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Unable to copy:", error);
      });
  };
  return (
    <div>
      <Group className="mt-10 ml-14 mb-[-40px]">
        {
          <IconUsers
            style={iconStyle}
            className="w-[100px] h-[40px] text-blue-600/100 mr-[-20px]"
          />
        }
        <Text className="font-bold text-[40px] uppercase">class</Text>
        <Menu shadow="md" width={200} className="ml-[500px]">
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
                <IconBellFilled style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Notification
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconShare2 style={{ width: rem(14), height: rem(14) }} />
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
              <Menu trigger="hover" position="right" className="ml-[-18px]">
                <Menu.Target>
                  <Group className="ml-[2px]">
                    <IconSettings style={{ width: rem(14), height: rem(14) }} />{" "}
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
                      <IconEdit style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconEraser style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Menu.Item>

            <Menu.Divider />
          </Menu.Dropdown>
        </Menu>
      </Group>
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
          <div className="modal-header bg-blue-600 p-4">
            <Modal.Header className="bg-blue-600 p-4">
              <Modal.Title className="text-white font-bold text-size text-3xl">
                Add quiz sets
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
          <Modal.Body className="bg-gray-50">
            <div className="mx-4 mr-[50px]">
              <Button
                variant="white"
                color="rgba(0, 0, 0, 1)"
                size="md"
                className="my-5 mx-4 w-full mr-5 bg-white hover:text-yellow-400 uppercase font-mono border-b-2 border-black"
              >
                + Create a new sets
              </Button>
            </div>
            <Select
              className="my-5 mx-8 w-[150px] mr-[220px]"
              checkIconPosition="right"
              data={["Your sets", "Folder sets", "Study sets"]}
              defaultValue={"Your sets"}
              allowDeselect={false}
            />
            <div className="my-5 mx-8 bg-white">
              <Group className="my-5 mx-8">
                <Text className="font-bold text-lg text-gray-800">
                  Quiz Set 1
                </Text>
                <Button
                  variant="default"
                  color="rgba(0, 0, 0, 1)"
                  size="sm"
                  radius="md"
                  className="my-5 ml-[300px] text-2xl font-light bg-white hover:text-yellow-400 uppercase font-mono"
                >
                  +
                </Button>
              </Group>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Group className="mt-2 ml-20">
        <Select
          className="my-5 w-[150px] mr-[220px]"
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
        <Stack className="ml-[150px] mt-[70px]">
          <Text className="uppercase font-semibold text-[14px] text-gray-700">
            invite link
          </Text>
          <Group>
            <Input
              value="link@example"
              readOnly
              radius="sm"
              style={{ flex: "1" }}
              className="w-[250px] text-[14px]  text-gray-400"
            />
            <Button
              onClick={copyToClipboard}
              variant="filled"
              color="indigo"
              style={{ marginLeft: "8px" }}
            >
              Copy
            </Button>
          </Group>
          <Text className="uppercase font-semibold text-[14px] text-gray-700">
            Class details
          </Text>
          <Group className="ml-[-10px] my-[-10px]">
            <ThemeIcon variant="white" size="lg" color="gray">
              <IconLayersSubtract style={{ width: "70%", height: "70%" }} />
            </ThemeIcon>
            <Text className=" font-semibold text-[14px] text-gray-900">
              9 sets
            </Text>
          </Group>
          <Group className="ml-[-10px] my-[-5px]">
            <ThemeIcon variant="white" size="lg" color="gray">
              <IconUsersGroup style={{ width: "70%", height: "70%" }} />
            </ThemeIcon>
            <Text className=" font-semibold text-[14px] text-gray-900">
              9 members
            </Text>
          </Group>
        </Stack>
      </Group>

      <div className="ml-20 w-[50%]">
        <Box className="pl-4 mb-4 mt-2 shadow-md rounded-md border-s h-[88px] pt-4">
          <Group>
            <Text className="font-semibold text-sm">
              5 {5 > 1 ? "terms" : "term"}
            </Text>
            <Group className="pl-4 ">
              <Avatar src={null} alt="no image here" size={"sm"}>
                HH
              </Avatar>
              <Text className="font-semibold text-sm ">author</Text>
            </Group>
          </Group>
          <Text className="font-bold text-xl pt-1">quiz name</Text>
        </Box>
      </div>
    </div>
  );
}

export default Class;

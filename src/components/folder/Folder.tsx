import {
  Avatar,
  Box,
  Button,
  Group,
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
  IconLayersSubtract,
  IconSearch,
  IconSettings,
  IconFolder,
  IconBook,
  IconShare2,
  IconBookmarkPlus,
  IconDots,
  IconCirclePlus,
  IconEraser,
  IconEdit,
  IconXboxX,
} from "@tabler/icons-react";
import { useState } from "react";

function Folder() {
  const iconStyle = { width: rem(12), height: rem(12) };
  const iconSearch = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
  const [addSetsModalOpened, setAddSetsModalOpened] = useState(false);
  return (
    <div>
      <Group className="mt-10 ml-14 mb-[-25px]">
        {
          <IconFolder
            style={iconStyle}
            className="w-[100px] h-[40px] text-blue-600/100 mr-[-20px]"
          />
        }
        <Text className="font-bold text-[40px] uppercase">Folder</Text>
        <Menu shadow="md" width={200} className="ml-[700px]">
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
                <IconShare2 style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Share
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconBookmarkPlus style={{ width: rem(14), height: rem(14) }} />
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
                <IconSettings style={{ width: rem(14), height: rem(14) }} />
              }
            >
              <Menu trigger="hover" position="right" className="ml-[-18px]">
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
        <Stack className="ml-[150px] mt-12">
          <Text className="uppercase font-semibold text-[14px] text-gray-700">
            Folder details
          </Text>
          <Group className="ml-[-10px] my-[-10px]">
            <ThemeIcon variant="white" size="lg" color="gray">
              <IconLayersSubtract style={{ width: "70%", height: "70%" }} />
            </ThemeIcon>
            <Text className=" font-semibold text-[14px] text-gray-900">
              9 sets
            </Text>
          </Group>
        </Stack>
      </Group>
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
              <Text className="font-semibold text-sm">author</Text>
            </Group>
          </Group>
          <Text className="font-bold text-xl pt-1">quiz name</Text>
        </Box>
      </div>
    </div>
  );
}

export default Folder;

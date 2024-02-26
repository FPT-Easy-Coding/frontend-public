import {
  Autocomplete,
  Button,
  Menu,
  rem,
  Avatar,
  Group,
  Text,
  useMantineColorScheme,
  useComputedColorScheme,
  Modal,
  Input,
  Checkbox,
} from "@mantine/core";
import logo from "../../assets/logo.svg";
import {
  NavLink,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import {
  IconPhoto,
  IconMessageCircle,
  IconLibraryPlus,
  IconSquarePlus,
  IconSettings,
  IconUserCircle,
  IconPremiumRights,
  IconLogout,
} from "@tabler/icons-react";

import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useContext, useEffect } from "react";
import { UserCredentialsContext } from "../../store/user-credentials-context";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const userBtn = (data: LoaderData, submit: any, handleLogout: () => void) => {
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Group className="cursor-pointer border-none">
            <Avatar
              variant="filled"
              radius="xl"
              color="grape"
              className="cursor-pointer"
            />
            <Text className="text-sm font-semibold">
              {data ? data.firstName + " " + data.lastName : "Guest"}
            </Text>
          </Group>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Menu</Menu.Label>
          <NavLink to={"/user/profile"}>
            <Menu.Item
              leftSection={
                <IconUserCircle style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Profile
            </Menu.Item>
          </NavLink>

          <Menu.Item
            leftSection={
              <IconSettings style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Settings
          </Menu.Item>

          <Menu.Item
            leftSection={
              <IconPremiumRights style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Upgrade to Premium
          </Menu.Item>

          <Menu.Divider />
          <Menu.Item
            color="red"
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => {
              submit(null, { method: "post", action: "/logout" });
              handleLogout();
            }}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

const guestBtn = (mode: string) => {
  return (
    <>
      <NavLink to="/auth?mode=login">
        <Button
          variant={mode === "register" ? "filled" : "light"}
          color="indigo"
          radius="md"
          fz="sm"
          className={mode === "login" ? "hidden" : ""}
        >
          Login
        </Button>
      </NavLink>

      <NavLink to="/auth?mode=register">
        <Button
          variant="filled"
          color="indigo"
          radius="md"
          fz="sm"
          className={mode === "register" ? "hidden" : ""}
        >
          Signup
        </Button>
      </NavLink>
    </>
  );
};

interface LoaderData {
  error?: boolean;
  userId: number;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  telephone: string;
  role: string;
  premium: boolean;
  banned: boolean;
}

function Navbar() {
  const [folderModalOpened, setFolderModalOpened] = useState(false); // State for folder modal
  const [classModalOpened, setClassModalOpened] = useState(false);
  const [classTitle, setClassTitle] = useState("");
  const [folderTitle, setFolderTitle] = useState("");
  const { assignUserCredentials, clearUserCredentials, info } = useContext(
    UserCredentialsContext
  );
  const mode = useSearchParams()[0].get("mode");
  const data: LoaderData = useLoaderData() as LoaderData;
  useEffect(() => {
    if (data !== null) {
      assignUserCredentials({
        ...data,
      });
    }
  }, [data]);
  const submit = useSubmit();
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme("light");
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };
  const btnState =
    data?.error || !data
      ? guestBtn(mode as string)
      : userBtn(data, submit, clearUserCredentials);
  const whichHomepage = data?.error || !data ? "/" : "/home";

  console.log(info);
  const createClass = () => {
    // Logic to create a class
    console.log("Creating class:", classTitle);
    // You can put your logic here to create the class
  };
  const createFolder = () => {
    // Logic to create a folder
    console.log("Creating folder:", folderTitle);
    // You can put your logic here to create the folder
  };
  return (
    <>
      <header className="w-full h-16 flex items-center justify-between sticky top-0 z-20 shadow-sm bg-[--mantine-color-body]">
        <div className="flex items-center w-full">
          <NavLink to={whichHomepage} className="w-32 mx-5">
            <img src={logo} alt="hehelogo" />
          </NavLink>

          <div className="ml-5 flex items-center">
            <NavLink to={whichHomepage} className="no-underline">
              {({ isActive }) => (
                <Button
                  autoContrast
                  color="indigo"
                  variant={isActive ? "light" : "subtle"}
                >
                  Home
                </Button>
              )}
            </NavLink>
            <NavLink to="/about" className="no-underline">
              <Button autoContrast color="indigo" variant="subtle">
                Categories
              </Button>
            </NavLink>
            <NavLink to="/contact" className="no-underline">
              <Button autoContrast color="indigo" variant="subtle">
                Classes
              </Button>
            </NavLink>
          </div>

          <div className="ml-5 grow">
            <Autocomplete
              placeholder="Search for quizzes, classes, etc."
              data={["React", "Angular", "Vue", "Svelte"]}
              size="md"
              radius={"xl"}
              className="w-full"
            />
          </div>

          <Group className="mx-5">
            <DarkModeSwitch
              checked={colorScheme === "dark"}
              onChange={toggleColorScheme}
              size={20}
            />
            <Menu trigger="hover" shadow="md" width={200}>
              <Menu.Target>
                <IconSquarePlus className="w-5 h-auto" />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Create</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconLibraryPlus
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                >
                  Quiz set
                </Menu.Item>
                <Menu.Item
                  onClick={() => setFolderModalOpened(true)}
                  leftSection={
                    <IconMessageCircle
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                >
                  Folder
                </Menu.Item>

                <Menu.Item
                  onClick={() => setClassModalOpened(true)}
                  leftSection={
                    <IconPhoto style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Classes
                </Menu.Item>
              </Menu.Dropdown>
              {/* Modal content for folder */}
              <Modal
                styles={{
                  root: { borderRadius: "calc(var(--modal-radius) - 20px)" },
                }}
                opened={folderModalOpened}
                onClose={() => setFolderModalOpened(false)} // Close the folder modal
                centered
                size="xl"
              >
                <Modal.Title>
                  <Text className="font-bold text-3xl mb-5 mx-4">
                    Create a new folder
                  </Text>
                </Modal.Title>
                <Input
                  className="my-5 mx-4 w-[96%]"
                  placeholder="Enter folder title"
                  variant="filled"
                  value={folderTitle}
                  onChange={(event) => setFolderTitle(event.target.value)}
                />
                <Input
                  className="my-5 mx-4 w-[96%]"
                  placeholder="Enter a description (optional)"
                  variant="filled"
                />
                <div className="flex justify-end">
                  <Button
                    className="mb-5 mx-4 w-[120px] h-[50px] rounded-xl"
                    variant="filled"
                    disabled={!folderTitle.trim()}
                    onClick={createFolder}
                  >
                    Create folder
                  </Button>
                </div>
              </Modal>
              {/* Modal content for class */}
              <Modal
                styles={{
                  root: { borderRadius: "calc(var(--modal-radius) - 20px)" },
                }}
                opened={classModalOpened}
                onClose={() => setClassModalOpened(false)}
                centered
                size="xl"
              >
                <Modal.Title>
                  <Text className="font-bold text-3xl mb-5 mx-4">
                    Create a new class
                  </Text>
                </Modal.Title>

                <Input
                  className="my-5 mx-4 w-[96%]"
                  placeholder="Enter class name (course, teacher, year, section etc.)"
                  variant="filled"
                  value={classTitle}
                  onChange={(event) => setClassTitle(event.target.value)}
                />
                <Input
                  className="my-5 mx-4 w-[96%]"
                  placeholder="Enter a description (optional)"
                  variant="filled"
                />
                <Checkbox
                  className="my-5 mx-4"
                  defaultChecked
                  label="Allow class members to add and remove sets"
                  color="gray"
                />
                <Checkbox
                  className="my-5 mx-4"
                  defaultChecked
                  label="Allow class members to invite new members"
                  color="gray"
                />
                <div className="flex justify-end">
                  <Button
                    className="mb-5 mx-4 w-[120px] h-[50px] rounded-xl"
                    variant="filled"
                    disabled={!classTitle.trim()}
                    onClick={createClass}
                  >
                    Create class
                  </Button>
                </div>
              </Modal>
            </Menu>
            <Group>{btnState}</Group>
          </Group>
        </div>
      </header>
    </>
  );
}

export default Navbar;

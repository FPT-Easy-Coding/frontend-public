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

const userBtn = (data: any, submit: any) => {
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
          <Menu.Item
            leftSection={
              <IconUserCircle style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Profile
          </Menu.Item>

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
            onClick={() => submit(null, { method: "post", action: "/logout" })}
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
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
}

function Navbar() {
  const mode = useSearchParams()[0].get("mode");
  const data: LoaderData = useLoaderData() as LoaderData;
  console.log(data);
  const submit = useSubmit();
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme("light");
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };
  const btnState = data?.error || !data ? guestBtn(mode as string) : userBtn(data, submit);
  const whichHomepage = data?.error || !data ? "/" : "/home";

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
                  leftSection={
                    <IconMessageCircle
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                >
                  Folder
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconPhoto style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Classes
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Group>{btnState}</Group>
          </Group>
        </div>
      </header>
    </>
  );
}

export default Navbar;

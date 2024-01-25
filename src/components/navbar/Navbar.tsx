import { Anchor, Autocomplete, Button, Menu, rem, Avatar } from "@mantine/core";
import logo from "../../assets/logo.svg";
import {
  Form,
  NavLink,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import {
  IconPhoto,
  IconMessageCircle,
  IconLibraryPlus,
  IconSquarePlus,
} from "@tabler/icons-react";

const navBtn = "text-sm";

const userBtn = (data: any, submit: any) => {
  return (
    <Form method="post" action="/logout">
      <Avatar
        component="button"
        variant="filled"
        radius="xl"
        color="grape"
        className="cursor-pointer"
      />
    </Form>
  );
};

function Navbar() {
  const mode = useSearchParams()[0].get("mode");
  const data = useLoaderData();
  const submit = useSubmit();
  console.log(data);
  const guestBtn = () => {
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

  return (
    <>
      <header className="w-full h-16 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center w-full">
          <NavLink to="/" className="w-32 mx-5">
            <img src={logo} alt="hehelogo" />
          </NavLink>

          <div className="mx-5 flex items-center gap-5 text-black">
            <NavLink to="/" className="no-underline">
              <Anchor component="div" underline="never">
                <span className={navBtn}>Home</span>
              </Anchor>
            </NavLink>
            <NavLink to="/about" className="no-underline">
              <Anchor component="div" underline="never">
                <span className={navBtn}>Categories</span>
              </Anchor>
            </NavLink>
            <NavLink to="/contact" className="no-underline">
              <Anchor component="div" underline="never">
                <span className={navBtn}>Classes</span>
              </Anchor>
            </NavLink>
          </div>

          <div className="ml-10 grow">
            <Autocomplete
              placeholder="Search for quizzes, classes, etc."
              data={["React", "Angular", "Vue", "Svelte"]}
              size="md"
              radius={"xl"}
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-5">
            <div className="ml-5">
              <Menu trigger="hover" shadow="md" width={200}>
                <Menu.Target>
                  <IconSquarePlus className="w-5 mt-2 h-auto" />
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
            </div>
            <div className="flex items-center gap-3 mr-5">
              {data ? userBtn(data, submit) : guestBtn() || null}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;

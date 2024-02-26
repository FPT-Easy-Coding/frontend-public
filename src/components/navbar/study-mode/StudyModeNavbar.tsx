import { useContext, useEffect } from "react";
import classes from "./StudyModeNavbar.module.css";
import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Stack,
  Switch,
  Text,
  Tooltip,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBook,
  IconChevronDown,
  IconFileText,
  IconHome,
  IconLayersSubtract,
  IconMoonStars,
  IconSettings,
  IconSun,
  IconX,
} from "@tabler/icons-react";
import { StudyModeContext } from "../../../store/study-mode-context";
import { QuizInfoContext } from "../../../store/quiz-info-context";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import FlashcardSettings from "../../modal/study-mode/FlashcardSettings";
const iconStyle = { width: rem(14), height: rem(14) };
function StudyModeNavbar() {
  const { assignStudyMode, mode } = useContext(StudyModeContext);
  const { name, id } = useContext(QuizInfoContext);
  const path = window.location.pathname.split("/")[3];
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    const capitalizedMode = path.charAt(0).toUpperCase() + path.slice(1);
    assignStudyMode(capitalizedMode);
  }, [path]);
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme("light");
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };
  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  const handleSettings = () => {
    switch (mode) {
      case "Flashcard":
        return <FlashcardSettings opened={opened} close={close} />;
      default:
        return null;
    }
  };

  return (
    <>
      {handleSettings()}
      <header className={classes.header}>
        <div className={classes.inner}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                variant="subtle"
                size="md"
                rightSection={<IconChevronDown size={16} />}
              >
                {mode}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Study mode</Menu.Label>
              <Link to={`/${id}/study/flashcard`}>
                <Menu.Item
                  leftSection={<IconLayersSubtract style={iconStyle} />}
                >
                  Flashcard
                </Menu.Item>
              </Link>
              <Menu.Item leftSection={<IconBook style={iconStyle} />}>
                Learn
              </Menu.Item>
              <Menu.Item leftSection={<IconFileText style={iconStyle} />}>
                Test
              </Menu.Item>
              <Menu.Divider />
              <Menu.Label>Navigation</Menu.Label>
              <Link to="/home">
                <Menu.Item leftSection={<IconHome style={iconStyle} />}>
                  Home
                </Menu.Item>
              </Link>
            </Menu.Dropdown>
          </Menu>
          <Link to={`/quiz/set/${id}`}>
            <Text fw={500} className="ml-6">
              {name}
            </Text>
          </Link>
          <Group>
            <Switch
              size="md"
              color="dark.4"
              onLabel={sunIcon}
              offLabel={moonIcon}
              onChange={toggleColorScheme}
            />
            <Tooltip label="Settings">
              <ActionIcon
                variant="subtle"
                size="lg"
                radius="xl"
                aria-label="Settings"
                onClick={open}
              >
                <IconSettings
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={`Exit ${mode}`}>
              <Link to={`/quiz/set/${id}`}>
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  radius="xl"
                  aria-label="Exit"
                >
                  <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
                </ActionIcon>
              </Link>
            </Tooltip>
          </Group>
        </div>
      </header>
    </>
  );
}

export default StudyModeNavbar;
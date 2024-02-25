import React, { useContext, useEffect } from "react";
import classes from "./StudyModeNavbar.module.css";
import { UserCredentialsContext } from "../../../store/user-credentials-context";
import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Stack,
  Text,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconBook,
  IconChevronDown,
  IconFileText,
  IconHome,
  IconLayersSubtract,
  IconSettings,
  IconX,
} from "@tabler/icons-react";
import { StudyModeContext } from "../../../store/study-mode-context";
import { QuizInfoContext } from "../../../store/quiz-info-context";
import { Link } from "react-router-dom";
const iconStyle = { width: rem(14), height: rem(14) };
function StudyModeNavbar() {
  const { assignStudyMode, mode } = useContext(StudyModeContext);
  const { name, id } = useContext(QuizInfoContext);
  const path = window.location.pathname.split("/")[3];
  useEffect(() => {
    const capitalizedMode = path.charAt(0).toUpperCase() + path.slice(1);
    assignStudyMode(capitalizedMode);
  }, [path]);

  return (
    <>
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
            <Text fw={500} className="mr-7">
              {name}
            </Text>
          </Link>
          <Group>
            <Tooltip label="Settings">
              <ActionIcon
                variant="subtle"
                size="lg"
                radius="xl"
                aria-label="Settings"
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

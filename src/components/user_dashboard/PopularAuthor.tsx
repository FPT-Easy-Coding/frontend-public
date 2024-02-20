import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import {
  Card,
  Badge,
  Group,
  Stack,
  Avatar,
  Flex,
  Title,
} from "@mantine/core";
import classes from "./Carousel.module.css";
import '@tabler/icons-react';
import { IconLibrary, IconSchool } from "@tabler/icons-react";


const quizSetsIcon = <IconLibrary size={18} />;
const classIcon = <IconSchool size={18} />;
interface User {
  userName: string;
  role: string;
  numberOfQuizSet: number;
  classes: number;
  // Add other properties as needed
}

function PopularAuthor() {


  const [popularAuthor, setpopularAuthor] = useState<User[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/admin/users-dashboard')
      .then(res => {
        // Sort the users by the 'view' property
        const sortedAuthors = res.data.sort((a: { view: number; }, b: { view: number; }) => b.view - a.view);
        setpopularAuthor(sortedAuthors);
      })
  }, [])

  return (
    <>
      <div>
        <Carousel
          slideSize={"33.333333%"}
          height={"200px"}
          align={"start"}
          slideGap="lg"
          controlsOffset="xs"
          controlSize={30}
          dragFree
          classNames={classes}
        >
          {popularAuthor.map((user, index) => (
            <Carousel.Slide key={index}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                component="a"
                className="h-full"
              >
                <Flex className="flex-col px-5 h-full" justify="space-between"
                  onMouseEnter={() => {
                    document.body.style.cursor = "pointer";
                  }}
                  onMouseLeave={() => {
                    document.body.style.cursor = "auto";
                  }}>
                  <Card.Section>
                    <Avatar variant="filled" radius="xl" size="xl" color="violet" />
                  </Card.Section>
                  <Card.Section>
                    <Stack gap={6}>
                      <Group gap={8}>
                        <Title order={3}>{user.userName}</Title>
                        <Badge color="orange">{user.role}</Badge>
                      </Group>
                      <Group gap={"xs"}>
                        <Badge color="blue" autoContrast leftSection={quizSetsIcon}>
                          {user.numberOfQuizSet} quiz sets
                        </Badge>
                        <Badge color="blue" autoContrast leftSection={classIcon}>
                          {user.classes} class
                        </Badge>
                      </Group>
                    </Stack>
                  </Card.Section>
                </Flex>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default PopularAuthor;

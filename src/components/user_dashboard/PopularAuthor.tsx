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

const quizSetsIcon = <IconLibrary size={18} />
const classIcon = <IconSchool size={18} />
function PopularAuthor() {
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
          <Carousel.Slide>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              component="a"
              className="h-full"
            >
              <Flex className="flex-col px-5 h-full" justify="space-between">
                <Card.Section>
                  <Avatar
                    variant="filled"
                    radius="xl"
                    size="xl"
                    color="violet"
                  />
                </Card.Section>
                <Card.Section>
                  <Stack gap={6}>
                    <Group gap={8}>
                      <Title order={3}>Thaycaoduc</Title>
                      <Badge color="orange">Teacher</Badge>
                    </Group>
                    <Group gap={"xs"}>
                      <Badge color="blue" autoContrast leftSection={quizSetsIcon}>
                        911 quiz sets
                      </Badge>
                      <Badge color="blue" autoContrast leftSection={classIcon}>
                        1 class
                      </Badge>
                    </Group>
                  </Stack>
                </Card.Section>
              </Flex>
            </Card>
          </Carousel.Slide>
        </Carousel>
      </div>
    </>
  );
}

export default PopularAuthor;

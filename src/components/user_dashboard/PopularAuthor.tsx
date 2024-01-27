import { Carousel } from "@mantine/carousel";
import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Avatar,
  Flex,
} from "@mantine/core";
import classes from "./Carousel.module.css";

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
                  <Stack className="gap-2">
                    <Text fw={500}>DU MA SWP</Text>
                    <Badge color="indigo">30 question</Badge>
                  </Stack>
                </Card.Section>
                <Card.Section>
                  <Group gap={"xs"}>
                    <Avatar variant="filled" radius="xl" size="sm" />
                    <Text size="sm">Thaycaoduc</Text>
                  </Group>
                </Card.Section>
              </Flex>
            </Card>
          </Carousel.Slide>
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
                  <Stack className="gap-2">
                    <Text fw={500}>Norway Fjord Adventures</Text>
                    <Badge color="indigo">On Sale</Badge>
                  </Stack>
                </Card.Section>
                <Card.Section>
                  <Group gap={"xs"}>
                    <Avatar variant="filled" radius="xl" size="sm" />
                    <Text size="sm">Jane Doe</Text>
                  </Group>
                </Card.Section>
              </Flex>
            </Card>
          </Carousel.Slide>
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
                  <Stack className="gap-2">
                    <Text fw={500}>Norway Fjord Adventures</Text>
                    <Badge color="indigo">On Sale</Badge>
                  </Stack>
                </Card.Section>
                <Card.Section>
                  <Group gap={"xs"}>
                    <Avatar variant="filled" radius="xl" size="sm" />
                    <Text size="sm">Jane Doe</Text>
                  </Group>
                </Card.Section>
              </Flex>
            </Card>
          </Carousel.Slide>
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
                  <Stack className="gap-2">
                    <Text fw={500}>Norway Fjord Adventures</Text>
                    <Badge color="indigo">On Sale</Badge>
                  </Stack>
                </Card.Section>
                <Card.Section>
                  <Group gap={"xs"}>
                    <Avatar variant="filled" radius="xl" size="sm" />
                    <Text size="sm">Jane Doe</Text>
                  </Group>
                </Card.Section>
              </Flex>
            </Card>
          </Carousel.Slide>
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
                  <Stack className="gap-2">
                    <Text fw={500}>Norway Fjord Adventures</Text>
                    <Badge color="indigo">On Sale</Badge>
                  </Stack>
                </Card.Section>
                <Card.Section>
                  <Group gap={"xs"}>
                    <Avatar variant="filled" radius="xl" size="sm" />
                    <Text size="sm">Jane Doe</Text>
                  </Group>
                </Card.Section>
              </Flex>
            </Card>
          </Carousel.Slide>
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
                  <Stack className="gap-2">
                    <Text fw={500}>Norway Fjord Adventures</Text>
                    <Badge color="indigo">On Sale</Badge>
                  </Stack>
                </Card.Section>
                <Card.Section>
                  <Group gap={"xs"}>
                    <Avatar variant="filled" radius="xl" size="sm" />
                    <Text size="sm">Jane Doe</Text>
                  </Group>
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

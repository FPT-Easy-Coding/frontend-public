import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  Badge,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";

function QuizSetDetails() {
  return (
    <>
      <Container>
        {/* infomation section */}
        <Stack>
          <Text c={"dimmed"} size="sm">
            Category name
          </Text>
          <Title order={1}>Quiz sets name</Title>
          <Group>
            <Badge leftSection={<IconUsers size={14} />}>999 learners</Badge>
            <Group>
              <Text>Give this sets a rating</Text>
              <Rating size={"sm"} value={2} />
            </Group>
          </Group>
        </Stack>
        {/* Button section */}
        <Group className="mt-10">
          <Button variant="filled">Flashcard</Button>
          <Button variant="filled">Learn</Button>
          <Button variant="filled">Practice</Button>
        </Group>
        {/* Flashcard section */}
        <Carousel withIndicators align={"start"} height={500} className="mt-10">
          <Carousel.Slide bg={"blue"}></Carousel.Slide>
          <Carousel.Slide bg={"cyan"}></Carousel.Slide>
          <Carousel.Slide bg={"red"}></Carousel.Slide>
          <Carousel.Slide bg={"green"}></Carousel.Slide>
        </Carousel>

        {/* Author section */}
        <Group className="mt-10">
          <Avatar
            src="https://i.pinimg.com/originals/b1/6a/c5/b16ac50ce6954a9f4ee2728e05fe85c4.gif"
            size={"lg"}
          />
          <Stack gap={0}>
            <Text c={"dimmed"} size="sm">
              Created by
            </Text>
            <Text>Author name</Text>
          </Stack>
        </Group>

        {/* Quiz set details        */}
        <Group className="mt-10">
          <Title order={3}>Terms in this set</Title>
        </Group>
        <Stack>
          <Paper shadow="md" radius="lg" p="xl" withBorder>
            <Group>
              <div className="basis-2/3">
                <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed animi, laudantium ducimus dolores unde consequuntur beatae. Necessitatibus, saepe labore exercitationem dolorem sit pariatur omnis voluptatum architecto corporis nulla cumque fugit!</Text>
              </div>
              <Divider orientation="vertical" />
              <div className="basis-1/4">
                <Text>C</Text>
              </div>
            </Group>
          </Paper>
        </Stack>
      </Container>
    </>
  );
}

export default QuizSetDetails;

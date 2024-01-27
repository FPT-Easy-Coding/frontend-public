import { Container, Stack, Title } from "@mantine/core";
import RecentQuiz from "../../../components/user_dashboard/RecentQuiz";
import PopularQuiz from "../../../components/user_dashboard/PopularQuiz";
import PopularAuthor from "../../../components/user_dashboard/PopularAuthor";

function UserDashboard() {
  return (
    <>
      <Container className="container">
        <Stack gap="md">
          <Title order={2}>Recent</Title>
          <RecentQuiz />
          <Title order={2}>Popular Quizzes</Title>
          <PopularQuiz />
          <Title order={2}>Popular Authors</Title>
          <PopularAuthor />
        </Stack>
      </Container>
    </>
  );
}

export default UserDashboard;

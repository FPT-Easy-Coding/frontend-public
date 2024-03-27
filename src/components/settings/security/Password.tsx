import { Button, Card, Group, Stack, Title } from "@mantine/core";

const Password = () => {
  return (
    <>
      <Stack>
        <Title order={4}>Account and privacy</Title>
        <Card shadow="xs" withBorder p="xl" radius={"md"}>
          <Group className="justify-between">
            <Title order={5}>Password</Title>
            <Button variant="outline" color="orange">
              Edit
            </Button>
          </Group>
        </Card>
      </Stack>
    </>
  );
};

export default Password;

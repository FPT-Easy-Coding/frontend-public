import { Stack, Title, Card, Group, Select } from "@mantine/core";

const ChangeTheme = () => {
  return (
    <>
      <Stack>
        <Title order={4}>Appearance</Title>
        <Card shadow="xs" withBorder p="xl" radius={"md"}>
          <Group className="justify-between">
            <Title order={5}>Theme</Title>
            <Select
              defaultValue={"Dark"}
              data={["Light", "Dark"]}
              allowDeselect={false}
            />
          </Group>
        </Card>
      </Stack>
    </>
  );
};

export default ChangeTheme;

import { Group, Stack, Title, Button, Text } from "@mantine/core";
import { useContext } from "react";
import { UserCredentialsContext } from "../../../store/user-credentials-context";
const Name = () => {
  const { info } = useContext(UserCredentialsContext);
  return (
    <>
      <Group className="justify-between">
        <Stack gap={"xs"}>
          <Title order={5}>Name</Title>
          <Text>{`${info?.firstName} ${info?.lastName}`}</Text>
        </Stack>
        <Button variant="outline" color="orange">
          Edit
        </Button>
      </Group>
    </>
  );
};

export default Name;

import { Group, Title, Select } from "@mantine/core";
import { useContext } from "react";
import { UserCredentialsContext } from "../../../store/user-credentials-context";

const AccountType = () => {
  const { info } = useContext(UserCredentialsContext);
  return (
    <>
      <Group className="justify-between">
        <Title order={5}>Account type</Title>
        <Select
          defaultValue={"Student"}
          data={["Student", "Teacher"]}
          allowDeselect={false}
        />
      </Group>
    </>
  );
};

export default AccountType;

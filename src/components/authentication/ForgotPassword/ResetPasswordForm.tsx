import { Button, Stack, TextInput } from "@mantine/core";
import { Form } from "react-router-dom";
function ResetPasswordForm() {
  return (
    <div className="max-w-screen h-screen">
      <div className="w-9/12 h-screen mx-auto flex items-center justify-center">
        <div className="w-2/3 h-2/3 ">
          <h1 className="text-4xl font-extrabold mb-2">
            Time to reset your password : )
          </h1>
          <h2 className="font-thin text-base italic">
            ... don&apos;t forget it, as it&apos;s important!
          </h2>
          <div className="font-light mt-10"></div>
          <Form>
            <Stack gap={"md"}>
              <TextInput
                radius="md"
                size="md"
                label="new password"
                withAsterisk
                placeholder="type new password"
              />

              <TextInput
                size="md"
                radius="md"
                label="confirm new password"
                withAsterisk
                placeholder="confirm your new password"
              />

              <Button
                variant="filled"
                radius="md"
                type="submit"
                fullWidth
              >
                Button
              </Button>
            </Stack>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;

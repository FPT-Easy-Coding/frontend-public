import { upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Stack,
  Container,
} from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { TwitterButton } from "./TwitterButton";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ResData {
  error: boolean | string | null;
  message: string;
  errorField: string;
}

export default function AuthForm(props: PaperProps) {
  const submit = useSubmit();
  const data: ResData | undefined = useActionData() as ResData | undefined;
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const form = useForm({
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",
      telephone: "",
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  useEffect(() => {
    if (data && data?.error) {
      form.setFieldError('email', data.message);
      form.setFieldError('password', data.message);
      toast.error(data.message);
    }
  }, [data]);

  return (
    <>
      <Container size="xs" h={"100vh"}>
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" fw={500}>
            {isLogin
              ? "Login to your QuizToast account"
              : "Create new QuizToast account"}
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <TwitterButton radius="xl">Twitter</TwitterButton>
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <Form method="post" onSubmit={form.onSubmit(() => {
            submit(form.values, { method: "post" });
          })}>
            <Stack>
              {!isLogin && (
                <>
                  <Group grow>
                    <TextInput
                      label="Firstname"
                      placeholder="Your first name"
                      radius="md"
                      name="firstName"
                      {...form.getInputProps("firstname")}
                    />
                    <TextInput
                      label="Lastname"
                      placeholder="Your last name"
                      radius="md"
                      name="lastname"
                      {...form.getInputProps("lastname")}
                    />
                  </Group>

                  <Group grow>
                    <TextInput
                      label="Username"
                      placeholder="Your username"
                      radius="md"
                      name="username"
                      {...form.getInputProps("username")}
                    />
                    <TextInput
                      label="Phone number"
                      placeholder="Your phone number"
                      onChange={(event) =>
                        form.setFieldValue(
                          "telephone",
                          event.currentTarget.value
                        )
                      }
                      radius="md"
                      name="telephone"
                    />
                  </Group>
                </>
              )}

              <TextInput
                required
                label="Email"
                placeholder="youremail@domain"
                radius="md"
                name="email"
                {...form.getInputProps("email")}
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                radius="md"
                name="password"
                {...form.getInputProps("password")}
              />
              {!isLogin && (
                <PasswordInput
                  required
                  label="Confirm password"
                  placeholder="Your password"
                  radius="md"
                  name="confirmPassword"
                  {...form.getInputProps("confirmPassword")}
                />
              )}

              {!isLogin && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  {...form.getInputProps("terms", { type: "checkbox" })}
                />
              )}
            </Stack>

            <Group justify="space-between" mt="xl">
              <Link
                to={`?mode=${isLogin ? "register" : "login"}`}
                className="text-blue-600 text-sm"
              >
                {!isLogin
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Link>
              <Button type="submit" radius="xl" loading={isSubmitting}>
                {upperFirst(isLogin ? "Login" : "Register")}
              </Button>
            </Group>
          </Form>
        </Paper>
      </Container>
    </>
  );
}

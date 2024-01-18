import axios from "axios";
import LoginForm from "../components/LoginForm";
import { redirect } from "react-router-dom";

function Login() {
  return <LoginForm />;
}
export default Login;
export async function action({ request }) {
  try {
    const data = await request.formData();

    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const response = axios.post(
      "http://localhost:8080/api/v1/auth/authenticate",
      payload
    );

    const responseData = await response;

    const accessToken = responseData.accessToken;
    const refreshToken = responseData.refreshToken;

    localStorage.setItem("AT", accessToken);
    localStorage.setItem("RT", refreshToken);

    return redirect("/");
  } catch (error) {
    return {
      error: true,
      message: "Cannot login. Please try again later.",
    };
  }
}

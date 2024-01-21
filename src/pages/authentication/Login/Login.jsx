import axios from "axios";
import LoginForm from "../../../components/authentication/Login/LoginForm";
import { redirect } from "react-router-dom";

function Login() {
  return <LoginForm />;
}
export default Login;
export async function action({ request }) {
  try {
    const data = await request.formData();
    const { email, password } = Object.fromEntries(data);

    const fetchedData = await axios
      .post("http://localhost:8080/api/v1/auth/authenticate", {
        email,
        password,
      })
      .then((res) => res.data)
      .catch((err) => err.response.data);
      
    if (fetchedData.error) {
      return {
        errorCondition: "wc",
        message: fetchedData.error,
      };
    } else if (fetchedData.email) {
      return {
        errorCondition: "ec",
        message: fetchedData.email,
      };
    } else if (fetchedData.password) {
      return {
        errorCondition: "pc",
        message: fetchedData.password,
      };
    }

    sessionStorage.setItem("RT", fetchedData.refreshToken);
    localStorage.setItem("AT", fetchedData.accessToken);
    localStorage.setItem("uid", fetchedData.userId);

    return redirect("/home");
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong with us, be patience!",
    };
  }
}

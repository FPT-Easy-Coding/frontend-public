
import SignupForm from "../../../components/authentication/Register/SignupForm";
import axios from "axios";

function Signup() {
  return <SignupForm />;
}

export async function action({ request }) {
  const data = await request.formData();
  const payload = {
    firstname: data.get("firstname"),
    lastname: data.get("lastname"),
    email: data.get("email"),
    password: data.get("password"),
    role: "USER",
    mfaEnabled: false,
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/register",
      payload
    );

    const responseData = response.data;

    const accessToken = responseData.accessToken;
    const refreshToken = responseData.refreshToken;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return {
      error: false,
      message: "Successfully signed up!",
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      error: true,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export default Signup;

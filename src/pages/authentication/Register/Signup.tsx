
import SignupForm from "../../../components/authentication/Register/SignupForm";
import axios from "axios";

function Signup() {
  return <SignupForm />;
}

export async function action({ request }: { request: any }) {
  const data = await request.formData();
  
  const payload = {
    firstname: data.get("firstname"),
    lastname: data.get("lastname"),
    email: data.get("email"),
    password: data.get("password"),
    username: data.get("username"),
    telephone: data.get("telephone"),
    role: "USER",
    mfaEnabled: false,
  };


  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/register",
      payload
    );

    console.log("Response:", response.data);
    if(response.data.error) {
      return {
        error: true,
        message: "This will be implemented later, but this is flag that we r having error after fetching data"
      }
    }

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

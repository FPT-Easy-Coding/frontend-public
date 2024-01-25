import axios from "axios";
import AuthForm from "../../../components/authentication/Login/AuthForm";
import { json, redirect } from "react-router-dom";

function AuthPage() {
  return <AuthForm />;
}
export default AuthPage;
export async function action({ request }: { request: any }) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get("mode") || "login";
    const data = await request.formData();
    const formField = Object.fromEntries(data);
    const payload: any = {};
    let api: string = "authenticate";
    if (mode !== "login" && mode !== "register") {
      throw json({ message: "Unsupported mode" }, { status: 422 });
    }

    if (mode === "login") {
      payload.email = formField.email;
      payload.password = formField.password;
    }

    if (mode === "register") {
      payload.firstname = formField.firstname;
      payload.lastname = formField.lastname;
      payload.email = formField.email;
      payload.password = formField.password;
      payload.telephone = formField.telephone;
      payload.username = formField.username;
      payload.mfaEnabled = false;
      api = "register";
    }
    console.log(payload);

    const fetchedData = await axios
      .post("http://localhost:8080/api/v1/auth/" + api, payload)
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (fetchedData?.error) {
      return {
        error: true,
        message: fetchedData.data[0]?.errorMessage || "Something went wrong",
        errorField: fetchedData.data?.errorField || null,
      };
    }

    console.log(fetchedData);

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

import { redirect } from "react-router-dom";

export default function logout() {
  localStorage.clear();
  sessionStorage.clear();
  return redirect("/");
}

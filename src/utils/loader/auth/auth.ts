import { redirect } from "react-router-dom";
import { getUser } from "../user/user";

export function getAuthCredentials() {
  const authToken = getAuthToken();
  const userId = getAuthUserId();

  if (!authToken || !userId) {
    return null;
  }
  return getUser(userId);
}

export async function checkAuth() {
  const authCredentials = await getAuthCredentials();
  if (authCredentials === null || authCredentials?.error === true) {
    return redirect("/auth?mode=login");
  }
  return null;
}

export async function preventAuth() {
  if (isLoggedIn()) {
    return redirect("/home");
  }
  return null;
}

export function isLoggedIn() {
  const authToken = getAuthToken();
  const userId = getAuthUserId();
  if (!authToken || !userId) {
    return false;
  }
  return true;
}

export function getAuthToken() {
  return localStorage.getItem("AT");
}

export function getAuthUserId() {
  return localStorage.getItem("uid");
}

export function assignLoginPayload(formFieldData: any) {
  return {
    email: formFieldData.email,
    password: formFieldData.password,
  };
}

export function assignRegisterPayload(formFieldData: any) {
  return {
    firstname: formFieldData.firstname,
    lastname: formFieldData.lastname,
    email: formFieldData.email,
    password: formFieldData.password,
    telephone: formFieldData.telephone,
    username: formFieldData.username,
    mfaEnabled: false,
  };
}

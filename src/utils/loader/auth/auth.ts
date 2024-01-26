import { getUser } from "../user/user";

export function getAuthCredentials() {
  const authToken = getAuthToken();
  const userId = getAuthUserId();

  if (!authToken || !userId) {
    return null;
  }
  return getUser(userId);
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

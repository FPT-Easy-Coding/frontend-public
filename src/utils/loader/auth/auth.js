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

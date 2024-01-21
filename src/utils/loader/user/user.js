import axios from "axios";

export async function getUser(uid) {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/users/profile/${uid}`);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: "Cannot fetch user data at the moment.",
    };
  }
}

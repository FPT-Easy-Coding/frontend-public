import axios from "axios";
import Profile from "../../../components/account/user/Profile";
import { useParams, useRouteLoaderData } from "react-router-dom";
export interface UserData {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  role: string;
  banned: boolean;
  premium: boolean;
}

export interface StudySet {
  quizId: number;
  numberOfQuestion: number;
  author: string;
  authorFirstName: string;
  authorLastName: string;
  quizName: string;
  createdAt: Date;
}

export interface Classes {
  className: string;
  numberOfStudent: number;
  numberOfQuizSet: number;
}

export interface Folder {
  folderName: string;
  numberOfQuizSet: number;
  createdAt: Date;
}
export async function fetchFolderData(userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/folder/create/user-id=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching folders");
  }
}

export async function fetchStudySetsData(userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/quiz/learned/user-id=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching study sets");
  }
}

export async function fetchClassesData(userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/classroom/learned/user-id=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching classes");
  }
}
function ProfilePage() {
  const loaderData = useRouteLoaderData("profile-loader") as UserData;
  const { tab } = useParams<{ tab: string }>();
  const validTabs = ["sets", "classes", "folders"];
  const checkedTab = validTabs.includes(tab as string) ? tab : "sets";

  return <Profile userData={loaderData} tabPath={checkedTab} />;
}

export default ProfilePage;

import axios from "axios";
import { useParams } from "react-router-dom";
import Folder from "../../components/folder/Folder";
export interface StudySet {
  quizId: number;
  numberOfQuestion: number;
  author: string;
  authorFirstName: string;
  authorLastName: string;
  quizName: string;
  createdAt: Date;
}
export interface FolderData {
  folderId: number;
  folderName: string;
  numberOfQuizSet: number;
  authorName: string;
  createdAt: string;
}
export interface UserCreatedStudySet {
  userId: number;
  quizId: number;
  userName: string;
  userFirstName: string;
  userLastName: string;
  categoryId: number;
  quizName: string;
  rate: number;
  numberOfQuestions: number;
  createAt: Date;
  view: number;
  timeRecentViewQuiz: Date;
}

export async function fetchFolderData(folderId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/folder/folder-id=${folderId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching folders");
  }
}
export async function fetchStudySetsData(folderId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/folder/quiz-belong-folder/folder-id=${folderId}`
    );
    return response.data.entityResponses;
  } catch (error) {
    throw new Error("Error fetching study sets");
  }
}
export async function fetchUserCreatedStudySetsData(userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/quiz/get-quiz-create-by-user/user-id=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user created study sets");
  }
}
function FolderPage() {
  const { id } = useParams();
  return <Folder folderId={Number(id)} />;
}

export default FolderPage;

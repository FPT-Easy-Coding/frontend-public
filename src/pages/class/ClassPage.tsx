import { useParams } from "react-router-dom";
import Class from "../../components/class/Class";
import axios from "axios";
export interface StudySet {
  quizId: number;
  numberOfQuestion: number;
  author: string;
  authorFirstName: string;
  authorLastName: string;
  quizName: string;
  createdAt: Date;
}
export interface ClassData {
  classId: number;
  className: string;
  numberOfStudent: number;
  numberOfQuizSet: number;
  teacherName: string;
  slugCode: string;
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
export interface Member {
  userName: string;
  userFirstName: string;
  userLastName: string;
}
export async function fetchClassData(classId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/classroom/class-id=${classId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching folders");
  }
}
export async function fetchStudySetsData(classId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/classroom/quiz-belong-class/class-id=${classId}`
    );
    return response.data;
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

export async function fetchMembersData(classId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/classroom/class-member/class-id=${classId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching class members");
  }
}

export async function addQuizToClassApi(classId: number, quizId: number) {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/classroom/add-quiz/${classId}/quiz/${quizId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user created study sets");
  }
}
export const removeQuizFromClassApi = async (
  classId: number,
  quizId: number
) => {
  try {
    // Make API call to remove quiz from class
    const response = await axios.delete(
      `http://localhost:8080/api/v1/classroom/delete-quiz/${classId}/quiz-set/${quizId}`
    );

    // Handle successful response (optional)
    console.log("Quiz removed successfully:", response.data);

    // Optionally, update state or perform any other necessary actions
  } catch (error) {
    // Handle errors
    console.error("Error removing quiz:", error);
    // Optionally, show an error message to the user
  }
};

function ClassPage() {
  const { id } = useParams();
  return <Class classId={Number(id)} />;
}

export default ClassPage;

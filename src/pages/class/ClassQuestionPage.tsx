import { useParams } from "react-router-dom";
import axios from "axios";
import ClassQuestionDetail from "../../components/class/ClassQuestionDetail";

// Interface for a question
export interface Question {
  classQuestionId: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date;
  userName: string;
  answered: boolean;
  userFirstName: string;
  userLastName: string;
  classroomAnswerResponse?: {
    content: string;
    userId: number;
  };
}

export interface RepliesComment {
  userName: string;
  content: string;
  userId: number;
  replyCommentId: number;
  commentId: number;
}

export interface Comments {
  commentId: number;
  questionId: number;
  userName: string;
  userId: number;
  content: string;
  replyComments: RepliesComment[];
}

export async function fetchQuestionData(questionId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/classroom/get-classroom-question/question-id=${questionId}`
    );
    console.log("questions data from server: ", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching class question");
  }
}

export async function fetchCommentsData(questionId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/classroom/get-comments/question-id=${questionId}`
    );
    console.log("comments data from server: ", response.data.entityResponses);
    return response.data.entityResponses;
  } catch (error) {
    throw new Error("Error fetching questions comments");
  }
}

function ClassQuestionPage() {
  const { questionId } = useParams();
  return (
    <div>
      <ClassQuestionDetail questionId={Number(questionId)} />
    </div>
  );
}

export default ClassQuestionPage;

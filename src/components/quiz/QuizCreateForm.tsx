import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  TextInput,
  Text,
  Group,
  Button,
  Stack,
  Container,
  Paper,
  Checkbox,
} from "@mantine/core";
import {
  IconMinus,
  IconPlaylistAdd,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import _debounce from "lodash/debounce";
import _throttle from "lodash/throttle";
import { Form } from "react-router-dom";

interface Answer {
  content: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
}

interface QuestionBoxProps {
  question: Question;
  index: number;
  onDelete: (index: number) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string,
    answerIndex?: number
  ) => void;
  onAddAnswer: (index: number) => void;
  onRemoveAnswer: (index: number, answerIndex: number) => void;
  onSelectCorrectAnswer: (index: number, answerIndex: number) => void;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({
  question,
  index,
  onDelete,
  onChange,
  onAddAnswer,
  onRemoveAnswer,
  onSelectCorrectAnswer,
}) => {
  const handleAddAnswer = () => {
    onAddAnswer(index);
  };

  const handleRemoveAnswer = (answerIndex: number) => {
    onRemoveAnswer(index, answerIndex);
  };

  const handleSelectCorrectAnswer = (answerIndex: number) => {
    onSelectCorrectAnswer(index, answerIndex);
  };

  return (
    <Paper shadow="md" radius="md" withBorder p="xl" className="mt-3">
      <Stack>
        <Group className="justify-between">
          <Text className="font-bold text-xl">Question {index + 1}</Text>
          <Button
            onClick={() => onDelete(index)}
            className="hover:bg-red-200"
            variant="white"
            color="red"
          >
            <IconTrash size={14} />
          </Button>
        </Group>

        <Group className="flex justify-between">
          <TextInput
            className="basis-1/3"
            variant="filled"
            placeholder="Enter question"
            label="Question"
            type="text"
            name="question"
            value={question.question}
            onChange={(e) => onChange(e, index, "question")}
          />
          <Stack>
            {question.answers.map((answer, answerIndex) => (
              <Group key={answerIndex}>
                <Checkbox
                  id={`correct-${index}-${answerIndex}`}
                  checked={answer.isCorrect}
                  onChange={() => handleSelectCorrectAnswer(answerIndex)}
                />
                <TextInput
                  className=""
                  variant="filled"
                  placeholder={`Enter answer ${answerIndex + 1}`}
                  label={`Option ${answerIndex + 1}`}
                  type="text"
                  name={`answer-${answerIndex}`}
                  value={answer.content}
                  onChange={(e) => onChange(e, index, "answer", answerIndex)}
                />

                <Button
                  onClick={() => handleRemoveAnswer(answerIndex)}
                  variant="light"
                  color="red"
                  size="sm"
                >
                  <IconMinus size={14} />
                </Button>
              </Group>
            ))}
            <Button
              onClick={handleAddAnswer}
              variant="white"
              color="rgba(0, 0, 0, 1)"
              size="sm"
              leftSection={<IconPlaylistAdd size={14} />}
            >
              Add Answer
            </Button>
          </Stack>
        </Group>
      </Stack>
    </Paper>
  );
};

const QuizCreateForm: React.FC = () => {
  const DEBOUNCE_DELAY = 100; // Adjust as needed
  const THROTTLE_DELAY = 100; // Adjust as needed
  const [quiz, setQuiz] = useState<{
    userId: number;
    title: string;
    description: string;
    questions: Question[];
  }>({
    userId: localStorage.uid,
    title: "",
    description: "",
    questions: [{ question: "", answers: [{ content: "", isCorrect: false }] }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string,
    answerIndex?: number
  ) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quiz.questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    } else if (field === "answer") {
      updatedQuestions[index].answers[answerIndex!].content = value;
    }
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: "", answers: [{ content: "", isCorrect: false }] },
      ],
    });
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions.splice(index, 1);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the title is empty
    if (!quiz.title.trim()) {
      alert("Please enter a title");
      return;
    }

    // Check if any question is empty
    if (quiz.questions.some((q) => !q.question.trim())) {
      alert("Please fill in all questions");
      return;
    }

    // Check if any answer is empty
    if (quiz.questions.some((q) => q.answers.some((a) => !a.content.trim()))) {
      alert("Please fill in all answers");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/quiz/create-quiz-set",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: quiz.userId,
            title: quiz.title,
            description: quiz.description,
            questions: quiz.questions,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create quiz set");
      }

      const data = await response.json();
      console.log("Quiz set created:", data);
    } catch (error: any) {
      console.error("Error creating quiz set:", error.message);
      alert("Error creating quiz set. Please try again.");
    }
  };

  const handleAddAnswer = (index: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index].answers.push({ content: "", isCorrect: false });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleRemoveAnswer = (index: number, answerIndex: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index].answers.splice(answerIndex, 1);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSelectCorrectAnswer = (index: number, answerIndex: number) => {
    const updatedQuestions = [...quiz.questions];
    const currentStatus =
      updatedQuestions[index].answers[answerIndex].isCorrect;
    updatedQuestions[index].answers[answerIndex].isCorrect = !currentStatus;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleDragEnd = _throttle(
    _debounce((result) => {
      if (!result.destination) return;

      const reorderedQuestions = Array.from(quiz.questions);
      const [removed] = reorderedQuestions.splice(result.source.index, 1);
      reorderedQuestions.splice(result.destination.index, 0, removed);

      setQuiz({ ...quiz, questions: reorderedQuestions });
    }, DEBOUNCE_DELAY),
    THROTTLE_DELAY
  );

  return (
    <Container>
      <Text className="font-bold text-3xl my-5">Create a new study set</Text>
      <Form onSubmit={handleSubmit}>
        <TextInput
          className="my-5
          w-full border-b-2 border-transparent focus-within:border-blue-400"
          variant="white"
          label="Title"
          type="text"
          name="title"
          placeholder="Enter a title, like 'Computer Science - Chapter 8: The beyond of computers'"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
        <TextInput
          className="my-5 w-full border-b-2 border-transparent focus-within:border-yellow-400"
          variant="white"
          type="text"
          label="Description"
          name="description"
          placeholder="Add a description (optional)"
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {quiz.questions.map((question, index) => (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <QuestionBox
                          index={index}
                          question={question}
                          onDelete={handleDeleteQuestion}
                          onChange={handleChange}
                          onAddAnswer={handleAddAnswer}
                          onRemoveAnswer={handleRemoveAnswer}
                          onSelectCorrectAnswer={handleSelectCorrectAnswer}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button
          type="button"
          onClick={handleAddQuestion}
          size="sm"
          variant="outline"
          className="w-full mt-5"
          leftSection={<IconPlus size={14} />}
        >
          Add Question
        </Button>
        <Group className="justify-end mt-5">
          <Button type="submit">Create Quiz</Button>
        </Group>
      </Form>
    </Container>
  );
};

export default QuizCreateForm;

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
  IconCodeMinus,
  IconMinus,
  IconPlaylistAdd,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import _debounce from "lodash/debounce";
import _throttle from "lodash/throttle";
import axios from "axios";

const QuestionBox = ({
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

  const handleRemoveAnswer = (answerIndex) => {
    onRemoveAnswer(index, answerIndex);
  };

  const handleSelectCorrectAnswer = (index, answerIndex) => {
    const updatedQuestions = [...quiz.questions];
    const correctAnswers = updatedQuestions[index].correctAnswers || []; // Get current correct answers or initialize an empty array

    // Toggle the selection of the answer index
    const answerIndexPosition = correctAnswers.indexOf(answerIndex);
    if (answerIndexPosition === -1) {
      // If answerIndex is not already in correctAnswers, add it
      correctAnswers.push(answerIndex);
    } else {
      // If answerIndex is already in correctAnswers, remove it
      correctAnswers.splice(answerIndexPosition, 1);
    }

    updatedQuestions[index].correctAnswers = correctAnswers; // Update correctAnswers array
    setQuiz({ ...quiz, questions: updatedQuestions });
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
                  checked={
                    question.correctAnswers &&
                    question.correctAnswers.includes(answerIndex)
                  }
                  onChange={() => handleSelectCorrectAnswer(index, answerIndex)}
                />
                <TextInput
                  className=""
                  variant="filled"
                  placeholder={`Enter answer ${answerIndex + 1}`}
                  label={`Option ${answerIndex + 1}`}
                  type="text"
                  name={`answer-${answerIndex}`}
                  value={answer}
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

const QuizCreateForm = () => {
  const DEBOUNCE_DELAY = 100; // Adjust as needed
  const THROTTLE_DELAY = 100; // Adjust as needed
  const [quiz, setQuiz] = useState({
    title: "",
    questions: [{ question: "", answers: [""] }],
  });

  const handleChange = (e, index, field, answerIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quiz.questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    } else if (field === "answer") {
      updatedQuestions[index].answers[answerIndex] = value;
    }
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { question: "", answers: [""] }],
    });
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions.splice(index, 1);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("your-api-endpoint", quiz);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const handleAddAnswer = (index) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index].answers.push("");
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleRemoveAnswer = (index, answerIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index].answers.splice(answerIndex, 1);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSelectCorrectAnswer = (index, answerIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index].correctAnswer = answerIndex;
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
      <form onSubmit={handleSubmit}>
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
      </form>
    </Container>
  );
};

export default QuizCreateForm;

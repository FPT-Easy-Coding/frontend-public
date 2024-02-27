import { useState } from "react";
import {
  TextInput,
  Text,
  Group,
  Button,
  Box,
  Stack,
  rem,
  Container,
  Paper,
} from "@mantine/core";
import { IconPlaylistAdd, IconPlus, IconTrash } from "@tabler/icons-react";

const QuestionBox = ({ question, index, onDelete, onChange }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <>
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
              className="basis-1/3 "
              variant="filled"
              placeholder="Enter question"
              label={showOptions ? "Question" : "Term"}
              type="text"
              name="question"
              value={question.question}
              onChange={(e) => onChange(e, index, "question")}
            />
            <TextInput
              className="basis-1/3"
              variant="filled"
              placeholder="Enter answer"
              label={showOptions ? "Answer" : "Definition"}
              type="text"
              name="answer"
              value={question.answer}
              onChange={(e) => onChange(e, index, "answer")}
            />
          </Group>
          <Group className="justify-end">
            <Stack className="basis-1/3">
              {showOptions &&
                [1, 2, 3, 4].map((optionIndex) => (
                  <TextInput
                    className="my-5 border-b border-slate-950  focus-within:border-yellow-400"
                    variant="white"
                    placeholder={`Enter option ${optionIndex}`}
                    label={`Option ${optionIndex}`}
                    type="text"
                    name={`option-${optionIndex}`}
                    value={question[`option-${optionIndex}`]}
                    onChange={(e) =>
                      onChange(e, index, `option-${optionIndex}`)
                    }
                  />
                ))}
            </Stack>
          </Group>

          <Button
            onClick={toggleOptions}
            variant="light"
            size="sm"
            leftSection={<IconPlaylistAdd size={14} />}
          >
            {showOptions ? "Hide options" : "Add multiple choice options"}
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

const QuizCreateForm = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    questions: [{ question: "", options: [""], correctAnswer: "" }],
  });

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quiz.questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    } else if (field === "option") {
      updatedQuestions[index].options[e.target.dataset.optionIndex] = value;
    } else if (field === "correctAnswer") {
      updatedQuestions[index].correctAnswer = value;
    }
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: "", options: [""], correctAnswer: "" },
      ],
    });
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions.splice(index, 1);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quiz);
  };

  return (
    <Container>
      <Text className="font-bold text-3xl my-5">Create a new study set</Text>
      <form onSubmit={handleSubmit}>
        <TextInput
          className="my-5 w-full border-b-2 border-transparent focus-within:border-blue-400"
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
          name="title"
          placeholder="Add a description (optional)"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
        <div>
          {" "}
          {quiz.questions.map((question, index) => (
            <QuestionBox
              key={index}
              index={index}
              question={question}
              onDelete={handleDeleteQuestion}
              onChange={handleChange}
            />
          ))}
        </div>
        <Button
          type="button"
          onClick={handleAddQuestion}
          size="sm"
          variant="outline"
          className="w-full mt-5"
          leftSection={<IconPlus size={14} />}
        >
          Add card
        </Button>
        <Group className="justify-end mt-5">
          <Button type="submit">Create Quiz</Button>
        </Group>
      </form>
    </Container>
  );
};

export default QuizCreateForm;

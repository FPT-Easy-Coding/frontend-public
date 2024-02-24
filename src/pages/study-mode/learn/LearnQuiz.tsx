import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Title, Text, Button, Container, Paper, Modal } from '@mantine/core';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Progress as MantineProgress } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid } from '@mantine/core';
interface Answer {
    content: string;
    isCorrect: boolean;
}
interface QuizItem {
    questionContent: string;
    answers: Answer[];
    userSelectedAnswerIndex: number | null;
    correctAnswerIndex: number | null;
}
interface QuizData {
    userId: number;
    quizId: number;
    questions: QuizItem[];
}
interface ExtendedProgressProps extends React.ComponentProps<typeof MantineProgress> {
    max: number;
    colors?: { color: string; from: number; to: number }[];
}
const Progress: React.FC<ExtendedProgressProps> = ({ max, ...restProps }) => {
    return <MantineProgress {...restProps} />;
};
const LearnQuiz = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [, setShowResult] = useState(false);
    const [progress, setProgress] = useState(0);
    const [retryMode, setRetryMode] = useState(false);
    const [answeredAllQuestions, setAnsweredAllQuestions] = useState(false);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
    const [currentRound, setCurrentRound] = useState(1);
    const [answeredQuestionsList, setAnsweredQuestionsList] = useState<QuizItem[]>([]);
    const [, setShowResultImmediately] = useState(false);
    const [answerColors, setAnswerColors] = useState<string[]>(Array(4).fill('white'));
    const [suffered, setSuffered] = useState(false);
    const [currentDisplayedQuestionIndex, setCurrentDisplayedQuestionIndex] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch quiz data based on the ID
                const response = await axios.get<QuizData>(`http://localhost:8080/api/v1/quiz/get-quiz?id=${id}`);
                const quiz = response.data;
                // Set the retrieved quiz data to the state
                setQuizData(quiz);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);
    const sufferQuizLocal = () => {
        if (quizData) {
            const shuffledQuestions = [...quizData.questions].sort(() => Math.random() - 0.5);
            setQuizData((prevQuizData) => ({
                ...prevQuizData!,
                questions: shuffledQuestions,
            }));
            setSuffered(true);
        }
    };
    const handleAnswerClick = (answerIndex: number) => {
        if (selectedAnswerIndex === null || selectedAnswerIndex === undefined) {
            const currentQuizItem: QuizItem = quizData?.questions[currentQuestionIndex]!;
            const isCorrect = currentQuizItem.answers[answerIndex].isCorrect;
            setSelectedAnswerIndex(answerIndex);
            if (isCorrect) {
                toast.success('👏 you got it ', {
                    position: "top-center",
                    autoClose: 900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // if (!suffered) {
                //     sufferQuizLocal();
                //     setSuffered(true);
                // }
                handleCorrectAnswer(answerIndex);
            } else {
                handleIncorrectAnswer(answerIndex);
            }
        }
    };
    const handleIncorrectAnswer = (selectedAnswerIndex: number) => {
        const currentQuizItem: QuizItem = quizData?.questions[currentQuestionIndex]!;
        const correctAnswerIndex = currentQuizItem.answers.findIndex((answer) => answer.isCorrect);
        toast.error(
            <>
                <div style={{ color: 'red' }}>You answered wrong.</div>
                <div style={{ color: 'red' }}>Let's Try Again</div>
                <Button
                    size="sm"
                    onClick={handleRetry}
                    style={{
                        backgroundColor: '#FF0000',
                        color: 'white',
                        marginTop: '10px',
                    }}
                >
                    Retry
                </Button>
            </>,
            {
                position: 'top-center',
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                closeButton: false,
            }
        );

        if (!retryMode) {
            setAnswerColors((prevColors) => {
                const updatedColors = [...prevColors];
                updatedColors[selectedAnswerIndex] = '#FF0000'; // Red for selected answer
                updatedColors[correctAnswerIndex] = '#4CAF50'; // Green for correct answer
                return updatedColors;
            });
        }
    };
    const handleRetry = () => {
        toast.dismiss();
        setCorrectAnswerIndex(null);
        setSelectedAnswerIndex(null);
        setShowResult(false);
        setAnswerColors(Array(4).fill('white'));
    };
    const handleCorrectAnswer = (selectedAnswerIndex: number) => {
        const currentQuizItem: QuizItem = quizData?.questions[
            currentQuestionIndex
        ]!;
        const correctAnswerIndex = currentQuizItem.answers.findIndex(
            (answer) => answer.isCorrect
        );
        setAnswerColors((prevColors) => {
            const updatedColors = [...prevColors];
            updatedColors[correctAnswerIndex] = '#4CAF50'; // Green for correct answer
            return updatedColors;
        });
        setProgress((prevProgress) => {
            const newProgress =
                prevProgress + (1 / quizData!.questions.length) * 100;
            return newProgress <= 100 ? newProgress : 100;
        });
        const isLastQuestion = currentQuestionIndex === quizData!.questions.length - 1;
        if (answeredQuestionsList.length < 5) {
            setAnsweredQuestionsList((prevList) => [...prevList, currentQuizItem]);
        }
        if (isLastQuestion || answeredQuestionsList.length === quizData!.questions.length - 1) {
            setShowResult(true);
            setAnsweredAllQuestions(true);
            setCurrentRound((prevRound) => prevRound + 1);
            if (answeredQuestionsList.length === 5) {
                setTimeout(() => {
                    handleNextQuestion();
                }, 1000);
            }
        } else {
            setTimeout(() => {
                setAnswerColors((prevColors) => {
                    const updatedColors = [...prevColors];
                    updatedColors[correctAnswerIndex] = 'white'; // Set to white
                    return updatedColors;
                });
                setShowResult(false);
                handleNextQuestion();
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            }, 1500);
        }
    };
    const handleNextQuestion = () => {
        setShowResultImmediately(false);
        setSelectedAnswerIndex(null);
        if (!retryMode && correctAnswerIndex !== null) {
            setAnswerColors((prevColors) => {
                const updatedColors = [...prevColors];
                updatedColors[correctAnswerIndex] = 'white';
                return updatedColors;
            });
        }
        const isLastQuestion = currentQuestionIndex === quizData!.questions.length - 1;
        if (currentQuestionIndex < quizData!.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
            setAnsweredAllQuestions(true);
            if (currentRound * 5 < quizData!.questions.length) {
                const lastFiveQuestions = answeredQuestionsList.slice(-5);
                setAnsweredQuestionsList(lastFiveQuestions);
                setCurrentQuestionIndex((currentRound * 5) % quizData!.questions.length);
                setCurrentRound((prevRound) => prevRound + 1);
            } else {
                setShowResult(false);
                setCurrentRound(1);
                setQuizData((prevQuizData) => {
                    if (prevQuizData) {
                        return {
                            ...prevQuizData,
                            questions: prevQuizData.questions.slice(0, currentRound * 5),
                        };
                    }
                    return prevQuizData;
                });
            }
            if (isLastQuestion && correctAnswerIndex !== null && quizData?.questions[0]) {
                const correctAnswer1Index = quizData.questions[0].answers.findIndex(
                    (answer) => answer.isCorrect
                );
                setTimeout(() => {
                    setAnswerColors((prevColors) => {
                        const updatedColors = [...prevColors];
                        updatedColors[correctAnswer1Index] = '#4CAF50'; // Green for correct answer 1
                        return updatedColors;
                    });
                }, 0);
            }
        }
    };
    const handleFinishQuiz = () => {
        navigate('/home');
    };
    const handleRestartQuiz = async () => {
        const response = await axios.get<QuizData>(`http://localhost:8080/api/v1/quiz/get-quiz?id=${id}`);
        const quiz = response.data;
        setQuizData(quiz);
        setCurrentQuestionIndex(0);
        setSelectedAnswerIndex(null);
        setShowResult(false);
        setProgress(0);
        setRetryMode(false);
        setAnsweredAllQuestions(false);
        setAnsweredQuestionsList([]);
        toast.dismiss();
    };
    const [modalOpened, setModalOpened] = useState(false);

    const openModal = () => {
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
    };

    const restartQuiz = () => {
        handleRestartQuiz()
        closeModal();
    };
    const handleSufferQuiz = () => {
        sufferQuizLocal(); // Call the passed suffer function
        closeModal();
    };
    const closeQuiz = () => {
        navigate('/home')
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Container size="lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <>
                    <Button onClick={openModal} style={{ fontSize: '18px', marginTop: '30px' }}>
                        Options
                    </Button>
                    <Modal
                        opened={modalOpened}
                        onClose={closeModal}
                        title="Options"
                        size={400}
                        styles={{
                            title: {
                                fontSize: '24px',
                                fontWeight: 'bold',
                                margin: '0 auto',
                            },
                            body: {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            },
                        }}
                    >
                        <Button
                            onClick={handleSufferQuiz}
                            style={{
                                marginBottom: 8,
                                backgroundColor: 'white',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                color: 'black',
                                width: '100%',
                            }}
                        >
                            Suffer Question
                        </Button>
                        <Button
                            onClick={restartQuiz}
                            style={{
                                marginBottom: 8,
                                backgroundColor: 'white',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                color: 'black',
                                width: '100%',
                            }}
                        >
                            Restart Quiz
                        </Button>
                        <Button
                            onClick={closeQuiz}
                            style={{
                                backgroundColor: 'white',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                color: 'black',
                                width: '100%',
                            }}
                        >
                            Exit Quiz
                        </Button>
                    </Modal>
                </>
                <Progress
                    style={{ marginTop: '50px', width: '100vw' }}
                    value={progress}
                    max={100 as any}
                    colors={[
                        { color: '#4CAF50', from: 0, to: 100 },
                        { color: '#FF0000', from: 0, to: progress },
                    ]}
                />
                {quizData && !suffered && !answeredAllQuestions && (
                    <div>
                        <Paper shadow="xl" style={{ textAlign: 'center', width: '1000px', height: '500px' }}>
                            <Title order={1} style={{ marginBottom: '20px' }}>
                                Question {currentQuestionIndex + 1}:
                            </Title>
                            <Text style={{ fontSize: '30px', marginBottom: '20px' }}>
                                {quizData?.questions[currentQuestionIndex]?.questionContent}
                            </Text>
                            <Text
                                style={{
                                    fontSize: '20px',
                                    textAlign: 'left',
                                    marginLeft: '30px',
                                    fontWeight: 'bold',
                                    color: '#777777 ',
                                }}
                            >
                                Select the correct definition chưa suffer
                            </Text>
                            <Grid style={{ width: '100%' }}>
                                {quizData?.questions[currentQuestionIndex]?.answers.map((answer, answerIndex) => (
                                    <Grid.Col span={6} key={answerIndex} style={{ marginBottom: '10px' }}>
                                        <Button
                                            onClick={() => handleAnswerClick(answerIndex)}
                                            className={`answer-button answer-button-${answerIndex}`}
                                            style={{
                                                width: '100%',
                                                backgroundColor: answerColors[answerIndex],
                                                color: answerColors[answerIndex] === 'white' ? 'black' : 'white',
                                                borderRadius: '5px',
                                                padding: '10px',
                                                margin: '5px 0',
                                                height: '65px',
                                                border: `1px solid ${answerColors[answerIndex] === 'white'
                                                    ? 'rgba(0, 0, 0, 0.5)'
                                                    : answerColors[answerIndex]
                                                    }`,
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1)',
                                            }}
                                        >
                                            {answer.content}
                                        </Button>
                                    </Grid.Col>
                                ))}
                            </Grid>
                            <ToastContainer />
                        </Paper>
                    </div>
                )}
                {(quizData && suffered && !answeredAllQuestions) && (
                    <Paper shadow="xl" style={{ textAlign: 'center', width: '1000px', height: '500px' }}>
                        <Title order={1} style={{ marginBottom: '20px' }}>
                            Question {currentQuestionIndex + 1}:
                        </Title>
                        <Text style={{ fontSize: '30px', marginBottom: '20px' }}>
                            {quizData?.questions[currentQuestionIndex]?.questionContent}
                        </Text>
                        <Text
                            style={{
                                fontSize: '20px',
                                textAlign: 'left',
                                marginLeft: '30px',
                                fontWeight: 'bold',
                                color: '#777777 ',
                            }}
                        >
                            Select the correct definition
                        </Text>
                        <Grid style={{ width: '100%' }}>
                            {quizData?.questions[currentQuestionIndex]?.answers.map((answer, answerIndex) => (
                                <Grid.Col span={6} key={answerIndex} style={{ marginBottom: '10px' }}>
                                    <Button
                                        onClick={() => handleAnswerClick(answerIndex)}
                                        className={`answer-button answer-button-${answerIndex}`}
                                        style={{
                                            width: '100%',
                                            backgroundColor: answerColors[answerIndex],
                                            color: answerColors[answerIndex] === 'white' ? 'black' : 'white',
                                            borderRadius: '5px',
                                            padding: '10px',
                                            margin: '5px 0',
                                            height: '65px',
                                            border: `1px solid ${answerColors[answerIndex] === 'white'
                                                ? 'rgba(0, 0, 0, 0.5)'
                                                : answerColors[answerIndex]
                                                }`,
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        {answer.content}
                                    </Button>
                                </Grid.Col>
                            ))}
                        </Grid>
                        <ToastContainer />
                    </Paper>
                )}
                {answeredAllQuestions && (
                    <>
                        <Text style={{ fontSize: '30px', marginBottom: '20px' }}>List Question</Text>
                        {quizData?.questions.map((question, index) => (
                            <div key={index}>
                                <table
                                    style={{
                                        height: '5vh',
                                        width: '70vw',
                                        borderCollapse: 'collapse',
                                        borderRadius: '5px',
                                        overflow: 'hidden',
                                        marginTop: '10px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <tbody>
                                        <tr key={index}>
                                            <td
                                                style={{
                                                    padding: '20px',
                                                    textAlign: 'left',
                                                    borderBottom: '1px solid #ddd',
                                                    borderRight: '1px solid #ddd',
                                                    width: '50%',
                                                }}
                                            >
                                                {question.questionContent}
                                            </td>
                                            <td
                                                style={{
                                                    padding: '20px',
                                                    textAlign: 'left',
                                                    borderBottom: '1px solid #ddd',
                                                    width: '50%',
                                                }}
                                            >
                                                {question.answers.find((answer) => answer.isCorrect)?.content}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                        <div style={{ marginTop: '20px' }}>
                            <Button
                                size="lg"
                                onClick={handleFinishQuiz}
                                style={{ backgroundColor: '#2196F3', color: 'white' }}
                            >
                                Back To homepage
                            </Button>
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
};
export default LearnQuiz;

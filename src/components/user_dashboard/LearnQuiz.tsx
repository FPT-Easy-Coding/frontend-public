import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Title, Text, Button, Container, Paper } from '@mantine/core';
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
    userName: string;
    userFirstName: string;
    userLastName: string;
    categoryId: number;
    categoryName: string;
    quizName: string;
    rate: number;
    numberOfQuestions: number;
    createAt: string;
    view: number;
    timeRecentViewQuiz: string;
    questions: QuizItem[];
}

interface ExtendedProgressProps extends React.ComponentProps<typeof MantineProgress> {
    max: number;
    colors?: { color: string; from: number; to: number }[];
}

const Progress: React.FC<ExtendedProgressProps> = ({ max, ...restProps }) => {
    return <MantineProgress {...restProps} />;
};

const LearnQuiz: React.FC = () => {
    const params = useParams();
    const quizid = params.quizid;
    const navigate = useNavigate();

    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null as number | null);
    const [showResult, setShowResult] = useState(false);
    const [progress, setProgress] = useState(0);
    const [retryMode, setRetryMode] = useState(false);
    const [answeredAllQuestions, setAnsweredAllQuestions] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<QuizData>(`http://localhost:8080/api/v1/quiz/get-quiz?id=6`);
                const quiz = response.data;
                setQuizData(quiz);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [quizid]);

    const handleAnswerClick = (answerIndex: number) => {
        if (selectedAnswerIndex === null || selectedAnswerIndex === undefined) {
            const currentQuizItem: QuizItem = quizData?.questions[currentQuestionIndex]!;

            const correctAnswerIndex = currentQuizItem.answers.findIndex((answer) => answer.isCorrect);

            setSelectedAnswerIndex(answerIndex);

            if (answerIndex === correctAnswerIndex) {
                handleCorrectAnswer();
            } else {
                handleIncorrectAnswer();
            }
        }
    };

    const handleCorrectAnswer = () => {
        setTimeout(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + (1 / quizData!.questions.length) * 100;
                return newProgress <= 100 ? newProgress : 100;
            });

            handleNextQuestion();
        }, 1000);
    };

    const handleIncorrectAnswer = () => {
        toast.error(
            <>
                <div style={{ color: 'red' }}>You answered wrong.</div>
                <div style={{ marginTop: '10px', fontSize: '16px' }}>Let's try again</div>
                <Button size="sm" onClick={handleRetry} style={{ backgroundColor: '#FF0000', color: 'white', marginTop: '10px' }}>
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
    };

    const handleRetry = () => {
        toast.dismiss();
        setShowResult(false);
        setSelectedAnswerIndex(null);
    };

    const handleNextQuestion = () => {
        setSelectedAnswerIndex(null);

        if (currentQuestionIndex < quizData!.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
            setAnsweredAllQuestions(true);
        }
    };

    const handleFinishQuiz = () => {
        navigate('/home');
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswerIndex(null);
        setShowResult(false);
        setProgress(0);
        setRetryMode(false);
        setAnsweredAllQuestions(false);
        toast.dismiss();
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container size="lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Progress
                    style={{ marginTop: '20px', width: '100vw' }}
                    value={progress}
                    max={100 as any}
                    colors={[
                        { color: '#4CAF50', from: 0, to: 100 },
                        { color: '#FF0000', from: 0, to: progress },
                    ]}
                />

                {answeredAllQuestions ? (
                    <>
                        <Text style={{ fontSize: '30px', marginBottom: '20px' }}>List Question</Text>
                        {quizData?.questions.map((question, index) => (
                            <div key={index} >
                                <table style={{ width: '70vw', borderCollapse: 'collapse', borderRadius: '5px', overflow: 'hidden', marginTop: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                    <tbody>

                                        <tr key={index}>
                                            <td style={{ padding: '20px', textAlign: 'left', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd', width: '50%' }}>
                                                {question.questionContent}
                                            </td>
                                            <td style={{ padding: '20px', textAlign: 'left', borderBottom: '1px solid #ddd', width: '50%' }}>
                                                {question.answers.find((answer) => answer.isCorrect)?.content}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        ))}



                        <div style={{ marginTop: '20px' }}>
                            <Button size="lg" onClick={handleRestartQuiz} style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '10px' }}>
                                Restart Quiz
                            </Button>
                            <Button size="lg" onClick={handleFinishQuiz} style={{ backgroundColor: '#2196F3', color: 'white' }}>
                                Back To homepage
                            </Button>
                        </div>
                    </>
                ) : (
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
                                        style={{
                                            width: '100%',
                                            backgroundColor:
                                                selectedAnswerIndex !== null && answerIndex === selectedAnswerIndex
                                                    ? answer.isCorrect
                                                        ? '#4CAF50'
                                                        : '#FF0000'
                                                    : 'white',
                                            color: selectedAnswerIndex !== null && answerIndex === selectedAnswerIndex ? 'white' : 'black',
                                            borderRadius: '5px',
                                            padding: '10px',
                                            margin: '5px 0',
                                            height: '65px',
                                            border: `1px solid ${selectedAnswerIndex !== null && answerIndex === selectedAnswerIndex
                                                ? answer.isCorrect
                                                    ? '#4CAF50'
                                                    : '#FF0000'
                                                : 'rgba(0, 0, 0, 0.5)'
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
            </Container>
        </div>
    );
};

export default LearnQuiz;

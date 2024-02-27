import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Title, Text, Button, Container, Paper, Modal, BackgroundImage } from '@mantine/core';
import { Progress as MantineProgress } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid } from '@mantine/core';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopularQuiz from '../../../components/user_dashboard/PopularQuiz';
import congratulations from '../../../assets/Quizlet_Trophy@2x.7ef119b6.png'
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
    const [retryMode] = useState(false);
    const [answeredAllQuestions, setAnsweredAllQuestions] = useState(false);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
    const [currentRound, setCurrentRound] = useState(1);
    const [answeredQuestionsList, setAnsweredQuestionsList] = useState<QuizItem[]>([]);
    const [, setShowResultImmediately] = useState(false);
    const [answerColors, setAnswerColors] = useState<string[]>(Array(4).fill('white'));
    const [suffered, setSuffered] = useState(false);
    const [showAnsweredQuestionsList, setShowAnsweredQuestionsList] = useState(false);
    const [openSpan, setOpenSpan] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<QuizData>(`http://localhost:8080/api/v1/quiz/get-quiz?id=${id}`);
                const quiz = response.data;
                setQuizData(quiz);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const sufferQuizLocal = () => {
        setOpenSpan(false)
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
            const correctAnswerIndex = currentQuizItem.answers.findIndex((answer) => answer.isCorrect);
            setSelectedAnswerIndex(answerIndex);
            if (answerIndex === correctAnswerIndex) {
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
                <div style={{ textAlign: 'center', color: 'red' }}>You answered wrong.</div>
                <Button
                    size="sm"
                    onClick={handleRetry}
                    style={{
                        backgroundColor: '#FF0000',
                        color: 'white',
                        marginTop: '10px',
                        marginLeft: '90px',

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
                updatedColors[selectedAnswerIndex] = '#FF6666';
                updatedColors[correctAnswerIndex] = '#7CCD7C';
                return updatedColors;
            });
        }
    };

    const handleRetry = () => {
        toast.dismiss();
        setCorrectAnswerIndex(null);
        setSelectedAnswerIndex(null);
        setShowResult(false);
        setOpenSpan(true)
        setAnswerColors(Array(4).fill('white'));
    };

    const [hasMoreQuestions, setHasMoreQuestions] = useState(true);
    const [nextQuestionIndex, setNextQuestionIndex] = useState<number | null>(null);
    const [nextQuestionsList, setNextQuestionsList] = useState<QuizItem[]>([]);

    const handleContinue = (answeredQuestionsCount: number) => {
        setAnswerColors(Array(4).fill('white'));
        setNextQuestionsList([]);
        setAnsweredQuestionsList([]);
        console.log(setAnsweredQuestionsList)
        if (answeredQuestionsCount !== null) {
            // Calculate the correct index based on the count of answered questions
            const nextQuestionIndex = answeredQuestionsCount % quizData!.questions.length;

            setCurrentQuestionIndex(nextQuestionIndex);

            const nextQuestions = quizData!.questions.slice(nextQuestionIndex, nextQuestionIndex + 6);

            setNextQuestionIndex(nextQuestionIndex); // Update nextQuestionIndex state
            setNextQuestionsList(nextQuestions);
            handleNextQuestion();
            setShowAnsweredQuestionsList(false);

        } else {
            // Handle completion of questions
            setHasMoreQuestions(false);
            setShowAnsweredQuestionsList(true);
        }
    };
    const handleCorrectAnswer = (selectedAnswerIndex: number) => {
        const currentQuizItem: QuizItem = quizData?.questions[currentQuestionIndex]!;
        const correctAnswerIndex = currentQuizItem.answers.findIndex((answer) => answer.isCorrect);
        setAnswerColors((prevColors) => {
            const updatedColors = [...prevColors];
            updatedColors[correctAnswerIndex] = '#7CCD7C';
            return updatedColors;
        });
        console.log(answeredQuestionsList)
        setProgress((prevProgress) => {
            const newProgress = prevProgress + (1 / quizData!.questions.length) * 100;
            return newProgress <= 100 ? newProgress : 100;
        });

        // const isLastQuestion = currentQuestionIndex === quizData!.questions.length - 1;

        if (answeredQuestionsList.length < 5) {
            setAnsweredQuestionsList((prevList) => [...prevList, currentQuizItem]);
        }

        if (answeredQuestionsList.length === 4 || answeredQuestionsList.length === quizData!.questions.length - 1) {
            setShowResult(true);
            setAnsweredAllQuestions(true);
            setShowAnsweredQuestionsList(true)
            setCurrentRound((prevRound) => prevRound + 1);

            if (answeredQuestionsList.length === 4) {
                setTimeout(() => {
                    setNextQuestionsList([])
                    setShowResult(false);
                    // handleNextQuestion();
                }, 0);
            }

        } else {
            setTimeout(() => {
                setAnswerColors((prevColors) => {
                    const updatedColors = [...prevColors];
                    updatedColors[correctAnswerIndex] = 'white';
                    return updatedColors;
                });

                setShowResult(false);

                handleNextQuestion();
            }, 1500);
        }

    };
    const handleNextQuestion = () => {
        setOpenSpan(false)
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
        }
        console.log("answer", answeredQuestionsList)
        console.log("index", currentQuestionIndex)
    };
    const handleFinishQuiz = () => {
        navigate('/home');
    };
    const handleSufferQuiz = () => {
        sufferQuizLocal();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Container size="lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <>
                    {progress !== 100 && (
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
                            Shuffer Question
                        </Button>
                    )}
                </>
                {progress !== 100 && !answeredAllQuestions && (
                    <Progress
                        color="gray"
                        size="sm"
                        style={{ marginTop: '50px', width: '100%' }}
                        value={progress}
                        max={100}
                    />
                )}
                {quizData && !suffered && !answeredAllQuestions &&
                    (progress <= 100 - (100 % quizData.questions.length))
                    ? (
                        <div>
                            <Paper shadow="lg" style={{ width: '900px', height: '450px' }}>
                                <Title
                                    order={1}
                                    style={{
                                        paddingTop: '10px',
                                        marginLeft: '20px',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Arial, sans-serif',
                                        color: 'gray',
                                    }}
                                >
                                    Term
                                    {openSpan && (
                                        <div style={{
                                            marginLeft: '10px',
                                            height: '23px',
                                            border: '2px solid #F8E2D1',
                                            borderRadius: '10px',
                                            padding: '-4px',
                                            display: 'inline-block',
                                            backgroundColor: '#FBA834',
                                        }}>
                                            <span style={{ color: 'white', fontSize: '14px' }}>let's try again</span>
                                        </div>
                                    )}
                                </Title>
                                <Text style={{
                                    fontSize: '25px',
                                    fontWeight: 'lighter',
                                    marginLeft: '20px',
                                    marginTop: '20px',
                                    color: '#333',
                                    textAlign: 'left',
                                    letterSpacing: '-1px',
                                    fontFamily: 'Helvetica',
                                    marginBottom: '120px',
                                }}>
                                    {quizData?.questions[currentQuestionIndex]?.questionContent}
                                </Text>


                                <Text
                                    style={{
                                        fontSize: '20px',
                                        textAlign: 'left',
                                        marginLeft: '30px',
                                        fontWeight: 'bold',
                                        color: '#777777',
                                        letterSpacing: '-1px',
                                        fontFamily: 'Arial, sans-serif',

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
                                                    width: '90%',
                                                    backgroundColor: answerColors[answerIndex],
                                                    color: answerColors[answerIndex] === 'white' ? 'black' : 'white',
                                                    borderRadius: '5px',
                                                    padding: '10px',
                                                    margin: '5px 5px 5px 5px',
                                                    marginLeft: '22px',
                                                    height: '65px',
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
                    )
                    : (
                        <> </>
                    )
                }
                {/* nextRoundWhenNotshuffer */}
                {
                    (nextQuestionsList.length !== 0 && quizData && !suffered) &&
                    (
                        nextQuestionsList.some(nextQuestion =>
                            progress <= 100 - (100 % quizData.questions.length)
                        )
                            ? (

                                <div>
                                    <>
                                        <Progress
                                            color="gray"
                                            size="sm"
                                            style={{ marginTop: '50px', width: '100%' }}
                                            value={progress}
                                            max={100}
                                        />
                                    </>
                                    <Paper shadow="lg" style={{ width: '900px', height: '450px' }}>
                                        <Title
                                            order={1}
                                            style={{
                                                paddingTop: '10px',
                                                marginLeft: '20px',
                                                fontSize: '15px',
                                                fontWeight: 'lighter',
                                                fontFamily: 'Arial, sans-serif',
                                                color: 'gray',
                                            }}
                                        >
                                            Term
                                            {openSpan && (
                                                <div style={{
                                                    marginLeft: '10px',
                                                    height: '23px',
                                                    border: '2px solid #F8E2D1',
                                                    borderRadius: '10px',
                                                    padding: '-4px',
                                                    display: 'inline-block',
                                                    backgroundColor: '#FBA834',
                                                }}>
                                                    <span style={{ color: 'white', fontSize: '14px' }}>let's try again</span>
                                                </div>
                                            )}
                                        </Title>
                                        <Text style={{
                                            fontSize: '30px',
                                            fontWeight: 'bold',
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                            color: '#333',
                                            textAlign: 'left',
                                            letterSpacing: '-1px'
                                            , fontFamily: 'Arial, sans-serif',
                                            marginBottom: '120px',
                                        }}>
                                            {quizData?.questions[currentQuestionIndex]?.questionContent}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: '20px',
                                                textAlign: 'left',
                                                marginLeft: '30px',
                                                fontWeight: 'bold',
                                                color: '#777777 ',
                                                letterSpacing: '-1px',
                                                fontFamily: 'Arial, sans-serif',
                                            }}
                                        >
                                            Select the correct definition next
                                        </Text>
                                        <Grid style={{ width: '100% ' }}>
                                            {quizData?.questions[currentQuestionIndex]?.answers.map((answer, answerIndex) => (
                                                <Grid.Col span={6} key={answerIndex} style={{ marginBottom: '10px' }}>
                                                    <Button
                                                        onClick={() => handleAnswerClick(answerIndex)}
                                                        className={`answer-button answer-button-${answerIndex}`}
                                                        style={{
                                                            width: '90%',
                                                            backgroundColor: answerColors[answerIndex],
                                                            color: answerColors[answerIndex] === 'white' ? 'black' : 'white',
                                                            borderRadius: '5px',
                                                            padding: '10px',
                                                            margin: '5px 5px 5px 5px',
                                                            marginLeft: '22px',
                                                            height: '65px',
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
                            ) : (
                                <>
                                    {nextQuestionsList.map((question, index) => (
                                        progress === 100 && (
                                            <>
                                                <>
                                                    <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#6c757d', textAlign: 'left' }}>
                                                        Terms studied in this round
                                                    </Text>
                                                </>
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
                                                                        fontFamily: 'Arial, sans-serif',
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
                                                                        fontFamily: 'Arial, sans-serif',
                                                                    }}
                                                                >
                                                                    {question.answers.find((answer) => answer.isCorrect)?.content}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>
                                        )
                                    ))}

                                    {progress === 100 && (

                                        <Button
                                            size="lg"
                                            onClick={() => {
                                                handleContinue(answeredQuestionsList.length);
                                                // setCurrentDisplayedQuestionIndex(nextQuestionIndex!);
                                                // setNextQuestionIndex(null);
                                            }}
                                            style={{ marginTop: '30px', backgroundColor: '#2196F3', color: 'white' }}
                                        >
                                            Continue
                                        </Button>
                                    )}
                                    {progress !== 100 && (
                                        <>
                                            <img src={congratulations} alt="Congratulations" />
                                            <Title order={2}>Way to go! You've studied all the terms.</Title>
                                            <Text>Try another round so you can practice the difficult questions.</Text>

                                            <div style={{ marginTop: '20px' }}>
                                                <>
                                                    <Button
                                                        size="lg"
                                                        style={{
                                                            backgroundColor: '#64B5F6',  // Slightly darker blue color
                                                            color: 'white',
                                                            borderRadius: '20px',  // Adjust the border radius as needed
                                                            width: '250px',  // Set the desired width
                                                        }}
                                                    >
                                                        Take a Test
                                                    </Button>
                                                    <Button
                                                        size="lg"
                                                        onClick={handleFinishQuiz}
                                                        style={{
                                                            backgroundColor: '#64B5F6',  // Slightly darker blue color
                                                            color: 'white',
                                                            borderRadius: '20px',
                                                            marginLeft: '20px',
                                                            width: '250px',  // Set the desired width
                                                        }}
                                                    >
                                                        Back To Homepage
                                                    </Button>


                                                </>
                                            </div>
                                            {/* <Title order={2} style={{ marginLeft: '-878px' }}>Popular Quizzes</Title>
                                            <PopularQuiz /> */}
                                        </>

                                    )}


                                    {progress === 100 && (
                                        <div style={{ marginTop: '20px' }}>
                                            <>

                                                <Button
                                                    size="lg"
                                                    onClick={handleFinishQuiz}
                                                    style={{
                                                        backgroundColor: '#64B5F6',  // Slightly darker blue color
                                                        color: 'white',
                                                        borderRadius: '20px',
                                                        marginLeft: '20px',
                                                        width: '250px',  // Set the desired width
                                                    }}
                                                >
                                                    Back To Homepage
                                                </Button>


                                            </>
                                        </div>
                                    )}
                                </>
                            )
                    )
                }
                {/* nextRoundWhenshuffer */}
                {
                    (nextQuestionsList.length !== 0 && quizData && suffered) &&
                    (
                        nextQuestionsList.some(nextQuestion =>
                            progress <= 100 - (100 % quizData.questions.length)
                        )
                            ? (

                                <div>
                                    <>
                                        <Progress
                                            color="gray"
                                            size="sm"
                                            style={{ marginTop: '50px', width: '100%' }}
                                            value={progress}
                                            max={100}
                                        />
                                    </>
                                    <Paper shadow="lg" style={{ width: '900px', height: '450px' }}>
                                        <Title
                                            order={1}
                                            style={{
                                                paddingTop: '10px',
                                                marginLeft: '20px',
                                                fontSize: '15px',
                                                fontWeight: 'lighter',
                                                fontFamily: 'Arial, sans-serif',
                                                color: 'gray',
                                            }}
                                        >
                                            Term
                                            {openSpan && (
                                                <div style={{
                                                    marginLeft: '10px',
                                                    height: '23px',
                                                    border: '2px solid #F8E2D1',
                                                    borderRadius: '10px',
                                                    padding: '-4px',
                                                    display: 'inline-block',
                                                    backgroundColor: '#FBA834',
                                                }}>
                                                    <span style={{ color: 'white', fontSize: '14px' }}>let's try again</span>
                                                </div>
                                            )}
                                        </Title>
                                        <Text style={{
                                            fontSize: '30px',
                                            fontWeight: 'bold',
                                            marginLeft: '20px',
                                            marginTop: '20px',
                                            color: '#333',
                                            textAlign: 'left',
                                            letterSpacing: '-1px'
                                            , fontFamily: 'Arial, sans-serif',
                                            marginBottom: '120px',
                                        }}>
                                            {quizData?.questions[currentQuestionIndex]?.questionContent}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: '20px',
                                                textAlign: 'left',
                                                marginLeft: '30px',
                                                fontWeight: 'bold',
                                                color: '#777777 ',
                                                letterSpacing: '-1px',
                                                fontFamily: 'Arial, sans-serif',
                                            }}
                                        >
                                            Select the correct definition next shu
                                        </Text>
                                        <Grid style={{ width: '100% ' }}>
                                            {quizData?.questions[currentQuestionIndex]?.answers.map((answer, answerIndex) => (
                                                <Grid.Col span={6} key={answerIndex} style={{ marginBottom: '10px' }}>
                                                    <Button
                                                        onClick={() => handleAnswerClick(answerIndex)}
                                                        className={`answer-button answer-button-${answerIndex}`}
                                                        style={{
                                                            width: '90%',
                                                            backgroundColor: answerColors[answerIndex],
                                                            color: answerColors[answerIndex] === 'white' ? 'black' : 'white',
                                                            borderRadius: '5px',
                                                            padding: '10px',
                                                            margin: '5px 5px 5px 5px',
                                                            marginLeft: '22px',
                                                            height: '65px',
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
                            ) : (
                                <>
                                    {nextQuestionsList.map((question, index) => (
                                        progress === 100 && (
                                            <>
                                                <>
                                                    <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#6c757d', textAlign: 'left' }}>
                                                        Terms studied in this round
                                                    </Text>
                                                </>
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
                                                                        fontFamily: 'Arial, sans-serif',
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
                                                                        fontFamily: 'Arial, sans-serif',
                                                                    }}
                                                                >
                                                                    {question.answers.find((answer) => answer.isCorrect)?.content}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>
                                        )
                                    ))}

                                    {progress === 100 && (

                                        <Button
                                            size="lg"
                                            onClick={() => {
                                                handleContinue(answeredQuestionsList.length);
                                                // setCurrentDisplayedQuestionIndex(nextQuestionIndex!);
                                                // setNextQuestionIndex(null);
                                            }}
                                            style={{ marginTop: '30px', backgroundColor: '#2196F3', color: 'white' }}
                                        >
                                            Continue
                                        </Button>
                                    )}
                                    {progress !== 100 && (
                                        <>
                                            <img src={congratulations} alt="Congratulations" />
                                            <Title order={2}>Way to go! You've studied all the terms.</Title>
                                            <Text>Try another round so you can practice the difficult questions.</Text>

                                            <div style={{ marginTop: '20px' }}>
                                                <>
                                                    <Button
                                                        size="lg"
                                                        style={{
                                                            backgroundColor: '#64B5F6',  // Slightly darker blue color
                                                            color: 'white',
                                                            borderRadius: '20px',  // Adjust the border radius as needed
                                                            width: '250px',  // Set the desired width
                                                        }}
                                                    >
                                                        Take a Test
                                                    </Button>
                                                    <Button
                                                        size="lg"
                                                        onClick={handleFinishQuiz}
                                                        style={{
                                                            backgroundColor: '#64B5F6',  // Slightly darker blue color
                                                            color: 'white',
                                                            borderRadius: '20px',
                                                            marginLeft: '20px',
                                                            width: '250px',  // Set the desired width
                                                        }}
                                                    >
                                                        Back To Homepage
                                                    </Button>


                                                </>
                                            </div>
                                            {/* <Title order={2} style={{ marginLeft: '-878px' }}>Popular Quizzes</Title>
                                            <PopularQuiz /> */}
                                        </>

                                    )}


                                    {progress === 100 && (
                                        <div style={{ marginTop: '20px' }}>
                                            <>

                                                <Button
                                                    size="lg"
                                                    onClick={handleFinishQuiz}
                                                    style={{
                                                        backgroundColor: '#64B5F6',  // Slightly darker blue color
                                                        color: 'white',
                                                        borderRadius: '20px',
                                                        marginLeft: '20px',
                                                        width: '250px',  // Set the desired width
                                                    }}
                                                >
                                                    Back To Homepage
                                                </Button>


                                            </>
                                        </div>
                                    )}
                                </>
                            )
                    )
                }
                {/* listQuizwhenSuffer */}
                {
                    (quizData && suffered && !answeredAllQuestions) && (
                        <Paper shadow="lg" style={{ width: '900px', height: '450px' }}>
                            <Title
                                order={1}
                                style={{
                                    paddingTop: '10px',
                                    marginLeft: '20px',
                                    fontSize: '15px',
                                    fontWeight: 'lighter',
                                    fontFamily: 'Arial, sans-serif', // Chọn font chữ mong muốn
                                    color: 'gray', // Chọn màu chữ mong muốn
                                }}
                            >
                                Term
                                {openSpan && (
                                    <div style={{
                                        marginLeft: '10px',
                                        height: '23px',
                                        border: '2px solid #F8E2D1',
                                        borderRadius: '10px',
                                        padding: '-4px',
                                        display: 'inline-block',
                                        backgroundColor: '#FBA834',
                                    }}>
                                        <span style={{ color: 'white', fontSize: '14px' }}>let's try again</span>
                                    </div>
                                )}
                            </Title>
                            <Text style={{
                                fontSize: '30px',
                                fontWeight: 'bold',
                                marginLeft: '20px',
                                marginTop: '20px',
                                color: '#333',
                                textAlign: 'left',
                                letterSpacing: '-1px'
                                , fontFamily: 'Arial, sans-serif',
                                marginBottom: '120px',
                            }}>
                                {quizData?.questions[currentQuestionIndex]?.questionContent}
                            </Text>
                            <Text
                                style={{
                                    fontSize: '20px',
                                    textAlign: 'left',
                                    marginLeft: '30px',
                                    fontWeight: 'bold',
                                    color: '#777777 ',
                                    fontFamily: 'Arial, sans-serif',
                                    letterSpacing: '-1px'
                                }}
                            >
                                Select the correct definition da suffer
                            </Text>
                            <Grid style={{ width: '100%' }}>
                                {quizData?.questions[currentQuestionIndex]?.answers.map((answer, answerIndex) => (
                                    <Grid.Col span={6} key={answerIndex} style={{ marginBottom: '10px' }}>
                                        <Button
                                            onClick={() => handleAnswerClick(answerIndex)}
                                            className={`answer-button answer-button-${answerIndex}`}
                                            style={{
                                                width: '90%',
                                                backgroundColor: answerColors[answerIndex],
                                                color: answerColors[answerIndex] === 'white' ? 'black' : 'white',
                                                borderRadius: '5px',
                                                padding: '10px',
                                                margin: '5px 5px 5px 5px',
                                                marginLeft: '22px',
                                                height: '65px',
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
                    )
                }
                {
                    answeredAllQuestions && (
                        <>
                            {!showAnsweredQuestionsList ? (
                                <>
                                </>
                            ) : (
                                <>
                                    <>
                                        <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#6c757d', textAlign: 'left' }}>
                                            Terms studied in this round
                                        </Text>
                                    </>
                                    {answeredQuestionsList.map((question, index) => (
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
                                                                fontFamily: 'Arial, sans-serif',
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
                                                                fontFamily: 'Arial, sans-serif',
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
                                    {hasMoreQuestions && answeredQuestionsList && (
                                        <Button
                                            style={{ marginTop: '30px', backgroundColor: '#2196F3', color: 'white' }}
                                            size="lg"
                                            onClick={() => {
                                                handleContinue(answeredQuestionsList.length)
                                                // setCurrentDisplayedQuestionIndex(nextQuestionIndex!);
                                                // setNextQuestionIndex(null);
                                            }}
                                        >
                                            Continue
                                        </Button>
                                    )}
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
                        </>
                    )
                }


            </Container >
        </div >
    );
};

export default LearnQuiz;

import LearnQuiz from '../../components/user_dashboard/LearnQuiz';
import MainMenu from '../../components/user_dashboard/MenuLeanQuiz';
import { useParams } from 'react-router-dom';


const QuizLearnPage = () => {
    const { id } = useParams();

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: '20% 60% 20%', // 3 columns with the middle one 60% wide
        height: '100vh', // Adjust as needed
        backgroundColor: '#f8f8f8', // Added background color
    };

    return (
        <div style={containerStyle}>
            <MainMenu quizId={id || ''} />

            <LearnQuiz />
            <div style={{ gridColumn: '3 / 4' }}></div>
        </div>
    );
};

export default QuizLearnPage;

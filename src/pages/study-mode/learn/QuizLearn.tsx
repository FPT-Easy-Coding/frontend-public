import { useParams } from 'react-router-dom';
import MainMenu from './MenuLeanQuiz';
import LearnQuiz from './LearnQuiz';

const QuizLearnPage = () => {
    const { id } = useParams();

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '20% 60% 20%', height: '100vh', backgroundColor: '#f8f8f8' }}>
            <MainMenu quizId={id || ''} />
            {/* Pass suferQuiz as a prop to LearnQuiz */}
            <LearnQuiz />
            <div style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
            </div>
        </div>
    );
};

export default QuizLearnPage;




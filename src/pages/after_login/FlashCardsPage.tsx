import MainMenu from '../../components/user_dashboard/MenuLeanQuiz';
import FlashCards from '../../components/user_dashboard/FlashCards'
import { useParams } from 'react-router-dom';


const FlashCardsPage = () => {
    const { quizid } = useParams();
    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: '20% 60% 20%', // 3 columns with the middle one 60% wide
        height: '100vh', // Adjust as needed
        backgroundColor: '#f8f8f8', // Added background color
    };

    return (
        <div style={containerStyle}>
            <MainMenu quizId={quizid || ''} />
            <FlashCards />
            <div style={{ gridColumn: '3 / 4' }}></div>
        </div>
    );
};

export default FlashCardsPage;

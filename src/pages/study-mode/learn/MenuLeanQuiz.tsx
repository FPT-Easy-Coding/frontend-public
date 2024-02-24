import { Menu, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../../../assets/icons8-home-50.png';
import Flashcards from '../../../assets/icons8-flashcards-50.png';
import learnIcon from '../../../assets/icons8-read-64.png';

interface MainMenuProps {
    quizId: string | undefined; // Define quizId as a string or undefined
}

function MainMenu({ quizId }: MainMenuProps) {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const menuStyle = {
        top: '30px',
    };

    return (
        <Menu width={200} shadow="md" style={menuStyle}>
            <Menu.Target>
                <Button
                    leftSection={<img src={learnIcon} alt="Learn Icon" style={{ width: '30px', height: '30px' }} />}
                >
                    LEARN
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={() => handleNavigate('/home')} leftSection={<img src={homeIcon} alt="Home Icon" style={{ width: '20px', height: '20px' }} />}>
                    Home
                </Menu.Item>
                <Menu.Item onClick={() => handleNavigate('/home')} leftSection={<img src={homeIcon} alt="Home Icon" style={{ width: '20px', height: '20px' }} />}>
                    Test
                </Menu.Item>

                <Menu.Item onClick={() => handleNavigate(`/quiz/set/${quizId || 'defaultQuizId'}/flashcards`)} leftSection={<img src={Flashcards} alt="Flashcards Icon" style={{ width: '20px', height: '20px' }} />}>
                    Flashcards
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default MainMenu;

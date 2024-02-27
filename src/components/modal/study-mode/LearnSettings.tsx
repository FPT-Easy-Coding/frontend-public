import React, { useContext, useState } from "react";
import { StudyModeContext } from '../../../store/study-mode-context'
import {
    Group,
    Modal,
    Stack,
    Title,
    Text,
    Switch,
    Divider,
    UnstyledButton,
} from "@mantine/core";

interface LearnSettingsProps {
    opened: boolean;
    close: () => void;
}

function LearnSettings({ opened, close }: LearnSettingsProps) {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const learnContext = useContext(StudyModeContext);
    console.log('learn', learnContext.shufferQuiz)
    // const handleSwitchChange = () => {
    //     // If not suffered yet, call sufferQuizLocal
    //     sufferQuizLocal();

    //     // Toggle the switch state
    //     setIsSwitchOn((prevSwitchState) => !prevSwitchState);
    // };

    // console.log("study", sufferQuizLocal);

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Settings"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <Stack>
                    <Group className="justify-between">
                        <Stack gap={0}>
                            <Title order={4}>Shuffer Quiz</Title>
                            <Text size="sm">Change the order of quiz sets</Text>
                        </Stack>
                        <Switch
                            size="lg"
                            onLabel="ON"
                            offLabel="OFF"
                        // onChange={handleSwitchChange}
                        />
                    </Group>
                    <Divider />
                    <UnstyledButton
                        className="text-red-500"
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Restart Quiz
                    </UnstyledButton>
                </Stack>
            </Modal>
        </>
    );
}

export default LearnSettings;

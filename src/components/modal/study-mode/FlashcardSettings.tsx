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
import { useContext, useState } from "react";
import { StudyModeContext } from "../../../store/study-mode-context";

function FlashcardSettings({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const { changeSorted, settings } = useContext(StudyModeContext);
//   console.log(settings);
//   const [isSorted, setIsSorted] = useState(settings.flashcard.isSorted);

//   const handleSorted = () => {
//     changeSorted(isSorted, "Flashcard");
//   }
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
              <Title order={4}>Card sorting</Title>
              <Text size="sm">Change the order of the cards</Text>
            </Stack>
            <Switch
              size="lg"
              onLabel="ON"
              offLabel="OFF"
              checked={settings.flashcard.isSorted}
              onChange={(e) => {
                changeSorted(e.currentTarget.checked, "Flashcard");
              }}
            />
          </Group>
          <Divider />
          <UnstyledButton
            className="text-red-500"
            onClick={() => {
              window.location.reload();
            }}
          >
            Restart Flashcard
          </UnstyledButton>
        </Stack>
      </Modal>
    </>
  );
}

export default FlashcardSettings;

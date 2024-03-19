import { Modal } from "@mantine/core";

function UpdateClassModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  return (
    <>
      <Modal opened={opened} onClose={close}>
        
      </Modal>
    </>
  );
}

export default UpdateClassModal;

import {
  Avatar,
  Container,
  Group,
  Paper,
  Stack,
  Title,
  Text,
  Divider,
} from "@mantine/core";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import AvatarSettings from "./AvatarSetings";
import { MdAccountCircle } from "react-icons/md";
import FormUpdate from "./FormUpdateProfile";
import PrivacySettings from "./PrivacySettings";
function Settings(props: Partial<DropzoneProps>) {
  return (
    <>
      <Container size="xl">
        <Title order={4}>Personal infomation</Title>
        <Paper shadow="xs" withBorder p="xl">
          {/* <Group>
            <Group>
              <Avatar src={null} size={"xl"}></Avatar>
              <Dropzone {...props} onDrop={() => { }} className="grow">
                <Group>
                  <Dropzone.Accept>
                    <IconUpload size={32} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={32} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size={32} />
                  </Dropzone.Idle>
                  <Stack gap={0}>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      File should not exceed 5mb
                    </Text>
                  </Stack>
                </Group>
              </Dropzone>

            </Group>
            <Divider />
          </Group> */}
          <div style={{ display: 'flex', paddingTop: "40px" }}>
            <AvatarSettings />
          </div>
          <div style={{ display: 'flex', paddingTop: "40px" }}>
            <div style={{ flex: 1 }}>
              <MdAccountCircle style={{ marginBottom: '8px', width: '90px', height: '90px' }} />
              <Text style={{ fontWeight: 'bold', marginBottom: '8px', paddingLeft: '10px' }}>
                Account
              </Text>
            </div>
            <div style={{ flex: 11 }}>
              <FormUpdate />
            </div>
          </div>
          <div style={{ display: 'flex', paddingTop: '30px' }}>
            <PrivacySettings />
          </div>
        </Paper>
      </Container>
    </>
  );
}

export default Settings;

import { useContext, useState } from "react";
import {
  Question,
  Comments,
  RepliesComment,
} from "../../pages/class/ClassQuestionPage";
import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconDots,
  IconPencil,
  IconSend,
  IconTrash,
} from "@tabler/icons-react";
import { UserCredentialsContext } from "../../store/user-credentials-context";

interface Props {
  comments: Comments[];
  question: Question;
}

function CommentSection({ comments, question }: Props) {
  const { info } = useContext(UserCredentialsContext);
  const currentUserId = info?.userId;
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleReplies = (commentId: number) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const toggleReplyInput = (commentId: number) => {
    setReplyInputs((prevInputs) => ({
      ...prevInputs,
      [commentId]: !prevInputs[commentId],
    }));
  };

  const commentsList = comments
    .filter((comment) => comment.questionId === question.classQuestionId)
    .map((comment) => (
      <>
        <Paper withBorder key={comment.commentId} p="md" shadow="lg">
          <Group className="justify-between">
            <Group>
              <Group>
                <Avatar size={"sm"} src={null} color="orange" />
                <Text c={"dimmed"} className="text-sm">
                  {comment.userName}
                  {": "}
                </Text>
              </Group>
              <Text fz={"sm"}>{comment.content}</Text>
            </Group>
            <Group>
              {comment.replyComments.length > 0 && (
                <Button
                  size="compact-xs"
                  variant="subtle"
                  radius="md"
                  onClick={() => {
                    toggleReplies(comment.commentId);
                    toggleReplyInput(comment.commentId);
                  }}
                  leftSection={
                    showReplies[comment.commentId] ? (
                      <IconChevronUp size={14} />
                    ) : (
                      <IconChevronDown size={14} />
                    )
                  }
                  className="my-3"
                >
                  {showReplies[comment.commentId]
                    ? "Hide replies"
                    : "Show replies"}
                </Button>
              )}
              {comment.userId == currentUserId && (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="subtle">
                      <IconDots size={14} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={
                        <IconPencil
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      leftSection={
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Group>

          {showReplies[comment.commentId] &&
            comment.replyComments.map((reply: RepliesComment) => (
              <Paper key={reply.replyCommentId} withBorder p="md" shadow="lg">
                <Group className="justify-between">
                  <Group>
                    <Group>
                      <Avatar size={"xs"} src={null} color="orange" />
                      <Text c={"dimmed"} className="text-xs">
                        {reply.userName}
                        {": "}
                      </Text>
                    </Group>
                    <Text className="text-xs">{reply.content}</Text>
                  </Group>
                  {reply.userId == currentUserId && (
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <ActionIcon variant="subtle">
                          <IconDots size={14} />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={
                            <IconPencil
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          }
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          leftSection={
                            <IconTrash
                              style={{ width: rem(14), height: rem(14) }}
                            />
                          }
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  )}
                </Group>
              </Paper>
            ))}
          {replyInputs[comment.commentId] && (
            <Group className="mt-3">
              <TextInput placeholder="Reply to comment" className="grow" />
              <ActionIcon variant="subtle">
                <IconSend size={20} />
              </ActionIcon>
            </Group>
          )}
        </Paper>
      </>
    ));

  return <Stack>{commentsList}</Stack>;
}

export default CommentSection;

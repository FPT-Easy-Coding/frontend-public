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
  FocusTrap,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconDots,
  IconMessage2,
  IconPencil,
  IconSend,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { UserCredentialsContext } from "../../store/user-credentials-context";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "./ClassQuestionDetail";
import { Form, SubmitFunction } from "react-router-dom";

interface Props {
  comments: Comments[] | null;
  question: Question;
  form: UseFormReturnType<FormValues>;
  submit: SubmitFunction;
}
function CommentSection({ comments, question, form, submit }: Props) {
  const { info } = useContext(UserCredentialsContext);
  const currentUserId = info?.userId;
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: boolean }>(
    {}
  );

  const [editComment, setEditComment] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [editReplyComment, setEditReplyComment] = useState<{
    [key: number]: boolean;
  }>({});
  // togglers
  const toggleEditComment = (commentId: number, comment: Comments) => {
    setEditComment((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
    form.setFieldValue("editComment", comment.content);
  };

  const toggleEditReply = (commentId: number, reply: RepliesComment) => {
    setEditReplyComment((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
    form.setFieldValue("editReply", reply.content);
  };

  const toggleShowReplies = (commentId: number) => {
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
  // handlers
  const handleReplySubmit = (values: FormValues, commentId: number) => {
    const payload = {
      requestField: "reply",
      content: values.reply,
      commentId: commentId,
      userId: currentUserId!,
    };
    submit(payload, { method: "post" });
    form.setFieldValue("reply", "");
  };

  const handleEditCommentSubmit = (values: FormValues, commentId: number) => {
    const payload = {
      requestField: "comment",
      content: values.editComment,
      commentId: commentId,
    };
    submit(payload, { method: "put" });
    form.setFieldValue("editComment", "");
    toggleEditComment(commentId, comments![commentId - 1]);
  };

  const handleEditReplySubmit = (
    values: FormValues,
    commentId: number,
    replyCommentId: number
  ) => {
    const payload = {
      requestField: "reply",
      content: values.editReply,
      commentId: commentId,
      replyCommentId: replyCommentId,
    };
    submit(payload, { method: "put" });
    form.setFieldValue("editReply", "");
    toggleEditReply(
      commentId,
      comments![commentId - 1].replyComments![replyCommentId - 1]
    );
  };

  const handleDeleteComment = (commentId: number) => {
    const payload = {
      requestField: "comment",
      commentId: commentId,
    };
    submit(payload, { method: "delete" });
  };
  const handleDeleteReply = (replyCommentId: number) => {
    const payload = {
      requestField: "reply",
      replyCommentId: replyCommentId,
    };
    submit(payload, { method: "delete" });
  };

  const commentsList = comments!
    .filter((comment) => comment.questionId === question.classQuestionId)
    .map((comment) => (
      <>
        <Paper withBorder key={comment.commentId} p="md" shadow="lg">
          <Group className="justify-between">
            <Group className="grow">
              <Group>
                <Avatar size={"sm"} src={null} color="orange" />
                <Text c={"dimmed"} className="text-sm">
                  {comment.userName}
                  {": "}
                </Text>
              </Group>
              {/* edit comment input */}
              {editComment[comment.commentId] ? (
                <Paper radius="md" p="xs" shadow="md" className="grow">
                  <Group>
                    <Textarea
                      placeholder="Edit comment"
                      {...form.getInputProps("editComment")}
                      autoFocus
                      autosize
                      className="grow"
                    />
                    <ActionIcon
                      variant="subtle"
                      onClick={() => {
                        handleEditCommentSubmit(form.values, comment.commentId);
                      }}
                    >
                      <IconSend size={20} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      c="red"
                      onClick={() =>
                        toggleEditComment(comment.commentId, comment)
                      }
                    >
                      <IconX size={20} />
                    </ActionIcon>
                  </Group>
                </Paper>
              ) : (
                <Text fz={"sm"}>{comment.content}</Text>
              )}
            </Group>
            {/* util buttons */}
            <Group>
              <Button
                size="compact-xs"
                variant="subtle"
                radius="md"
                color="gray"
                onClick={() => {
                  toggleReplyInput(comment.commentId);
                  toggleShowReplies(comment.commentId);
                }}
                leftSection={<IconMessage2 size={14} />}
              >
                Reply
              </Button>
              {comment.replyComments.length > 0 && (
                <Button
                  size="compact-xs"
                  variant="subtle"
                  radius="md"
                  onClick={() => {
                    toggleShowReplies(comment.commentId);
                    toggleReplyInput(comment.commentId);
                  }}
                  leftSection={
                    showReplies[comment.commentId] ? (
                      <IconChevronUp size={14} />
                    ) : (
                      <IconChevronDown size={14} />
                    )
                  }
                  color="orange"
                >
                  {showReplies[comment.commentId]
                    ? "Hide replies"
                    : "Show replies"}
                </Button>
              )}

              {/* edit and delete button if comment is created by current user */}
              {comment.userId == currentUserId && (
                <Menu shadow="md">
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="orange">
                      <IconDots size={14} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconPencil size={14} />}
                      onClick={() =>
                        toggleEditComment(comment.commentId, comment)
                      }
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      leftSection={<IconTrash size={14} />}
                      onClick={() => handleDeleteComment(comment.commentId)}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Group>

          {/* render reply section */}
          {showReplies[comment.commentId] && (
            <Stack gap="xs" className="mt-3">
              {comment.replyComments.map((reply: RepliesComment) => (
                <Paper key={reply.replyCommentId} withBorder p="md" shadow="lg">
                  <Group className="justify-between">
                    <Group className="grow">
                      <Group>
                        <Avatar size={"xs"} src={null} color="orange" />
                        <Text c={"dimmed"} className="text-xs">
                          {reply.userName}
                          {": "}
                        </Text>
                      </Group>
                      {/* edit reply input */}
                      {editReplyComment[comment.commentId] ? (
                        <Paper radius="md" p="xs" shadow="md" className="grow">
                          <Group>
                            <Textarea
                              placeholder="Edit reply"
                              {...form.getInputProps("editReply")}
                              autoFocus
                              autosize
                              className="grow"
                            />
                            <ActionIcon
                              variant="subtle"
                              onClick={() => {
                                handleEditReplySubmit(
                                  form.values,
                                  comment.commentId,
                                  reply.replyCommentId
                                );
                              }}
                            >
                              <IconSend size={20} />
                            </ActionIcon>
                            <ActionIcon
                              variant="subtle"
                              c="red"
                              onClick={() => {
                                toggleEditReply(comment.commentId, reply);
                              }}
                            >
                              <IconX size={20} />
                            </ActionIcon>
                          </Group>
                        </Paper>
                      ) : (
                        <Text fz={"sm"}>{reply.content}</Text>
                      )}
                    </Group>
                    {/*  util buttons if reply is created by current user */}
                    {reply.userId == currentUserId && (
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="orange">
                            <IconDots size={14} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<IconPencil size={14} />}
                            onClick={() =>
                              toggleEditReply(comment.commentId, reply)
                            }
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Item
                            color="red"
                            leftSection={<IconTrash size={14} />}
                            onClick={() =>
                              handleDeleteReply(reply.replyCommentId)
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
            </Stack>
          )}
          {/* render reply form */}
          {replyInputs[comment.commentId] && (
            <FocusTrap active={replyInputs[comment.commentId]}>
              <Group className="mt-3">
                <TextInput
                  placeholder="Reply to comment"
                  className="grow"
                  {...form.getInputProps("reply")}
                  data-autofocus
                />
                <ActionIcon
                  variant="subtle"
                  onClick={() => {
                    handleReplySubmit(form.values, comment.commentId);
                  }}
                >
                  <IconSend size={20} color="orange" />
                </ActionIcon>
              </Group>
            </FocusTrap>
          )}
        </Paper>
      </>
    ));

  return <Stack>{commentsList}</Stack>;
}

export default CommentSection;

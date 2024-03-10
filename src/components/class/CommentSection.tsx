import { useState } from "react";
import {
  Question,
  Comments,
  RepliesComment,
} from "../../pages/class/ClassQuestionPage";
import {
  Button,
  Container,
  Group,
  Input,
  Menu,
  Text,
  rem,
} from "@mantine/core";
import {
  IconArrowBack,
  IconArrowForward,
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPencil,
  IconPhoto,
  IconSearch,
  IconSend,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";

interface Props {
  comments: Comments[];
  question: Question;
}

function CommentSection({ comments, question }: Props) {
  const currentUserId = localStorage.uid;
  const [menuOpened, setMenuOpened] = useState(false);
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
  const handleUpdate = () => {
    // Implement your update logic here
    console.log("Updating comment or reply");
  };

  // Function to handle deleting comment/reply
  const handleDelete = () => {
    // Implement your delete logic here
    console.log("Deleting comment or reply");
  };
  return (
    <div className="flex-1 mb-4">
      {comments
        .filter((comment) => comment.questionId === question.classQuestionId)
        .map((comment) => (
          <div key={comment.commentId} className="mb-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <Group className="flex justify-between items-center">
                <p className="text-gray-800">{comment.content}</p>
                {comment.userId == currentUserId && (
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <Button variant="light" className="bg-gray-100">
                        ...
                      </Button>
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
            </div>
            <Group>
              {/* <Button
                variant="white"
                size="xs"
                radius="md"
                onClick={() => toggleReplyInput(comment.commentId)}
              >
                Reply
              </Button> */}
              {/* Render reply comments if necessary */}

              {comment.replyComments.length > 0 && (
                <div>
                  <Button
                    variant="white"
                    size="xs"
                    radius="md"
                    onClick={() => {
                      toggleReplies(comment.commentId);
                      toggleReplyInput(comment.commentId);
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {showReplies[comment.commentId] ? (
                      <>
                        <IconArrowBack
                          style={{ width: rem(20), height: rem(20) }}
                          stroke={1.5}
                        />
                        <span>Hide all replies</span>
                      </>
                    ) : (
                      <>
                        <IconArrowForward
                          style={{ width: rem(20), height: rem(20) }}
                          stroke={1.5}
                        />
                        <span>View all replies</span>
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Group>
            {showReplies[comment.commentId] &&
              comment.replyComments.map((reply: RepliesComment) => (
                <Container
                  key={reply.replyCommentId}
                  className="bg-gray-200 rounded-lg p-3 mb-2 mx-8 flex justify-between items-center"
                >
                  <Text className="text-gray-700">{reply.content}</Text>
                  {reply.userId == currentUserId && (
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <Button
                          variant="light"
                          size="xs"
                          className="bg-gray-200 text-black"
                        >
                          ...
                        </Button>
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
                </Container>
              ))}
            {/* Render reply input field if necessary */}
            {replyInputs[comment.commentId] && (
              <Group style={{ marginTop: "auto" }}>
                <Input radius="xl" placeholder="Reply" className="w-[90%]" />
                <Button variant="white">
                  <IconSend
                    style={{ width: rem(20), height: rem(20) }}
                    stroke={1.5}
                  />
                </Button>
              </Group>
            )}
          </div>
        ))}
    </div>
  );
}

export default CommentSection;

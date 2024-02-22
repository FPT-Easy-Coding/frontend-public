import { useState, useEffect } from "react";
import axios from "axios";
import {
  Tabs,
  rem,
  Loader,
  Text,
  Stack,
  Avatar,
  Group,
  Box,
} from "@mantine/core";
import {
  IconFolder,
  IconSchool,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";

interface UserData {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  role: string;
  banned: boolean;
  premium: boolean;
}

interface StudySet {
  numberOfQuestion: number;
  author: string;
  authorFirstName: string;
  authorLastName: string;
  quizName: string;
}

interface Classes {
  className: string;
  numberOfStudent: number;
  numberOfQuizSet: number;
}

function Profile({ userData }: { userData: UserData }) {
  const [studySets, setStudySets] = useState<StudySet[]>([]);
  const [loadingStudySets, setLoadingStudySets] = useState<boolean>(false);
  const [classes, setClasses] = useState<Classes[]>([]);
  const [loadingClasses, setLoadingClasses] = useState<boolean>(false);

  const iconStyle = { width: rem(12), height: rem(12) };

  useEffect(() => {
    if (userData) {
      fetchStudySets(userData.userId);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      fetchClasses(userData.userId);
    }
  }, [userData]);

  async function fetchStudySets(userId: number) {
    setLoadingStudySets(true);
    try {
      const sets = await fetchStudySetsData(userId);
      setStudySets(sets);
    } catch (error) {
      console.error("Error fetching study sets:", error);
    } finally {
      setLoadingStudySets(false);
    }
  }

  async function fetchClasses(userId: number) {
    setLoadingClasses(true);
    try {
      const classesData = await fetchClassesData(userId);
      setClasses(classesData);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoadingClasses(false);
    }
  }

  return (
    <div>
      <Group className="mt-10 ml-5">
        <Avatar src={null} alt="no image here" size={"lg"}>
          {userData?.firstName!.charAt(0).toUpperCase() +
            userData?.lastName!.charAt(0).toUpperCase()}
        </Avatar>

        <Stack gap={0}>
          <Text size="lg" className="font-bold">
            {userData.userName}
          </Text>
          <Text c={"dimmed"} className="capitalize" size="sm">
            {userData?.firstName + " " + userData?.lastName}
          </Text>
        </Stack>
      </Group>

      <Tabs defaultValue="profile" className="ml-16 my-5 mr-28">
        <Tabs.List>
          <Tabs.Tab
            value="study"
            leftSection={<IconSchool style={iconStyle} />}
          >
            Study sets
          </Tabs.Tab>
          <Tabs.Tab
            value="folder"
            leftSection={<IconFolder style={iconStyle} />}
          >
            Folder
          </Tabs.Tab>
          <Tabs.Tab
            value="class"
            leftSection={<IconUsersGroup style={iconStyle} />}
          >
            Classes
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="study">
          {loadingStudySets ? (
            <Loader />
          ) : (
            <div>
              {studySets.map((set, index) => (
                <Box
                  key={index}
                  className="pl-4 mb-4 mt-2 shadow-md rounded-md border-s h-[88px] pt-4"
                >
                  <Group key={index}>
                    <Text className="font-semibold text-sm">
                      {set.numberOfQuestion}{" "}
                      {set.numberOfQuestion > 1 ? "terms" : "term"}
                    </Text>
                    <Group className="pl-4 ">
                      <Avatar src={null} alt="no image here" size={"sm"}>
                        {set?.authorFirstName!.charAt(0).toUpperCase() +
                          set?.authorLastName!.charAt(0).toUpperCase()}
                      </Avatar>
                      <Text className="font-semibold text-sm">
                        {set.author}
                      </Text>
                    </Group>
                  </Group>
                  <Text className="font-bold text-xl pt-1">{set.quizName}</Text>
                </Box>
              ))}
            </div>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="folder">Folder content</Tabs.Panel>

        <Tabs.Panel value="class">
          {loadingClasses ? (
            <Loader />
          ) : (
            <div>
              {classes.map((classItem, index) => (
                <Box
                  key={index}
                  className="pl-4 mb-4 mt-2 shadow-md rounded-md border-s h-[88px] pt-4"
                >
                  <Group key={index}>
                    <Text className="font-semibold text-sm">
                      {classItem.numberOfQuizSet}{" "}
                      {classItem.numberOfQuizSet > 1 ? "sets" : "set"}
                    </Text>
                    <Text className="font-semibold text-sm">
                      {classItem.numberOfStudent}{" "}
                      {classItem.numberOfStudent > 1 ? "members" : "member"}
                    </Text>
                  </Group>
                  <Group>
                    {
                      <IconUsers
                        style={iconStyle}
                        className="w-5 h-5 text-blue-600/100"
                      />
                    }
                    <Text className="font-bold text-xl pt-1">
                      {classItem.className}
                    </Text>
                  </Group>
                </Box>
              ))}
            </div>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export async function fetchUserProfileData() {
  try {
    const userId = localStorage.getItem("uid");
    const response = await axios.get(
      `http://localhost:8080/api/v1/users/profile/user-id=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    throw new Error("Error fetching user profile data");
  }
}

export async function fetchStudySetsData(userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/quiz/learned/user-id=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching study sets");
  }
}

export async function fetchClassesData(userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/classroom/learned/user-id=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching classes");
  }
}

function ProfileWithLoader() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserProfileData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!userData) {
    return <Text>No user data found.</Text>;
  }

  return <Profile userData={userData} />;
}

export default ProfileWithLoader;

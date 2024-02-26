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
  Select,
} from "@mantine/core";
import {
  IconFolder,
  IconSchool,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

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
  quizId: number;
  numberOfQuestion: number;
  author: string;
  authorFirstName: string;
  authorLastName: string;
  quizName: string;
  createdAt: Date;
}

interface Classes {
  className: string;
  numberOfStudent: number;
  numberOfQuizSet: number;
}

interface Folder {
  folderName: string;
  numberOfQuizSet: number;
  createdAt: Date;
}

function Profile({ userData }: { userData: UserData }) {
  const [studySets, setStudySets] = useState<StudySet[]>([]);
  const [loadingStudySets, setLoadingStudySets] = useState<boolean>(false);
  const [classes, setClasses] = useState<Classes[]>([]);
  const [loadingClasses, setLoadingClasses] = useState<boolean>(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loadingFolders, setLoadingFolders] = useState<boolean>(false);

  const iconStyle = { width: rem(12), height: rem(12) };
  const [studySetsFilter, setStudySetsFilter] = useState<string>("Recent");
  const [foldersFilter, setFoldersFilter] = useState<string>("Recent");

  useEffect(() => {
    if (userData) {
      fetchStudySets(userData.userId);
      fetchClasses(userData.userId);
      fetchFolders(userData.userId);
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

  async function fetchFolders(userId: number) {
    setLoadingFolders(true);
    try {
      const foldersData = await fetchFolderData(userId);
      setFolders(foldersData);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setLoadingFolders(false);
    }
  }

  return (
    <div>
      <Group className="mt-10 ml-14">
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
          {/* Select component for filtering */}
          <Select
            className="my-5 w-[120px]"
            placeholder="Recent"
            checkIconPosition="right"
            data={["Recent", "Created", "Studied"]}
            value={studySetsFilter}
            onChange={(value) => setStudySetsFilter(value || "Recent")}
            allowDeselect={false}
          />
          {/* Content rendering based on the filter */}
          {loadingStudySets ? (
            <Loader />
          ) : (
            <div>
              {studySets
                .filter((set) => {
                  if (studySetsFilter === "Recent") {
                    // Filter sets created within the last month
                    const oneMonthAgo = new Date();
                    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                    return new Date(set.createdAt) > oneMonthAgo;
                  }
                  // else if (studySetsFilter === "Created") {
                  //   // Apply your logic for filtering by creation date
                  //   // Example: Filter sets created within the last 6 months
                  //   const sixMonthsAgo = new Date();
                  //   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                  //   return new Date(set.created) > sixMonthsAgo;
                  // } else if (studySetsFilter === "Studied") {
                  //   // Apply your logic for filtering by studied date
                  //   // Example: Filter sets last studied within the last week
                  //   const oneWeekAgo = new Date();
                  //   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                  //   return new Date(set.lastStudied) > oneWeekAgo;
                  // }
                  // Default case: return true if no filtering is applied
                  return true;
                })
                .map((set, index) => (
                  <Link to={`/quiz/set/${set.quizId}`} key={index}>
                    <Box className="pl-4 mb-4 mt-2 shadow-md rounded-md border-s h-[88px] pt-4">
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
                      <Text className="font-bold text-xl pt-1">
                        {set.quizName}
                      </Text>
                    </Box>
                  </Link>
                ))}
            </div>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="folder">
          <Select
            className="my-5 w-[120px]"
            placeholder="Recent"
            checkIconPosition="right"
            data={["Recent", "Created", "Studied"]}
            value={studySetsFilter}
            onChange={(value) => setFoldersFilter(value || "Recent")}
            allowDeselect={false}
          />
          {loadingFolders ? (
            <Loader />
          ) : (
            <div>
              {folders
                .filter((set) => {
                  if (foldersFilter === "Recent") {
                    // Filter sets created within the last month
                    const oneMonthAgo = new Date();
                    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                    return new Date(set.createdAt) > oneMonthAgo;
                  }
                  //   // else if (studySetsFilter === "Created") {
                  //   //   // Apply your logic for filtering by creation date
                  //   //   // Example: Filter sets created within the last 6 months
                  //   //   const sixMonthsAgo = new Date();
                  //   //   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                  //   //   return new Date(set.created) > sixMonthsAgo;
                  //   // } else if (studySetsFilter === "Studied") {
                  //   //   // Apply your logic for filtering by studied date
                  //   //   // Example: Filter sets last studied within the last week
                  //   //   const oneWeekAgo = new Date();
                  //   //   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                  //   //   return new Date(set.lastStudied) > oneWeekAgo;
                  //   // }
                  //   // Default case: return true if no filtering is applied
                  return true;
                })
                .map((folder, index) => (
                  <Box
                    key={index}
                    className="pl-4 mb-4 mt-2 shadow-md rounded-md border-s h-[88px] pt-4"
                  >
                    <Text className="font-semibold text-sm">
                      {folder.numberOfQuizSet}{" "}
                      {folder.numberOfQuizSet > 1 ? "sets" : "set"}
                    </Text>
                    <Text className="font-bold text-xl pt-1">
                      {folder.folderName}
                    </Text>
                  </Box>
                ))}
            </div>
          )}
        </Tabs.Panel>

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

export async function fetchFolderData(userId: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/folder/create/user-id=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching folders");
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

import { Paper, Text, Avatar } from "@mantine/core";
import { useContext, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import avavtar1 from '../../assets/107.c3e123902d831a9.jpg'
import avavtar2 from '../../assets/108.3b3090077134db3.jpg'
import avavtar3 from '../../assets/109.5b75ca8158c771c.jpg'
import avavtar4 from '../../assets/112.c90135dfc341a90.jpg'
import avavtar5 from '../../assets/113.e4b7e1c4ed27afa.jpg'
import React from "react";
import axios from "axios";
import { UserCredentialsContext } from "../../store/user-credentials-context";
import { useNavigate } from "react-router-dom";
export default function AvatarSettings() {
    const [, setSelectedAvatar] = useState<string>("");
    const [, setCustomImage] = useState<string | null>(null);
    const userCredentialsContext = useContext(UserCredentialsContext);
    const navigate = useNavigate();
    const handleAvatarSelection = (avatarSrc: string | React.ReactNode) => {
        if (typeof avatarSrc === "string") {
            setSelectedAvatar(avatarSrc);
            setCustomImage(null);
            if (avatarSrc.startsWith("data:")) {
                console.log("Image is already in base64 format");
            } else {
                fetch(avatarSrc)
                    .then(response => response.blob())
                    .then(blob => {
                        const reader = new FileReader();
                        reader.onloadend = async () => {
                            const base64Image = reader.result as string;
                            try {
                                const response = await axios.put(
                                    `http://localhost:8080/api/v1/users/update-avatar-user?id=${userCredentialsContext.info?.userId}`,
                                    base64Image,
                                    {
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                    }
                                );
                                console.log(base64Image)
                                navigate("/settings")
                            } catch (error) {
                                console.error('Error uploading image:', error);
                            }
                        };
                        reader.readAsDataURL(blob);
                    })
                    .catch(error => console.error("Error fetching image:", error));
            }
        } else if (React.isValidElement(avatarSrc)) {
            console.log("Selected a custom avatar:", avatarSrc);
        } else {
            console.error("Invalid avatar source:", avatarSrc);
        }
    };
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log("file:", file);
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onloadend = async () => {
                const base64Image = reader.result as string;
                setCustomImage(base64Image);
                setSelectedAvatar("");
                try {
                    const response = await axios.put(
                        `http://localhost:8080/api/v1/users/update-avatar-user?id=${userCredentialsContext.info?.userId}`,
                        base64Image,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    navigate("/settings")
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            };
            reader.readAsDataURL(file);
        }

    };

    return (
        <>
            <div style={{ flex: 1 }}>
                <Avatar color="grape" src={userCredentialsContext.info?.avatar} size={"xl"}></Avatar>
                <Text style={{ fontWeight: "bold", marginBottom: "8px", marginLeft: "15px" }}>
                    Avatar
                </Text>
            </div>
            <div style={{ flex: 11 }}>
                <Paper
                    shadow="xs" withBorder p="xl"
                    style={{ borderRadius: "10px", border: "none", overflow: "hidden" }}
                >
                    <Text style={{ fontWeight: "bold", marginBottom: "8px" }}>Profile picture</Text>
                    <>
                        <div style={{ display: "flex", marginBottom: "8px" }}>
                            <Avatar
                                onClick={() =>
                                    handleAvatarSelection(
                                        avavtar1
                                    )
                                }
                                style={{ marginLeft: "10px", width: "50px", height: "50px" }}
                                radius="xl"
                                className="cursor-pointer"
                                src={avavtar1}
                            />
                            <Avatar
                                onClick={() =>
                                    handleAvatarSelection(
                                        avavtar3
                                    )
                                }
                                style={{ marginLeft: "10px", width: "50px", height: "50px" }}
                                radius="xl"
                                className="cursor-pointer"
                                src={avavtar3}
                            />
                            <Avatar
                                onClick={() =>
                                    handleAvatarSelection(
                                        avavtar2
                                    )
                                }
                                style={{ marginLeft: "10px", width: "50px", height: "50px" }}
                                radius="xl"
                                className="cursor-pointer"
                                src={avavtar2}
                            />
                            <Avatar
                                onClick={() =>
                                    handleAvatarSelection(
                                        avavtar4
                                    )
                                }
                                style={{ marginLeft: "10px", width: "50px", height: "50px" }}
                                radius="xl"
                                className="cursor-pointer"
                                src={avavtar4}
                            />
                            <Avatar
                                onClick={() =>
                                    handleAvatarSelection(
                                        avavtar5
                                    )
                                }
                                style={{ marginLeft: "10px", width: "50px", height: "50px" }}
                                radius="xl"
                                className="cursor-pointer"
                                src={avavtar5}
                            />
                            <label
                                htmlFor="fileInput"
                                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                            >
                                <IoIosAddCircleOutline
                                    style={{ marginTop: "-5px", marginRight: "8px", fontSize: "60px" }}
                                />
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                            />
                        </div>
                    </>
                </Paper>
            </div>
        </>
    );
}

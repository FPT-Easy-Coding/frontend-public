import { Paper, Text, Button, Avatar, Select } from "@mantine/core";
import { useState, useContext } from "react";
import { MdAccountCircle } from "react-icons/md";
import { IoMdAirplane, IoIosAddCircleOutline } from "react-icons/io";
import { UserCredentialsContext } from "../../../../store/user-credentials-context";
import FormUpdate from "./FormUpdateProfile";
import AvatarSetings from "./AvatarSetings";
import { AiOutlineGlobal } from "react-icons/ai";
import PrivacySettings from "./PrivacySettings";
export default function Setting() {
    const userCredentialsContext = useContext(UserCredentialsContext);
    return (
        <div style={{ padding: '16px', backgroundColor: '#F6F7FB' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: '16px' }}>
                    <IoMdAirplane size={100} style={{ marginLeft: '200px' }} />
                    <Text style={{ fontWeight: 'bold', marginBottom: '8px', marginLeft: '210px' }}>
                        Upgrades
                    </Text>
                </div>
                <div style={{ flex: 3 }}>
                    <Paper
                        shadow="xs"
                        p="xl"
                        style={{ borderRadius: '10px', border: 'none', overflow: 'hidden' }}
                    >
                        <Text style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                            Upgrade to Quizlet Plus
                        </Text>
                        <Text style={{ marginBottom: '16px' }}>
                            Get Learn mode, practice tests, expert solutions and set creation tools, all ad-free.
                        </Text>
                        <Button variant="filled" radius="md">
                            Upgrade: Free 30-day trial
                        </Button>
                    </Paper>
                </div>
            </div>
            <div style={{ display: 'flex', paddingTop: "40px" }}>
                <AvatarSetings />
            </div>
            <div style={{ display: 'flex', paddingTop: "40px" }}>
                <div style={{ flex: 1, marginRight: '16px' }}>
                    <MdAccountCircle style={{ marginBottom: '8px', marginLeft: '210px', width: '100px', height: '100px' }} />
                    <Text style={{ fontWeight: 'bold', marginBottom: '8px', marginLeft: '230px' }}>
                        Account
                    </Text>
                </div>
                <div style={{ flex: 3 }}>
                    <FormUpdate />
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: "30px" }}>
                <div style={{ flex: 1, marginRight: '16px' }}>
                    <AiOutlineGlobal size={100} style={{ marginLeft: '200px' }} />
                    <Text style={{ fontWeight: 'bold', marginBottom: '8px', marginLeft: '210px' }}>
                        Language
                    </Text>
                </div>
                <div style={{ flex: 3 }}>
                    <Paper
                        shadow="xs"
                        p="xl"
                        style={{ borderRadius: '10px', border: 'none', overflow: 'hidden' }}
                    >
                        <Text style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                            Select Language
                        </Text>
                        <Select
                            placeholder="Select a language"
                            data={[
                                { value: 'english', label: 'English' },
                                { value: 'vietnam', label: 'Vietnam' },
                            ]}

                        />
                    </Paper>
                </div>
            </div>
            <div style={{ display: 'flex', paddingTop: '30px' }}>
                <PrivacySettings />
            </div>
        </div>
    );
}

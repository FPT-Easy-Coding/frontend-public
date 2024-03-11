import { useState, useContext } from 'react';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { Button, Group, TextInput, Box, Portal, Overlay, Radio } from '@mantine/core';
import { Paper, Text } from "@mantine/core";
import { UserCredentialsContext } from "../../../../store/user-credentials-context";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FormUpdate() {
    const userCredentialsContext = useContext(UserCredentialsContext);
    const [selectedAccountType, setSelectedAccountType] = useState(userCredentialsContext.info?.accountType || '');
    const form = useForm({
        initialValues: {
            firstName: userCredentialsContext.info?.firstName || '',
            lastName: userCredentialsContext.info?.lastName || '',
            email: userCredentialsContext.info?.email || '',
            telephone: userCredentialsContext.info?.telephone || '',
            accountType: selectedAccountType,
        },
        validate: {
            firstName: hasLength({ min: 2, max: 50 }, 'First Name must be between 2 and 50 characters'),
            lastName: hasLength({ min: 2, max: 50 }, 'Last Name must be between 2 and 50 characters'),
            email: isEmail('Invalid email'),
            telephone: (value) => {
                if (!/^\d{9}$/.test(value)) {
                    return 'Telephone must have exactly 10 numeric characters';
                }
            },
        },
    });


    const [formData, setFormData] = useState({
        firstName: userCredentialsContext.info?.firstName || '',
        lastName: userCredentialsContext.info?.lastName || '',
        telephone: userCredentialsContext.info?.telephone || '',
        accountType: selectedAccountType,
        email: userCredentialsContext.info?.email || '',
    });
    const handleInputChange = (field: string, value: string) => {

        setFormData({
            ...formData,
            [field]: value,
        });
        form.setFieldValue(field, value);
        form.validateField(field);
    };

    const handleRadioChange = (accountType: string) => {
        setFormData({
            ...formData,
            accountType: accountType,
        });
        setSelectedAccountType(accountType);
        form.setFieldValue('accountType', accountType);
    };

    const navigate = useNavigate();
    const handleFormSubmit = async () => {
        if (form.isValid()) {
            setFormData({
                ...formData,
            });
            setModalOpen(false);
            console.log("request", formData);
            try {
                await axios.put(`http://localhost:8080/api/v1/users/update-profile-user?id=${userCredentialsContext.info?.userId}`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                navigate(`/user/settings`);
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // navigate(`/user/settings`);
        }
    };


    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '380px',
            }}
        >
            <Paper
                shadow="xs"
                p="xl"
                style={{ borderRadius: '10px', border: 'none', overflow: 'hidden', display: 'flex' }}
            >
                <div style={{ flex: 1, marginRight: '16px' }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: '8px' }}>First Name</Text>
                    {userCredentialsContext.info?.firstName}
                    <Text style={{ fontWeight: 'bold', marginBottom: '8px', marginTop: '16px' }}>Last Name</Text>
                    {userCredentialsContext.info?.lastName}
                    <Text style={{ fontWeight: 'bold', marginBottom: '8px', marginTop: '16px' }}>Email</Text>
                    {userCredentialsContext.info?.email}
                    <Text style={{ fontWeight: 'bold', marginBottom: '8px', marginTop: '16px' }}>Telephone</Text>
                    {userCredentialsContext.info?.telephone}
                    <Text style={{ fontWeight: 'bold', marginBottom: '8px', marginTop: '16px' }}>Account Type</Text>
                    {userCredentialsContext.info?.accountType}
                </div>

                <Button
                    style={{ marginTop: '10px' }}
                    size="lg"
                    color="indigo"
                    variant="subtle"
                    radius="sm"
                    onClick={() => setModalOpen(true)}
                >
                    Edit
                </Button>
            </Paper>

            {modalOpen && (
                <Portal>
                    <Overlay
                        zIndex={1000}
                        opacity={0.7}
                        onClick={() => setModalOpen(false)}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                    />
                    <Paper
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            padding: 20,
                            borderRadius: 8,
                            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                            zIndex: 1001,
                            width: '40%',
                            maxHeight: '600px',
                            overflowY: 'auto',
                        }}
                    >
                        <form onSubmit={handleFormSubmit}>
                            <Text style={{ fontSize: "20px", fontWeight: 'bold', marginBottom: '8px', marginLeft: '230px' }}>
                                Update Account
                            </Text>

                            <TextInput
                                label="First Name"
                                withAsterisk
                                placeholder={userCredentialsContext.info?.firstName}
                                onChange={(event) => handleInputChange('firstName', event.target.value)}
                                error={form.errors?.firstName}
                                styles={{
                                    input: {
                                        backgroundColor: '#F6F7FB',
                                    },
                                }}
                            />

                            <TextInput
                                label="Last Name"
                                withAsterisk
                                mt="md"
                                placeholder={userCredentialsContext.info?.lastName}
                                onChange={(event) => handleInputChange('lastName', event.target.value)}
                                error={form.errors?.lastName}
                                styles={{
                                    input: {
                                        backgroundColor: '#F6F7FB',
                                    },
                                }}
                            />

                            <TextInput
                                label="Email"
                                withAsterisk
                                mt="md"
                                placeholder={userCredentialsContext.info?.email}
                                onChange={(event) => handleInputChange('email', event.target.value)}
                                error={form.errors?.email}
                                styles={{
                                    input: {
                                        backgroundColor: '#F6F7FB',
                                    },
                                }}
                            />

                            <TextInput
                                label="Telephone"
                                withAsterisk
                                mt="md"
                                placeholder={userCredentialsContext.info?.telephone}
                                onChange={(event) => handleInputChange('telephone', event.target.value)}
                                error={form.errors?.telephone}
                                styles={{
                                    input: {
                                        backgroundColor: '#F6F7FB',
                                    },
                                }}
                            />

                            <label style={{ marginBottom: '8px', paddingTop: '30px' }}>Account Type</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Radio
                                    label="Student"
                                    value="student"
                                    checked={selectedAccountType === 'student'}
                                    onChange={() => handleRadioChange('student')}
                                />
                                <Radio
                                    label="Teacher"
                                    value="teacher"
                                    checked={selectedAccountType === 'teacher'}
                                    onChange={() => handleRadioChange('teacher')}
                                />
                            </div>

                            <Group justify="flex-end" mt="md">
                                <Button type="submit" disabled={!form.isValid}>Save</Button>
                                <Button variant="outline" color="gray" onClick={() => setModalOpen(false)}>Cancel</Button>
                            </Group>
                        </form>

                    </Paper>
                </Portal>
            )}
        </Box>
    );
}



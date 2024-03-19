import { Paper, Text, Button, Portal, Overlay, TextInput, } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
export default function PrivacySettings() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const handleInputChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    const validateNewPassword = (value: string) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/.test(value) || "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.";
    };
    //get Token
    //console.log(localStorage.getItem("AT"))
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const handleFormSubmit = async () => {
        setModalOpen(false);
        if (passwordsMatch) {
            setModalOpen(false);
            try {
                const response = await axios.patch('http://localhost:8080/api/v1/users', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("AT")}`,
                    },
                });
                setModalOpen(false);
                console.log(response)
                console.log("done")
                toast.success("change password Successfull!", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            } catch (error) {
                toast.error("the current password not true", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } else {
            toast.error("The confirm password are not same", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    React.useEffect(() => {
        setPasswordsMatch(formData.newPassword === formData.confirmPassword);
    }, [formData.newPassword, formData.confirmPassword]);
    const [modalOpenDelete, setModalOpenDelete] = React.useState(false);
    const handleDeleteButtonClick = () => {
        setModalOpenDelete(true);
    };

    const deleteAccount = async () => {
        console.log("Account deleted successfully");
        setModalOpenDelete(false);
        try {
            // const response = await axios.delete('http://localhost:8080/api/v1/users');
            // console.log('API response:', response.data);
            console.log('Account deleted successfully');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePassword = (field: string) => {
        switch (field) {
            case 'currentPassword':
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case 'newPassword':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirmPassword':
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div style={{ flex: 1 }}>
                <MdOutlinePrivacyTip size={100} />
                <Text style={{ fontWeight: 'bold', marginBottom: '8px', paddingLeft: '20px' }}>
                    privacy
                </Text>
            </div>
            <div style={{ flex: 11 }}>
                <Paper
                    shadow="xs"
                    p="xl"
                    style={{ borderRadius: '10px', border: 'none', overflow: 'hidden' }}
                >
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 11 }}>

                            <Text style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                                Change a Quizlet password
                            </Text>
                        </div>
                        <div style={{ flex: 1 }}>

                            <Button
                                style={{ marginTop: '-20px' }}
                                size="lg"
                                color="indigo"
                                variant="subtle"
                                radius="sm"
                                onClick={() => setModalOpen(true)}
                            >
                                Change Password
                            </Button>
                        </div>
                    </div>
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
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <Text style={{ fontSize: "20px", fontWeight: 'bold', marginBottom: '8px', marginLeft: '210px' }}>
                                        Change Password
                                    </Text>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ flex: 11 }}>
                                            <TextInput
                                                type={showCurrentPassword ? "text" : "password"}
                                                placeholder="Current Password"
                                                withAsterisk
                                                value={currentPassword}
                                                onChange={(event) => {
                                                    setCurrentPassword(event.target.value)
                                                        , handleInputChange('currentPassword', event.target.value);
                                                }}
                                                styles={{
                                                    input: {
                                                        backgroundColor: '#F6F7FB',
                                                        marginBottom: 15,
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <button type="button" style={{ marginTop: '5px', fontSize: '20px' }} onClick={() => handleTogglePassword('currentPassword')}>
                                                {showCurrentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ flex: 11 }}>
                                            <TextInput
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="New Password"
                                                withAsterisk
                                                value={newPassword}
                                                {...register("newPassword", { validate: validateNewPassword })}
                                                onChange={(event) => {
                                                    setNewPassword(event.target.value)
                                                    handleInputChange('newPassword', event.target.value);
                                                }}
                                                styles={{
                                                    input: {
                                                        backgroundColor: '#F6F7FB',
                                                        marginBottom: 15,
                                                        borderColor: errors.newPassword ? 'red' : '#ced4da', // Change border color to red if there's an error
                                                    },
                                                }}
                                            />
                                            {errors.newPassword && (
                                                <p style={{
                                                    fontSize: '12px',
                                                    color: 'red',
                                                    marginTop: '5px', // Add margin to separate error message from TextInput
                                                }}>
                                                    From 8 to 32 characters, at least 1 number, 1 symbol, 1 uppercase letter and 1 lowercase letter
                                                </p>
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <button type="button" style={{ marginTop: '5px', fontSize: '20px' }} onClick={() => handleTogglePassword('newPassword')}>
                                                {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ flex: 11 }}>
                                            <TextInput
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm your new password"
                                                withAsterisk
                                                value={confirmPassword}
                                                onChange={(event) => {
                                                    setConfirmPassword(event.target.value)
                                                    handleInputChange('confirmPassword', event.target.value);
                                                }}
                                                styles={{
                                                    input: {
                                                        backgroundColor: '#F6F7FB',
                                                        marginBottom: 15,
                                                        border: passwordsMatch ? '1px solid #ced4da' : '1px solid red',
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <button type="button" style={{ marginTop: '5px', fontSize: '20px' }} onClick={() => handleTogglePassword('confirmPassword')}>
                                                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Paper>
                        </Portal>
                    )}
                    <hr></hr>
                    <hr></hr>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 11 }}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 8, marginTop: 20 }}>
                                Delete your account
                            </Text>
                            <Text style={{ marginBottom: 8, marginTop: 20 }}>
                                This will delete all your data and cannot be undone.
                            </Text>
                        </div>
                        <div style={{ flex: 1, paddingTop: '20px' }}>
                            <Button onClick={handleDeleteButtonClick} variant="filled" color="red" size="md" radius="md">Delete</Button>
                        </div>
                    </div>
                    {modalOpenDelete && (
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
                                <div>
                                    <div >Are you sure you want to delete your account?</div>
                                    <Button variant="filled" color="red" size="md" radius="md" onClick={deleteAccount}>
                                        Confirm Delete
                                    </Button>
                                    <Button variant="outline" color="gray" onClick={() => setModalOpenDelete(false)}>Cancel</Button>
                                </div>
                            </Paper>
                        </Portal>
                    )}
                </Paper>
            </div >
        </>
    )
}



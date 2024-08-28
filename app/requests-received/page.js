/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, ButtonGroup } from '@mui/material';
import { useRouter } from "next/navigation";
import { notify } from '../components/Toast';
import { getResponse, postResponse } from '../components/_apihandler';
import dayjs from 'dayjs'; // Import dayjs for date manipulation
import MainLayout from '../layouts/MainLayout';
import Loading from '../components/Loading';
import { userDetails } from '@/middleware/userDetails';

const ReferralReceivedPage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({});
    const [receivedRequests, setReceivedRequests] = useState([]);


    const getUserDetails = async () => {
        const response = await userDetails();
        if (response.status === 200) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
            setUserData(response.data.data)
        }

    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (!token || !user) {
            notify("Please Logged In First!", "error");
            router.push('/login');
        } else {
            getUserDetails()
        }
    }, [router]);

    useEffect(() => {
        if (userData._id) {
            fetchReceivedRequests();
        }
    }, [userData._id]);

    const fetchReceivedRequests = async () => {
        try {
            const response = await getResponse(`/api/requests/getRequests?userId=${userData._id}&type=receiver`);
            if (response.status === 200) {
                setReceivedRequests(response.data.data);
            } else {
                notify("Something Went Wrong!", "error");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                notify(error.response.data.msg, "error");
            }
        }
    };

    const getStatusMessage = (status, expireOn) => {
        const now = dayjs();
        const expireTime = dayjs(expireOn);
        const hoursLeft = expireTime.diff(now, 'hour');
        switch (status) {
            // case 'Send':
            //     return 'Request Is Sent';
            case 'Waiting':
                return 'Waiting For Confirmation';
            case 'Rejected':
                return 'Rejected';
            case 'Accepted':
                return `Accepted - ${hoursLeft} hours left to submit submission proof.`;
            case 'Successful':
                return 'Successful';
            case 'Expired':
                return 'Expired';
            case 'Cancled':
                return 'Canceled';
            default:
                return '';
        }
    };

    const handleAccept = async (requestId) => {
        // Handle accept request logic here
        try {
            const response = await postResponse(`/api/requests/acceptRequest`, { requestId: requestId });
            if (response.status === 200) {
                notify(response.data.msg);
                fetchReceivedRequests()
                getUserDetails()
            } else {
                notify("Something Went Wrong!", "error");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                notify(error.response.data.msg, "error");
            }
        }
    };

    const handleReject = async (requestId) => {
        // Handle reject request logic here
        try {
            const response = await postResponse(`/api/requests/rejectRequest`, { requestId: requestId });
            if (response.status === 200) {
                notify(response.data.msg);
                fetchReceivedRequests()
            } else {
                notify("Something Went Wrong!", "error");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                notify(error.response.data.msg, "error");
            }
        }
    };

    const handleSubmitValidation = async (requestId) => {
        // Handle submit for validation logic here
        router.push(`/submit-verification?requestId=${requestId}`)
    };

    return (
        <>
            <Loading />
            <MainLayout>
                {/* <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                bgcolor="#d0e7f9"
            > */}
                <Box className='reBg' pb={10} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Box
                        // bgcolor="#1e88e5"
                        color="white"
                        borderRadius={2}
                        p={4}
                        boxShadow={3}
                        maxWidth={600}
                        width="100%"
                    >
                        <Typography variant="h6" align="center" gutterBottom>
                            Requests Received
                        </Typography>
                        <Box textAlign="center" mb={3}>
                            <Box
                                bgcolor="#90caf9"
                                borderRadius={25}
                                px={2}
                                py={1}
                                display="inline-block"
                            >
                                Refer Points Balance: {userData.total_refer_points}
                            </Box>
                        </Box>
                        <Typography variant="body1" align="center" mb={3}>
                            Earn points upon successful referral submission
                        </Typography>
                        <List>
                            {receivedRequests.map((request) => (
                                <ListItem key={request._id}>
                                    <ListItemText
                                        primary={`User ${request.sender_id.first_name} sent request for ${request.vacancy_name}`}
                                        secondary={getStatusMessage(request.status, request.expireOn)}
                                    />
                                    {(request.status === 'Send') && (
                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                            <Button color="primary" onClick={() => handleAccept(request._id)}>Accept</Button>
                                            <Button color="secondary" onClick={() => handleReject(request._id)}>Reject</Button>
                                        </ButtonGroup>
                                    )}
                                    {request.status === 'Accepted' && (
                                        <Button variant="contained" color="primary" onClick={() => handleSubmitValidation(request._id)}>
                                            Submit for validation
                                        </Button>
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </MainLayout>
        </>
    );
};

export default ReferralReceivedPage;


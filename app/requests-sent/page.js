// "use client"
// import React, { use, useEffect, useState } from 'react';
// import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
// import { useRouter } from "next/navigation";
// import { notify } from '../components/Toast';
// import { getResponse } from '../components/_apihandler';


// const ReferralSentPage = () => {
//     const router = useRouter();
//     const [userData, setUserData] = useState({});
//     const [sendRequest, setSendRequest] = useState([]);

//     useEffect(() => {
//         const token = JSON.parse(localStorage.getItem('token'));
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (!token && !user) {
//             router.push('/login')
//         } else {
//             setUserData(user);
//         }
//     }, []);

//     useEffect(() => {
//         fetchSendRequest();
//     }, [])

//     const fetchSendRequest = async () => {
//         try {
//             const response = await getResponse(`/api/requests/getRequests?${userData._id}&&type=sender`);
//             console.log("sedn Request response:-", response);
//             if (response.status === 200) {
//                 setSendRequest(response.data.data)
//             } else {
//                 notify("Something Went Wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response.status === 400) {
//                 notify(error.response.data.msg, "error")
//             }
//         }
//     }


//     return (
//         <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             minHeight="100vh"
//             bgcolor="#d0e7f9"
//         >
//             <Box
//                 bgcolor="#1e88e5"
//                 color="white"
//                 borderRadius={2}
//                 p={4}
//                 boxShadow={3}
//                 maxWidth={600}
//                 width="100%"
//             >
//                 <Typography variant="h6" align="center" gutterBottom>
//                     REQUESTS SENT
//                 </Typography>
//                 <Box textAlign="center" mb={3}>
//                     <Box
//                         bgcolor="#90caf9"
//                         borderRadius={25}
//                         px={2}
//                         py={1}
//                         display="inline-block"
//                     >
//                         Refer Points Balance: {userData.total_refer_points}
//                     </Box>
//                 </Box>
//                 <Typography variant="body1" align="center" mb={3}>
//                     You have applied for following referrals:
//                 </Typography>
//                 <List>
//                     <ListItem>
//                         <ListItemText
//                             primary="Job Name-Job ID sent to user R1"
//                             secondary="Waiting for confirmation (R is the one who has received request. Put name accordingly here.)"
//                         />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText
//                             primary="Job Name 2-Job ID sent to user R2"
//                             secondary="Successful"
//                         />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText
//                             primary="Job Name 3-Job ID sent to user R3"
//                             secondary="Declined"
//                         />
//                     </ListItem>
//                 </List>
//                 <Box textAlign="center" mt={4}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         sx={{ borderRadius: 25 }}
//                     >
//                         Buy more refer points
//                     </Button>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default ReferralSentPage;


"use client"
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, ButtonGroup } from '@mui/material';
import { useRouter } from "next/navigation";
import { notify } from '../components/Toast';
import { getResponse, postResponse } from '../components/_apihandler';
import dayjs from 'dayjs';
import MainLayout from '../layouts/MainLayout';
import Loading from '../components/Loading';
import { userDetails } from '@/middleware/userDetails';

const ReferralSentPage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({});
    const [sendRequest, setSendRequest] = useState([]);


    useEffect(() => {
        getUserDetails()
    }, []);

    const getUserDetails = async () => {
        if (localStorage.getItem('token')) {
            const response = await userDetails();
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                setUserData(response.data.data);
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (!token || !user) {
            notify("Please Logged In First!", "error");
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        if (userData._id) {
            fetchSendRequest();
        }
    }, [userData._id]);

    const fetchSendRequest = async () => {
        try {
            const response = await getResponse(`/api/requests/getRequests?userId=${userData._id}&type=sender`);
            if (response.status === 200) {
                setSendRequest(response.data.data);
            } else {
                notify("Something Went Wrong!", "error");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                notify(error.response.data.msg, "error");
            }
        }
    };

    const getStatusMessage = (status) => {
        switch (status) {
            case 'Send':
                return 'Request Is Sent';
            case 'Waiting':
                return 'Waiting For Confirmation';
            case 'Rejected':
                return 'Declined - Please try again with another user';
            case 'Accepted':
                return 'Accepted';
            case 'Successful':
                return 'Successful';
            case 'Expired':
                return 'Expired';
            case 'Canceled':
                return 'Canceled';
            default:
                return '';
        }
    };

    const handleCancelRequest = async (requestId, senderId) => {
        try {
            const response = await postResponse(`/api/requests/cancelRequest`, { requestId: requestId, senderId: senderId });
            if (response.status === 200) {
                notify(response.data.msg);
                fetchSendRequest()
                getUserDetails()
            } else {
                notify("Something Went Wrong!", "error");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                notify(error.response.data.msg, "error");
            }
        }
        // notify('Request canceled successfully', 'success');
        // fetchSendRequest(); // Refresh the list after cancellation
    };

    const isCancelable = (createdAt) => {
        const now = dayjs();
        const createdTime = dayjs(createdAt);
        const timeDiff = now.diff(createdTime, 'hour');
        return timeDiff <= 24;
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
                            REQUESTS SENT
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
                            You have applied for following referrals:
                        </Typography>
                        <List>
                            {sendRequest.map((request) => (
                                <ListItem key={request._id}>
                                    <ListItemText
                                        primary={`Job Name: ${request.vacancy_name} - Job ID: ${request.job_id}`}
                                        secondary={getStatusMessage(request.status)}
                                    />
                                    {request.status === 'Send' && isCancelable(request.createdAt) && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleCancelRequest(request._id, request.sender_id._id)}
                                            sx={{ marginLeft: 2 }}
                                        >
                                            Cancel Request
                                        </Button>
                                    )}
                                </ListItem>
                            ))}
                        </List>
                        <Box textAlign="center" mt={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ borderRadius: 25 }}
                            >
                                Buy more refer points
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </MainLayout>
        </>
    );
};

export default ReferralSentPage;


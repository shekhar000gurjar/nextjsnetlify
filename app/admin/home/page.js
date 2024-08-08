// "use client"
// import React, { useEffect, useState } from 'react';
// import { Box, Button, Grid, Paper, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { useRouter } from "next/navigation";
// import { getResponse, postResponse } from '@/app/components/_apihandler';
// import { notify } from '@/app/components/Toast';

// const LoaderWrapper = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#d0e7f9',
//     padding: '0 16px',
// }));

// const AdminBox = styled(Box)(({ theme }) => ({
//     backgroundColor: '#1e88e5',
//     color: 'white',
//     borderRadius: '16px',
//     padding: '32px',
//     boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
//     maxWidth: '800px',
//     width: '100%',
// }));

// const RequestPaper = styled(Paper)(({ theme }) => ({
//     padding: '16px',
//     borderRadius: '16px',
//     height: '100%',
// }));

// const AdminPortal = () => {
//     const router = useRouter();
//     const [receiver, setReceiver] = useState([]);
//     const [dashData, setDashData] = useState({});
//     const [verificationData, setVerificationData] = useState({});


//     useEffect(() => {
//         const token = localStorage.getItem('adminToken');
//         const user = localStorage.getItem('admin');

//         if (!token && !user) {
//             router.push('/admin/');
//         }
//     }, [router]);

//     useEffect(() => {
//         fetchDashData();
//         fetchRequests();
//     }, [])


//     const fetchRequests = async () => {
//         try {
//             const response = await getResponse(`/api/admin/getWaitingRequests`);
//             console.log("fetchRequests:-", response.data.data)
//             if (response.status === 200) {
//                 setReceiver(response.data.data);
//             } else {
//                 notify("Something Went Wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 notify(error.response.data.msg, "error");
//             }
//         }
//     };

//     const fetchDashData = async () => {
//         try {
//             const response = await getResponse(`/api/admin/allRequests`);
//             console.log("fetchDashData:-", response.data.data)
//             if (response.status === 200) {
//                 setDashData(response.data.data);
//             } else {
//                 notify("Something Went Wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 notify(error.response.data.msg, "error");
//             }
//         }
//     };

//     const handleAccept = async (requestId) => {
//         try {
//             const response = await postResponse(`/api/admin/acceptRequest`, { requestId });
//             console.log("fetchDashData:-", response.data.data)
//             if (response.status === 200) {
//                 // setDashData(response.data.data);
//                 fetchDashData();
//                 fetchRequests();
//                 notify(response.data.msg, 'success')
//             } else {
//                 notify("Something Went Wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 notify(error.response.data.msg, "error");
//             }
//         }
//     };

//     const handleReject = async () => {
//         try {
//             const response = await postResponse(`/api/admin/rejectRequest`, { requestId, comment });
//             console.log("handleReject:-", response.data.data)
//             if (response.status === 200) {
//                 fetchDashData();
//                 fetchRequests();
//                 notify(response.data.msg, 'success')
//             } else {
//                 notify("Something Went Wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 notify(error.response.data.msg, "error");
//             }
//         }
//     };

//     const handleNameClick = async (requestId) => {
//         try {
//             const response = await getResponse(`/api/admin/getVerificationDetails?requestId=${requestId}`);
//             console.log("handleReject:-", response.data.data)
//             if (response.status === 200) {
//                 setVerificationData(response.data.data.verification)
//                 // notify(response.data.msg, 'success')
//             } else {
//                 notify("Something Went Wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 notify(error.response.data.msg, "error");
//             }
//         }
//     };

//     return (
//         <LoaderWrapper>
//             <AdminBox>
//                 <Typography variant="h4" align="center" gutterBottom>
//                     Admin Portal
//                 </Typography>
//                 <Grid container spacing={2} mt={3}>
//                     <Grid item xs={12} md={6}>
//                         <RequestPaper elevation={3}>
//                             <Typography variant="h6" gutterBottom>
//                                 Verification requests:
//                             </Typography>
//                             {receiver.map((user, index) => (
//                                 <Box key={index} mb={2}>
//                                     <Typography variant="body1" gutterBottom>
//                                         {index + 1}. {user.receiver_id.first_name}
//                                     </Typography>
//                                     <Button variant="contained" color="success" sx={{ marginRight: 1 }}>
//                                         Accept
//                                     </Button>
//                                     <Button variant="contained" color="error">
//                                         Reject
//                                     </Button>
//                                 </Box>
//                             ))}
//                         </RequestPaper>
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                         <RequestPaper elevation={3}>
//                             <Typography variant="h6" gutterBottom>
//                                 {/* Total refer points bought: ____ */}
//                                 Total refer points bought: ____
//                             </Typography>
//                             <Typography variant="h6" gutterBottom>
//                                 Total amount received: ____
//                             </Typography>
//                             <Typography variant="h6" gutterBottom>
//                                 Total referral requests sent: {dashData.totalSendRequests}
//                             </Typography>
//                             <Typography variant="h6" gutterBottom>
//                                 Total referral requests accepted: {dashData.totalAcceptedRequests}
//                             </Typography>
//                             <Typography variant="h6" gutterBottom>
//                                 Total referral requests approved: {dashData.totalApprovedRequests}
//                             </Typography>
//                         </RequestPaper>
//                     </Grid>
//                 </Grid>
//             </AdminBox>
//         </LoaderWrapper>
//     );
// };

// export default AdminPortal;


"use client";
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Paper,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from "next/navigation";
import { getResponse, postResponse } from '@/app/components/_apihandler';
import { notify } from '@/app/components/Toast';
import CloseIcon from '@mui/icons-material/Close';

const LoaderWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#d0e7f9',
    padding: '0 16px',
}));

const AdminBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#1e88e5',
    color: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    width: '100%',
}));

const RequestPaper = styled(Paper)(({ theme }) => ({
    padding: '16px',
    borderRadius: '16px',
    height: '100%',
}));

const AdminPortal = () => {
    const router = useRouter();
    const [receiver, setReceiver] = useState([]);
    const [dashData, setDashData] = useState({});
    const [verificationData, setVerificationData] = useState({});
    const [rejectOpen, setRejectOpen] = useState(false);
    const [verificationOpen, setVerificationOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [selectedRequestId, setSelectedRequestId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const user = localStorage.getItem('admin');

        if (!token && !user) {
            router.push('/admin/');
        }
    }, [router]);

    useEffect(() => {
        fetchDashData();
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await getResponse(`/api/admin/getWaitingRequests`);
            console.log("fetchRequests:-", response.data.data);
            if (response.status === 200) {
                setReceiver(response.data.data);
            } else {
                notify("Something Went Wrong!", "error");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                notify(error.response.data.msg, "error");
            }
        }
    };

    const fetchDashData = async () => {
        try {
            const response = await getResponse(`/api/admin/allRequests`);
            console.log("fetchDashData:-", response.data.data);
            if (response.status === 200) {
                setDashData(response.data.data);
            } else {
                notify("Something Went Wrong!", "error");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                notify(error.response.data.msg, "error");
            }
        }
    };

    const handleAccept = async (requestId) => {
        try {
            const response = await postResponse(`/api/admin/acceptRequest`, { requestId });
            console.log("fetchDashData:-", response.data.data);
            if (response.status === 200) {
                fetchDashData();
                fetchRequests();
                notify(response.data.msg, 'success');
            } else {
                notify("Something Went Wrong!", "error");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                notify(error.response.data.msg, "error");
            }
        }
    };

    const handleReject = async () => {
        try {
            const response = await postResponse(`/api/admin/rejectRequest`, { requestId: selectedRequestId, comment });
            console.log("handleReject:-", response.data.data);
            if (response.status === 200) {
                fetchDashData();
                fetchRequests();
                notify(response.data.msg, 'success');
                setRejectOpen(false);
                setComment('');
            } else {
                notify("Something Went Wrong!", "error");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                notify(error.response.data.msg, "error");
            }
        }
    };

    const handleNameClick = async (requestId) => {
        try {
            const response = await getResponse(`/api/admin/getVerificationDetails?requestId=${requestId}`);
            console.log("handleNameClick:-", response.data.data);
            if (response.status === 200) {
                setVerificationData(response.data.data.verification);
                setVerificationOpen(true);
            } else {
                notify("Something Went Wrong!", "error");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                notify(error.response.data.msg, "error");
            }
        }
    };

    return (
        <LoaderWrapper>
            <AdminBox>
                <Typography variant="h4" align="center" gutterBottom>
                    Admin Portal
                </Typography>
                <Grid container spacing={2} mt={3}>
                    <Grid item xs={12} md={6}>
                        <RequestPaper elevation={3}>
                            <Typography variant="h6" gutterBottom>
                                Verification requests:
                            </Typography>
                            {receiver.map((user, index) => (
                                <Box key={index} mb={2}>
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                        onClick={() => handleNameClick(user._id)}
                                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                    >
                                        {index + 1}. {user.receiver_id.first_name}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        sx={{ marginRight: 1 }}
                                        onClick={() => handleAccept(user._id)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                            setSelectedRequestId(user._id);
                                            setRejectOpen(true);
                                        }}
                                    >
                                        Reject
                                    </Button>
                                </Box>
                            ))}
                        </RequestPaper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <RequestPaper elevation={3}>
                            <Typography variant="h6" gutterBottom>
                                Total refer points bought: ____
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Total amount received: ____
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Total referral requests sent: {dashData.totalSendRequests}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Total referral requests accepted: {dashData.totalAcceptedRequests}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Total referral requests approved: {dashData.totalApprovedRequests}
                            </Typography>
                        </RequestPaper>
                    </Grid>
                </Grid>
            </AdminBox>

            <Dialog open={rejectOpen} onClose={() => setRejectOpen(false)}>
                <DialogTitle>
                    Reject Request
                    <IconButton
                        aria-label="close"
                        onClick={() => setRejectOpen(false)}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide a comment for rejecting the request.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comment"
                        label="Comment"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRejectOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleReject} color="primary" disabled={!comment}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={verificationOpen} onClose={() => setVerificationOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    Verification Documents
                    <IconButton
                        aria-label="close"
                        onClick={() => setVerificationOpen(false)}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {verificationData.attachment && verificationData.attachment.length > 0 ? (
                        verificationData.attachment.map((file, index) => (
                            <Box key={index} my={2}>
                                <img src={file} alt={`Document ${index + 1}`} style={{ maxWidth: '100%' }} />
                            </Box>
                        ))
                    ) : (
                        <Typography>No verification documents found.</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </LoaderWrapper>
    );
};

export default AdminPortal;


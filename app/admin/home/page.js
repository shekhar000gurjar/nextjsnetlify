// /* eslint-disable @next/next/no-img-element */
// "use client";
// import React, { useEffect, useState } from 'react';
// import {
//     Box,
//     Button,
//     Grid,
//     Paper,
//     Typography,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,
//     TextField,
//     IconButton
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { useRouter } from "next/navigation";
// import { getResponse, postResponse } from '@/app/components/_apihandler';
// import { notify } from '@/app/components/Toast';
// import CloseIcon from '@mui/icons-material/Close';

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
//     const [rejectOpen, setRejectOpen] = useState(false);
//     const [verificationOpen, setVerificationOpen] = useState(false);
//     const [comment, setComment] = useState('');
//     const [selectedRequestId, setSelectedRequestId] = useState('');

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
//     }, []);

//     const fetchRequests = async () => {
//         try {
//             const response = await getResponse(`/api/admin/getWaitingRequests`);
//             console.log("fetchRequests:-", response.data.data);
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
//             console.log("fetchDashData:-", response.data.data);
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
//             console.log("fetchDashData:-", response.data.data);
//             if (response.status === 200) {
//                 fetchDashData();
//                 fetchRequests();
//                 notify(response.data.msg, 'success');
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
//             const response = await postResponse(`/api/admin/rejectRequest`, { requestId: selectedRequestId, comment });
//             console.log("handleReject:-", response.data.data);
//             if (response.status === 200) {
//                 fetchDashData();
//                 fetchRequests();
//                 notify(response.data.msg, 'success');
//                 setRejectOpen(false);
//                 setComment('');
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
//             console.log("handleNameClick:-", response.data.data);
//             if (response.status === 200) {
//                 setVerificationData(response.data.data.verification);
//                 setVerificationOpen(true);
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
//                                     <Typography
//                                         variant="body1"
//                                         gutterBottom
//                                         onClick={() => handleNameClick(user._id)}
//                                         style={{ cursor: 'pointer', textDecoration: 'underline' }}
//                                     >
//                                         {index + 1}. {user.receiver_id.first_name}
//                                     </Typography>
//                                     <Button
//                                         variant="contained"
//                                         color="success"
//                                         sx={{ marginRight: 1 }}
//                                         onClick={() => handleAccept(user._id)}
//                                     >
//                                         Accept
//                                     </Button>
//                                     <Button
//                                         variant="contained"
//                                         color="error"
//                                         onClick={() => {
//                                             setSelectedRequestId(user._id);
//                                             setRejectOpen(true);
//                                         }}
//                                     >
//                                         Reject
//                                     </Button>
//                                 </Box>
//                             ))}
//                         </RequestPaper>
//                     </Grid>
//                     <Grid item xs={12} md={6}>
//                         <RequestPaper elevation={3}>
//                             <Typography variant="h6" gutterBottom>
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

//             <Dialog open={rejectOpen} onClose={() => setRejectOpen(false)}>
//                 <DialogTitle>
//                     Reject Request
//                     <IconButton
//                         aria-label="close"
//                         onClick={() => setRejectOpen(false)}
//                         sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Please provide a comment for rejecting the request.
//                     </DialogContentText>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         id="comment"
//                         label="Comment"
//                         type="text"
//                         fullWidth
//                         variant="outlined"
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setRejectOpen(false)} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleReject} color="primary" disabled={!comment}>
//                         Submit
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={verificationOpen} onClose={() => setVerificationOpen(false)} maxWidth="md" fullWidth>
//                 <DialogTitle>
//                     Verification Documents
//                     <IconButton
//                         aria-label="close"
//                         onClick={() => setVerificationOpen(false)}
//                         sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent>
//                     {verificationData.attachment && verificationData.attachment.length > 0 ? (
//                         verificationData.attachment.map((file, index) => (
//                             <Box key={index} my={2}>
//                                 <img src={file} alt={`Document ${index + 1}`} style={{ maxWidth: '100%' }} />
//                             </Box>
//                         ))
//                     ) : (
//                         <Typography>No verification documents found.</Typography>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </LoaderWrapper>
//     );
// };

// export default AdminPortal;
"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ArticleIcon from "@mui/icons-material/Article";
import InfoIcon from "@mui/icons-material/Info";
import BusinessIcon from "@mui/icons-material/Business";
import EditIcon from "@mui/icons-material/Edit";
import MapIcon from "@mui/icons-material/Map";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MenuIcon from "@mui/icons-material/Menu";

export default function AdminDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "Add or Remove Users", icon: <GroupAddIcon /> },
    { text: "Add or Remove Feedbacks", icon: <FeedbackIcon /> },
    { text: "Add or Remove Blogs", icon: <ArticleIcon /> },
    { text: "Edit About Us Page", icon: <InfoIcon /> },
    { text: "Manage Companies", icon: <BusinessIcon /> },
    { text: "Edit User Details", icon: <EditIcon /> },
    { text: "Edit Sector and Companies Mapping", icon: <MapIcon /> },
    { text: "Validations Page", icon: <CheckCircleIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: drawerOpen ? "240px" : "0px",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <Toolbar />
        <Typography paragraph>Welcome to the Admin Dashboard!</Typography>
      </Box>
    </Box>
  );
}

// /* eslint-disable react-hooks/exhaustive-deps */
// "use client"
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Button, List, ListItem, ListItemText, ButtonGroup } from '@mui/material';
// import { useRouter } from "next/navigation";
// import { notify } from '../components/Toast';
// import { getResponse, postResponse } from '../components/_apihandler';
// import dayjs from 'dayjs';
// import MainLayout from '../layouts/MainLayout';
// import Loading from '../components/Loading';
// import { userDetails } from '@/middleware/userDetails';

// const ReferralSentPage = () => {
//     const router = useRouter();
//     const [userData, setUserData] = useState({});
//     const [sendRequest, setSendRequest] = useState([]);

//     useEffect(() => {
//         getUserDetails()
//     }, []);

//     const getUserDetails = async () => {
//         if (localStorage.getItem('token')) {
//             const response = await userDetails();
//             if (response.status === 200) {
//                 localStorage.setItem('user', JSON.stringify(response.data.data));
//                 setUserData(response.data.data);
//             }
//         }
//     };

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (!token || !user) {
//             notify("Please Logged In First!", "error");
//             router.push('/login');
//         }
//     }, [router]);

//     useEffect(() => {
//         if (userData._id) {
//             fetchSendRequest();
//         }
//     }, [userData._id]);

//     const fetchSendRequest = async () => {
//         try {
//             const response = await getResponse(`/api/requests/getRequests?userId=${userData._id}&type=sender`);
//             if (response.status === 200) {
//                 setSendRequest(response.data.data);
//             } else {
//                 notify("Something Went Wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 notify(error.response.data.msg, "error");
//             }
//         }
//     };

//     const getStatusMessage = (status) => {
//         switch (status) {
//             case 'Send':
//                 return 'Request Is Sent';
//             case 'Waiting':
//                 return 'Waiting For Confirmation';
//             case 'Rejected':
//                 return 'Declined - Please try again with another user';
//             case 'Accepted':
//                 return 'Accepted';
//             case 'Successful':
//                 return 'Successful';
//             case 'Expired':
//                 return 'Expired';
//             case 'Canceled':
//                 return 'Canceled';
//             default:
//                 return '';
//         }
//     };

//     const handleCancelRequest = async (requestId, senderId) => {
//         try {
//             const response = await postResponse(`/api/requests/cancelRequest`, { requestId: requestId, senderId: senderId });
//             if (response.status === 200) {
//                 notify(response.data.msg);
//                 fetchSendRequest()
//                 getUserDetails()
//             } else {
//                 notify("Something Went Wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 notify(error.response.data.msg, "error");
//             }
//         }
//         // notify('Request canceled successfully', 'success');
//         // fetchSendRequest(); // Refresh the list after cancellation
//     };

//     const isCancelable = (createdAt) => {
//         const now = dayjs();
//         const createdTime = dayjs(createdAt);
//         const timeDiff = now.diff(createdTime, 'hour');
//         return timeDiff <= 24;
//     };

//     return (
//         <>
//             <Loading />
//             <MainLayout>
//                 {/* <Box
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 minHeight="100vh"
//                 bgcolor="#d0e7f9"
//             > */}
//                 <Box className='reBg' pb={10} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
//                     <Box
//                         // bgcolor="#1e88e5"
//                         color="white"
//                         borderRadius={2}
//                         p={4}
//                         boxShadow={3}
//                         maxWidth={600}
//                         width="100%"
//                     >
//                         <Typography variant="h6" align="center" gutterBottom>
//                             REQUESTS SENT
//                         </Typography>
//                         <Box textAlign="center" mb={3}>
//                             <Box
//                                 bgcolor="#90caf9"
//                                 borderRadius={25}
//                                 px={2}
//                                 py={1}
//                                 display="inline-block"
//                             >
//                                 Refer Points Balance: {userData.total_refer_points}
//                             </Box>
//                         </Box>
//                         <Typography variant="body1" align="center" mb={3}>
//                             You have applied for following referrals:
//                         </Typography>
//                         <List>
//                             {sendRequest.map((request) => (
//                                 <ListItem key={request._id}>
//                                     <ListItemText
//                                         primary={`Job Name: ${request.vacancy_name} - Job ID: ${request.job_id}`}
//                                         secondary={getStatusMessage(request.status)}
//                                     />
// {request.status === 'Send' && isCancelable(request.createdAt) && (
//     <Button
//         variant="contained"
//         color="secondary"
//         onClick={() => handleCancelRequest(request._id, request.sender_id._id)}
//         sx={{ marginLeft: 2 }}
//     >
//         Cancel Request
//     </Button>
// )}
//                                 </ListItem>
//                             ))}
//                         </List>
//                         <Box textAlign="center" mt={4}>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 sx={{ borderRadius: 25 }}
//                             >
//                                 Buy more refer points
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Box>
//             </MainLayout>
//         </>
//     );
// };

// export default ReferralSentPage;

/* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Avatar,
//   Stack,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { notify } from "../components/Toast";
// import { getResponse, postResponse } from "../components/_apihandler";
// import dayjs from "dayjs";
// import MainLayout from "../layouts/MainLayout";
// import Loading from "../components/Loading";
// import { userDetails } from "@/middleware/userDetails";

// const ReferralSentPage = () => {
//   const router = useRouter();
//   const [userData, setUserData] = useState({});
//   const [sendRequest, setSendRequest] = useState([]);

//   useEffect(() => {
//     getUserDetails();
//   }, []);

//   const getUserDetails = async () => {
//     if (localStorage.getItem("token")) {
//       const response = await userDetails();
//       if (response.status === 200) {
//         localStorage.setItem("user", JSON.stringify(response.data.data));
//         setUserData(response.data.data);
//       }
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!token || !user) {
//       notify("Please Logged In First!", "error");
//       router.push("/login");
//     }
//   }, [router]);

//   useEffect(() => {
//     if (userData._id) {
//       fetchSendRequest();
//     }
//   }, [userData._id]);

//   const fetchSendRequest = async () => {
//     try {
//       const response = await getResponse(
//         `/api/requests/getRequests?userId=${userData._id}&type=sender`
//       );
//       if (response.status === 200) {
//         setSendRequest(response.data.data);
//       } else {
//         notify("Something Went Wrong!", "error");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         notify(error.response.data.msg, "error");
//       }
//     }
//   };

//   const getStatusMessage = (status) => {
//     switch (status) {
//       case "Send":
//         return "Pending";
//       case "Waiting":
//         return "Waiting For Confirmation";
//       case "Rejected":
//         // return "Declined - Please try again with another user";
//         return "Declined";
//       case "Accepted":
//         return "Accepted";
//       case "Successful":
//         return "Successful";
//       case "Expired":
//         return "Expired";
//       case "Canceled":
//         return "Canceled";
//       default:
//         return "";
//     }
//   };

//   const handleCancelRequest = async (requestId, senderId) => {
//     try {
//       const response = await postResponse(`/api/requests/cancelRequest`, {
//         requestId: requestId,
//         senderId: senderId,
//       });
//       if (response.status === 200) {
//         notify(response.data.msg);
//         fetchSendRequest();
//         getUserDetails();
//       } else {
//         notify("Something Went Wrong!", "error");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         notify(error.response.data.msg, "error");
//       }
//     }
//   };

//   const isCancelable = (createdAt) => {
//     const now = dayjs();
//     const createdTime = dayjs(createdAt);
//     const timeDiff = now.diff(createdTime, "hour");
//     return timeDiff <= 24;
//   };

//   return (
//     <>
//       <Loading />
//       <MainLayout
//         homeIcon={true}
//         headerText={"Request Sent"}
//         homeIconSide={"left"}
//         page={"request-sent"}
//       >
//         <Box
//           pb={10}
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Box textAlign="center" py={4} width="100%" sx={{ color: "black" }}>
//             <Stack
//               spacing={2}
//               alignItems="center"
//               sx={{ color: "black", textAlign: "center" }}
//             >
//               <Avatar
//                 src={userData.profilePicture}
//                 sx={{ width: 120, height: 120 }}
//               />
//             </Stack>
//             <Typography
//               variant="h4"
//               component="h2"
//               sx={{
//                 fontWeight: "600",
//                 color: "black",
//               }}
//             >{`${userData.first_name} ${userData.last_name}`}</Typography>
//             <Typography variant="body1" color="textSecondary">
//               Refer Points Balance: {userData.total_refer_points || 0}
//             </Typography>
//           </Box>

//           <Box
//             width="100%"
//             maxWidth={900} // Adjusted for desktop view
//             textAlign="center"
//             mb={4}
//             sx={{ padding: "10px" }}
//           >
//             <Typography
//               variant="h5"
//               gutterBottom
//               sx={{
//                 color: "black",
//                 fontWeight: "500",
//                 textAlign: { xs: "center", sm: "center", md: "left" },
//               }}
//             >
//               You have applied for the following referrals:
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table aria-label="referral table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ color: "black" }}>
//                       <strong>Sr No.</strong>
//                     </TableCell>
//                     <TableCell sx={{ color: "black" }}>
//                       <strong>Job Name</strong>
//                     </TableCell>
//                     <TableCell sx={{ color: "black" }}>
//                       <strong>Request Sent</strong>
//                     </TableCell>
//                     <TableCell sx={{ color: "black" }}>
//                       <strong>Status</strong>
//                     </TableCell>
//                     <TableCell sx={{ color: "black" }}>
//                       <strong>Action</strong>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {sendRequest.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={5}
//                         align="center"
//                         sx={{ color: "black" }}
//                       >
//                         No referrals found.
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     sendRequest.map((request, index) => (
//                       <TableRow key={request._id}>
//                         <TableCell sx={{ color: "black" }}>
//                           {index + 1}
//                         </TableCell>
//                         <TableCell sx={{ color: "black" }}>
//                           {request.vacancy_name || "ABC-123"}
//                         </TableCell>
//                         <TableCell sx={{ color: "black" }}>
//                           {dayjs(request.createdAt).format("hh:mm A")}
//                         </TableCell>
//                         <TableCell sx={{ color: "black" }}>
//                           <Button
//                             variant="contained"
//                             sx={{
//                               color: "black",
//                               backgroundColor: "#e5e7eb",
//                               textTransform: "none",
//                               borderRadius: "15px",
//                             }}
//                           >
//                             {getStatusMessage(request.status)}
//                           </Button>
//                         </TableCell>
//                         <TableCell sx={{ color: "black" }}>
//                           {request.status === "Send" && (
//                             <Button
//                               variant="contained"
//                               sx={{
//                                 color: "black",
//                                 backgroundColor: "white",
//                                 borderRadius: "15px",
//                               }}
//                               onClick={() =>
//                                 handleCancelRequest(
//                                   request._id,
//                                   request.sender_id._id
//                                 )
//                               }
//                             >
//                               Cancel Request
//                             </Button>
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>

//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               borderRadius: "25px",
//               //   padding: "10px 25px",
//               backgroundColor: "#617AFB",
//               width: "40%",
//             }}
//           >
//             Buy More Refer Points
//           </Button>

//           {/* Footer */}
//           {/* <Box mt={8} textAlign="center">
//             <Typography variant="body2" color="textSecondary" mb={2}>
//               Privacy Policy &nbsp;|&nbsp; Terms of Service
//             </Typography>
//             <Box display="flex" justifyContent="center" gap={2} mb={4}>
//               <i className="fab fa-facebook-f"></i>
//               <i className="fab fa-twitter"></i>
//               <i className="fab fa-instagram"></i>
//             </Box>
//             <Typography variant="body2" color="textSecondary">
//               © 2023 Job Referral Platform
//             </Typography>
//           </Box> */}
//         </Box>
//       </MainLayout>
//     </>
//   );
// };

// export default ReferralSentPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Avatar,
//   Stack,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { notify } from "../components/Toast";
// import { getResponse, postResponse } from "../components/_apihandler";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime"; // Import relativeTime plugin
// import MainLayout from "../layouts/MainLayout";
// import Loading from "../components/Loading";
// import { userDetails } from "@/middleware/userDetails";

// // Extend dayjs with relativeTime plugin
// dayjs.extend(relativeTime);

// const ReferralSentPage = () => {
//   const router = useRouter();
//   const [userData, setUserData] = useState({});
//   const [sendRequest, setSendRequest] = useState([]);

//   useEffect(() => {
//     getUserDetails();
//   }, []);

//   const getUserDetails = async () => {
//     if (localStorage.getItem("token")) {
//       const response = await userDetails();
//       if (response.status === 200) {
//         localStorage.setItem("user", JSON.stringify(response.data.data));
//         setUserData(response.data.data);
//       }
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!token || !user) {
//       notify("Please Log In First!", "error");
//       router.push("/login");
//     }
//   }, [router]);

//   useEffect(() => {
//     if (userData._id) {
//       fetchSendRequest();
//     }
//   }, [userData._id]);

//   const fetchSendRequest = async () => {
//     try {
//       const response = await getResponse(
//         `/api/requests/getRequests?userId=${userData._id}&type=sender`
//       );
//       if (response.status === 200) {
//         setSendRequest(response.data.data);
//       } else {
//         notify("Something Went Wrong!", "error");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         notify(error.response.data.msg, "error");
//       }
//     }
//   };

//   const getStatusMessage = (status) => {
//     switch (status) {
//       case "Send":
//         return "Pending";
//       case "Waiting":
//         return "Waiting For Confirmation";
//       case "Rejected":
//         return "Declined";
//       case "Accepted":
//         return "Accepted";
//       case "Successful":
//         return "Successful";
//       case "Expired":
//         return "Expired";
//       case "Canceled":
//         return "Canceled";
//       default:
//         return "";
//     }
//   };

//   const handleCancelRequest = async (requestId, senderId) => {
//     try {
//       const response = await postResponse(`/api/requests/cancelRequest`, {
//         requestId: requestId,
//         senderId: senderId,
//       });
//       if (response.status === 200) {
//         notify(response.data.msg);
//         fetchSendRequest();
//         getUserDetails();
//       } else {
//         notify("Something Went Wrong!", "error");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         notify(error.response.data.msg, "error");
//       }
//     }
//   };

//   return (
//     <>
//       <Loading />
//       <MainLayout
//         homeIcon={true}
//         headerText={"Request Sent"}
//         homeIconSide={"left"}
//         page={"request-sent"}
//       >
//         <Box
//           pb={10}
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Box textAlign="center" py={4} width="100%" sx={{ color: "black" }}>
//             <Stack
//               spacing={2}
//               alignItems="center"
//               sx={{ color: "black", textAlign: "center" }}
//             >
//               <Avatar
//                 src={userData.profilePicture}
//                 sx={{ width: 120, height: 120 }}
//               />
//             </Stack>
//             <Typography
//               variant="h4"
//               component="h2"
//               sx={{
//                 fontWeight: "600",
//                 color: "black",
//               }}
//             >{`${userData.first_name} ${userData.last_name}`}</Typography>
//             <Typography variant="body1" color="textSecondary">
//               Refer Points Balance: {userData.total_refer_points || 0}
//             </Typography>
//           </Box>

//           <Box
//             width="100%"
//             maxWidth={900} // Adjusted for desktop view
//             textAlign="center"
//             mb={4}
//             sx={{ padding: "10px" }}
//           >
//             <Typography
//               variant="h5"
//               gutterBottom
//               sx={{
//                 color: "black",
//                 fontWeight: "500",
//                 textAlign: { xs: "center", sm: "center", md: "left" },
//               }}
//             >
//               You have applied for the following referrals:
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table aria-label="referral table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ color: "black" }}>
//                       <strong>Sr No.</strong>
//                     </TableCell>
//                     <TableCell sx={{ color: "black" }}>
//                       <strong>Job Name</strong>
//                     </TableCell>
//                     <TableCell sx={{ color: "black" }}>
//                       <strong>Request Sent</strong>
//                     </TableCell>
//                     <TableCell sx={{ color: "black" }}>
//                       <strong>Status</strong>
//                     </TableCell>
//                     <TableCell sx={{ color: "black" }}>
//                       <strong>Action</strong>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {sendRequest.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={5}
//                         align="center"
//                         sx={{ color: "black" }}
//                       >
//                         No referrals found.
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     sendRequest.map((request, index) => (
//                       <TableRow key={request._id}>
//                         <TableCell sx={{ color: "black" }}>
//                           {index + 1}
//                         </TableCell>
//                         <TableCell sx={{ color: "black" }}>
//                           {request.vacancy_name || "ABC-123"}
//                         </TableCell>
//                         <TableCell sx={{ color: "black" }}>
//                           {dayjs(request.createdAt).fromNow()}{" "}
//                           {/* Display duration */}
//                         </TableCell>
//                         <TableCell sx={{ color: "black" }}>
//                           <Button
//                             variant="contained"
//                             sx={{
//                               color: "black",
//                               backgroundColor: "#e5e7eb",
//                               textTransform: "none",
//                               borderRadius: "15px",
//                             }}
//                             disabled
//                           >
//                             {getStatusMessage(request.status)}
//                           </Button>
//                         </TableCell>
//                         <TableCell sx={{ color: "black" }}>
//                           {request.status === "Send" && (
//                             <Button
//                               variant="contained"
//                               sx={{
//                                 color: "black",
//                                 backgroundColor: "white",
//                                 borderRadius: "15px",
//                               }}
//                               onClick={() =>
//                                 handleCancelRequest(
//                                   request._id,
//                                   request.sender_id._id
//                                 )
//                               }
//                             >
//                               Cancel Request
//                             </Button>
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>

//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               borderRadius: "25px",
//               backgroundColor: "#617AFB",
//               width: "40%",
//             }}
//           >
//             Buy More Refer Points
//           </Button>
//         </Box>
//       </MainLayout>
//     </>
//   );
// };

// export default ReferralSentPage;

"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { notify } from "../components/Toast";
import { getResponse, postResponse } from "../components/_apihandler";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // Import relativeTime plugin
import duration from "dayjs/plugin/duration"; // Import duration plugin for calculating the difference
import MainLayout from "../layouts/MainLayout";
import Loading from "../components/Loading";
import { userDetails } from "@/middleware/userDetails";

// Extend dayjs with relativeTime and duration plugin
dayjs.extend(relativeTime);
dayjs.extend(duration);

const ReferralSentPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [sendRequest, setSendRequest] = useState([]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    if (localStorage.getItem("token")) {
      const response = await userDetails();
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setUserData(response.data.data);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      notify("Please Log In First!", "error");
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (userData._id) {
      fetchSendRequest();
    }
  }, [userData._id]);

  const fetchSendRequest = async () => {
    try {
      const response = await getResponse(
        `/api/requests/getRequests?userId=${userData._id}&type=sender`
      );
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
      case "Send":
        return "Pending";
      case "Waiting":
        return "Waiting For Confirmation";
      case "Rejected":
        return "Declined";
      case "Accepted":
        return "Accepted";
      case "Successful":
        return "Successful";
      case "Expired":
        return "Expired";
      case "Canceled":
        return "Canceled";
      default:
        return "";
    }
  };

  // Check if the request is older than 24 hours
  const isRequestOlderThan24Hours = (createdAt) => {
    const now = dayjs();
    const createdTime = dayjs(createdAt);
    const timeDifference = now.diff(createdTime, "hour"); // Get the difference in hours
    return timeDifference > 24;
  };

  const handleCancelRequest = async (requestId, senderId) => {
    try {
      const response = await postResponse(`/api/requests/cancelRequest`, {
        requestId: requestId,
        senderId: senderId,
      });
      if (response.status === 200) {
        notify(response.data.msg);
        fetchSendRequest();
        getUserDetails();
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
    <>
      <Loading />
      <MainLayout
        homeIcon={true}
        headerText={"Request Sent"}
        homeIconSide={"left"}
        page={"request-sent"}
      >
        <Box
          pb={10}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box textAlign="center" py={4} width="100%" sx={{ color: "black" }}>
            <Stack
              spacing={2}
              alignItems="center"
              sx={{ color: "black", textAlign: "center" }}
            >
              <Avatar
                src={userData.profilePicture}
                sx={{ width: 120, height: 120 }}
              />
            </Stack>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "600",
                color: "black",
              }}
            >{`${userData.first_name} ${userData.last_name}`}</Typography>
            <Typography variant="body1" color="textSecondary">
              Refer Points Balance: {userData.total_refer_points || 0}
            </Typography>
          </Box>

          <Box
            width="100%"
            maxWidth={900} // Adjusted for desktop view
            textAlign="center"
            mb={4}
            sx={{ padding: "10px" }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: "black",
                fontWeight: "500",
                textAlign: { xs: "center", sm: "center", md: "left" },
              }}
            >
              You have applied for the following referrals:
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="referral table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "black" }}>
                      <strong>Sr No.</strong>
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>
                      <strong>Job Name</strong>
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>
                      <strong>Request Sent</strong>
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>
                      <strong>Status</strong>
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>
                      <strong>Action</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sendRequest.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        align="center"
                        sx={{ color: "black" }}
                      >
                        No referrals found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sendRequest.map((request, index) => (
                      <TableRow key={request._id}>
                        <TableCell sx={{ color: "black" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          {request.vacancy_name || "ABC-123"}
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          {dayjs(request.createdAt).fromNow()}{" "}
                          {/* Display duration */}
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          <Button
                            variant="contained"
                            sx={{
                              color: "black",
                              backgroundColor: "#e5e7eb",
                              textTransform: "none",
                              borderRadius: "15px",
                            }}
                            disabled
                          >
                            {getStatusMessage(request.status)}
                          </Button>
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          {request.status === "Send" &&
                          !isRequestOlderThan24Hours(request.createdAt) ? (
                            <Button
                              variant="contained"
                              sx={{
                                color: "black",
                                backgroundColor: "white",
                                borderRadius: "15px",
                              }}
                              onClick={() =>
                                handleCancelRequest(
                                  request._id,
                                  request.sender_id._id
                                )
                              }
                            >
                              Cancel Request
                            </Button>
                          ) : (
                            request.status === "Send" && (
                              <Typography
                                variant="caption"
                                sx={{ color: "red" }}
                              >
                                Request sent more than 24 hours ago
                              </Typography>
                            )
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "25px",
              backgroundColor: "#617AFB",
              width: "40%",
            }}
          >
            Buy More Refer Points
          </Button>
        </Box>
      </MainLayout>
    </>
  );
};

export default ReferralSentPage;

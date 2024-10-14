// /* eslint-disable react-hooks/exhaustive-deps */
// "use client"
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Button, List, ListItem, ListItemText, ButtonGroup } from '@mui/material';
// import { useRouter } from "next/navigation";
// import { notify } from '../components/Toast';
// import { getResponse, postResponse } from '../components/_apihandler';
// import dayjs from 'dayjs'; // Import dayjs for date manipulation
// import MainLayout from '../layouts/MainLayout';
// import Loading from '../components/Loading';
// import { userDetails } from '@/middleware/userDetails';

// const ReferralReceivedPage = () => {
//     const router = useRouter();
//     const [userData, setUserData] = useState({});
//     const [receivedRequests, setReceivedRequests] = useState([]);

//     const getUserDetails = async () => {
//         const response = await userDetails();
//         if (response.status === 200) {
//             localStorage.setItem('user', JSON.stringify(response.data.data));
//             setUserData(response.data.data)
//         }

//     };

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (!token || !user) {
//             notify("Please Logged In First!", "error");
//             router.push('/login');
//         } else {
//             getUserDetails()
//         }
//     }, [router]);

//     useEffect(() => {
//         if (userData._id) {
//             fetchReceivedRequests();
//         }
//     }, [userData._id]);

//     const fetchReceivedRequests = async () => {
//         try {
//             const response = await getResponse(`/api/requests/getRequests?userId=${userData._id}&type=receiver`);
//             if (response.status === 200) {
//                 setReceivedRequests(response.data.data);
//             } else {
//                 notify("Something Went Wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 notify(error.response.data.msg, "error");
//             }
//         }
//     };

//     const getStatusMessage = (status, expireOn) => {
//         const now = dayjs();
//         const expireTime = dayjs(expireOn);
//         const hoursLeft = expireTime.diff(now, 'hour');
//         switch (status) {
//             // case 'Send':
//             //     return 'Request Is Sent';
//             case 'Waiting':
//                 return 'Waiting For Confirmation';
//             case 'Rejected':
//                 return 'Rejected';
//             case 'Accepted':
//                 return `Accepted - ${hoursLeft} hours left to submit submission proof.`;
//             case 'Successful':
//                 return 'Successful';
//             case 'Expired':
//                 return 'Expired';
//             case 'Cancled':
//                 return 'Canceled';
//             default:
//                 return '';
//         }
//     };

//     const handleAccept = async (requestId) => {
//         // Handle accept request logic here
//         try {
//             const response = await postResponse(`/api/requests/acceptRequest`, { requestId: requestId });
//             if (response.status === 200) {
//                 notify(response.data.msg);
//                 fetchReceivedRequests()
//                 getUserDetails()
//             } else {
//                 notify("Something Went Wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 notify(error.response.data.msg, "error");
//             }
//         }
//     };

//     const handleReject = async (requestId) => {
//         // Handle reject request logic here
//         try {
//             const response = await postResponse(`/api/requests/rejectRequest`, { requestId: requestId });
//             if (response.status === 200) {
//                 notify(response.data.msg);
//                 fetchReceivedRequests()
//             } else {
//                 notify("Something Went Wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 notify(error.response.data.msg, "error");
//             }
//         }
//     };

//     const handleSubmitValidation = async (requestId) => {
//         // Handle submit for validation logic here
//         router.push(`/submit-verification?requestId=${requestId}`)
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
//                             Requests Received
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
//                             Earn points upon successful referral submission
//                         </Typography>
//                         <List>
//                             {receivedRequests.map((request) => (
//                                 <ListItem key={request._id}>
//                                     <ListItemText
//                                         primary={`User ${request.sender_id.first_name} sent request for ${request.vacancy_name}`}
//                                         secondary={getStatusMessage(request.status, request.expireOn)}
//                                     />
//                                     {(request.status === 'Send') && (
//                                         <ButtonGroup variant="contained" aria-label="outlined primary button group">
//                                             <Button color="primary" onClick={() => handleAccept(request._id)}>Accept</Button>
//                                             <Button color="secondary" onClick={() => handleReject(request._id)}>Reject</Button>
//                                         </ButtonGroup>
//                                     )}
//                                     {request.status === 'Accepted' && (
//                                         <Button variant="contained" color="primary" onClick={() => handleSubmitValidation(request._id)}>
//                                             Submit for validation
//                                         </Button>
//                                     )}
//                                 </ListItem>
//                             ))}
//                         </List>
//                     </Box>
//                 </Box>
//             </MainLayout>
//         </>
//     );
// };

// export default ReferralReceivedPage;

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
//   ButtonGroup,
//   Grid,
//   Stack,
//   Avatar,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { notify } from "../components/Toast";
// import { getResponse, postResponse } from "../components/_apihandler";
// import dayjs from "dayjs"; // Import dayjs for date manipulation
// import MainLayout from "../layouts/MainLayout";
// import Loading from "../components/Loading";
// import { userDetails } from "@/middleware/userDetails";

// const ReferralReceivedPage = () => {
//   const router = useRouter();
//   const [userData, setUserData] = useState({});
//   const [receivedRequests, setReceivedRequests] = useState([]);

//   const getUserDetails = async () => {
//     const response = await userDetails();
//     if (response.status === 200) {
//       localStorage.setItem("user", JSON.stringify(response.data.data));
//       setUserData(response.data.data);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!token || !user) {
//       notify("Please log in first!", "error");
//       router.push("/login");
//     } else {
//       getUserDetails();
//     }
//   }, [router]);

//   useEffect(() => {
//     if (userData._id) {
//       fetchReceivedRequests();
//     }
//   }, [userData._id]);

//   const fetchReceivedRequests = async () => {
//     try {
//       const response = await getResponse(
//         `/api/requests/getRequests?userId=${userData._id}&type=receiver`
//       );
//       if (response.status === 200) {
//         setReceivedRequests(response.data.data);
//       } else {
//         notify("Something went wrong!", "error");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         notify(error.response.data.msg, "error");
//       }
//     }
//   };

//   const getStatusMessage = (status, expireOn) => {
//     const now = dayjs();
//     const expireTime = dayjs(expireOn);
//     const hoursLeft = expireTime.diff(now, "hour");
//     switch (status) {
//       case "Waiting":
//         return "Waiting For Confirmation";
//       case "Rejected":
//         return "Rejected";
//       case "Accepted":
//         return `Accepted - ${hoursLeft} hours left to submit submission proof.`;
//       case "Successful":
//         return "Successful";
//       case "Expired":
//         return "Expired";
//       case "Canceled":
//         return "Rejected";
//       default:
//         return "";
//     }
//   };

//   const handleAccept = async (requestId) => {
//     try {
//       const response = await postResponse(`/api/requests/acceptRequest`, {
//         requestId: requestId,
//       });
//       if (response.status === 200) {
//         notify(response.data.msg);
//         fetchReceivedRequests();
//         getUserDetails();
//       } else {
//         notify("Something went wrong!", "error");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         notify(error.response.data.msg, "error");
//       }
//     }
//   };

//   const handleReject = async (requestId) => {
//     try {
//       const response = await postResponse(`/api/requests/rejectRequest`, {
//         requestId: requestId,
//       });
//       if (response.status === 200) {
//         notify(response.data.msg);
//         fetchReceivedRequests();
//       } else {
//         notify("Something went wrong!", "error");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         notify(error.response.data.msg, "error");
//       }
//     }
//   };

//   const handleSubmitValidation = async (requestId) => {
//     router.push(`/submit-verification?requestId=${requestId}`);
//   };

//   return (
//     <>
//       <Loading />
//       <MainLayout>
//         <Box
//           className="reBg"
//           pb={10}
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="center"
//         >
//           {/* Profile Section */}

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

//           {/* Request List */}
//           <Box maxWidth={900} width="100%" mb={4}>
//             <Grid container spacing={3}>
//               {receivedRequests.map((request) => (
//                 <Grid item xs={12} md={12} key={request._id}>
//                   <Box
//                     p={2}
//                     boxShadow={3}
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     borderRadius={2}
//                     bgcolor="#f9f9f9"
//                   >
//                     <Box>
//                       <Typography variant="body1" fontWeight="bold">
//                         {`User ${request.sender_id.first_name}`}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         {`Sent request for ${request.vacancy_name}`}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <Typography variant="caption" color="textSecondary">
//                         {getStatusMessage(request.status, request.expireOn)}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       {request.status === "Send" && (
//                         <ButtonGroup variant="contained">
//                           <Button
//                             color="primary"
//                             onClick={() => handleAccept(request._id)}
//                           >
//                             Accept
//                           </Button>
//                           <Button
//                             color="secondary"
//                             onClick={() => handleReject(request._id)}
//                           >
//                             Reject
//                           </Button>
//                         </ButtonGroup>
//                       )}
//                       {request.status === "Accepted" && (
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           onClick={() => handleSubmitValidation(request._id)}
//                         >
//                           Submit for validation
//                         </Button>
//                       )}
//                     </Box>
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>

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

// export default ReferralReceivedPage;

"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
  Grid,
  Stack,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { notify } from "../components/Toast";
import { getResponse, postResponse } from "../components/_apihandler";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import MainLayout from "../layouts/MainLayout";
import Loading from "../components/Loading";
import { userDetails } from "@/middleware/userDetails";

const ReferralReceivedPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [receivedRequests, setReceivedRequests] = useState([]);

  const getUserDetails = async () => {
    const response = await userDetails();
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      setUserData(response.data.data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      notify("Please log in first!", "error");
      router.push("/login");
    } else {
      getUserDetails();
    }
  }, [router]);

  useEffect(() => {
    if (userData._id) {
      fetchReceivedRequests();
    }
  }, [userData._id]);

  const fetchReceivedRequests = async () => {
    try {
      const response = await getResponse(
        `/api/requests/getRequests?userId=${userData._id}&type=receiver`
      );
      if (response.status === 200) {
        setReceivedRequests(response.data.data);
      } else {
        notify("Something went wrong!", "error");
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
    const hoursLeft = expireTime.diff(now, "hour");
    switch (status) {
      case "Send":
        return "Waiting For Confirmation";
      case "Rejected":
        return "Rejected";
      case "Accepted":
        return `Accepted - ${hoursLeft} hours left to submit submission proof.`;
      case "Successful":
        return "Successful";
      case "Expired":
        return "Expired";
      case "Canceled":
        return "Rejected";
      default:
        return "";
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const response = await postResponse(`/api/requests/acceptRequest`, {
        requestId: requestId,
      });
      if (response.status === 200) {
        notify(response.data.msg);
        fetchReceivedRequests();
        getUserDetails();
      } else {
        notify("Something went wrong!", "error");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notify(error.response.data.msg, "error");
      }
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await postResponse(`/api/requests/rejectRequest`, {
        requestId: requestId,
      });
      if (response.status === 200) {
        notify(response.data.msg);
        fetchReceivedRequests();
      } else {
        notify("Something went wrong!", "error");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notify(error.response.data.msg, "error");
      }
    }
  };

  const handleSubmitValidation = async (requestId) => {
    router.push(`/submit-verification?requestId=${requestId}`);
  };

  return (
    <>
      <Loading />
      <MainLayout
        homeIcon={true}
        headerText={"Request Received"}
        homeIconSide={"left"}
        page={"requests-received"}
      >
        <Box
          className="reBg"
          pb={10}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {/* Profile Section */}
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
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            >
              Refer Points Balance: {userData.total_refer_points || 0}
            </Typography>
          </Box>

          <Box
            sx={{
              display: { md: "none" },
              border: "1px solid black",
              padding: "40px",
              width: "90%",
              marginBottom: "10px",
              borderRadius: "15px",
            }}
          >
            <Typography variant="body1" color="textSecondary">
              Refer Points Balance: {userData.total_refer_points || 0}
            </Typography>
          </Box>
          {/* Request List */}
          <Box
            maxWidth={900}
            width="100%"
            mb={4}
            sx={{
              "@media (max-width: 600px)": {
                mb: 2,
                padding: 2,
              },
            }}
          >
            <Grid container spacing={3}>
              {receivedRequests.map((request) => (
                <Grid item xs={12} md={12} key={request._id}>
                  <Box
                    p={2}
                    boxShadow={3}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderRadius={2}
                    bgcolor="#f9f9f9"
                    sx={{
                      "@media (max-width: 600px)": {
                        flexDirection: "column",
                        gap: 2,
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {`User ${request.sender_id.first_name}`}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {`Sent request for ${request.vacancy_name}`}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        {getStatusMessage(request.status, request.expireOn)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        "@media (max-width: 600px)": {
                          justifyContent: "center",
                        },
                      }}
                    >
                      {request.status === "Send" && (
                        // <ButtonGroup variant="contained">
                        <>
                          <Button
                            // color="primary"
                            onClick={() => handleAccept(request._id)}
                            sx={{
                              color: "white",
                              backgroundColor: "#1170c0",
                              borderRadius: "15px",
                              padding: "6px 16px",
                              // textTransform: "none",
                              // fontWeight: "bold",
                              "&:hover": {
                                backgroundColor: "#1170c0", // Keeps the same background color on hover
                              },
                              "&:active": {
                                backgroundColor: "#1170c0", // Keeps the same background color when clicked
                              },
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              color: "black",
                              backgroundColor: "#e5e7eb",
                              // textTransform: "none",
                              borderRadius: "15px",
                              "&:hover": {
                                backgroundColor: "#e5e7eb", // Keeps the same background color on hover
                              },
                              "&:active": {
                                backgroundColor: "#e5e7eb", // Keeps the same background color when clicked
                              },
                            }}
                            onClick={() => handleReject(request._id)}
                          >
                            Reject
                          </Button>
                        </>
                        // </ButtonGroup>
                      )}
                      {request.status === "Accepted" && (
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            bgcolor: "green",
                          }}
                          // disabled
                          onClick={() => handleSubmitValidation(request._id)}
                        >
                          Submit Verification
                        </Button>
                      )}
                      {request.status === "Rejected" && (
                        <Button
                          variant="contained"
                          sx={{
                            color: "white",
                            backgroundColor: "red",
                            textTransform: "none",
                            borderRadius: "15px",
                            "&.Mui-disabled": {
                              color: "white",
                              backgroundColor: "red", // Ensures red background stays when disabled
                              opacity: 0.7, // Optionally adjust the opacity if needed
                            },
                          }}
                          disabled
                        >
                          Rejected
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </MainLayout>
    </>
  );
};

export default ReferralReceivedPage;

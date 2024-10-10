// "use client";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     CircularProgress, Container, Paper, Typography, Divider, Button, Box, Pagination,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow
// } from '@mui/material';
// import { getResponse } from '../components/_apihandler';
// import MainLayout from '../layouts/MainLayout';

// function UserSummary() {
//     const [userDetails, setUserDetails] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const entriesPerPage = 5;

//     useEffect(() => {
//         getUserDetails();
//     }, []);

//     const getUserDetails = async () => {
//         if (localStorage.getItem('token')) {
//             setLoading(true);
//             try {
//                 const userId = JSON.parse(localStorage.getItem('user'))._id;
//                 const response = await getResponse(`/api/user-summary?userId=${userId}`);
//                 if (response.status === 200) {
//                     const userData = response.data.data;
//                     setUserDetails(userData);
//                     setTotalPages(Math.ceil(userData.pointTransactions.length / entriesPerPage));
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user details:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     const handlePageChange = (event, value) => {
//         setCurrentPage(value);
//     };

//     const paginatedTransactions = userDetails.pointTransactions
//         ? userDetails.pointTransactions.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
//         : [];

//     return (
//         <MainLayout>
//             <Container>
//                 {loading ? (
//                     <CircularProgress />
//                 ) : (
//                     <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
//                         <Typography variant="h5" component="h2" gutterBottom>
//                             User Summary
//                         </Typography>
//                         {userDetails.user ? (
//                             <>
//                                 <Typography variant="h6" component="h3">
//                                     {userDetails.user.first_name} {userDetails.user.last_name}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                     Email: {userDetails.user.email}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                     Joined: {new Date(userDetails.user.createdAt).toLocaleDateString()}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                     <Typography variant="h6" component="h3">
//                                         Credit Balance: {userDetails.user.total_refer_points}
//                                     </Typography>
//                                     {/* {userDetails.user.total_refer_points === 0 && ( */}
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         href="/buy-credits" // Assume this is the route to buy credits
//                                         sx={{ mt: 2 }}
//                                     >
//                                         Buy Credits
//                                     </Button>
//                                     {/* )} */}
//                                 </Typography>
//                                 <Divider sx={{ margin: '16px 0' }} />
//                                 <Typography variant="h6" component="h3">
//                                     Point Transactions
//                                 </Typography>
//                                 <TableContainer component={Paper}>
//                                     <Table>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell>Sr.No</TableCell>
//                                                 <TableCell>Transaction ID</TableCell>
//                                                 <TableCell>Type</TableCell>
//                                                 <TableCell>Points</TableCell>
//                                                 <TableCell>Amount</TableCell>
//                                                 <TableCell>Message</TableCell>
//                                                 <TableCell>Date</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {paginatedTransactions.map((transaction, index) => (
//                                                 <TableRow key={transaction.id}>
//                                                     <TableCell>{index + 1}</TableCell>
//                                                     <TableCell>{transaction.txnId}</TableCell>
//                                                     <TableCell>{transaction.type}</TableCell>
//                                                     <TableCell>{transaction.referPoints}</TableCell>
//                                                     <TableCell>{transaction.amount}</TableCell>
//                                                     <TableCell>{transaction.message}</TableCell>
//                                                     <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                                 <Divider sx={{ margin: '16px 0' }} />
//                                 <Pagination
//                                     count={totalPages}
//                                     page={currentPage}
//                                     onChange={handlePageChange}
//                                     color="primary"
//                                     sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
//                                 />
//                                 {userDetails.user.total_refer_points === 0 && (
//                                     <Box>
//                                         <Typography variant="body1">No user Summary found. Please Recharge Credit Points</Typography>
//                                     </Box>
//                                 )}
//                             </>
//                         ) : (
//                             <Typography variant="body1">No user details found.</Typography>
//                         )}
//                     </Paper>
//                 )}
//             </Container>
//         </MainLayout>
//     );
// }

// export default UserSummary;

"use client";
import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Paper,
  Typography,
  Divider,
  Button,
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  Avatar,
  Stack,
} from "@mui/material";
import { getResponse } from "../components/_apihandler";
import MainLayout from "../layouts/MainLayout";

function UserSummary() {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const entriesPerPage = 5;

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    if (localStorage.getItem("token")) {
      setLoading(true);
      try {
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        const response = await getResponse(
          `/api/user-summary?userId=${userId}`
        );
        if (response.status === 200) {
          const userData = response.data.data;
          setUserDetails(userData);
          setTotalPages(
            Math.ceil(userData.pointTransactions.length / entriesPerPage)
          );
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedTransactions = userDetails.pointTransactions
    ? userDetails.pointTransactions.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
      )
    : [];

  console.log(userDetails, "user");

  return (
    <MainLayout
      homeIcon={true}
      headerText={"User Summary"}
      homeIconSide={"left"}
      page={"summary"}
    >
      <Container>
        {loading ? (
          <CircularProgress />
        ) : (
          <Paper
            elevation={3}
            sx={{
              padding: isMobile ? 2 : 4,
              marginTop: 4,
              borderRadius: "16px",
            }}
          >
            <Stack
              spacing={2}
              //   alignItems="center"
              sx={{ color: "black", alignItems: isMobile ? "center" : "start" }}
            >
              <Avatar
                src={userDetails?.user?.profilePicture}
                sx={{ width: 120, height: 120 }}
              />
            </Stack>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                textAlign: isMobile ? "center" : "left",
                fontWeight: "600",
                color: "black",
              }}
            >
              {userDetails?.user?.first_name} {userDetails?.user?.last_name}
            </Typography>
            <Box
              sx={{
                textAlign: isMobile ? "center" : "start",
                marginTop: 2,
                color: "black",
              }}
            >
              <Typography variant="body2">
                {" "}
                Email: {userDetails?.user?.email}
              </Typography>
              <Typography variant="body2">
                {" "}
                Joined:{" "}
                {new Date(userDetails?.user?.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Credit Balance: {userDetails?.user?.total_refer_points}
              </Typography>
            </Box>

            <Divider sx={{ margin: "24px 0" }} />

            <Typography
              variant="h6"
              component="h3"
              sx={{
                textAlign: isMobile ? "center" : "start",
                fontWeight: "600",
                marginBottom: 2,
                color: "black",
              }}
            >
              Point Transactions
            </Typography>

            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "none",
                borderRadius: "12px",
                overflowX: "auto",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ color: "black" }}>
                    <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                      Sr.No
                    </TableCell>
                    <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                      Transaction ID
                    </TableCell>
                    <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                      Type
                    </TableCell>
                    <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                      Points
                    </TableCell>
                    <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                      Amount
                    </TableCell>
                    <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                      Message
                    </TableCell>
                    <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedTransactions.map((transaction, index) => (
                    <TableRow key={transaction.id} sx={{ color: "black" }}>
                      <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                        {transaction.txnId}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            padding: "4px 8px",
                            backgroundColor:
                              transaction.type === "credit"
                                ? "#E0F7FA"
                                : "#FBE9E7",
                            color:
                              transaction.type === "credit"
                                ? "#00695C"
                                : "#D32F2F",
                            borderRadius: "8px",
                          }}
                        >
                          {transaction.type}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                        {transaction.referPoints}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                        {transaction.amount}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                        {transaction.message}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "inherit", color: "black" }}>
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ margin: "24px 0" }} />

            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              //   color="primary"
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            />

            <Box sx={{ textAlign: "center", marginTop: 3 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#617AFB",
                  borderRadius: "30px",
                  textTransform: "none",
                  padding: "12px 24px",
                  fontWeight: "bold",
                }}
              >
                Buy Credits
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </MainLayout>
  );
}

export default UserSummary;

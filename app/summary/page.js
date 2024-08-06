// import { userDetails } from '@/middleware/userDetails';
// import React, { useEffect, useState } from 'react'

// function UserSummary() {
//     const [userDetail, setUserDetails]= useState({});
//     const [loading, setLoading] = useState(false);


//     useEffect(() => {
//         getUserDetails();
//     }, []);

//     const getUserDetails = async () => {
//         if (localStorage.getItem('token')) {
//             const response = await userDetails();
//             if (response.status === 200) {
//                 const userData = response.data.data;
//                 setUserDetails(userData);
//             }
//         }
//     };




//   return (
//     <>

//     </>
//   )
// }

// export default UserSummary;

// "use client"
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { CircularProgress, Container, Paper, Typography, List, ListItem, ListItemText, Divider, Button, Box, Pagination } from '@mui/material';
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
//                                     Total Referral Points: {userDetails.user.total_refer_points}
//                                 </Typography>
//                                 <Divider sx={{ margin: '16px 0' }} />
//                                 <Typography variant="h6" component="h3">
//                                     Point Transactions
//                                 </Typography>
//                                 <List>
//                                     {paginatedTransactions.map(transaction => (
//                                         <ListItem key={transaction.id} alignItems="flex-start">
//                                             <ListItemText
//                                                 primary={`Transaction ID: ${transaction.txnId}`}
//                                                 secondary={
//                                                     <>
//                                                         <Typography variant="body2" color="textPrimary">
//                                                             Type: {transaction.type}
//                                                         </Typography>
//                                                         <Typography variant="body2" color="textPrimary">
//                                                             Points: {transaction.referPoints}
//                                                         </Typography>
//                                                         <Typography variant="body2" color="textPrimary">
//                                                             Amount: {transaction.amount}
//                                                         </Typography>
//                                                         <Typography variant="body2" color="textPrimary">
//                                                             Message: {transaction.message}
//                                                         </Typography>
//                                                         <Typography variant="body2" color="textPrimary">
//                                                             Date: {new Date(transaction.createdAt).toLocaleDateString()}
//                                                         </Typography>
//                                                     </>
//                                                 }
//                                             />
//                                         </ListItem>
//                                     ))}
//                                 </List>
//                                 <Divider sx={{ margin: '16px 0' }} />
//                                 <Pagination
//                                     count={totalPages}
//                                     page={currentPage}
//                                     onChange={handlePageChange}
//                                     color="primary"
//                                     sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
//                                 />
//                                 <Box>
//                                     <Typography variant="h6" component="h3">
//                                         Credit Balance: {userDetails.user.total_refer_points}
//                                     </Typography>
//                                     {userDetails.user.total_refer_points === 0 && (
//                                         <Button
//                                             variant="contained"
//                                             color="primary"
//                                             href="/buy-credits" // Assume this is the route to buy credits
//                                             sx={{ mt: 2 }}
//                                         >
//                                             Buy Credits
//                                         </Button>
//                                     )}
//                                 </Box>
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    CircularProgress, Container, Paper, Typography, Divider, Button, Box, Pagination,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { getResponse } from '../components/_apihandler';
import MainLayout from '../layouts/MainLayout';

function UserSummary() {
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const entriesPerPage = 5;

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        if (localStorage.getItem('token')) {
            setLoading(true);
            try {
                const userId = JSON.parse(localStorage.getItem('user'))._id;
                const response = await getResponse(`/api/user-summary?userId=${userId}`);
                if (response.status === 200) {
                    const userData = response.data.data;
                    setUserDetails(userData);
                    setTotalPages(Math.ceil(userData.pointTransactions.length / entriesPerPage));
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
        ? userDetails.pointTransactions.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
        : [];

    return (
        <MainLayout>
            <Container>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            User Summary
                        </Typography>
                        {userDetails.user ? (
                            <>
                                <Typography variant="h6" component="h3">
                                    {userDetails.user.first_name} {userDetails.user.last_name}
                                </Typography>
                                <Typography variant="body1">
                                    Email: {userDetails.user.email}
                                </Typography>
                                <Typography variant="body1">
                                    Joined: {new Date(userDetails.user.createdAt).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1">
                                    <Typography variant="h6" component="h3">
                                        Credit Balance: {userDetails.user.total_refer_points}
                                    </Typography>
                                    {/* {userDetails.user.total_refer_points === 0 && ( */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href="/buy-credits" // Assume this is the route to buy credits
                                        sx={{ mt: 2 }}
                                    >
                                        Buy Credits
                                    </Button>
                                    {/* )} */}
                                </Typography>
                                <Divider sx={{ margin: '16px 0' }} />
                                <Typography variant="h6" component="h3">
                                    Point Transactions
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Sr.No</TableCell>
                                                <TableCell>Transaction ID</TableCell>
                                                <TableCell>Type</TableCell>
                                                <TableCell>Points</TableCell>
                                                <TableCell>Amount</TableCell>
                                                <TableCell>Message</TableCell>
                                                <TableCell>Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {paginatedTransactions.map((transaction, index) => (
                                                <TableRow key={transaction.id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{transaction.txnId}</TableCell>
                                                    <TableCell>{transaction.type}</TableCell>
                                                    <TableCell>{transaction.referPoints}</TableCell>
                                                    <TableCell>{transaction.amount}</TableCell>
                                                    <TableCell>{transaction.message}</TableCell>
                                                    <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Divider sx={{ margin: '16px 0' }} />
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
                                />
                                {userDetails.user.total_refer_points === 0 && (
                                    <Box>
                                        <Typography variant="body1">No user Summary found. Please Recharge Credit Points</Typography>
                                    </Box>
                                )}
                            </>
                        ) : (
                            <Typography variant="body1">No user details found.</Typography>
                        )}
                    </Paper>
                )}
            </Container>
        </MainLayout>
    );
}

export default UserSummary;


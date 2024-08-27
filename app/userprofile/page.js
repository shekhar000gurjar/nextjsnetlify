// "use client"
// import { useEffect, useState } from 'react';
// import MainLayout from '../layouts/MainLayout';
// import { Box, Button, Container, InputLabel, OutlinedInput, Paper, Stack, Typography } from '@mui/material';
// import { userDetails } from '@/middleware/userDetails';
// import PageLoader from '../components/PageLoader';
// import { LoadingButton } from '@mui/lab';
// import { putRequest } from '../components/_apihandler';

// export default function UserProfile() {
//     const [loading, setLoading] = useState(false)
//     const [pageLoading, setPageLoading] = useState(false);
//     const [user, setUser] = useState({});
//     const [company, setCompany] = useState('');
//     const [upiId, setUpiId] = useState('');

//     const getUserDetails = async () => {
//         setPageLoading(true);
//         if (localStorage.getItem('token')) {
//             const response = await userDetails();
//             if (response.status === 200) {
//                 const userData = response.data.data;
//                 setUser(userData);
//                 setCompany(userData.currentCompanyName);
//                 setUpiId(userData.upi_id);  // Assuming UPI ID is stored in the email field
//             }
//         }
//         setPageLoading(false);
//     };

//     const handleUpdateDetails = async () => {
//         setLoading(true);
//         const updatedData = {
//             company_id: user.company_id._id,
//             company_name: company,
//             upi_id: upiId,
//         };

//         console.log(updatedData, "dats")

//         // Uncomment and implement the updateUserDetails function when ready
//         const response = await putRequest('/api/updateUserDetails', updatedData);
//         console.log(response)
//         if (response.status === 200) {
//             // setUser(response.data.data);
//             getUserDetails()
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         getUserDetails();
//     }, []);

//     return (
//         <MainLayout>
//             {pageLoading && <PageLoader />}
//             <Box pt={12} display='flex' alignItems='center'>
//                 <Container maxWidth="lg">
//                     <Paper elevation={3} sx={{ borderRadius: '15px', mx: 'auto', width: '40%', px: 5, py: 4 }} >
// <Stack>
//     <Typography variant='h5' color='text.hint' fontWeight='600'>User Profile</Typography>

//     <Stack direction='row' mt={2}>
//         <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>Name:</Typography>
//         <Typography variant='body2' color='text.secondary' fontSize='14px'>{`${user.first_name} ${user.last_name}`}</Typography>
//     </Stack>

//     <Stack direction='row'>
//         <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>Company:</Typography>
//         <Typography variant='body2' color='text.secondary' fontSize='14px'>{user.company_id?.company_name}</Typography>
//     </Stack>
//     <Stack direction='row'>
//         <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>UPI ID:</Typography>
//         <Typography variant='body2' color='text.secondary' fontSize='14px'>{user?.upi_id}</Typography>
//     </Stack>
//     <Stack direction='row'>
//         <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>Referral Requests Pending:</Typography>
//         <Typography variant='body2' color='text.secondary' fontSize='14px'>$200</Typography>
//     </Stack>
//     <Stack direction='row'>
//         <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>Rewards Pending:</Typography>
//         <Typography variant='body2' color='text.secondary' fontSize='14px'>3</Typography>
//     </Stack>
//     <Stack direction='row'>
//         <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>Rewards Earned:</Typography>
//         <Typography variant='body2' color='text.secondary' fontSize='14px'>$500</Typography>
//     </Stack>
// </Stack>

//                         <Stack mt={4}>
//                             <Typography variant='h5' color='text.hint' fontWeight='600'>Edit Details</Typography>
//                             <Stack mt={2}>
//                                 <InputLabel htmlFor="Current" sx={{ fontWeight: '600', color: 'text.hint' }}>Current Company:</InputLabel>
//                                 <OutlinedInput
//                                     size="small"
//                                     id="Current"
//                                     type="text"
//                                     name="Current"
//                                     value={company}
//                                     onChange={(e) => setCompany(e.target.value)}
//                                     fullWidth
//                                     placeholder='ABC Corp'
//                                 />
//                             </Stack>
//                             <Stack mt={3}>
//                                 <InputLabel htmlFor="upi" sx={{ fontWeight: '600', color: 'text.hint' }}>UPI ID</InputLabel>
//                                 <OutlinedInput
//                                     size="small"
//                                     id="upi"
//                                     type="text"
//                                     name="upi"
//                                     placeholder='john.doe@upi'
//                                     value={upiId}
//                                     onChange={(e) => setUpiId(e.target.value)}
//                                     fullWidth
//                                 />
//                             </Stack>
//                         </Stack>
//                         <LoadingButton loading={loading} variant="contained" fullWidth sx={{ mt: 4, textTransform: 'capitalize', background: '#0066ee' }} onClick={handleUpdateDetails}>Update Details</LoadingButton>
//                     </Paper>
//                 </Container>
//             </Box>
//         </MainLayout>
//     );
// }

"use client";
import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Box, CircularProgress, Container, InputLabel, OutlinedInput, Paper, Stack, Typography } from '@mui/material';
import { userDetails } from '@/middleware/userDetails';
import PageLoader from '../components/PageLoader';
import { LoadingButton } from '@mui/lab';
import { putRequest } from '../components/_apihandler';
import { notify } from '../components/Toast';

export default function UserProfile() {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [user, setUser] = useState({});
    const [company, setCompany] = useState('');
    const [upiId, setUpiId] = useState('');

    const getUserDetails = async () => {
        setPageLoading(true);
        if (localStorage.getItem('token')) {
            const response = await userDetails();
            if (response.status === 200) {
                const userData = response.data.data;
                setUser(userData);
                setCompany(userData.currentCompanyName);
                setUpiId(userData.upi_id);
            }
        }
        setPageLoading(false);
    };

    const handleUpdateDetails = async () => {
        setLoading(true);
        const updatedData = {
            currentCompanyName: company,
            upi_id: upiId,
        };

        try {
            const response = await putRequest('/api/updateUserDetails', updatedData);
            if (response.status === 200) {
                await getUserDetails();
                notify(response.data.msg, 'success');
            } else {
                notify('Failed to update user details', 'error');
            }
        } catch (error) {
            console.error('Error updating user details:', error);
            notify(error.response?.data?.msg || 'An unexpected error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    if (pageLoading) {
        return <CircularProgress />;
    }


    const capitalizeFirstLetter = (string) => {
        if(!string) return
        return string.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <MainLayout>
            <Box pt={2} display='flex' alignItems='center'>
                <Container maxWidth="lg">
                    <Paper elevation={3} sx={{ borderRadius: '15px', mx: 'auto', width: '40%', px: 5, py: 4 }} >
                        <Stack>
                            <Typography variant='h5' color='text.hint' fontWeight='600'>User Profile</Typography>

                            {/* <Stack direction='row' mt={2}>
                                <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>Name:</Typography>
                                <Typography variant='body2' color='text.secondary' fontSize='14px'>{`${user.first_name} ${user.last_name}`}</Typography>
                            </Stack>

                            <Stack direction='row'>
                                <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>Company:</Typography>
                                <Typography variant='body2' color='text.secondary' fontSize='14px'>{user.currentCompanyName}</Typography>
                            </Stack> */}
                            <Stack direction='row' mt={2}>
                                <Typography
                                    variant="body2"
                                    fontWeight='600'
                                    color='text.hint'
                                    gutterBottom='false'
                                    fontSize='14px'
                                    sx={{ width: '32%' }}
                                >
                                    Name:
                                </Typography>
                                <Typography variant='body2' color='text.secondary' fontSize='14px'>
                                    {capitalizeFirstLetter(`${user.first_name} ${user.last_name}`)}
                                </Typography>
                            </Stack>

                            <Stack direction='row'>
                                <Typography
                                    variant="body2"
                                    fontWeight='600'
                                    color='text.hint'
                                    gutterBottom='false'
                                    fontSize='14px'
                                    sx={{ width: '32%' }}
                                >
                                    Company:
                                </Typography>
                                <Typography variant='body2' color='text.secondary' fontSize='14px'>
                                    {capitalizeFirstLetter(user.currentCompanyName)}
                                </Typography>
                            </Stack>
                            <Stack direction='row'>
                                <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>UPI ID:</Typography>
                                <Typography variant='body2' color='text.secondary' fontSize='14px'>{user.upi_id}</Typography>
                            </Stack>
                            <Stack direction='row'>
                                <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>Referral Requests Pending:</Typography>
                                <Typography variant='body2' color='text.secondary' fontSize='14px'>$</Typography>
                            </Stack>
                            <Stack direction='row'>
                                <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>Rewards Pending:</Typography>
                                <Typography variant='body2' color='text.secondary' fontSize='14px'></Typography>
                            </Stack>
                            <Stack direction='row'>
                                <Typography variant="body2" fontWeight='600' color='text.hint' gutterBottom='false' fontSize='14px' sx={{ width: '32%' }}>Rewards Earned:</Typography>
                                <Typography variant='body2' color='text.secondary' fontSize='14px'>$</Typography>
                            </Stack>
                        </Stack>

                        <Stack mt={4}>
                            <Typography variant='h5' color='text.hint' fontWeight='600'>Edit Details</Typography>
                            <Stack mt={2}>
                                <InputLabel htmlFor="Current" sx={{ fontWeight: '600', color: 'text.hint' }}>Current Company:</InputLabel>
                                <OutlinedInput
                                    size="small"
                                    id="Current"
                                    type="text"
                                    name="Current"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    fullWidth
                                    placeholder='ABC Corp'
                                />
                            </Stack>
                            <Stack mt={3}>
                                <InputLabel htmlFor="upi" sx={{ fontWeight: '600', color: 'text.hint' }}>UPI ID</InputLabel>
                                <OutlinedInput
                                    size="small"
                                    id="upi"
                                    type="text"
                                    name="upi"
                                    placeholder='john.doe@upi'
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    fullWidth
                                />
                            </Stack>
                        </Stack>
                        <LoadingButton loading={loading} variant="contained" fullWidth sx={{ mt: 4, textTransform: 'capitalize', background: '#0066ee' }} onClick={handleUpdateDetails}>Update Details</LoadingButton>
                    </Paper>
                </Container>
            </Box>
        </MainLayout>
    );
}


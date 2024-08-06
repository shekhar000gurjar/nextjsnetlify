// "use client";
// import React, { Suspense, useEffect, useState } from 'react';
// import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, CircularProgress } from '@mui/material';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
// import { postResponse } from '../components/_apihandler';

// function CompanyPageComponent() {
//     const searchParams = useSearchParams();
//     const router = useRouter(); // Initialize useRouter
//     const [companyName, setCompanyName] = useState('');
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(''); // Track selected user

//     useEffect(() => {
//         const name = searchParams.get('name');
//         if (name) {
//             setCompanyName(name);
//             allUserList(name); // Fetch users when companyName is set
//         }
//     }, [searchParams]);

//     const allUserList = async (name) => {
//         try {
//             const response = await postResponse("/api/user-list", { company_name: name });
//             console.log("response", response);
//             if (response.status === 200 && response.data) {
//                 setUsers(response.data.data);
//             } else {
//                 setUsers([]);
//             }
//         } catch (error) {
//             console.log(error, "errr");
//             setUsers([]);
//         }
//     };

//     const handleRadioChange = (event) => {
//         setSelectedUser(event.target.value); // Update selected user state
//     };

//     const handleNextClick = () => {
//         if (selectedUser) {
//             router.push(`/send-request?userId=${selectedUser}`); // Navigate with selected user ID
//         } else {
//             alert("Please select a user"); // Optional: Alert if no user is selected
//         }
//     };

//     return (
//         <Box className='reBg' pb={10} display="flex" flexDirection="column" alignItems="center">
//             <Box
//                 sx={{
//                     marginTop: '20px',
//                     padding: '10px 20px',
//                     color: 'white',
//                     backgroundColor: '#bbbbdf',
//                     borderRadius: '10px',
//                     textAlign: 'center',
//                     width: 'fit-content'
//                 }}
//             >
//                 <Typography variant="h6">
//                     {companyName}
//                 </Typography>
//             </Box>
//             <Box
//                 sx={{
//                     backgroundColor: 'rgba(240, 236, 236, 0.43)',
//                     padding: '20px',
//                     borderRadius: '15px',
//                     marginTop: '20px',
//                     width: '80%',
//                     maxWidth: '500px',
//                 }}
//             >
//                 <FormControl component="fieldset" sx={{ width: '100%' }}>
//                     <Typography variant="subtitle1" gutterBottom align="center">
//                         List of users registered with their current company as {`'${companyName}'`}
//                     </Typography>
//                     <RadioGroup
//                         name="userSelection"
//                         value={selectedUser} // Controlled component
//                         onChange={handleRadioChange} // Handle radio button change
//                     >
//                         {users.length > 0 ? (
//                             users.map((user, index) => (
//                                 <FormControlLabel
//                                     key={index}
//                                     value={user._id}  // Assuming each user has a unique 'id'
//                                     control={<Radio />}
//                                     label={`${user.first_name} ${user.last_name} - ${user.current_location}`}  // Adjust based on actual user object properties
//                                 />
//                             ))
//                         ) : (
//                             <Typography variant="body1" align="center">
//                                 No users found
//                             </Typography>
//                         )}
//                     </RadioGroup>
//                 </FormControl>
//                 <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                     <Button
//                         sx={{ borderRadius: '20px', backgroundColor: '#bbbbdf' }}
//                         variant="contained"
//                         endIcon={<ArrowForwardIcon />}
//                         onClick={handleNextClick} // Navigate on button click
//                     >
//                         Next
//                     </Button>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };



// export default function CompanyPage() {
//     return (
//         <Suspense fallback={<CircularProgress />}>
//             <CompanyPageComponent />
//         </Suspense>
//     );
// }


// "use client";
// import React, { Suspense, useEffect, useState } from 'react';
// import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, CircularProgress } from '@mui/material';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
// import { postResponse } from '../components/_apihandler';
// import MainLayout from '../layouts/MainLayout';

// function CompanyPageComponent() {
//     const searchParams = useSearchParams();
//     const router = useRouter(); // Initialize useRouter
//     const [companyName, setCompanyName] = useState('');
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(''); // Track selected user
//     const [loading, setLoading] = useState(false); // Track loading state

//     useEffect(() => {
//         const name = searchParams.get('name');
//         if (name) {
//             allUserList(name); // Fetch users when companyName is set
//             setCompanyName(name);
//         }
//     }, [searchParams]);

//     const allUserList = async (name) => {
//         setLoading(true); // Start loading
//         try {
//             const user = localStorage.getItem('user')
//             const parsedUser = JSON.parse(user);
//             const loggedInUserId = parsedUser._id; // Get logged-in user ID from localStorage
//             const response = await postResponse("/api/user-list", { company_name: name });
//             console.log("response", response);
//             if (response.status === 200 && response.data) {
//                 const filteredUsers = response.data.data.filter(user => user._id !== loggedInUserId); // Filter out logged-in user
//                 setUsers(filteredUsers);
//             } else {
//                 setUsers([]);
//             }
//         } catch (error) {
//             console.log(error, "errr");
//             setUsers([]);
//         } finally {
//             setLoading(false); // Stop loading
//         }
//     };

//     const handleRadioChange = (event) => {
//         setSelectedUser(event.target.value); // Update selected user state
//     };

//     const handleNextClick = () => {
//         if (selectedUser) {
//             router.push(`/send-request?userId=${selectedUser}`); // Navigate with selected user ID
//         } else {
//             alert("Please select a user"); // Optional: Alert if no user is selected
//         }
//     };
//     const capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//     };

//     return (
//         <MainLayout>
//             <Box className='reBg' pb={10} display="flex" flexDirection="column" alignItems="center">
//                 <Box
//                     sx={{
//                         marginTop: '20px',
//                         padding: '10px 20px',
//                         color: 'white',
//                         backgroundColor: '#bbbbdf',
//                         borderRadius: '10px',
//                         textAlign: 'center',
//                         width: 'fit-content'
//                     }}
//                 >
//                     <Typography variant="h6">
//                         {capitalizeFirstLetter(companyName)}
//                     </Typography>
//                 </Box>
//                 <Box
//                     sx={{
//                         backgroundColor: 'rgba(240, 236, 236, 0.43)',
//                         padding: '20px',
//                         borderRadius: '15px',
//                         marginTop: '20px',
//                         width: '80%',
//                         maxWidth: '500px',
//                     }}
//                 >
//                     {loading ? (
//                         <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                             <CircularProgress />
//                         </Box>
//                     ) : (
//                         <FormControl component="fieldset" sx={{ width: '100%' }}>
//                             <Typography variant="subtitle1" gutterBottom align="center">
//                                 List of users registered with their current company as {`'${companyName}'`}
//                             </Typography>
//                             <RadioGroup
//                                 name="userSelection"
//                                 value={selectedUser} // Controlled component
//                                 onChange={handleRadioChange} // Handle radio button change
//                             >
//                                 {users.length > 0 ? (
//                                     users.map((user, index) => (
//                                         <FormControlLabel
//                                             key={index}
//                                             value={user._id}  // Assuming each user has a unique 'id'
//                                             control={<Radio />}
//                                             label={`${user.first_name} ${user.last_name} - ${user.current_location}`}  // Adjust based on actual user object properties
//                                         />
//                                     ))
//                                 ) : (
//                                     <Typography variant="body1" align="center">
//                                         No users found
//                                     </Typography>
//                                 )}
//                             </RadioGroup>
//                         </FormControl>
//                     )}
//                     <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                         <Button
//                             sx={{ borderRadius: '20px', backgroundColor: '#bbbbdf' }}
//                             variant="contained"
//                             endIcon={<ArrowForwardIcon />}
//                             onClick={handleNextClick} // Navigate on button click
//                         >
//                             Next
//                         </Button>
//                     </Box>
//                 </Box>
//             </Box>
//         </MainLayout>
//     );
// };

// export default function CompanyPage() {
//     return (
//         <Suspense fallback={<CircularProgress />}>
//             <CompanyPageComponent />
//         </Suspense>
//     );
// }

"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, CircularProgress, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSearchParams, useRouter } from 'next/navigation';
import { postResponse } from '../components/_apihandler';
import MainLayout from '../layouts/MainLayout';

function CompanyPageComponent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [companyName, setCompanyName] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const name = searchParams.get('name');
        if (name) {
            allUserList(name);
            setCompanyName(name);
        }
    }, [searchParams]);

    const allUserList = async (name) => {
        setLoading(true);
        try {
            const user = localStorage.getItem('user');
            const parsedUser = JSON.parse(user);
            const loggedInUserId = parsedUser._id;
            const response = await postResponse("/api/user-list", { company_name: name });
            if (response.status === 200 && response.data) {
                const filteredUsers = response.data.data.filter(user => user._id !== loggedInUserId);
                setUsers(filteredUsers);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error(error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRadioChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleNextClick = () => {
        if (selectedUser) {
            router.push(`/send-request?userId=${selectedUser}`);
        } else {
            alert("Please select a user");
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <MainLayout>
            <Box className='reBg' pb={10} display="flex" flexDirection="column" alignItems="center">
                <Paper
                    sx={{
                        marginTop: '20px',
                        padding: '20px',
                        color: 'white',
                        backgroundColor: '#3f51b5',
                        borderRadius: '10px',
                        textAlign: 'center',
                        width: '80%',
                        maxWidth: '500px'
                    }}
                >
                    <Typography variant="h5">
                        {capitalizeFirstLetter(companyName)}
                    </Typography>
                </Paper>
                <Paper
                    sx={{
                        backgroundColor: 'rgba(240, 236, 236, 0.43)',
                        padding: '20px',
                        borderRadius: '15px',
                        marginTop: '20px',
                        width: '80%',
                        maxWidth: '500px'
                    }}
                >
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <FormControl component="fieldset" sx={{ width: '100%' }}>
                            <Typography variant="subtitle1" gutterBottom align="center">
                                List of users registered with their current company as {`'${companyName}'`}
                            </Typography>
                            <RadioGroup
                                name="userSelection"
                                value={selectedUser}
                                onChange={handleRadioChange}
                            >
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={user._id}
                                            control={<Radio />}
                                            label={`${user.first_name} ${user.last_name} - ${user.current_location}`}
                                        />
                                    ))
                                ) : (
                                    <Typography variant="body1" align="center">
                                        No users found
                                    </Typography>
                                )}
                            </RadioGroup>
                        </FormControl>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button
                            sx={{ borderRadius: '20px', backgroundColor: '#3f51b5' }}
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            onClick={handleNextClick}
                            disabled={!selectedUser} // Disable the button if no user is selected
                        >
                            Next
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </MainLayout>
    );
}

export default function CompanyPage() {
    return (
        <Suspense fallback={<CircularProgress />}>
            <CompanyPageComponent />
        </Suspense>
    );
}


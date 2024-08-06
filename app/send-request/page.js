// "use client";
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, TextField, Button, Grid, CircularProgress } from '@mui/material';
// import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
// import { postResponse } from '../components/_apihandler';
// import { notify } from '../components/Toast';

// export default function SendRequest() {
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const [userDetails, setUserDetails] = useState({});
//     const [currentUser, setCurrentUser] = useState({});
//     const [vacancyName, setVacancyName] = useState("");
//     const [jobId, setJobId] = useState("");
//     const [jobLink, setJobLink] = useState("");
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const _id = searchParams.get("userId");
//         const user = localStorage.getItem("user")
//         if (_id) {
//             console.log(_id, "id")
//             userDetail(_id);
//         }
//         if (JSON.parse(user)) {
//             setCurrentUser(JSON.parse(user));
//         }

//     }, [searchParams]);

//     const userDetail = async (_id) => {
//         try {
//             const response = await postResponse("/api/userdetails-byid", { _id });
//             console.log("response", response);
//             if (response.status === 200 && response.data) {
//                 setUserDetails(response.data.data);
//             } else {
//                 setUserDetails({});
//             }
//         } catch (error) {
//             console.log(error, "errr");
//             setUserDetails({});
//         }
//     };

//     const handleSubmit = async () => {
//         setLoading(true);
//         try {
//             const dataToSend = {
//                 email: userDetails.email,
//                 vacancy_name: vacancyName,
//                 receiver_first_name: userDetails.first_name,
//                 first_name: currentUser.first_name,
//                 last_name: currentUser.last_name,
//                 job_id: jobId,
//                 job_link: jobLink,
//             }
//             const response = await postResponse("/api/send-request", dataToSend);
//             if (response.status === 200) {
//                 notify(response.data.msg, 'success');
//                 router.push('/search-company')
//             } else {
//                 notify(response.data.msg, 'error');
//             }
//         } catch (error) {
//             notify(error.response?.data?.msg || "Something went wrong", 'error');
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <>

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
//                         Send request to {`${userDetails.first_name} ${userDetails.last_name}` || ""} for {userDetails.currentCompanyName || ""}
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
//                     <Grid container spacing={2}>
//                         <Grid item xs={5}>
//                             <Typography variant="subtitle1">
//                                 Job Vacancy Name: <span style={{ color: 'red' }}>*</span>
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={7}>
//                             <TextField
//                                 fullWidth
//                                 variant="outlined"
//                                 placeholder="Enter Job Vacancy Name"
//                                 value={vacancyName}
//                                 onChange={(e) => setVacancyName(e.target.value)}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: '20px',
//                                         height: '35px',  // Adjust height as needed
//                                         backgroundColor: '#bbbbdf',
//                                         '& input': {
//                                             height: '100%',
//                                             color: 'white',
//                                             padding: '0 14px',  // Adjust padding as needed
//                                         },
//                                         '& fieldset': {
//                                             borderRadius: '20px',  // To match the border radius
//                                         },
//                                     },
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={5}>
//                             <Typography variant="subtitle1">
//                                 Job ID: <span style={{ color: 'red' }}>*</span>
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={7}>
//                             <TextField
//                                 fullWidth
//                                 variant="outlined"
//                                 placeholder="Enter Job ID"
//                                 value={jobId}
//                                 onChange={(e) => setJobId(e.target.value)}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: '20px',
//                                         height: '35px',  // Adjust height as needed
//                                         backgroundColor: '#bbbbdf',
//                                         '& input': {
//                                             height: '100%',
//                                             color: 'white',
//                                             padding: '0 14px',  // Adjust padding as needed
//                                         },
//                                         '& fieldset': {
//                                             borderRadius: '20px',  // To match the border radius
//                                         },
//                                     },
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={5}>
//                             <Typography variant="subtitle1">
//                                 Job Link: <span style={{ color: 'red' }}>*</span>
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={7}>
//                             <TextField
//                                 fullWidth
//                                 variant="outlined"
//                                 placeholder="Enter Job Link"
//                                 value={jobLink}
//                                 onChange={(e) => setJobLink(e.target.value)}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: '20px',
//                                         height: '35px',  // Adjust height as needed
//                                         backgroundColor: '#bbbbdf',
//                                         '& input': {
//                                             height: '100%',
//                                             color: 'white',
//                                             padding: '0 14px',  // Adjust padding as needed
//                                         },
//                                         '& fieldset': {
//                                             borderRadius: '20px',  // To match the border radius
//                                         },
//                                     },
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                             <Button
//                                 sx={{ borderRadius: '20px', backgroundColor: '#bbbbdf' }}
//                                 variant="contained"
//                                 onClick={handleSubmit}
//                                 disabled={loading}
//                             >
//                                 {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Box>

//         </>
//     );
// };


// "use client";
// import React, { useEffect, useState, Suspense } from 'react';
// import { Box, Typography, TextField, Button, Grid, CircularProgress } from '@mui/material';
// import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
// import { postResponse } from '../components/_apihandler';
// import { notify } from '../components/Toast';

// function SendRequestComponent() {
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const [userDetails, setUserDetails] = useState({});
//     const [currentUser, setCurrentUser] = useState({});
//     const [vacancyName, setVacancyName] = useState("");
//     const [jobId, setJobId] = useState("");
//     const [jobLink, setJobLink] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [show, setShow] = useState(false)

//     useEffect(() => {
//         const _id = searchParams.get("userId");
//         const user = localStorage.getItem("user");
//         if (_id) {
//             console.log(_id, "id");
//             userDetail(_id);
//         }
//         if (JSON.parse(user)) {
//             setCurrentUser(JSON.parse(user));
//         }
//     }, [searchParams]);

//     const userDetail = async (_id) => {
//         setShow(true)
//         try {
//             const response = await postResponse("/api/userdetails-byid", { _id });
//             console.log("response", response);
//             if (response.status === 200 && response.data) {
//                 setUserDetails(response.data.data);
//                 setShow(false)
//             } else {
//                 setUserDetails({});
//                 setShow(false)
//             }
//         } catch (error) {
//             console.log(error, "errr");
//             setUserDetails({});
//             setShow(false)
//         }
//     };

//     const handleSubmit = async () => {
//         setLoading(true);
//         try {
//             const dataToSend = {
//                 email: userDetails.email,
//                 vacancy_name: vacancyName,
//                 receiver_first_name: userDetails.first_name,
//                 first_name: currentUser.first_name,
//                 last_name: currentUser.last_name,
//                 job_id: jobId,
//                 job_link: jobLink,
//             };
//             const response = await postResponse("/api/send-request", dataToSend);
//             if (response.status === 200) {
//                 notify(response.data.msg, 'success');
//                 router.push('/search-company');
//             } else {
//                 notify(response.data.msg, 'error');
//             }
//         } catch (error) {
//             notify(error.response?.data?.msg || "Something went wrong", 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box className='reBg' pb={10} display="flex" flexDirection="column" alignItems="center">
//             {show ? (
//                 <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                     <CircularProgress />
//                 </Box>
//             ) : (
//                  <Box
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
//                         Send request to {`${userDetails.first_name} ${userDetails.last_name}` || ""} for {userDetails.currentCompanyName || ""}
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
//                     <Grid container spacing={2}>
//                         <Grid item xs={5}>
//                             <Typography variant="subtitle1">
//                                 Job Vacancy Name: <span style={{ color: 'red' }}>*</span>
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={7}>
//                             <TextField
//                                 fullWidth
//                                 variant="outlined"
//                                 placeholder="Enter Job Vacancy Name"
//                                 value={vacancyName}
//                                 onChange={(e) => setVacancyName(e.target.value)}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: '20px',
//                                         height: '35px',  // Adjust height as needed
//                                         backgroundColor: '#bbbbdf',
//                                         '& input': {
//                                             height: '100%',
//                                             color: 'white',
//                                             padding: '0 14px',  // Adjust padding as needed
//                                         },
//                                         '& fieldset': {
//                                             borderRadius: '20px',  // To match the border radius
//                                         },
//                                     },
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={5}>
//                             <Typography variant="subtitle1">
//                                 Job ID: <span style={{ color: 'red' }}>*</span>
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={7}>
//                             <TextField
//                                 fullWidth
//                                 variant="outlined"
//                                 placeholder="Enter Job ID"
//                                 value={jobId}
//                                 onChange={(e) => setJobId(e.target.value)}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: '20px',
//                                         height: '35px',  // Adjust height as needed
//                                         backgroundColor: '#bbbbdf',
//                                         '& input': {
//                                             height: '100%',
//                                             color: 'white',
//                                             padding: '0 14px',  // Adjust padding as needed
//                                         },
//                                         '& fieldset': {
//                                             borderRadius: '20px',  // To match the border radius
//                                         },
//                                     },
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={5}>
//                             <Typography variant="subtitle1">
//                                 Job Link: <span style={{ color: 'red' }}>*</span>
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={7}>
//                             <TextField
//                                 fullWidth
//                                 variant="outlined"
//                                 placeholder="Enter Job Link"
//                                 value={jobLink}
//                                 onChange={(e) => setJobLink(e.target.value)}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: '20px',
//                                         height: '35px',  // Adjust height as needed
//                                         backgroundColor: '#bbbbdf',
//                                         '& input': {
//                                             height: '100%',
//                                             color: 'white',
//                                             padding: '0 14px',  // Adjust padding as needed
//                                         },
//                                         '& fieldset': {
//                                             borderRadius: '20px',  // To match the border radius
//                                         },
//                                     },
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                             <Button
//                                 sx={{ borderRadius: '20px', backgroundColor: '#bbbbdf' }}
//                                 variant="contained"
//                                 onClick={handleSubmit}
//                                 disabled={loading}
//                             >
//                                 {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             )
//             }
//         </Box>
//     );
// }

// export default function SendRequest() {
//     return (
//         <Suspense fallback={<CircularProgress />}>
//             <SendRequestComponent />
//         </Suspense>
//     );
// }


// "use client";
// import React, { useEffect, useState, Suspense } from 'react';
// import { Box, Typography, TextField, Button, Grid, CircularProgress } from '@mui/material';
// import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
// import { postResponse } from '../components/_apihandler';
// import { notify } from '../components/Toast';
// import MainLayout from '../layouts/MainLayout';

// function SendRequestComponent() {
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const [userDetails, setUserDetails] = useState({});
//     const [currentUser, setCurrentUser] = useState({});
//     const [vacancyName, setVacancyName] = useState("");
//     const [jobId, setJobId] = useState("");
//     const [jobLink, setJobLink] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [fetching, setFetching] = useState(false); // Track fetching state

//     useEffect(() => {
//         const _id = searchParams.get("userId");
//         const user = localStorage.getItem("user");
//         if (_id) {
//             console.log(_id, "id");
//             fetchUserDetail(_id);
//         }
//         if (user) {
//             setCurrentUser(JSON.parse(user));
//         }
//     }, [searchParams]);

//     const fetchUserDetail = async (_id) => {
//         setFetching(true);
//         try {
//             const response = await postResponse("/api/userdetails-byid", { _id });
//             console.log("response", response);
//             if (response.status === 200 && response.data) {
//                 setUserDetails(response.data.data);
//             } else {
//                 setUserDetails({});
//             }
//         } catch (error) {
//             console.log(error, "errr");
//             setUserDetails({});
//         } finally {
//             setFetching(false);
//         }
//     };

//     const handleSubmit = async () => {
//         // Check for mandatory fields
//         if (!vacancyName || !jobId || !jobLink) {
//             notify("All fields are required", 'error');
//             return;
//         }

//         setLoading(true);
//         try {
//             const dataToSend = {
//                 email: userDetails.email,
//                 vacancy_name: vacancyName,
//                 receiver_first_name: userDetails.first_name,
//                 first_name: currentUser.first_name,
//                 last_name: currentUser.last_name,
//                 job_id: jobId,
//                 job_link: jobLink,
//             };
//             const response = await postResponse("/api/send-request", dataToSend);
//             if (response.status === 200) {
//                 notify(response.data.msg, 'success');
//                 router.push('/search-company');
//             } else {
//                 notify(response.data.msg, 'error');
//             }
//         } catch (error) {
//             notify(error.response?.data?.msg || "Something went wrong", 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <MainLayout>
//             <Box className='reBg' pb={10} display="flex" flexDirection="column" alignItems="center">
//                 {fetching ? (
//                     <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                         <CircularProgress />
//                     </Box>
//                 ) : (
//                     <>
//                         <Box
//                             sx={{
//                                 marginTop: '20px',
//                                 padding: '10px 20px',
//                                 color: 'white',
//                                 backgroundColor: '#bbbbdf',
//                                 borderRadius: '10px',
//                                 textAlign: 'center',
//                                 width: 'fit-content'
//                             }}
//                         >
//                             <Typography variant="h6">
//                                 Send request to {`${userDetails.first_name} ${userDetails.last_name}` || ""} for {userDetails.currentCompanyName || ""}
//                             </Typography>
//                         </Box>
//                         <Box
//                             sx={{
//                                 backgroundColor: 'rgba(240, 236, 236, 0.43)',
//                                 padding: '20px',
//                                 borderRadius: '15px',
//                                 marginTop: '20px',
//                                 width: '80%',
//                                 maxWidth: '500px',
//                             }}
//                         >
//                             <Grid container spacing={2}>
//                                 <Grid item xs={5}>
//                                     <Typography variant="subtitle1">
//                                         Job Vacancy Name: <span style={{ color: 'red' }}>*</span>
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={7}>
//                                     <TextField
//                                         fullWidth
//                                         variant="outlined"
//                                         placeholder="Enter Job Vacancy Name"
//                                         value={vacancyName}
//                                         onChange={(e) => setVacancyName(e.target.value)}
//                                         sx={{
//                                             '& .MuiOutlinedInput-root': {
//                                                 borderRadius: '20px',
//                                                 height: '35px',  // Adjust height as needed
//                                                 backgroundColor: '#bbbbdf',
//                                                 '& input': {
//                                                     height: '100%',
//                                                     color: 'white',
//                                                     padding: '0 14px',  // Adjust padding as needed
//                                                 },
//                                                 '& fieldset': {
//                                                     borderRadius: '20px',  // To match the border radius
//                                                 },
//                                             },
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={5}>
//                                     <Typography variant="subtitle1">
//                                         Job ID: <span style={{ color: 'red' }}>*</span>
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={7}>
//                                     <TextField
//                                         fullWidth
//                                         variant="outlined"
//                                         placeholder="Enter Job ID"
//                                         value={jobId}
//                                         onChange={(e) => setJobId(e.target.value)}
//                                         sx={{
//                                             '& .MuiOutlinedInput-root': {
//                                                 borderRadius: '20px',
//                                                 height: '35px',  // Adjust height as needed
//                                                 backgroundColor: '#bbbbdf',
//                                                 '& input': {
//                                                     height: '100%',
//                                                     color: 'white',
//                                                     padding: '0 14px',  // Adjust padding as needed
//                                                 },
//                                                 '& fieldset': {
//                                                     borderRadius: '20px',  // To match the border radius
//                                                 },
//                                             },
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={5}>
//                                     <Typography variant="subtitle1">
//                                         Job Link: <span style={{ color: 'red' }}>*</span>
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={7}>
//                                     <TextField
//                                         fullWidth
//                                         variant="outlined"
//                                         placeholder="Enter Job Link"
//                                         value={jobLink}
//                                         onChange={(e) => setJobLink(e.target.value)}
//                                         sx={{
//                                             '& .MuiOutlinedInput-root': {
//                                                 borderRadius: '20px',
//                                                 height: '35px',  // Adjust height as needed
//                                                 backgroundColor: '#bbbbdf',
//                                                 '& input': {
//                                                     height: '100%',
//                                                     color: 'white',
//                                                     padding: '0 14px',  // Adjust padding as needed
//                                                 },
//                                                 '& fieldset': {
//                                                     borderRadius: '20px',  // To match the border radius
//                                                 },
//                                             },
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                                     <Button
//                                         sx={{ borderRadius: '20px', backgroundColor: '#bbbbdf' }}
//                                         variant="contained"
//                                         onClick={handleSubmit}
//                                         disabled={loading}
//                                     >
//                                         {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </>
//                 )}
//             </Box>
//         </MainLayout>
//     );
// }

// export default function SendRequest() {
//     return (
//         <Suspense fallback={<CircularProgress />}>
//             <SendRequestComponent />
//         </Suspense>
//     );
// }


"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { Box, Typography, TextField, Button, Grid, CircularProgress, Paper } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import { postResponse } from '../components/_apihandler';
import { notify } from '../components/Toast';
import MainLayout from '../layouts/MainLayout';

function SendRequestComponent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [userDetails, setUserDetails] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [vacancyName, setVacancyName] = useState("");
    const [jobId, setJobId] = useState("");
    const [jobLink, setJobLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const _id = searchParams.get("userId");
        const user = localStorage.getItem("user");
        if (_id) {
            fetchUserDetail(_id);
        }
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, [searchParams]);

    const fetchUserDetail = async (_id) => {
        setFetching(true);
        try {
            const response = await postResponse("/api/userdetails-byid", { _id });
            if (response.status === 200 && response.data) {
                setUserDetails(response.data.data);
            } else {
                setUserDetails({});
            }
        } catch (error) {
            console.error(error);
            setUserDetails({});
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async () => {

        if (userDetails && (userDetails.total_refer_points <= 0)) {
            notify("You Have No Sufficient Points Please Recharge!", 'error');
            return;
        }

        if (!vacancyName || !jobId || !jobLink) {
            notify("All fields are required", 'error');
            return;
        }

        setLoading(true);
        try {
            const dataToSend = {
                email: userDetails.email,
                vacancy_name: vacancyName,
                receiver_first_name: userDetails.first_name,
                first_name: currentUser.first_name,
                last_name: currentUser.last_name,
                job_id: jobId,
                job_link: jobLink,
            };
            const response = await postResponse("/api/send-request", dataToSend);
            if (response.status === 200) {
                notify(response.data.msg, 'success');
                router.push('/search-company');
            } else {
                notify(response.data.msg, 'error');
            }
        } catch (error) {
            notify(error.response?.data?.msg || "Something went wrong", 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <Box className='reBg' pb={10} display="flex" flexDirection="column" alignItems="center">
                {fetching ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Paper
                            sx={{
                                marginTop: '20px',
                                padding: '20px',
                                color: 'white',
                                backgroundColor: '#3f51b5',
                                borderRadius: '10px',
                                textAlign: 'center',
                                width: '90%',
                                maxWidth: '600px'
                            }}
                        >
                            <Typography variant="h5">
                                Send request to {`${userDetails.first_name} ${userDetails.last_name}` || ""} for {userDetails.currentCompanyName || ""}
                            </Typography>
                        </Paper>
                        <Paper
                            sx={{
                                backgroundColor: 'rgba(240, 236, 236, 0.43)',
                                padding: '20px',
                                borderRadius: '15px',
                                marginTop: '20px',
                                width: '90%',
                                maxWidth: '600px'
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={5}>
                                    <Typography variant="subtitle1">
                                        Job Vacancy Name: <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Enter Job Vacancy Name"
                                        value={vacancyName}
                                        onChange={(e) => setVacancyName(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '20px',
                                                height: '35px',
                                                backgroundColor: '#bbbbdf',
                                                '& input': {
                                                    height: '100%',
                                                    color: 'white',
                                                    padding: '0 14px',
                                                },
                                                '& fieldset': {
                                                    borderRadius: '20px',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Typography variant="subtitle1">
                                        Job ID: <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Enter Job ID"
                                        value={jobId}
                                        onChange={(e) => setJobId(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '20px',
                                                height: '35px',
                                                backgroundColor: '#bbbbdf',
                                                '& input': {
                                                    height: '100%',
                                                    color: 'white',
                                                    padding: '0 14px',
                                                },
                                                '& fieldset': {
                                                    borderRadius: '20px',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Typography variant="subtitle1">
                                        Job Link: <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Enter Job Link"
                                        value={jobLink}
                                        onChange={(e) => setJobLink(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '20px',
                                                height: '35px',
                                                backgroundColor: '#bbbbdf',
                                                '& input': {
                                                    height: '100%',
                                                    color: 'white',
                                                    padding: '0 14px',
                                                },
                                                '& fieldset': {
                                                    borderRadius: '20px',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <Button
                                        sx={{ borderRadius: '20px', backgroundColor: '#3f51b5' }}
                                        variant="contained"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </>
                )}
            </Box>
        </MainLayout>
    );
}

export default function SendRequest() {
    return (
        <Suspense fallback={<CircularProgress />}>
            <SendRequestComponent />
        </Suspense>
    );
}

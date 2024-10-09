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
//--------------------------------------------

// "use client";
// import React, { useEffect, useState, Suspense } from 'react';
// import { Box, Typography, TextField, Button, Grid, CircularProgress, Paper } from '@mui/material';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { postResponse } from '../components/_apihandler';
// import { notify } from '../components/Toast';
// import MainLayout from '../layouts/MainLayout';
// import { userDetails } from '@/middleware/userDetails';

// function SendRequestComponent() {
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const [userDetail, setUserDetails] = useState({});
//     const [currentUser, setCurrentUser] = useState({});
//     const [vacancyName, setVacancyName] = useState("");
//     const [jobId, setJobId] = useState("");
//     const [jobLink, setJobLink] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [fetching, setFetching] = useState(false);

//     useEffect(() => {
//         getUserDetails();
//     }, []);

//     const getUserDetails = async () => {
//         if (localStorage.getItem('token')) {
//             const response = await userDetails();
//             if (response.status === 200) {
//                 localStorage.setItem("user", JSON.stringify(response.data.data));
//             }
//         }
//     };

//     useEffect(() => {
//         const _id = searchParams.get("userId");
//         const user = localStorage.getItem("user");
//         if (_id) {
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
//             if (response.status === 200 && response.data) {
//                 setUserDetails(response.data.data);
//             } else {
//                 setUserDetails({});
//             }
//         } catch (error) {
//             console.error(error);
//             setUserDetails({});
//         } finally {
//             setFetching(false);
//         }
//     };

//     const handleSubmit = async () => {

//         if (currentUser && (currentUser.total_refer_points <= 0)) {
//             notify("You Have No Sufficient Points Please Recharge!", 'error');
//             return;
//         }

//         if (!vacancyName || !jobId || !jobLink) {
//             notify("All fields are required", 'error');
//             return;
//         }

//         setLoading(true);
//         try {
//             const dataToSend = {
//                 user_id: currentUser._id,
//                 sender_id: userDetail._id,
//                 sender_email: currentUser.email,
//                 email: userDetail.email,
//                 vacancy_name: vacancyName,
//                 receiver_first_name: userDetail.first_name,
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
//                     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//                         <CircularProgress />
//                     </Box>
//                 ) : (
//                     <>
//                         <Paper
//                             sx={{
//                                 marginTop: '20px',
//                                 padding: '20px',
//                                 color: 'white',
//                                 backgroundColor: '#3f51b5',
//                                 borderRadius: '10px',
//                                 textAlign: 'center',
//                                 width: '90%',
//                                 maxWidth: '600px'
//                             }}
//                         >
//                             <Typography variant="h5">
//                                 Send request to {`${userDetail.first_name} ${userDetail.last_name}` || ""} for {userDetail.currentCompanyName || ""}
//                             </Typography>
//                         </Paper>
//                         <Paper
//                             sx={{
//                                 backgroundColor: 'rgba(240, 236, 236, 0.43)',
//                                 padding: '20px',
//                                 borderRadius: '15px',
//                                 marginTop: '20px',
//                                 width: '90%',
//                                 maxWidth: '600px'
//                             }}
//                         >
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12} sm={5}>
//                                     <Typography variant="subtitle1">
//                                         Job Vacancy Name: <span style={{ color: 'red' }}>*</span>
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={7}>
//                                     <TextField
//                                         fullWidth
//                                         variant="outlined"
//                                         placeholder="Enter Job Vacancy Name"
//                                         value={vacancyName}
//                                         onChange={(e) => setVacancyName(e.target.value)}
//                                         sx={{
//                                             '& .MuiOutlinedInput-root': {
//                                                 borderRadius: '20px',
//                                                 height: '35px',
//                                                 backgroundColor: '#bbbbdf',
//                                                 '& input': {
//                                                     height: '100%',
//                                                     color: 'white',
//                                                     padding: '0 14px',
//                                                 },
//                                                 '& fieldset': {
//                                                     borderRadius: '20px',
//                                                 },
//                                             },
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={5}>
//                                     <Typography variant="subtitle1">
//                                         Job ID: <span style={{ color: 'red' }}>*</span>
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={7}>
//                                     <TextField
//                                         fullWidth
//                                         variant="outlined"
//                                         placeholder="Enter Job ID"
//                                         value={jobId}
//                                         onChange={(e) => setJobId(e.target.value)}
//                                         sx={{
//                                             '& .MuiOutlinedInput-root': {
//                                                 borderRadius: '20px',
//                                                 height: '35px',
//                                                 backgroundColor: '#bbbbdf',
//                                                 '& input': {
//                                                     height: '100%',
//                                                     color: 'white',
//                                                     padding: '0 14px',
//                                                 },
//                                                 '& fieldset': {
//                                                     borderRadius: '20px',
//                                                 },
//                                             },
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={5}>
//                                     <Typography variant="subtitle1">
//                                         Job Link: <span style={{ color: 'red' }}>*</span>
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={7}>
//                                     <TextField
//                                         fullWidth
//                                         variant="outlined"
//                                         placeholder="Enter Job Link"
//                                         value={jobLink}
//                                         onChange={(e) => setJobLink(e.target.value)}
//                                         sx={{
//                                             '& .MuiOutlinedInput-root': {
//                                                 borderRadius: '20px',
//                                                 height: '35px',
//                                                 backgroundColor: '#bbbbdf',
//                                                 '& input': {
//                                                     height: '100%',
//                                                     color: 'white',
//                                                     padding: '0 14px',
//                                                 },
//                                                 '& fieldset': {
//                                                     borderRadius: '20px',
//                                                 },
//                                             },
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                                     <Button
//                                         sx={{ borderRadius: '20px', backgroundColor: '#3f51b5' }}
//                                         variant="contained"
//                                         onClick={handleSubmit}
//                                         disabled={loading}
//                                     >
//                                         {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         </Paper>
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

//=====================================================================
// "use client";
// import React, { useEffect, useState, Suspense } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   CircularProgress,
//   Paper,
// } from "@mui/material";
// import { useSearchParams, useRouter } from "next/navigation";
// import { postResponse } from "../components/_apihandler";
// import { notify } from "../components/Toast";
// import MainLayout from "../layouts/MainLayout";
// import { userDetails } from "@/middleware/userDetails";

// function SendRequestComponent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [userDetail, setUserDetails] = useState({});
//   const [currentUser, setCurrentUser] = useState({});
//   const [vacancyName, setVacancyName] = useState("");
//   const [jobId, setJobId] = useState("");
//   const [jobLink, setJobLink] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);

//   useEffect(() => {
//     getUserDetails();
//   }, []);

//   const getUserDetails = async () => {
//     if (localStorage.getItem("token")) {
//       const response = await userDetails();
//       if (response.status === 200) {
//         localStorage.setItem("user", JSON.stringify(response.data.data));
//       }
//     }
//   };

//   useEffect(() => {
//     const _id = searchParams.get("userId");
//     const user = localStorage.getItem("user");
//     if (_id) {
//       fetchUserDetail(_id);
//     }
//     if (user) {
//       setCurrentUser(JSON.parse(user));
//     }
//   }, [searchParams]);

//   const fetchUserDetail = async (_id) => {
//     setFetching(true);
//     try {
//       const response = await postResponse("/api/userdetails-byid", { _id });
//       if (response.status === 200 && response.data) {
//         setUserDetails(response.data.data);
//       } else {
//         setUserDetails({});
//       }
//     } catch (error) {
//       console.error(error);
//       setUserDetails({});
//     } finally {
//       setFetching(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (currentUser && currentUser.total_refer_points <= 0) {
//       notify("You Have No Sufficient Points Please Recharge!", "error");
//       return;
//     }

//     if (!vacancyName || !jobId || !jobLink) {
//       notify("All fields are required", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       const dataToSend = {
//         user_id: currentUser._id,
//         sender_id: userDetail._id,
//         sender_email: currentUser.email,
//         email: userDetail.email,
//         vacancy_name: vacancyName,
//         receiver_first_name: userDetail.first_name,
//         first_name: currentUser.first_name,
//         last_name: currentUser.last_name,
//         job_id: jobId,
//         job_link: jobLink,
//       };
//       const response = await postResponse("/api/send-request", dataToSend);
//       if (response.status === 200) {
//         notify(response.data.msg, "success");
//         router.push("/search-company");
//       } else {
//         notify(response.data.msg, "error");
//       }
//     } catch (error) {
//       notify(error.response?.data?.msg || "Something went wrong", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout
//       homeIcon={true}
//       headerText={"Send Request"}
//       homeIconSide={"left"}
//       page={"send-request"}
//     >
//       <Box pb={10} display="flex" flexDirection="column" alignItems="center">
//         {fetching ? (
//           <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             height="100vh"
//           >
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             <Typography
//               variant="h5"
//               style={{ marginTop: "20px", color: "black", textAlign: "center" }}
//             >
//               Send request to{" "}
//               {`${userDetail.first_name} ${userDetail.last_name}` || ""} for{" "}
//               {userDetail.currentCompanyName || ""}
//             </Typography>
//             <Box
//               sx={{
//                 padding: { xs: "0px", sm: "0px", md: "20px", lg: "40px" },
//                 marginTop: "20px",
//                 width: "70%",
//               }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={12}>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{
//                       color: "black",
//                       display: {
//                         xs: "block",
//                         sm: "block",
//                         md: "none",
//                         lg: "none",
//                       },
//                     }}
//                   >
//                     Job Vacancy Name: <span>*</span>
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     placeholder="Enter Job Vacancy Name"
//                     value={vacancyName}
//                     onChange={(e) => setVacancyName(e.target.value)}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "10px",
//                         "& input": {
//                           color: "black",
//                         },
//                       },
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12}>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{
//                       color: "black",
//                       display: {
//                         xs: "block",
//                         sm: "block",
//                         md: "none",
//                         lg: "none",
//                       },
//                     }}
//                   >
//                     Job ID: <span>*</span>
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     placeholder="Enter Job ID"
//                     value={jobId}
//                     onChange={(e) => setJobId(e.target.value)}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "10px",
//                         "& input": {
//                           color: "black",
//                         },
//                       },
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12}>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{
//                       color: "black",
//                       display: {
//                         xs: "block",
//                         sm: "block",
//                         md: "none",
//                         lg: "none",
//                       },
//                     }}
//                   >
//                     Job Link: <span>*</span>
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     placeholder="Enter Job Link"
//                     value={jobLink}
//                     onChange={(e) => setJobLink(e.target.value)}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "10px",
//                         "& input": {
//                           color: "black",
//                         },
//                       },
//                     }}
//                   />
//                 </Grid>
//                 <Grid
//                   item
//                   xs={12}
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     marginTop: "20px",
//                   }}
//                 >
//                   <Button
//                     sx={{
//                       borderRadius: "10px",
//                       backgroundColor: "#687ce9",
//                       color: "white",
//                       width: "100%",
//                     }}
//                     variant="contained"
//                     onClick={handleSubmit}
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <CircularProgress size={24} color="inherit" />
//                     ) : (
//                       "Submit"
//                     )}
//                   </Button>
//                 </Grid>
//               </Grid>
//               <Typography
//                 variant="body2"
//                 style={{
//                   marginTop: "20px",
//                   textAlign: "start",
//                   color: "black",
//                 }}
//               >
//                 Please make sure the information entered is correct and latest
//                 to ensure smooth referral process.
//               </Typography>
//             </Box>
//           </>
//         )}
//       </Box>
//     </MainLayout>
//   );
// }

// export default function SendRequest() {
//   return (
//     <Suspense fallback={<CircularProgress />}>
//       <SendRequestComponent />
//     </Suspense>
//   );
// }

"use client";
import React, { useEffect, useState, Suspense } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { postResponse } from "../components/_apihandler";
import { notify } from "../components/Toast";
import MainLayout from "../layouts/MainLayout";
import { userDetails } from "@/middleware/userDetails";

function SendRequestComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userDetail, setUserDetails] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [vacancyName, setVacancyName] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // State for the confirmation dialog

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    if (localStorage.getItem("token")) {
      const response = await userDetails();
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
    }
  };

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

  const handleSubmit = () => {
    if (currentUser && currentUser.total_refer_points <= 0) {
      notify("You Have No Sufficient Points Please Recharge!", "error");
      return;
    }

    if (!vacancyName || !jobId || !jobLink) {
      notify("All fields are required", "error");
      return;
    }

    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleConfirmSubmit = async () => {
    setLoading(true);
    setOpenDialog(false); // Close the confirmation dialog
    try {
      const dataToSend = {
        user_id: currentUser._id,
        sender_id: userDetail._id,
        sender_email: currentUser.email,
        email: userDetail.email,
        vacancy_name: vacancyName,
        receiver_first_name: userDetail.first_name,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        job_id: jobId,
        job_link: jobLink,
      };
      const response = await postResponse("/api/send-request", dataToSend);
      if (response.status === 200) {
        notify(response.data.msg, "success");
        router.push("/search-company");
      } else {
        notify(response.data.msg, "error");
      }
    } catch (error) {
      notify(error.response?.data?.msg || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout
      homeIcon={true}
      headerText={"Send Request"}
      homeIconSide={"left"}
      page={"send-request"}
    >
      <Box pb={10} display="flex" flexDirection="column" alignItems="center">
        {fetching ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography
              variant="h4" // Made heading larger
              sx={{
                fontWeight: "bold", // Made heading bolder
                marginTop: "20px",
                color: "black",
                textAlign: "center",
              }}
            >
              Send request to{" "}
              {`${userDetail.first_name} ${userDetail.last_name}` || ""} for{" "}
              {userDetail.currentCompanyName || ""}
            </Typography>
            <Box
              sx={{
                padding: { xs: "0px", sm: "0px", md: "20px", lg: "40px" },
                marginTop: "20px",
                width: "70%",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "black",
                    }}
                  >
                    Job Vacancy Name: <span>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Job Vacancy Name"
                    value={vacancyName}
                    onChange={(e) => setVacancyName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "& input": {
                          color: "black",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "black",
                    }}
                  >
                    Job ID: <span>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Job ID"
                    value={jobId}
                    onChange={(e) => setJobId(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "& input": {
                          color: "black",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "black",
                    }}
                  >
                    Job Link: <span>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Job Link"
                    value={jobLink}
                    onChange={(e) => setJobLink(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "& input": {
                          color: "black",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#687ce9",
                      color: "white",
                      width: "100%",
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Grid>
              </Grid>
              <Typography
                variant="body2"
                style={{
                  marginTop: "20px",
                  textAlign: "start",
                  color: "black",
                }}
              >
                Please make sure the information entered is correct and latest
                to ensure smooth referral process.
              </Typography>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              sx={{ "& .MuiDialog-paper": { borderRadius: "15px" } }}
            >
              <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
                <Typography variant="h6">Confirm Submission</Typography>
              </DialogTitle>
              <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Are you sure all entries are correct?
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 3 }}
                  >
                    By confirming, 1 credit point will be deducted from your
                    account.
                  </Typography>
                  <Box
                    component="img"
                    src="/images/logo_trademarked.png"
                    alt="Confirmation Icon"
                    sx={{ width: "60px", height: "60px", mb: 2 }}
                  />
                </Box>
              </DialogContent>
              <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
                <Button
                  onClick={() => setOpenDialog(false)}
                  color="error"
                  variant="outlined"
                  sx={{ borderRadius: "10px" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmSubmit}
                  color="primary"
                  variant="contained"
                  sx={{ borderRadius: "10px" }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
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

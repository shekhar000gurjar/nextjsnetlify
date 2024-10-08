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

//------------------------------------------------------------------------------

// "use client";
// import React, { Suspense, useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   FormControl,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Button,
//   CircularProgress,
//   Paper,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { useSearchParams, useRouter } from "next/navigation";
// import { postResponse } from "../components/_apihandler";
// import MainLayout from "../layouts/MainLayout";

// function CompanyPageComponent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [companyName, setCompanyName] = useState("");
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const name = searchParams.get("name");
//     if (name) {
//       allUserList(name);
//       setCompanyName(name);
//     }
//   }, [searchParams]);

//   const allUserList = async (name) => {
//     setLoading(true);
//     try {
//       const user = localStorage.getItem("user");
//       const parsedUser = JSON.parse(user);
//       const loggedInUserId = parsedUser._id;
//       const response = await postResponse("/api/user-list", {
//         company_name: name,
//       });
//       if (response.status === 200 && response.data) {
//         const filteredUsers = response.data.data.filter(
//           (user) => user._id !== loggedInUserId
//         );
//         setUsers(filteredUsers);
//       } else {
//         setUsers([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRadioChange = (event) => {
//     setSelectedUser(event.target.value);
//   };

//   const handleNextClick = () => {
//     if (selectedUser) {
//       router.push(`/send-request?userId=${selectedUser}`);
//     } else {
//       alert("Please select a user");
//     }
//   };

//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//   };

//   return (
//     <MainLayout
//       homeIcon={true}
//       headerText={"Select Member"}
//       homeIconSide={"left"}
//       page={"company-page"}
//     >
//       <Box
//         className="reBg"
//         pb={10}
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//       >
//         <Paper
//           sx={{
//             marginTop: "20px",
//             padding: "20px",
//             color: "white",
//             backgroundColor: "#3f51b5",
//             borderRadius: "10px",
//             textAlign: "center",
//             width: "80%",
//             maxWidth: "500px",
//           }}
//         >
//           <Typography variant="h5">
//             {capitalizeFirstLetter(companyName)}
//           </Typography>
//         </Paper>
//         <Paper
//           sx={{
//             backgroundColor: "rgba(240, 236, 236, 0.43)",
//             padding: "20px",
//             borderRadius: "15px",
//             marginTop: "20px",
//             width: "80%",
//             maxWidth: "500px",
//           }}
//         >
//           {loading ? (
//             <Box
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               height="100%"
//             >
//               <CircularProgress />
//             </Box>
//           ) : (
//             <FormControl component="fieldset" sx={{ width: "100%" }}>
//               <Typography variant="subtitle1" gutterBottom align="center">
//                 List of users registered with their current company as{" "}
//                 {`'${companyName}'`}
//               </Typography>
//               <RadioGroup
//                 name="userSelection"
//                 value={selectedUser}
//                 onChange={handleRadioChange}
//               >
//                 {users.length > 0 ? (
//                   users.map((user, index) => (
//                     <FormControlLabel
//                       key={index}
//                       value={user._id}
//                       control={<Radio />}
//                       label={`${user.first_name} ${user.last_name} - ${user.current_location}`}
//                     />
//                   ))
//                 ) : (
//                   <Typography variant="body1" align="center">
//                     No users found
//                   </Typography>
//                 )}
//               </RadioGroup>
//             </FormControl>
//           )}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               marginTop: "20px",
//             }}
//           >
//             <Button
//               sx={{ borderRadius: "20px", backgroundColor: "#3f51b5" }}
//               variant="contained"
//               endIcon={<ArrowForwardIcon />}
//               onClick={handleNextClick}
//               disabled={!selectedUser} // Disable the button if no user is selected
//             >
//               Next
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </MainLayout>
//   );
// }

// export default function CompanyPage() {
//   return (
//     <Suspense fallback={<CircularProgress />}>
//       <CompanyPageComponent />
//     </Suspense>
//   );
// }

"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Avatar,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSearchParams, useRouter } from "next/navigation";
import { postResponse } from "../components/_apihandler";
import MainLayout from "../layouts/MainLayout";

function CompanyPageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const name = searchParams.get("name");
    if (name) {
      allUserList(name);
      setCompanyName(name);
    }
  }, [searchParams]);

  const allUserList = async (name) => {
    setLoading(true);
    try {
      const user = localStorage.getItem("user");
      const parsedUser = JSON.parse(user);
      const loggedInUserId = parsedUser._id;
      const response = await postResponse("/api/user-list", {
        company_name: name,
      });
      if (response.status === 200 && response.data) {
        const filteredUsers = response.data.data.filter(
          (user) => user._id !== loggedInUserId
        );
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

  const calculateTimeAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate - createdDate;

    const differenceInYears = differenceInTime / (1000 * 60 * 60 * 24 * 365);
    const differenceInMonths = differenceInTime / (1000 * 60 * 60 * 24 * 30);
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
    const differenceInHours = differenceInTime / (1000 * 60 * 60);

    if (differenceInYears >= 1) {
      return `${Math.floor(differenceInYears)} years ago`;
    } else if (differenceInMonths >= 1) {
      return `${Math.floor(differenceInMonths)} months ago`;
    } else if (differenceInDays >= 1) {
      return `${Math.floor(differenceInDays)} days ago`;
    } else {
      return `${Math.floor(differenceInHours)} hours ago`;
    }
  };

  const handleCheckboxChange = (event) => {
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
    <MainLayout
      homeIcon={true}
      headerText={"Select Member"}
      homeIconSide={"left"}
      page={"company-page"}
    >
      <Box
        pb={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ padding: "20px", width: "100%", color:'black' }}
      >
        {/* <Paper
          sx={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            textAlign: "center",
            width: "80%",
            maxWidth: "1200px",
          }}
        > */}
        <Typography variant="h5">
          {capitalizeFirstLetter(companyName)}
        </Typography>
        {/* </Paper> */}
        <Paper
          sx={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "15px",
            marginTop: "20px",
            width: {xs:"90%", md:"70%"},
            maxWidth: "1200px",
            color:'black'
          }}
        >
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          ) : (
            <FormControl component="fieldset" sx={{ width: "100%" }}>
              {/* <Typography variant="subtitle1" gutterBottom align="center">
                Select a member from the company: {companyName}
              </Typography> */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, color:'black' }}>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #e0e0e0",
                        padding: {xs:"15px 0px", md:"15px 40px"},
                      }}
                    >
                      <Avatar
                        alt={user.first_name}
                        src={user.profile_picture_url}
                        sx={{ width: 60, height: 60, marginRight: "15px" }}
                      />
                      <Box flexGrow={1}>
                        <Typography variant="h6">
                          {user.first_name} {user.last_name}
                        </Typography>
                        <Typography variant="body2">
                          Sector - {user.sector} | Referrals -{" "}
                          {user && user?.referrals ? user?.referrals : " "} || |
                          Joined {calculateTimeAgo(user.createdAt)} years ago
                        </Typography>
                        <Typography variant="body2">
                          {user.current_location}
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={user._id}
                            checked={selectedUser === user._id}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label=""
                      />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" align="center">
                    No users found
                  </Typography>
                )}
              </Box>
            </FormControl>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              sx={{
                borderRadius: "20px",
                backgroundColor: "#6279f9",
                width: "80%",
                height: "50px",
                fontWeight: "bold",
              }}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNextClick}
              disabled={!selectedUser} // Disable the button if no user is selected
            >
              NEXT
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

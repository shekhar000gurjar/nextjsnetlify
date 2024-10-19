// "use client";
// import React, { useState, useEffect } from 'react';
// import { Box, Container, Grid, Typography, Paper, Stack, InputBase, IconButton, Button } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import HomeIcon from '@mui/icons-material/Home';
// import { getResponse } from '../components/_apihandler';
// import { useRouter } from "next/navigation"; // Import useRouter

// const SearchPage = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [companies, setCompanies] = useState([]);
//     const router = useRouter();  // Initialize useRouter

//     const filteredCompanies = companies.filter(company =>
//         company.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     useEffect(() => {
//         allCompanies();
//     }, []);

//     const allCompanies = async () => {
//         try {
//             const response = await getResponse("/api/allusers");
//             console.log("response", response);
//             if (response.status === 200 && response.data) {
//                 const companyNames = [...new Set(response.data.data.map(user => user.currentCompanyName))];
//                 setCompanies(companyNames);
//             } else {
//                 setCompanies([]);
//             }
//         } catch (error) {
//             console.log(error, "errr");
//             setCompanies([]);
//         }
//     };

//     const handleCompanyClick = (companyName) => {
//         router.push(`/company-page?name=${encodeURIComponent(companyName)}`);
//     };

//     const handleHomeClick = () => {
//         router.push('/home');
//     };

//     return (
//         <div>
//             <Box className='reBg' sx={{ paddingBottom: '80px' }}>
//                 <Box mt={2}>
//                     <Container>
//                         <Grid container justifyContent="center" spacing={5} sx={{ paddingX: 6 }}>
//                             <Grid item xs={12} sm={6}>
//                                 <Box
//                                     sx={{
//                                         padding: '5px',
//                                         color: 'white',
//                                         backgroundColor: '#bbbbdf',
//                                         borderRadius: '10px',
//                                     }}
//                                 >
//                                     <Typography>
//                                         Search for companies & apply for referral
//                                     </Typography>

//                                 </Box>
//                                 <IconButton onClick={handleHomeClick} aria-label="home" sx={{ marginLeft: '100%', marginTop: '-15%' }}>
//                                     <HomeIcon sx={{ color: 'white' }} />
//                                 </IconButton>
//                                 <Paper sx={{ marginTop: 1, paddingX: 2, paddingY: 4, borderRadius: 3, height: '100%' }}>
//                                     <Stack spacing={2} marginBottom={4}>
//                                         <Grid container alignItems="center" spacing={2}>
//                                             <Grid item xs>
//                                                 <Paper
//                                                     component="form"
//                                                     sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: '#bbbbdf' }}
//                                                 >
//                                                     <InputBase
//                                                         sx={{ marginLeft: 1, flex: 1, color: 'white' }}
//                                                         placeholder="Search for companies..."
//                                                         value={searchTerm}
//                                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                                         inputProps={{ 'aria-label': 'Search for companies...' }}
//                                                     />
//                                                     <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
//                                                         <SearchIcon sx={{ color: 'white' }} />
//                                                     </IconButton>
//                                                 </Paper>
//                                             </Grid>
//                                             <Grid item>
//                                                 <Button variant="contained" sx={{ color: 'white', backgroundColor: '#bbbbdf' }}>
//                                                     Sector
//                                                 </Button>
//                                             </Grid>
//                                         </Grid>
//                                     </Stack>
//                                     <Box sx={{ padding: 2, backgroundColor: '#bbbbdf', maxHeight: '300px', overflowY: 'auto' }}>
//                                         {filteredCompanies.map((company, index) => (
//                                             <a
//                                                 key={index}
//                                                 // href="#"
//                                                 onClick={() => handleCompanyClick(company)}
//                                                 style={{
//                                                     display: 'block',
//                                                     margin: '10px 0',
//                                                     padding: '10px',
//                                                     fontSize: '18px',
//                                                     color: 'white',
//                                                     textDecoration: 'none',
//                                                     borderRadius: '5px',
//                                                     transition: 'background-color 0.3s ease',
//                                                     cursor: 'pointer',  // Add cursor pointer to indicate it's clickable
//                                                 }}
//                                             >
//                                                 {company}
//                                             </a>
//                                         ))}
//                                     </Box>
//                                 </Paper>
//                             </Grid>
//                         </Grid>
//                     </Container>
//                 </Box>
//             </Box>
//         </div>
//     );
// };

// export default SearchPage;

// "use client";
// import React, { useState, useEffect } from 'react';
// import { Box, Container, Grid, Typography, Paper, Stack, InputBase, IconButton, Button } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import HomeIcon from '@mui/icons-material/Home';
// import { getResponse } from '../components/_apihandler';
// import { useRouter } from "next/navigation"; // Import useRouter
// import MainLayout from '../layouts/MainLayout';

// const SearchPage = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [companies, setCompanies] = useState([]);
//     const router = useRouter();  // Initialize useRouter

//     const filteredCompanies = companies.filter(company =>
//         company.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     useEffect(() => {
//         allCompanies();
//     }, []);

//     const allCompanies = async () => {
//         try {
//             const response = await getResponse("/api/allusers");
//             console.log("response", response);
//             if (response.status === 200 && response.data) {
//                 const companyNames = [...new Set(response.data.data
//                     .map(user => user.currentCompanyName)
//                     .filter(companyName => companyName && companyName.trim() !== '')
//                 )];
//                 setCompanies(companyNames);
//             } else {
//                 setCompanies([]);
//             }
//         } catch (error) {
//             console.log(error, "errr");
//             setCompanies([]);
//         }
//     };

//     const handleCompanyClick = (companyName) => {
//         router.push(`/company-page?name=${encodeURIComponent(companyName)}`);
//     };

//     const handleHomeClick = () => {
//         router.push('/home');
//     };

//     const capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//     };

//     return (
//         <MainLayout>
//             <div>
//                 <Box className='reBg' sx={{ paddingBottom: '80px' }}>
//                     <Box mt={2}>
//                         <Container>
//                             <Grid container justifyContent="center" spacing={5} sx={{ paddingX: 6 }}>
//                                 <Grid item xs={12} sm={6}>
//                                     <Box
//                                         sx={{
//                                             padding: '5px',
//                                             color: 'white',
//                                             backgroundColor: '#bbbbdf',
//                                             borderRadius: '10px',
//                                         }}
//                                     >
//                                         <Typography>
//                                             Search for companies & apply for referral
//                                         </Typography>

//                                     </Box>
//                                     <IconButton onClick={handleHomeClick} aria-label="home" sx={{ marginLeft: '100%', marginTop: '-15%' }}>
//                                         <HomeIcon sx={{ color: 'white' }} />
//                                     </IconButton>
//                                     <Paper sx={{ marginTop: 1, paddingX: 2, paddingY: 4, borderRadius: 3, height: '100%' }}>
//                                         <Stack spacing={2} marginBottom={4}>
//                                             <Grid container alignItems="center" spacing={2}>
//                                                 <Grid item xs>
//                                                     <Paper
//                                                         component="form"
//                                                         sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: '#bbbbdf' }}
//                                                     >
//                                                         <InputBase
//                                                             sx={{ marginLeft: 1, flex: 1, color: 'white' }}
//                                                             placeholder="Search for companies..."
//                                                             value={searchTerm}
//                                                             onChange={(e) => setSearchTerm(e.target.value)}
//                                                             inputProps={{ 'aria-label': 'Search for companies...' }}
//                                                         />
//                                                         <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
//                                                             <SearchIcon sx={{ color: 'white' }} />
//                                                         </IconButton>
//                                                     </Paper>
//                                                 </Grid>
//                                                 <Grid item>
//                                                     <Button variant="contained" sx={{ color: 'white', backgroundColor: '#bbbbdf' }}>
//                                                         Sector
//                                                     </Button>
//                                                 </Grid>
//                                             </Grid>
//                                         </Stack>
//                                         <Box sx={{ padding: 2, backgroundColor: '#bbbbdf', maxHeight: '300px', overflowY: 'auto' }}>
//                                             {filteredCompanies.map((company, index) => (
//                                                 <a
//                                                     key={index}
//                                                     onClick={() => handleCompanyClick(company)}
//                                                     style={{
//                                                         display: 'block',
//                                                         margin: '10px 0',
//                                                         padding: '10px',
//                                                         fontSize: '18px',
//                                                         color: 'white',
//                                                         textDecoration: 'none',
//                                                         borderRadius: '5px',
//                                                         transition: 'background-color 0.3s ease',
//                                                         cursor: 'pointer',  // Add cursor pointer to indicate it's clickable
//                                                     }}
//                                                 >
//                                                     {capitalizeFirstLetter(company)}
//                                                 </a>
//                                             ))}
//                                         </Box>
//                                     </Paper>
//                                 </Grid>
//                             </Grid>
//                         </Container>
//                     </Box>
//                 </Box>
//             </div>
//         </MainLayout>
//     );
// };

// export default SearchPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Stack,
//   InputBase,
//   IconButton,
//   Button,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import HomeIcon from "@mui/icons-material/Home";
// import { getResponse } from "../components/_apihandler";
// import { useRouter } from "next/navigation";
// import MainLayout from "../layouts/MainLayout";
// import ReferPointsPopup from "../register/ReferPointsPopup";

// const SearchPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [companies, setCompanies] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [referPoints, setReferPoints] = useState(0);
//   const router = useRouter();

//   const filteredCompanies = companies.filter((company) =>
//     company.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     allCompanies();
//   }, []);

//   useEffect(() => {
//     const showPopupFlag = JSON.parse(localStorage.getItem("showPopup"));
//     const showReferFlag = JSON.parse(localStorage.getItem("referPoints"));
//     if (showPopupFlag === true) {
//       setShowPopup(showPopupFlag);
//       setReferPoints(showReferFlag);
//       localStorage.removeItem("showPopup"); // Clear the flag after showing the popup
//       localStorage.removeItem("referPoints"); // Clear the flag after showing the popup
//     }
//   }, []);

//   const allCompanies = async () => {
//     try {
//       const response = await getResponse("/api/allusers");
//       if (response.status === 200 && response.data) {
//         const companyNames = [
//           ...new Set(
//             response.data.data
//               .map((user) => user.currentCompanyName)
//               .filter((companyName) => companyName && companyName.trim() !== "")
//           ),
//         ];
//         setCompanies(companyNames);
//       } else {
//         setCompanies([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setCompanies([]);
//     }
//   };

//   const handleCompanyClick = (companyName) => {
//     router.push(`/company-page?name=${encodeURIComponent(companyName)}`);
//   };

//   const handleHomeClick = () => {
//     router.push("/home");
//   };

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
// };

//   return (
//     <MainLayout
//       homeIcon={true}
//       headerText={"Search for companies & apply for referral"}
//       homeIconSide={"right"}
//       page={"search-company"}
//     >
//       <Box className="reBg" sx={{ paddingBottom: "80px" }}>
//         <Box mt={2}>
//           <Container>
//             <Grid container justifyContent="center" spacing={5}>
//               <Grid item xs={12} sm={10} md={8}>
//                 <Box
//                   sx={{
//                     padding: "10px",
//                     color: "white",
//                     backgroundColor: "#3f51b5",
//                     borderRadius: "10px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Typography variant="h6">
//                     Search for companies & apply for referral
//                   </Typography>
//                   <IconButton onClick={handleHomeClick} aria-label="home">
//                     <HomeIcon sx={{ color: "white" }} />
//                   </IconButton>
//                 </Box>
//                 <Paper sx={{ marginTop: 2, padding: 2, borderRadius: 3 }}>
//                   <Stack spacing={2}>
//                     <Paper
//                       component="form"
//                       sx={{
//                         padding: "2px 4px",
//                         display: "flex",
//                         alignItems: "center",
//                       }}
//                     >
//                       <InputBase
//                         sx={{ marginLeft: 1, flex: 1 }}
//                         placeholder="Search for companies..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         inputProps={{ "aria-label": "Search for companies..." }}
//                       />
//                       <IconButton
//                         type="submit"
//                         sx={{ p: "10px" }}
//                         aria-label="search"
//                       >
//                         <SearchIcon />
//                       </IconButton>
//                     </Paper>
//                     <Box
//                       sx={{
//                         padding: 2,
//                         maxHeight: "300px",
//                         overflowY: "auto",
//                         backgroundColor: "#f1f1f1",
//                         borderRadius: "10px",
//                       }}
//                     >
//                       {filteredCompanies.map((company, index) => (
//                         <Box
//                           key={index}
//                           onClick={() => handleCompanyClick(company)}
//                           sx={{
//                             padding: "10px",
//                             margin: "5px 0",
//                             fontSize: "18px",
//                             color: "#3f51b5",
//                             backgroundColor: "white",
//                             borderRadius: "5px",
//                             cursor: "pointer",
//                             "&:hover": {
//                               backgroundColor: "#3f51b5",
//                               color: "white",
//                             },
//                             transition:
//                               "background-color 0.3s ease, color 0.3s ease",
//                           }}
//                         >
//                           {capitalizeFirstLetter(company)}
//                         </Box>
//                       ))}
//                     </Box>
//                   </Stack>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>
//       </Box>
//       <ReferPointsPopup
//         open={showPopup}
//         onClose={() => setShowPopup(false)}
//         points={referPoints}
//       />
//     </MainLayout>
//   );
// };

// export default SearchPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Stack,
//   InputBase,
//   IconButton,
//   Button,
//   Chip,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import HomeIcon from "@mui/icons-material/Home";
// import BusinessIcon from "@mui/icons-material/Business";
// import AddIcon from "@mui/icons-material/Add";
// import { getResponse } from "../components/_apihandler";
// import { useRouter } from "next/navigation";
// import MainLayout from "../layouts/MainLayout";
// import ReferPointsPopup from "../register/ReferPointsPopup";

// const SearchPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [companies, setCompanies] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [referPoints, setReferPoints] = useState(0);
//   const router = useRouter();

//   const filteredCompanies = companies.filter((company) =>
//     company.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     allCompanies();
//   }, []);

//   useEffect(() => {
//     const showPopupFlag = JSON.parse(localStorage.getItem("showPopup"));
//     const showReferFlag = JSON.parse(localStorage.getItem("referPoints"));
//     if (showPopupFlag === true) {
//       setShowPopup(showPopupFlag);
//       setReferPoints(showReferFlag);
//       localStorage.removeItem("showPopup");
//       localStorage.removeItem("referPoints");
//     }
//   }, []);

//   const allCompanies = async () => {
//     try {
//       const response = await getResponse("/api/allusers");
//       if (response.status === 200 && response.data) {
//         const companyData = response.data.data.map((user) => ({
//           name: user.currentCompanyName,
//           sector: user.sector || "Uncategorized",
//         }));
//         const uniqueCompanies = [
//           ...new Map(companyData.map((item) => [item.name, item])).values(),
//         ]; // Remove duplicates
//         setCompanies(uniqueCompanies);
//       } else {
//         setCompanies([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setCompanies([]);
//     }
//   };

//   const handleCompanyClick = (companyName) => {
//     router.push(`/company-page?name=${encodeURIComponent(companyName)}`);
//   };

//   const handleHomeClick = () => {
//     router.push("/home");
//   };

//   return (
//     <MainLayout
//       homeIcon={true}
//       headerText={"Search for companies & apply for referral"}
//       homeIconSide={"right"}
//       page={"search-company"}
//     >
//       <Box className="reBg" sx={{ paddingBottom: "80px" }}>
//         <Box mt={2}>
//           <Container>
//             <Grid container justifyContent="center" spacing={3}>
//               <Grid item xs={12} sm={12} md={6}>
//                 {/* Search Input */}
//                 <Paper
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: "10px 15px",
//                     borderRadius: "25px",
//                     border: "1px solid #ccc",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                     mb: 2,
//                   }}
//                 >
//                   <SearchIcon sx={{ color: "#aaa", mr: 2 }} />
//                   <InputBase
//                     sx={{ flex: 1, fontSize: "16px" }}
//                     placeholder="Search for companies..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </Paper>

//                 {/* Filter Options */}
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//                   <Chip label="All Sectors" variant="outlined" />
//                   <Chip label="Technology" variant="outlined" />
//                   <Chip label="Finance" variant="outlined" />
//                   <Chip label="Healthcare" variant="outlined" />
//                   <Chip label="Retail" variant="outlined" />
//                 </Box>

//                 {/* Company List */}
//                 <Box
//                   sx={{
//                     maxHeight: "400px",
//                     overflowY: "auto",
//                     backgroundColor: "#f9f9f9",
//                     padding: "10px",
//                     borderRadius: "10px",
//                     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                   }}
//                 >
//                   {filteredCompanies.map((company, index) => (
//                     <Box
//                       key={index}
//                       onClick={() => handleCompanyClick(company.name)}
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         padding: "10px",
//                         margin: "5px 0",
//                         backgroundColor: "white",
//                         borderRadius: "8px",
//                         cursor: "pointer",
//                         "&:hover": {
//                           backgroundColor: "#f0f0f0",
//                         },
//                         transition: "background-color 0.2s ease-in-out",
//                       }}
//                     >
//                       <Stack direction="row" alignItems="center" spacing={2}>
//                         <BusinessIcon
//                           sx={{
//                             color: "#3f51b5",
//                             fontSize: "24px",
//                             backgroundColor: "#f1f1f1",
//                             borderRadius: "8px",
//                             padding: "8px",
//                           }}
//                         />
//                         <Box>
//                           <Typography
//                             variant="body1"
//                             sx={{ fontWeight: "bold" }}
//                           >
//                             {company.name}
//                           </Typography>
//                           <Typography variant="caption">
//                             {company.sector}
//                           </Typography>
//                         </Box>
//                       </Stack>
//                       <IconButton>
//                         <AddIcon sx={{ color: "#3f51b5" }} />
//                       </IconButton>
//                     </Box>
//                   ))}
//                 </Box>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>
//       </Box>
//       <ReferPointsPopup
//         open={showPopup}
//         onClose={() => setShowPopup(false)}
//         points={referPoints}
//       />
//     </MainLayout>
//   );
// };

// export default SearchPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Stack,
//   InputBase,
//   IconButton,
//   Button,
//   Chip,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import HomeIcon from "@mui/icons-material/Home";
// import BusinessIcon from "@mui/icons-material/Business";
// import AddIcon from "@mui/icons-material/Add";
// import { getResponse } from "../components/_apihandler";
// import { useRouter } from "next/navigation";
// import MainLayout from "../layouts/MainLayout";
// import ReferPointsPopup from "../register/ReferPointsPopup";

// const SearchPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [companies, setCompanies] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [referPoints, setReferPoints] = useState(0);
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const router = useRouter();

//   const filteredCompanies = companies.filter((company) =>
//     company.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     allCompanies();
//   }, []);

//   useEffect(() => {
//     const showPopupFlag = JSON.parse(localStorage.getItem("showPopup"));
//     const showReferFlag = JSON.parse(localStorage.getItem("referPoints"));
//     if (showPopupFlag === true) {
//       setShowPopup(showPopupFlag);
//       setReferPoints(showReferFlag);
//       localStorage.removeItem("showPopup");
//       localStorage.removeItem("referPoints");
//     }
//   }, []);

//   const allCompanies = async () => {
//     try {
//       const response = await getResponse("/api/allusers");
//       if (response.status === 200 && response.data) {
//         const companyData = response.data.data.map((user) => ({
//           name: user.currentCompanyName,
//           sector: user.sector || "Uncategorized",
//         }));
//         const uniqueCompanies = [
//           ...new Map(companyData.map((item) => [item.name, item])).values(),
//         ]; // Remove duplicates
//         setCompanies(uniqueCompanies);
//       } else {
//         setCompanies([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setCompanies([]);
//     }
//   };

//   const handleCompanyClick = (companyName) => {
//     router.push(`/company-page?name=${encodeURIComponent(companyName)}`);
//   };

//   const handleHomeClick = () => {
//     router.push("/home");
//   };

//   const handleFilterToggle = (filter) => {
//     if (selectedFilters.includes(filter)) {
//       setSelectedFilters(selectedFilters.filter((f) => f !== filter));
//     } else {
//       setSelectedFilters([...selectedFilters, filter]);
//     }
//   };

//   return (
//     <MainLayout
//       homeIcon={true}
//       headerText={"Search for companies & apply for referral"}
//       homeIconSide={"right"}
//       page={"search-company"}
//     >
//       <Box  >
//         <Box mt={2}>
//           <Container>
//             <Grid container justifyContent="center" spacing={3}>
//               <Grid item xs={12} sm={12} md={10} lg={8}>
//                 {/* Search Input */}
//                 <Paper
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: "10px 15px",
//                     borderRadius: "25px",
//                     border: "1px solid #ccc",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                     mb: 2,
//                     backgroundColor: "#fff",
//                   }}
//                 >
//                   <SearchIcon sx={{ color: "#aaa", mr: 2 }} />
//                   <InputBase
//                     sx={{ flex: 1, fontSize: "16px", color: "#333" }}
//                     placeholder="Search for companies..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </Paper>

//                 {/* Filter Options */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: 1,
//                     mb: 2,
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Chip
//                     label="All Sectors"
//                     variant={selectedFilters.includes("All Sectors") ? "filled" : "outlined"}
//                     onClick={() => handleFilterToggle("All Sectors")}
//                   />
//                   <Chip
//                     label="Technology"
//                     variant={selectedFilters.includes("Technology") ? "filled" : "outlined"}
//                     onClick={() => handleFilterToggle("Technology")}
//                   />
//                   <Chip
//                     label="Finance"
//                     variant={selectedFilters.includes("Finance") ? "filled" : "outlined"}
//                     onClick={() => handleFilterToggle("Finance")}
//                   />
//                   <Chip
//                     label="Healthcare"
//                     variant={selectedFilters.includes("Healthcare") ? "filled" : "outlined"}
//                     onClick={() => handleFilterToggle("Healthcare")}
//                   />
//                   <Chip
//                     label="Retail"
//                     variant={selectedFilters.includes("Retail") ? "filled" : "outlined"}
//                     onClick={() => handleFilterToggle("Retail")}
//                   />
//                 </Box>

//                 {/* Company List */}
//                 <Box
//                   sx={{
//                     maxHeight: "400px",
//                     overflowY: "auto",
//                     backgroundColor: "#f9f9f9",
//                     padding: "10px",
//                     borderRadius: "10px",
//                     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                   }}
//                 >
//                   {filteredCompanies.map((company, index) => (
//                     <Box
//                       key={index}
//                       onClick={() => handleCompanyClick(company.name)}
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         padding: "10px",
//                         margin: "5px 0",
//                         backgroundColor: "white",
//                         borderRadius: "8px",
//                         cursor: "pointer",
//                         "&:hover": {
//                           backgroundColor: "#f0f0f0",
//                         },
//                         transition: "background-color 0.2s ease-in-out",
//                       }}
//                     >
//                       <Stack direction="row" alignItems="center" spacing={2}>
//                         <BusinessIcon
//                           sx={{
//                             color: "#3f51b5",
//                             fontSize: "24px",
//                             backgroundColor: "#f1f1f1",
//                             borderRadius: "8px",
//                             padding: "8px",
//                           }}
//                         />
//                         <Box>
//                           <Typography
//                             variant="body1"
//                             sx={{ fontWeight: "bold", color: "#333" }}
//                           >
//                             {company.name}
//                           </Typography>
//                           <Typography variant="caption" sx={{ color: "#666" }}>
//                             {company.sector}
//                           </Typography>
//                         </Box>
//                       </Stack>
//                       <IconButton>
//                         <AddIcon sx={{ color: "#3f51b5" }} />
//                       </IconButton>
//                     </Box>
//                   ))}
//                 </Box>

//                 {/* Action Button */}
//                 <Box
//                   sx={{
//                     mt: 2,
//                     display: "flex",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     sx={{
//                       backgroundColor: "#3f51b5",
//                       textTransform: "none",
//                       borderRadius: "25px",
//                       padding: "10px 20px",
//                     }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>
//       </Box>
//       <ReferPointsPopup
//         open={showPopup}
//         onClose={() => setShowPopup(false)}
//         points={referPoints}
//       />
//     </MainLayout>
//   );
// };

// export default SearchPage;

"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Stack,
  InputBase,
  IconButton,
  Button,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ComputerIcon from "@mui/icons-material/Computer";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GovernmentIcon from "@mui/icons-material/AccountBalance";
import StoreIcon from "@mui/icons-material/Store";
import MarketingIcon from "@mui/icons-material/Campaign";
import EducationIcon from "@mui/icons-material/School";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HotelIcon from "@mui/icons-material/Hotel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { getResponse } from "../components/_apihandler";
import { useRouter } from "next/navigation";
import MainLayout from "../layouts/MainLayout";
import ReferPointsPopup from "../register/ReferPointsPopup";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import BusinessIcon from "@mui/icons-material/Business";

// Define sector icons for each sector
const sectorIcons = {
  "IT & Technology": <ComputerIcon />,
  Service: <BusinessCenterIcon />,
  Government: <GovernmentIcon />,
  "Startup or Product based": <ApartmentIcon />,
  "Digital Media Marketing": <MarketingIcon />,
  Sales: <BusinessCenterIcon />,
  Marketing: <MarketingIcon />,
  Education: <EducationIcon />,
  Textile: <EngineeringIcon />,
  Hospitality: <HotelIcon />,
  Civil: <EngineeringIcon />,
  Uncategorized: <BusinessCenterIcon />,
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [referPoints, setReferPoints] = useState(0);
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const router = useRouter();

  useEffect(() => {
    allCompanies();
  }, []);

  useEffect(() => {
    const showPopupFlag = JSON.parse(localStorage.getItem("showPopup"));
    const showReferFlag = JSON.parse(localStorage.getItem("referPoints"));
    if (showPopupFlag === true) {
      setShowPopup(showPopupFlag);
      setReferPoints(showReferFlag);
      localStorage.removeItem("showPopup");
      localStorage.removeItem("referPoints");
    }
  }, []);

  const allCompanies = async () => {
    try {
      const response = await getResponse("/api/allusers");
      if (response.status === 200 && response.data) {
        const companyData = response.data.data.map((user) => ({
          name: user.currentCompanyName || "Unknown",
          sector: user.sector || "Uncategorized",
        }));
        const uniqueCompanies = [
          ...new Map(companyData.map((item) => [item.name, item])).values(),
        ]; // Remove duplicates
        setCompanies(uniqueCompanies);
      } else {
        setCompanies([]);
      }
    } catch (error) {
      console.error(error);
      setCompanies([]);
    }
  };

  const handleCompanyClick = (companyName) => {
    router.push(`/company-page?name=${encodeURIComponent(companyName)}`);
  };

  const handleFilterSelect = (sector) => {
    if (sector === "All Sectors") {
      setSelectedSector("All Sectors");
    } else {
      setSelectedSector(sector);
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSector =
      selectedSector === "All Sectors" || selectedSector === company.sector;
    return matchesSearch && matchesSector;
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <MainLayout
      homeIcon={true}
      headerText={"Search for companies & apply for referral"}
      homeIconSide={"right"}
      page={"search-company"}
    >
      <Box>
        <Box mt={2}>
          <Container>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={12} sm={12} md={10} lg={8}>
                {/* Search Input */}
                <Paper
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "6px 10px",
                    borderRadius: "15px",
                    border: "1px solid #ccc",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    mb: 2,
                    backgroundColor: "#fff",
                  }}
                >
                  <SearchIcon sx={{ color: "#757575", mr: 2 }} />
                  <InputBase
                    sx={{ flex: 1, fontSize: "16px", color: "#757575" }}
                    placeholder="Search for companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Paper>

                {/* Filter Options with Sector Icons */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 2,
                    justifyContent: "center",
                  }}
                >
                  {[
                    { label: "All Sectors", icon: <HomeOutlinedIcon /> },
                    { label: "IT & Technology", icon: <ComputerIcon /> },
                    { label: "Service", icon: <BusinessCenterIcon /> },
                    { label: "Government", icon: <GovernmentIcon /> },
                    {
                      label: "Startup or Product based",
                      icon: <ApartmentIcon />,
                    },
                    {
                      label: "Digital Media Marketing",
                      icon: <MarketingIcon />,
                    },
                    { label: "Sales", icon: <BusinessCenterIcon /> },
                    { label: "Marketing", icon: <MarketingIcon /> },
                    { label: "Education", icon: <EducationIcon /> },
                    { label: "Textile", icon: <EngineeringIcon /> },
                    { label: "Hospitality", icon: <HotelIcon /> },
                    { label: "Civil", icon: <EngineeringIcon /> },
                  ].map(({ label, icon }) => (
                    // <Chip
                    //   key={label}
                    //   label={label}
                    //   icon={icon}
                    //   deleteIcon={<ExpandMoreIcon />}
                    //   variant={selectedSector === label ? "filled" : "outlined"}
                    //   onClick={() => handleFilterSelect(label)}
                    // />
                    <Chip
                      key={label}
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "black",
                          }}
                        >
                          {label}
                          <KeyboardArrowDownOutlinedIcon sx={{ ml: 1 }} />
                        </Box>
                      }
                      icon={icon}
                      variant={selectedSector === label ? "filled" : "outlined"}
                      onClick={() => handleFilterSelect(label)}
                    />
                  ))}
                </Box>

                {/* Company List */}
                <Box
                  sx={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    backgroundColor: "#f9f9f9",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {filteredCompanies.map((company, index) => (
                    <Box
                      key={index}
                      onClick={() => handleCompanyClick(company.name)}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        margin: "5px 0",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                        },
                        transition: "background-color 0.2s ease-in-out",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            backgroundColor: "#f1f1f1",
                            padding: "8px",
                            borderRadius: "8px",
                            color: "#757575",
                          }}
                        >
                          {/* {sectorIcons[company.sector] ||
                            sectorIcons.Uncategorized} */}
                          <BusinessIcon />
                        </Box>
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", color: "#333" }}
                          >
                            {capitalizeFirstLetter(company.name)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>
                            {company.sector}
                          </Typography>
                        </Box>
                      </Stack>
                      <IconButton>
                        <ArrowForwardIosOutlinedIcon
                          size="medium"
                          sx={{
                            color: "#757575",
                            display: { xs: "none", sm: "none", md: "block" },
                          }}
                        />
                        <ArrowCircleLeftOutlinedIcon
                          sx={{
                            color: "#757575",
                            display: { xs: "block", sm: "block", md: "none" },
                          }}
                        />
                      </IconButton>
                    </Box>
                  ))}
                </Box>

                {/* Action Button */}
                {/* <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "#3f51b5",
                      textTransform: "none",
                      borderRadius: "25px",
                      padding: "10px 20px",
                    }}
                  >
                    Next
                  </Button>
                </Box> */}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <ReferPointsPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        points={referPoints}
      />
    </MainLayout>
  );
};

export default SearchPage;

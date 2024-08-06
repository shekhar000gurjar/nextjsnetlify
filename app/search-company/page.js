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


"use client";
import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Paper, Stack, InputBase, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { getResponse } from '../components/_apihandler';
import { useRouter } from "next/navigation";
import MainLayout from '../layouts/MainLayout';
import ReferPointsPopup from '../register/ReferPointsPopup';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [companies, setCompanies] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [referPoints, setReferPoints] = useState(0);
    const router = useRouter();

    const filteredCompanies = companies.filter(company =>
        company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        allCompanies();
    }, []);

    useEffect(() => {
        const showPopupFlag = JSON.parse(localStorage.getItem("showPopup"));
        const showReferFlag = JSON.parse(localStorage.getItem("referPoints"));
        if (showPopupFlag === true) {
            setShowPopup(showPopupFlag);
            setReferPoints(showReferFlag);
            localStorage.removeItem("showPopup"); // Clear the flag after showing the popup
            localStorage.removeItem("referPoints"); // Clear the flag after showing the popup

        }
    }, []);

    const allCompanies = async () => {
        try {
            const response = await getResponse("/api/allusers");
            if (response.status === 200 && response.data) {
                const companyNames = [...new Set(response.data.data
                    .map(user => user.currentCompanyName)
                    .filter(companyName => companyName && companyName.trim() !== '')
                )];
                setCompanies(companyNames);
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

    const handleHomeClick = () => {
        router.push('/home');
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <MainLayout>
            <Box className='reBg' sx={{ paddingBottom: '80px' }}>
                <Box mt={2}>
                    <Container>
                        <Grid container justifyContent="center" spacing={5}>
                            <Grid item xs={12} sm={10} md={8}>
                                <Box
                                    sx={{
                                        padding: '10px',
                                        color: 'white',
                                        backgroundColor: '#3f51b5',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography variant="h6">
                                        Search for companies & apply for referral
                                    </Typography>
                                    <IconButton onClick={handleHomeClick} aria-label="home">
                                        <HomeIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </Box>
                                <Paper sx={{ marginTop: 2, padding: 2, borderRadius: 3 }}>
                                    <Stack spacing={2}>
                                        <Paper
                                            component="form"
                                            sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center' }}
                                        >
                                            <InputBase
                                                sx={{ marginLeft: 1, flex: 1 }}
                                                placeholder="Search for companies..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                inputProps={{ 'aria-label': 'Search for companies...' }}
                                            />
                                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                                <SearchIcon />
                                            </IconButton>
                                        </Paper>
                                        <Box sx={{ padding: 2, maxHeight: '300px', overflowY: 'auto', backgroundColor: '#f1f1f1', borderRadius: '10px' }}>
                                            {filteredCompanies.map((company, index) => (
                                                <Box
                                                    key={index}
                                                    onClick={() => handleCompanyClick(company)}
                                                    sx={{
                                                        padding: '10px',
                                                        margin: '5px 0',
                                                        fontSize: '18px',
                                                        color: '#3f51b5',
                                                        backgroundColor: 'white',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: '#3f51b5',
                                                            color: 'white',
                                                        },
                                                        transition: 'background-color 0.3s ease, color 0.3s ease'
                                                    }}
                                                >
                                                    {capitalizeFirstLetter(company)}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Stack>
                                </Paper>
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





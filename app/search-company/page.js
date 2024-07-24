"use client";
import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Paper, Stack, InputBase, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { getResponse } from '../components/_apihandler';
import { useRouter } from "next/navigation"; // Import useRouter

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [companies, setCompanies] = useState([]);
    const router = useRouter();  // Initialize useRouter

    const filteredCompanies = companies.filter(company =>
        company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        allCompanies();
    }, []);

    const allCompanies = async () => {
        try {
            const response = await getResponse("/api/allusers");
            console.log("response", response);
            if (response.status === 200 && response.data) {
                const companyNames = [...new Set(response.data.data.map(user => user.currentCompanyName))];
                setCompanies(companyNames);
            } else {
                setCompanies([]);
            }
        } catch (error) {
            console.log(error, "errr");
            setCompanies([]);
        }
    };

    const handleCompanyClick = (companyName) => {
        router.push(`/company-page?name=${encodeURIComponent(companyName)}`);
    };

    const handleHomeClick = () => {
        router.push('/home');
    };

    return (
        <div>
            <Box className='reBg' sx={{ paddingBottom: '80px' }}>
                <Box mt={2}>
                    <Container>
                        <Grid container justifyContent="center" spacing={5} sx={{ paddingX: 6 }}>
                            <Grid item xs={12} sm={6}>
                                <Box
                                    sx={{
                                        padding: '5px',
                                        color: 'white',
                                        backgroundColor: '#bbbbdf',
                                        borderRadius: '10px',
                                    }}
                                >
                                    <Typography>
                                        Search for companies & apply for referral
                                    </Typography>

                                </Box>
                                <IconButton onClick={handleHomeClick} aria-label="home" sx={{ marginLeft: '100%', marginTop: '-15%' }}>
                                    <HomeIcon sx={{ color: 'white' }} />
                                </IconButton>
                                <Paper sx={{ marginTop: 1, paddingX: 2, paddingY: 4, borderRadius: 3, height: '100%' }}>
                                    <Stack spacing={2} marginBottom={4}>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item xs>
                                                <Paper
                                                    component="form"
                                                    sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: '#bbbbdf' }}
                                                >
                                                    <InputBase
                                                        sx={{ marginLeft: 1, flex: 1, color: 'white' }}
                                                        placeholder="Search for companies..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        inputProps={{ 'aria-label': 'Search for companies...' }}
                                                    />
                                                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                                        <SearchIcon sx={{ color: 'white' }} />
                                                    </IconButton>
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" sx={{ color: 'white', backgroundColor: '#bbbbdf' }}>
                                                    Sector
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                    <Box sx={{ padding: 2, backgroundColor: '#bbbbdf', maxHeight: '300px', overflowY: 'auto' }}>
                                        {filteredCompanies.map((company, index) => (
                                            <a
                                                key={index}
                                                // href="#"
                                                onClick={() => handleCompanyClick(company)}
                                                style={{
                                                    display: 'block',
                                                    margin: '10px 0',
                                                    padding: '10px',
                                                    fontSize: '18px',
                                                    color: 'white',
                                                    textDecoration: 'none',
                                                    borderRadius: '5px',
                                                    transition: 'background-color 0.3s ease',
                                                    cursor: 'pointer',  // Add cursor pointer to indicate it's clickable
                                                }}
                                            >
                                                {company}
                                            </a>
                                        ))}
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </div>
    );
};

export default SearchPage;





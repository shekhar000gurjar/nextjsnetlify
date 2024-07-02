// "use client"
// import { Typography } from "@mui/material";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function home() {
//   const router = useRouter();
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const user = localStorage.getItem('user');

//     if (token && user) {
//       try {
//         const parsedUser = JSON.parse(user);
//         // You can use parsedUser if needed
//       } catch (error) {
//         console.error('Failed to parse user from localStorage', error);
//         localStorage.removeItem('user');
//         router.push('/login');
//       }
//     } else {
//       router.push('/login');
//     }
//   }, []);


//   return (
//     <>

//       <Typography variant="h1">My Home page</Typography>
//     </>
//   )
// }




'use client';
import { Autocomplete, Box, Button, Container, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import MainLayout from '../layouts/MainLayout.js';
import { VscSearch } from "react-icons/vsc";
import Jobsearch from '../job_support/page';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function home() {

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        // You can use parsedUser if needed
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, []);


  const top100Films = [
    { label: 'Software Engineer', year: 1994 },
    { label: 'Marketing Manager', year: 1972 },
    { label: 'Graphic Designer', year: 1974 },
    { label: 'Financial Analyst', year: 2008 },
    { label: 'Sales Representative', year: 1957 },
    { label: ' IT jobs', year: 1957 },
    { label: 'Data Science jobs', year: 1957 },
    { label: 'HR jobs', year: 1957 },
    { label: 'HR jobs', year: 1957 },
    { label: 'Engineering jobs', year: 1957 },

  ];
  const countries = [
    { code: 'IN', label: 'India', phone: '91' },
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
      code: 'AE',
      label: 'United Arab Emirates',
      phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
      code: 'AG',
      label: 'Antigua and Barbuda',
      phone: '1-268',
    },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    {
      code: 'AU',
      label: 'Australia',
      phone: '61',
      suggested: true,
    },


  ];
  return (
    <>
      <MainLayout>

        <Box className='reBg' pt={12} pb={5} display='flex' alignItems='center'>
          <Container maxWidth="lg">
            <Paper elevation={3} sx={{ borderRadius: '15px', width: '100%', height: '40vh', display: 'flex', alignItems: 'center', justifyContent: "center", px: 5, }} >
              <Stack sx={{ width: '100%' }}>
                <Typography textAlign='center' variant="h3" mb={6} sx={{ fontWeight: '800' }}>Because impact matters</Typography>
                <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    fullWidth
                    renderInput={(params) => <TextField {...params}
                      label="Search by job title"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              <VscSearch />
                            </InputAdornment>

                          </>
                        )
                      }}
                    />}
                  />

                  <Autocomplete
                    id="country-select-demo"
                    fullWidth
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          width="20"
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          alt=""
                        />
                        {option.label} ({option.code}) +{option.phone}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose a location"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />

                  <Button variant="contained" sx={{ width: '200px' }}>Find Job</Button>
                </Stack>
              </Stack>
            </Paper>
            <Jobsearch />
          </Container>
        </Box>
      </MainLayout>
    </>
  )
} 
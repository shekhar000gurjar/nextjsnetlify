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




// 'use client';
// import { Autocomplete, Box, Button, Container, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
// import MainLayout from '../layouts/MainLayout.js';
// import { VscSearch } from "react-icons/vsc";
// import Jobsearch from '../job_support/page';
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function home() {

//   const router = useRouter();
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const user = localStorage.getItem('user');

//     if (token && user) {
//       try {
//         const parsedUser = JSON.parse(user);
//         if(!parsedUser.company_id){

//         }
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


//   const top100Films = [
//     { label: 'Software Engineer', year: 1994 },
//     { label: 'Marketing Manager', year: 1972 },
//     { label: 'Graphic Designer', year: 1974 },
//     { label: 'Financial Analyst', year: 2008 },
//     { label: 'Sales Representative', year: 1957 },
//     { label: ' IT jobs', year: 1957 },
//     { label: 'Data Science jobs', year: 1957 },
//     { label: 'HR jobs', year: 1957 },
//     { label: 'HR jobs', year: 1957 },
//     { label: 'Engineering jobs', year: 1957 },

//   ];
//   const countries = [
//     { code: 'IN', label: 'India', phone: '91' },
//     { code: 'AD', label: 'Andorra', phone: '376' },
//     {
//       code: 'AE',
//       label: 'United Arab Emirates',
//       phone: '971',
//     },
//     { code: 'AF', label: 'Afghanistan', phone: '93' },
//     {
//       code: 'AG',
//       label: 'Antigua and Barbuda',
//       phone: '1-268',
//     },
//     { code: 'AI', label: 'Anguilla', phone: '1-264' },
//     { code: 'AL', label: 'Albania', phone: '355' },
//     { code: 'AM', label: 'Armenia', phone: '374' },
//     { code: 'AO', label: 'Angola', phone: '244' },
//     { code: 'AQ', label: 'Antarctica', phone: '672' },
//     { code: 'AR', label: 'Argentina', phone: '54' },
//     { code: 'AS', label: 'American Samoa', phone: '1-684' },
//     { code: 'AT', label: 'Austria', phone: '43' },
//     {
//       code: 'AU',
//       label: 'Australia',
//       phone: '61',
//       suggested: true,
//     },


//   ];
//   return (
//     <>
//       <MainLayout>

//         <Box className='reBg' pt={12} pb={5} display='flex' alignItems='center'>
//           <Container maxWidth="lg">
//             <Paper elevation={3} sx={{ borderRadius: '15px', width: '100%', height: '40vh', display: 'flex', alignItems: 'center', justifyContent: "center", px: 5, }} >
//               <Stack sx={{ width: '100%' }}>
//                 <Typography textAlign='center' variant="h3" mb={6} sx={{ fontWeight: '800' }}>Because impact matters</Typography>
//                 <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
//                   <Autocomplete
//                     disablePortal
//                     id="combo-box-demo"
//                     options={top100Films}
//                     fullWidth
//                     renderInput={(params) => <TextField {...params}
//                       label="Search by job title"
//                       InputProps={{
//                         ...params.InputProps,
//                         startAdornment: (
//                           <>
//                             <InputAdornment position="start">
//                               <VscSearch />
//                             </InputAdornment>

//                           </>
//                         )
//                       }}
//                     />}
//                   />

//                   <Autocomplete
//                     id="country-select-demo"
//                     fullWidth
//                     options={countries}
//                     autoHighlight
//                     getOptionLabel={(option) => option.label}
//                     renderOption={(props, option) => (
//                       <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
//                         <img
//                           loading="lazy"
//                           width="20"
//                           srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
//                           src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
//                           alt=""
//                         />
//                         {option.label} ({option.code}) +{option.phone}
//                       </Box>
//                     )}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Choose a location"
//                         inputProps={{
//                           ...params.inputProps,
//                           autoComplete: 'new-password', // disable autocomplete and autofill
//                         }}
//                       />
//                     )}
//                   />

//                   <Button variant="contained" sx={{ width: '200px' }}>Find Job</Button>
//                 </Stack>
//               </Stack>
//             </Paper>
//             <Jobsearch />
//           </Container>
//         </Box>
//       </MainLayout>
//     </>
//   )
// } 


'use client';
import { Autocomplete, Box, Button, Container, InputAdornment, Paper, Stack, TextField, Typography, Modal, OutlinedInput, InputLabel, FormHelperText } from "@mui/material";
import MainLayout from '../layouts/MainLayout.js';
import { VscSearch } from "react-icons/vsc";
import Jobsearch from '../job_support/page';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { notify } from "../components/Toast";
import { userDetails } from "@/middleware/userDetails.js";
import { postResponse } from "../components/_apihandler.js";


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    company_email: '',
    current_location: '',
    position: '',
    last_college: '',
    user_id: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        setFormData(prevState => ({ ...prevState, user_id: parsedUser._id }));
        if (!parsedUser.company_id) {
          setModalOpen(true);
        }
        // You can use parsedUser if needed
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleClose = () => setModalOpen(false);

  const top100Films = [
    { label: 'Software Engineer', year: 1994 },
    { label: 'Marketing Manager', year: 1972 },
    { label: 'Graphic Designer', year: 1974 },
    { label: 'Financial Analyst', year: 2008 },
    { label: 'Sales Representative', year: 1957 },
    { label: 'IT jobs', year: 1957 },
    { label: 'Data Science jobs', year: 1957 },
    { label: 'HR jobs', year: 1957 },
    { label: 'HR jobs', year: 1957 },
    { label: 'Engineering jobs', year: 1957 },
  ];

  const countries = [
    { code: 'IN', label: 'India', phone: '91' },
    { code: 'AD', label: 'Andorra', phone: '376' },
    { code: 'AE', label: 'United Arab Emirates', phone: '971' },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    { code: 'AU', label: 'Australia', phone: '61', suggested: true },
  ];

  // Fetch user details if token is present
  const getUserDetails = async () => {
    if (localStorage.getItem('token')) {
      const response = await userDetails();
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        // router.push('/home');
      }
    }
  };
  console.log(formData, "form")
  // Handle form submission
  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const response = await postResponse("/api/add-company", formData);
      if (response.status === 200) {
        notify(response.data.msg, 'success');
        // router.push('/home');
        getUserDetails();
        handleClose()
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

        <Modal
          open={modalOpen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Please Fill Your Company Details
            </Typography>
            <Stack spacing={1} mt={3}>
              <InputLabel htmlFor="company_name" sx={{ fontWeight: '600', color: 'primary.main' }}>Company *</InputLabel>
              <OutlinedInput
                size="small"
                id="company_name"
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your company name"
                error={!!errors.company_name}
              />
              {errors.company_name && <FormHelperText error>{errors.company_name}</FormHelperText>}
            </Stack>
            <Stack spacing={1} mt={3}>
              <InputLabel htmlFor="company_email" sx={{ fontWeight: '600', color: 'primary.main' }}>Company Email &nbsp;
                <Typography variant="caption">(optional)</Typography>
              </InputLabel>
              <OutlinedInput
                size="small"
                id="company_email"
                type="email"
                name="company_email"
                value={formData.company_email}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your company email"
                error={!!errors.company_email}
              />
              {errors.company_email && <FormHelperText error>{errors.company_email}</FormHelperText>}
            </Stack>
            <Stack spacing={1} mt={3}>
              <InputLabel htmlFor="current_location" sx={{ fontWeight: '600', color: 'primary.main' }}>Current Location *</InputLabel>
              <OutlinedInput
                size="small"
                id="current_location"
                type="text"
                name="current_location"
                value={formData.current_location}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your current location"
                error={!!errors.current_location}
              />
              {errors.current_location && <FormHelperText error>{errors.current_location}</FormHelperText>}
            </Stack>
            <Stack spacing={1} mt={3}>
              <InputLabel htmlFor="position" sx={{ fontWeight: '600', color: 'primary.main' }}>Position *</InputLabel>
              <OutlinedInput
                size="small"
                id="position"
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your position"
                error={!!errors.position}
              />
              {errors.position && <FormHelperText error>{errors.position}</FormHelperText>}
            </Stack>
            <Stack spacing={1} mt={3}>
              <InputLabel htmlFor="last_college" sx={{ fontWeight: '600', color: 'primary.main' }}>Latest College Name *</InputLabel>
              <OutlinedInput
                size="small"
                id="last_college"
                type="text"
                name="last_college"
                value={formData.last_college}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your latest college name"
                error={!!errors.last_college}
              />
              {errors.last_college && <FormHelperText error>{errors.last_college}</FormHelperText>}
            </Stack>
            <Stack direction="row" spacing={2} mt={3}>
              <LoadingButton loading={loading} fullWidth loadingPosition="center" onClick={handleSubmit} variant="contained" type="submit">
                Add Company
              </LoadingButton>

            </Stack>
          </Box>
        </Modal>
      </MainLayout>
    </>
  );
}

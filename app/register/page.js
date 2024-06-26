// "use client";
// import { Box, Button, Container, Divider, Grid, InputLabel, OutlinedInput, Paper, Stack, Typography, FormHelperText } from "@mui/material";
// import Link from "next/link";
// import FirebaseSocial from "../components/FirebaseSocial";
// import { useState } from "react";
// import { notify } from "../components/Toast";
// import { LoadingButton } from '@mui/lab';
// import { postResponse } from "../components/_apihandler";
// import { useRouter } from "next/navigation";

// export default function register() {
//     const [formData, setFormData] = useState({
//         first_name: "",
//         last_name: "",
//         email: "",
//         company_name: "",
//         company_email: "",
//         current_location: "",
//         position: "",
//         phone_number: "",
//         last_college: "",
//         password: "",
//         confirmPassword: ""
//     });
//     const [loading, setLoading] = useState(false);
//     const [confirmPasswordError, setConfirmPasswordError] = useState("");

//     const router = useRouter();

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//         if (e.target.name === "confirmPassword") {
//             setConfirmPasswordError("");
//         }
//     };
//     console.log(formData, "formData")

//     const handleSubmit = async (e) => {
//         console.log("enter")
//         // e.preventDefault();
//         setLoading(true);
//         if (formData.password !== formData.confirmPassword) {
//             setConfirmPasswordError("Passwords do not match");
//             setLoading(false);
//             return;
//         }

//         const { confirmPassword, ...dataToSend } = formData;
//         console.log(formData, "formdata")
//         try {
//             const response = await postResponse("/api/register", dataToSend);
//             console.log('reponse:- ', response);
//             if (response.success === true) {
//                 notify(response.msg, 'success');
//                 router.push('/home')
//                 setLoading(false);
//             } else {
//                 notify(response.msg, 'error');
//                 setLoading(false);

//             }
//         } catch (error) {
//             console.log(error, "err")
//             if (error.response.status === 400) {
//                 notify(error.response.data.msg || "Something went wrong", 'error');
//                 setLoading(false);
//             }
//             notify("Something went wrong", 'error');
//             setLoading(false);

//         }
//     };



//     return (
//         <Box className='reBg' pb={10}>
//             <Box py={4} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//                 <Typography textAlign='center' variant="h3" color='text.white'>ReferMyJob</Typography>
//                 <Typography textAlign='center' variant="h5" color='text.white' sx={{ fontSize: { xs: '12px', sm: '1.5rem' } }}>Helping people apply for jobs through referrals</Typography>
//             </Box>
//             <Box mt={2}>
//                 <Container>
//                     <Grid container justifyContent="center" spacing={5} sx={{ px: { xs: 0, sm: 6 } }}>
//                         <Grid item xs={12} sm={12} md={6}  >
//                             <Paper sx={{ mt: 4, px: 2, py: 4, borderRadius: 3, height: '100%' }}>
//                                 <Typography variant="h5" fontWeight='bold' sx={{ pb: 1.5 }}> Register to start sending job referrals</Typography>
//                                 <Divider sx={{ borderBottom: "solid", borderColor: 'primary.main', mb: 4 }} />

//                                 <Box

//                                 >
//                                     <Stack direction="row" spacing={2}>
//                                         <Stack spacing={1} sx={{ width: '100%' }} >
//                                             <InputLabel htmlFor="full-name" sx={{ fontWeight: '600', color: 'primart.main' }}>First Name</InputLabel>
//                                             <OutlinedInput
//                                                 size="small"
//                                                 id="first_name"
//                                                 type="text"
//                                                 name="first_name"
//                                                 value={formData.first_name}
//                                                 onChange={handleChange}
//                                                 fullWidth
//                                             />
//                                         </Stack>
//                                         <Stack spacing={1} sx={{ width: '100%' }} >
//                                             <InputLabel htmlFor="full-name" sx={{ fontWeight: '600', color: 'primart.main' }}>Last Name</InputLabel>
//                                             <OutlinedInput
//                                                 size="small"
//                                                 id="last_name"
//                                                 type="text"
//                                                 name="last_name"
//                                                 value={formData.last_name}
//                                                 onChange={handleChange}
//                                                 fullWidth
//                                             />
//                                         </Stack>
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="email-login" sx={{ fontWeight: '600', color: 'primart.main' }}>Personal Email</InputLabel>
//                                         <OutlinedInput
//                                             size="small"
//                                             id="email"
//                                             type="email"
//                                             name="email"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             fullWidth
//                                         />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="Company" sx={{ fontWeight: '600', color: 'primart.main' }}>Company</InputLabel>
//                                         <OutlinedInput
//                                             size="small"
//                                             id="company_name"
//                                             type="text"
//                                             name="company_name"
//                                             value={formData.company_name}
//                                             onChange={handleChange}
//                                             fullWidth
//                                         />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="Companyemail" sx={{ fontWeight: '600', color: 'primart.main' }}>Company Email &nbsp;
//                                             <Typography variant="caption"    >
//                                                 (optional)
//                                             </Typography></InputLabel>
//                                         <OutlinedInput
//                                             size="small"
//                                             id="company_email"
//                                             type="email"
//                                             name="company_email"
//                                             value={formData.company_email}
//                                             onChange={handleChange}
//                                             fullWidth
//                                         />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="currentlocation" sx={{
//                                             fontWeight: '600',
//                                             display: 'flex', alignItems: 'end', color: 'primart.main'
//                                         }}>Current Location</InputLabel>
//                                         <OutlinedInput
//                                             size="small"
//                                             id="current_location"
//                                             type="text"
//                                             name="current_location"
//                                             value={formData.current_location}
//                                             onChange={handleChange}
//                                             fullWidth
//                                         />
//                                     </Stack>

//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="position" sx={{ fontWeight: '600', color: 'primart.main' }}>Position</InputLabel>
//                                         <OutlinedInput
//                                             size="small"
//                                             id="position"
//                                             type="text"
//                                             name="position"
//                                             value={formData.position}
//                                             onChange={handleChange}
//                                             fullWidth
//                                         />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="phonenumber" sx={{ fontWeight: '600', display: 'flex', alignItems: 'end', color: 'primart.main' }}>Phone Number &nbsp;
//                                             <Typography variant="caption"    >
//                                                 (optional)
//                                             </Typography></InputLabel>
//                                         <OutlinedInput
//                                             size="small"
//                                             id="phone_number"
//                                             type="number"
//                                             name="phone_number"
//                                             value={formData.phone_number}
//                                             onChange={handleChange}
//                                             fullWidth
//                                         />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="latestcollegename" sx={{ fontWeight: '600', color: 'primart.main' }}>Latest College Name</InputLabel>
//                                         <OutlinedInput
//                                             size="small"
//                                             id="last_college"
//                                             type="text"
//                                             name="last_college"
//                                             value={formData.last_college}
//                                             onChange={handleChange}
//                                             fullWidth
//                                         />
//                                     </Stack>
//                                     <Stack direction="row" spacing={2} mt={3}>
//                                         <Stack spacing={1} sx={{ width: '100%' }} >
//                                             <InputLabel htmlFor="full-name" sx={{ fontWeight: '600', color: 'primart.main' }}>Set Password</InputLabel>
//                                             <OutlinedInput
//                                                 size="small"
//                                                 id="password"
//                                                 type="password"
//                                                 name="password"
//                                                 value={formData.password}
//                                                 onChange={handleChange}
//                                                 fullWidth
//                                             />
//                                         </Stack>
//                                         <Stack spacing={1} sx={{ width: '100%' }} >
//                                             <InputLabel htmlFor="full-name" sx={{ fontWeight: '600', color: 'primart.main' }}>Confirm Password</InputLabel>
//                                             <OutlinedInput
//                                                 size="small"
//                                                 id="confirmPassword"
//                                                 type="password"
//                                                 name="confirmPassword"
//                                                 value={formData.confirmPassword}
//                                                 onChange={handleChange}
//                                                 fullWidth
//                                             />
//                                             {confirmPasswordError && <FormHelperText error>{confirmPasswordError}</FormHelperText>}
//                                         </Stack>
//                                     </Stack>

//                                     <Stack direction="row" spacing={2} mt={3}  >
//                                         <LoadingButton loading={loading} fullWidth loadingPosition="center" onClick={handleSubmit} variant="contained" type="submit">
//                                             Register
//                                         </LoadingButton>
//                                         {/* <Button variant="contained" fullWidth>Register</Button> */}

//                                         <Button component={Link} href="login" variant="contained" fullWidth>Login</Button>

//                                     </Stack>
//                                 </Box>
//                                 <Box my={4}>
//                                     <Divider>
//                                         <Typography variant="caption"> Login with</Typography>
//                                     </Divider>
//                                 </Box>
//                                 <FirebaseSocial />
//                             </Paper>
//                         </Grid>

//                     </Grid>
//                 </Container>
//             </Box>
//         </Box>
//     )
// }

// -----------------------------------------
// "use client";
// import {
//     Box,
//     Button,
//     Container,
//     Divider,
//     Grid,
//     InputLabel,
//     OutlinedInput,
//     Paper,
//     Stack,
//     Typography,
//     FormHelperText,
//     IconButton,
//     TextField
// } from "@mui/material";
// import Link from "next/link";
// import FirebaseSocial from "../components/FirebaseSocial";
// import { useState } from "react";
// import { notify } from "../components/Toast";
// import { LoadingButton } from '@mui/lab';
// import { postResponse } from "../components/_apihandler";
// import { useRouter } from "next/navigation";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import validator from 'validator';

// export default function Register() {
//     const [formData, setFormData] = useState({
//         first_name: "",
//         last_name: "",
//         email: "",
//         company_name: "",
//         company_email: "",
//         current_location: "",
//         position: "",
//         phone_number: "",
//         last_college: "",
//         password: "",
//         confirmPassword: ""
//     });
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [confirmPasswordError, setConfirmPasswordError] = useState("");
//     const [passwordVisibility, setPasswordVisibility] = useState(false);
//     const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

//     const router = useRouter();

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//         if (e.target.name === "confirmPassword") {
//             setConfirmPasswordError("");
//         }
//         setErrors({
//             ...errors,
//             [e.target.name]: ""
//         });
//     };

//     const validateEmail = (email) => {
//         return validator.isEmail(email);
//     };

//     const validatePhoneNumber = (phoneNumber) => {
//         return validator.isMobilePhone(phoneNumber, 'any', { strictMode: true });
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.first_name.trim()) newErrors.first_name = "First Name is required";
//         if (!formData.last_name.trim()) newErrors.last_name = "Last Name is required";
//         if (!formData.email.trim() || !validateEmail(formData.email)) newErrors.email = "Valid email is required";
//         if (!formData.company_name.trim()) newErrors.company_name = "Company Name is required";
//         if (formData.company_email && !validateEmail(formData.company_email)) newErrors.company_email = "Invalid company email format";
//         if (!formData.current_location.trim()) newErrors.current_location = "Current Location is required";
//         if (!formData.position.trim()) newErrors.position = "Position is required";
//         if (formData.phone_number && !validatePhoneNumber(formData.phone_number)) newErrors.phone_number = "Invalid phone number";
//         if (!formData.last_college.trim()) newErrors.last_college = "Latest College Name is required";
//         if (!formData.password.trim()) newErrors.password = "Password is required";
//         if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         setLoading(true);
//         if (!validateForm()) {
//             setLoading(false);
//             return;
//         }

//         const { confirmPassword, ...dataToSend } = formData;

//         try {
//             const response = await postResponse("/api/register", dataToSend);
//             if (response.success) {
//                 notify(response.msg, 'success');
//                 router.push('/home');
//             } else {
//                 notify(response.msg, 'error');
//             }
//         } catch (error) {
//             notify(error.response?.data?.msg || "Something went wrong", 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setPasswordVisibility(!passwordVisibility);
//     };

//     const toggleConfirmPasswordVisibility = () => {
//         setConfirmPasswordVisibility(!confirmPasswordVisibility);
//     };

//     return (
//         <Box className='reBg' pb={10}>
//             <Box py={4} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//                 <Typography textAlign='center' variant="h3" color='text.white'>ReferMyJob</Typography>
//                 <Typography textAlign='center' variant="h5" color='text.white' sx={{ fontSize: { xs: '12px', sm: '1.5rem' } }}>Helping people apply for jobs through referrals</Typography>
//             </Box>
//             <Box mt={2}>
//                 <Container>
//                     <Grid container justifyContent="center" spacing={5} sx={{ px: { xs: 0, sm: 6 } }}>
//                         <Grid item xs={12} sm={12} md={6}>
//                             <Paper sx={{ mt: 4, px: 2, py: 4, borderRadius: 3, height: '100%' }}>
//                                 <Typography variant="h5" fontWeight='bold' sx={{ pb: 1.5 }}>Register to start sending job referrals</Typography>
//                                 <Divider sx={{ borderBottom: "solid", borderColor: 'primary.main', mb: 4 }} />

//                                 <Box>
//                                     <Stack direction="row" spacing={2}>
//                                         <Stack spacing={1} sx={{ width: '100%' }}>
//                                             <InputLabel htmlFor="first_name" sx={{ fontWeight: '600', color: 'primary.main' }}>First Name *</InputLabel>
//                                             <TextField
//                                                 size="small"
//                                                 id="first_name"
//                                                 type="text"
//                                                 name="first_name"
//                                                 value={formData.first_name}
//                                                 onChange={handleChange}
//                                                 fullWidth
//                                                 placeholder="Enter your first name"
//                                                 required
//                                                 error={!!errors.first_name}
//                                                 helperText={errors.first_name}
//                                             />
//                                         </Stack>
//                                         <Stack spacing={1} sx={{ width: '100%' }}>
//                                             <InputLabel htmlFor="last_name" sx={{ fontWeight: '600', color: 'primary.main' }}>Last Name *</InputLabel>
//                                             <TextField
//                                                 size="small"
//                                                 id="last_name"
//                                                 type="text"
//                                                 name="last_name"
//                                                 value={formData.last_name}
//                                                 onChange={handleChange}
//                                                 fullWidth
//                                                 placeholder="Enter your last name"
//                                                 required
//                                                 error={!!errors.last_name}
//                                                 helperText={errors.last_name}
//                                             />
//                                         </Stack>
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="email" sx={{ fontWeight: '600', color: 'primary.main' }}>Personal Email *</InputLabel>
//                                         <TextField
//                                             size="small"
//                                             id="email"
//                                             type="email"
//                                             name="email"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             placeholder="Enter your personal email"
//                                             required
//                                             error={!!errors.email}
//                                             helperText={errors.email}
//                                         />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="company_name" sx={{ fontWeight: '600', color: 'primary.main' }}>Company *</InputLabel>
//                                         <TextField
//                                             size="small"
//                                             id="company_name"
//                                             type="text"
//                                             name="company_name"
//                                             value={formData.company_name}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             placeholder="Enter your company name"
//                                             required
//                                             error={!!errors.company_name}
//                                             helperText={errors.company_name}
//                                         />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="company_email" sx={{ fontWeight: '600', color: 'primary.main' }}>Company Email</InputLabel>
//                                         <TextField
//                                             size="small"
//                                             id="company_email"
//                                             type="email"
//                                             name="company_email"
//                                             value={formData.company_email}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             placeholder="Enter your company email"
//                                             error={!!errors.company_email}
//                                             helperText={errors.company_email}
//                                         />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="current_location" sx={{ fontWeight: '600', color: 'primary.main' }}>Current Location *</InputLabel>
//                                         <TextField
//                                             size="small"
//                                             id="current_location"
//                                             type="text"
//                                             name="current_location"
//                                             value={formData.current_location}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             placeholder="Enter your current location"
//                                             required
//                                             error={!!errors.current_location}
//                                             helperText={errors.current_location}
//                                         />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="position" sx={{ fontWeight: '600', color: 'primary.main' }}>Position *</InputLabel>
//                                         <TextField
//                                             size="small"
//                                             id="position"
//                                             type="text"
//                                             name="position"
//                                             value={formData.position}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             placeholder="Enter your position"
//                                             required
//                                             error={!!errors.position}
//                                             helperText={errors.position}
//                                         />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="phone_number" sx={{ fontWeight: '600', color: 'primary.main' }}>Phone Number</InputLabel>
//                                         <TextField
//                                             size="small"
//                                             id="phone_number"
//                                             type="tel"
//                                             name="phone_number"
//                                             value={formData.phone_number}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             placeholder="Enter your phone number"
//                                             error={!!errors.phone_number}
//                                             helperText={errors.phone_number}
//                                         />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="last_college" sx={{ fontWeight: '600', color: 'primary.main' }}>Latest College Name *</InputLabel>
//                                         <TextField
//                                             size="small"
//                                             id="last_college"
//                                             type="text"
//                                             name="last_college"
//                                             value={formData.last_college}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             placeholder="Enter your latest college name"
//                                             required
//                                             error={!!errors.last_college}
//                                             helperText={errors.last_college}
//                                         />
//                                     </Stack>
//                                     <Stack direction="row" spacing={2} mt={3}>
//                                         <Stack spacing={1} sx={{ width: '100%' }}>
//                                             <InputLabel htmlFor="password" sx={{ fontWeight: '600', color: 'primary.main' }}>Set Password *</InputLabel>
//                                             <OutlinedInput
//                                                 size="small"
//                                                 id="password"
//                                                 type={passwordVisibility ? "text" : "password"}
//                                                 name="password"
//                                                 value={formData.password}
//                                                 onChange={handleChange}
//                                                 fullWidth
//                                                 placeholder="Enter your password"
//                                                 required
//                                                 error={!!errors.password}
//                                                 endAdornment={
//                                                     <IconButton onClick={togglePasswordVisibility} edge="end">
//                                                         {passwordVisibility ? <VisibilityOff /> : <Visibility />}
//                                                     </IconButton>
//                                                 }
//                                             />
//                                             {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
//                                         </Stack>
//                                         <Stack spacing={1} sx={{ width: '100%' }}>
//                                             <InputLabel htmlFor="confirmPassword" sx={{ fontWeight: '600', color: 'primary.main' }}>Confirm Password *</InputLabel>
//                                             <OutlinedInput
//                                                 size="small"
//                                                 id="confirmPassword"
//                                                 type={confirmPasswordVisibility ? "text" : "password"}
//                                                 name="confirmPassword"
//                                                 value={formData.confirmPassword}
//                                                 onChange={handleChange}
//                                                 fullWidth
//                                                 placeholder="Confirm your password"
//                                                 required
//                                                 error={!!errors.confirmPassword}
//                                                 endAdornment={
//                                                     <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
//                                                         {confirmPasswordVisibility ? <VisibilityOff /> : <Visibility />}
//                                                     </IconButton>
//                                                 }
//                                             />
//                                             {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
//                                         </Stack>
//                                     </Stack>

//                                     <Stack direction="row" spacing={2} mt={3}>
//                                         <LoadingButton
//                                             loading={loading}
//                                             fullWidth
//                                             loadingPosition="center"
//                                             onClick={handleSubmit}
//                                             variant="contained"
//                                             type="submit"
//                                         >
//                                             Register
//                                         </LoadingButton>
//                                         <Button component={Link} href="login" variant="contained" fullWidth>
//                                             Login
//                                         </Button>
//                                     </Stack>
//                                 </Box>
//                                 <Box my={4}>
//                                     <Divider>
//                                         <Typography variant="caption">Login with</Typography>
//                                     </Divider>
//                                 </Box>
//                                 <FirebaseSocial />
//                             </Paper>
//                         </Grid>
//                     </Grid>
//                 </Container>
//             </Box>
//         </Box>
//     );
// }


"use client";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    InputLabel,
    OutlinedInput,
    Paper,
    Stack,
    Typography,
    FormHelperText,
    IconButton
} from "@mui/material";
import Link from "next/link";
import FirebaseSocial from "../components/FirebaseSocial";
import { useEffect, useState } from "react";
import { notify } from "../components/Toast";
import { LoadingButton } from '@mui/lab';
import { postResponse } from "../components/_apihandler";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import validator from 'validator';
import { userDetails } from "@/middleware/userDetails";

export default function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        company_name: "",
        company_email: "",
        current_location: "",
        position: "",
        phone_number: "",
        last_college: "",
        password: "",
        confirmPassword: "",
        singup_type: "normal"
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

    const router = useRouter();

    // Handle input changes and validation
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate phone number to allow only numeric values
        if (name === "phone_number" && !/^\d*$/.test(value)) {
            setErrors({
                ...errors,
                [name]: "Phone number can only contain numbers"
            });
            return;
        }

        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: ""
        });

        if (name === "confirmPassword") {
            setConfirmPasswordError("");
        }
    };

    // Validate email format
    const validateEmail = (email) => {
        return validator.isEmail(email);
    };

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name.trim()) newErrors.first_name = "First Name is required";
        if (!/^[a-zA-Z]+$/.test(formData.first_name)) newErrors.first_name = "First Name can only contain letters";
        if (!formData.last_name.trim()) newErrors.last_name = "Last Name is required";
        if (!/^[a-zA-Z]+$/.test(formData.last_name)) newErrors.last_name = "Last Name can only contain letters";
        if (!formData.email.trim() || !validateEmail(formData.email)) newErrors.email = "Valid email is required";
        if (!formData.company_name.trim()) newErrors.company_name = "Company Name is required";
        if (formData.company_email && !validateEmail(formData.company_email)) newErrors.company_email = "Invalid company email format";
        if (!formData.current_location.trim()) newErrors.current_location = "Current Location is required";
        if (!formData.position.trim()) newErrors.position = "Position is required";
        if (formData.phone_number && !/^\d+$/.test(formData.phone_number)) newErrors.phone_number = "Phone number can only contain numbers";
        if (!formData.last_college.trim()) newErrors.last_college = "Latest College Name is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Fetch user details if token is present
    const getUserDetails = async () => {
        if (localStorage.getItem('token')) {
            const response = await userDetails();
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                router.push('/home');
            }
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        setLoading(true);
        if (!validateForm()) {
            setLoading(false);
            return;
        }

        const { confirmPassword, ...dataToSend } = formData;

        try {
            const response = await postResponse("/api/register", dataToSend);
            if (response.status === 201) {
                localStorage.setItem("token", response.data.token);
                notify(response.data.msg, 'success');
                // router.push('/home');
                getUserDetails();
            } else {
                notify(response.data.msg, 'error');
            }
        } catch (error) {
            notify(error.response?.data?.msg || "Something went wrong", 'error');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisibility(!confirmPasswordVisibility);
    };

    return (
        <Box className='reBg' pb={10}>
            <Box py={4} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <Typography textAlign='center' variant="h3" color='text.white'>ReferMyJob</Typography>
                <Typography textAlign='center' variant="h5" color='text.white' sx={{ fontSize: { xs: '12px', sm: '1.5rem' } }}>Helping people apply for jobs through referrals</Typography>
            </Box>
            <Box mt={2}>
                <Container>
                    <Grid container justifyContent="center" spacing={5} sx={{ px: { xs: 0, sm: 6 } }}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Paper sx={{ mt: 4, px: 2, py: 4, borderRadius: 3, height: '100%' }}>
                                <Typography variant="h5" fontWeight='bold' sx={{ pb: 1.5 }}> Register to start sending job referrals</Typography>
                                <Divider sx={{ borderBottom: "solid", borderColor: 'primary.main', mb: 4 }} />

                                <Box>
                                    <Stack direction="row" spacing={2}>
                                        <Stack spacing={1} sx={{ width: '100%' }}>
                                            <InputLabel htmlFor="first_name" sx={{ fontWeight: '600', color: 'primary.main' }}>First Name *</InputLabel>
                                            <OutlinedInput
                                                size="small"
                                                id="first_name"
                                                type="text"
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                fullWidth
                                                placeholder="Enter your first name"
                                                error={!!errors.first_name}
                                            />
                                            {errors.first_name && <FormHelperText error>{errors.first_name}</FormHelperText>}
                                        </Stack>
                                        <Stack spacing={1} sx={{ width: '100%' }}>
                                            <InputLabel htmlFor="last_name" sx={{ fontWeight: '600', color: 'primary.main' }}>Last Name *</InputLabel>
                                            <OutlinedInput
                                                size="small"
                                                id="last_name"
                                                type="text"
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                fullWidth
                                                placeholder="Enter your last name"
                                                error={!!errors.last_name}
                                            />
                                            {errors.last_name && <FormHelperText error>{errors.last_name}</FormHelperText>}
                                        </Stack>
                                    </Stack>
                                    <Stack spacing={1} mt={3}>
                                        <InputLabel htmlFor="email" sx={{ fontWeight: '600', color: 'primary.main' }}>Personal Email *</InputLabel>
                                        <OutlinedInput
                                            size="small"
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            fullWidth
                                            placeholder="Enter your personal email"
                                            error={!!errors.email}
                                        />
                                        {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                                    </Stack>
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
                                        <InputLabel htmlFor="phone_number" sx={{ fontWeight: '600', display: 'flex', alignItems: 'end', color: 'primary.main' }}>Phone Number &nbsp;
                                            <Typography variant="caption">(optional)</Typography>
                                        </InputLabel>
                                        <OutlinedInput
                                            size="small"
                                            id="phone_number"
                                            type="text"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            fullWidth
                                            placeholder="Enter your phone number"
                                            inputProps={{
                                                maxLength: 10,
                                                inputMode: "numeric",
                                                pattern: "[0-9]*",
                                            }}
                                            error={!!errors.phone_number}
                                        />
                                        {errors.phone_number && <FormHelperText error>{errors.phone_number}</FormHelperText>}
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
                                        <Stack spacing={1} sx={{ width: '100%' }}>
                                            <InputLabel htmlFor="password" sx={{ fontWeight: '600', color: 'primary.main' }}>Set Password *</InputLabel>
                                            <OutlinedInput
                                                size="small"
                                                id="password"
                                                type={passwordVisibility ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                fullWidth
                                                placeholder="Enter your password"
                                                error={!!errors.password}
                                                endAdornment={
                                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                                        {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                }
                                            />
                                            {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                                        </Stack>
                                        <Stack spacing={1} sx={{ width: '100%' }}>
                                            <InputLabel htmlFor="confirmPassword" sx={{ fontWeight: '600', color: 'primary.main' }}>Confirm Password *</InputLabel>
                                            <OutlinedInput
                                                size="small"
                                                id="confirmPassword"
                                                type={confirmPasswordVisibility ? "text" : "password"}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                fullWidth
                                                placeholder="Confirm your password"
                                                error={!!errors.confirmPassword}
                                                endAdornment={
                                                    <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                                        {confirmPasswordVisibility ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                }
                                            />
                                            {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row" spacing={2} mt={3}>
                                        <LoadingButton loading={loading} fullWidth loadingPosition="center" onClick={handleSubmit} variant="contained" type="submit">
                                            Register
                                        </LoadingButton>
                                        <Button component={Link} href="login" variant="contained" fullWidth>Login</Button>
                                    </Stack>
                                </Box>
                                <Box my={4}>
                                    <Divider>
                                        <Typography variant="caption"> Login with</Typography>
                                    </Divider>
                                </Box>
                                <FirebaseSocial />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}




//-------------------------------

// "use client";
// import { Box, Button, Container, Divider, Grid, InputLabel, OutlinedInput, Paper, Stack, Typography, FormHelperText } from "@mui/material";
// import Link from "next/link";
// import FirebaseSocial from "../components/FirebaseSocial";
// import { useState } from "react";
// import { notify } from "../components/Toast";
// import { LoadingButton } from '@mui/lab';
// import { postResponse } from "../components/_apihandler";
// import { useRouter } from "next/navigation";

// export default function register() {
//     const [formData, setFormData] = useState({
//         first_name: "",
//         last_name: "",
//         email: "",
//         company_name: "",
//         company_email: "",
//         current_location: "",
//         position: "",
//         phone_number: "",
//         last_college: "",
//         password: "",
//         confirmPassword: ""
//     });
//     const [loading, setLoading] = useState(false);
//     const [confirmPasswordError, setConfirmPasswordError] = useState("");

//     const router = useRouter();

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//         if (e.target.name === "confirmPassword") {
//             setConfirmPasswordError("");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         if (formData.password !== formData.confirmPassword) {
//             setConfirmPasswordError("Passwords do not match");
//             setLoading(false);
//             return;
//         }

//         const { confirmPassword, ...dataToSend } = formData;
//         console.log(formData, "formdata")
//         try {
//             const response = await postResponse("/api/register", dataToSend);
//             console.log('reponse:- ', response);
//             if (response.data.success) {
//                 notify(response.data.msg, 'success');
//                 router.push('/home')
//                 setLoading(false);
//             } else {
//                 notify(response.data.msg, 'error');
//                 setLoading(false);

//             }
//         } catch (error) {
//             notify(error.response.data.msg || "Something went wrong", 'error');
//             setLoading(false);
//         }
//     };

//     return (
//         <Box className="reBg" pb={10}>
//             <Box py={4} sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
//                 <Typography textAlign="center" variant="h3" color="text.white">ReferMyJob</Typography>
//                 <Typography textAlign="center" variant="h5" color="text.white" sx={{ fontSize: { xs: "12px", sm: "1.5rem" } }}>Helping people apply for jobs through referrals</Typography>
//             </Box>
//             <Box mt={2}>
//                 <Container>
//                     <Grid container justifyContent="center" spacing={5} sx={{ px: { xs: 0, sm: 6 } }}>
//                         <Grid item xs={12} sm={12} md={6}>
//                             <Paper sx={{ mt: 4, px: 2, py: 4, borderRadius: 3, height: "100%" }}>
//                                 <Typography variant="h5" fontWeight="bold" sx={{ pb: 1.5 }}> Register to start sending job referrals</Typography>
//                                 <Divider sx={{ borderBottom: "solid", borderColor: "primary.main", mb: 4 }} />

//                                 <Box component="form" onSubmit={handleSubmit}>
//                                     <Stack direction="row" spacing={2}>
//                                         <Stack spacing={1} sx={{ width: "100%" }}>
//                                             <InputLabel htmlFor="first_name" sx={{ fontWeight: "600", color: "primary.main" }}>First Name</InputLabel>
// <OutlinedInput
//     size="small"
//     id="first_name"
//     type="text"
//     name="first_name"
//     value={formData.first_name}
//     onChange={handleChange}
//     fullWidth
// />
//                                         </Stack>
//                                         <Stack spacing={1} sx={{ width: "100%" }}>
//                                             <InputLabel htmlFor="last_name" sx={{ fontWeight: "600", color: "primary.main" }}>Last Name</InputLabel>
// <OutlinedInput
//     size="small"
//     id="last_name"
//     type="text"
//     name="last_name"
//     value={formData.last_name}
//     onChange={handleChange}
//     fullWidth
// />
//                                         </Stack>
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="email" sx={{ fontWeight: "600", color: "primary.main" }}>Personal Email</InputLabel>
// <OutlinedInput
//     size="small"
//     id="email"
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleChange}
//     fullWidth
// />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="company_name" sx={{ fontWeight: "600", color: "primary.main" }}>Company</InputLabel>
// <OutlinedInput
//     size="small"
//     id="company_name"
//     type="text"
//     name="company_name"
//     value={formData.company_name}
//     onChange={handleChange}
//     fullWidth
// />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="company_email" sx={{ fontWeight: "600", color: "primary.main" }}>Company Email &nbsp;
//                                             <Typography variant="caption">(optional)</Typography></InputLabel>
// <OutlinedInput
//     size="small"
//     id="company_email"
//     type="email"
//     name="company_email"
//     value={formData.company_email}
//     onChange={handleChange}
//     fullWidth
// />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="current_location" sx={{ fontWeight: "600", color: "primary.main" }}>Current Location</InputLabel>
// <OutlinedInput
//     size="small"
//     id="current_location"
//     type="text"
//     name="current_location"
//     value={formData.current_location}
//     onChange={handleChange}
//     fullWidth
// />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="position" sx={{ fontWeight: "600", color: "primary.main" }}>Position</InputLabel>
// <OutlinedInput
//     size="small"
//     id="position"
//     type="text"
//     name="position"
//     value={formData.position}
//     onChange={handleChange}
//     fullWidth
// />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="phone_number" sx={{ fontWeight: "600", color: "primary.main" }}>Phone Number &nbsp;
//                                             <Typography variant="caption">(optional)</Typography></InputLabel>
// <OutlinedInput
//     size="small"
//     id="phone_number"
//     type="text"
//     name="phone_number"
//     value={formData.phone_number}
//     onChange={handleChange}
//     fullWidth
// />
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="last_college" sx={{ fontWeight: "600", color: "primary.main" }}>Latest College Name</InputLabel>
// <OutlinedInput
//     size="small"
//     id="last_college"
//     type="text"
//     name="last_college"
//     value={formData.last_college}
//     onChange={handleChange}
//     fullWidth
// />
//                                     </Stack>
//                                     <Stack direction="row" spacing={2} mt={3}>
//                                         <Stack spacing={1} sx={{ width: "100%" }}>
//                                             <InputLabel htmlFor="password" sx={{ fontWeight: "600", color: "primary.main" }}>Set Password</InputLabel>
// <OutlinedInput
//     size="small"
//     id="password"
//     type="password"
//     name="password"
//     value={formData.password}
//     onChange={handleChange}
//     fullWidth
// />
//                                         </Stack>
//                                         <Stack spacing={1} sx={{ width: "100%" }}>
//                                             <InputLabel htmlFor="confirmPassword" sx={{ fontWeight: "600", color: "primary.main" }}>Confirm Password</InputLabel>
// <OutlinedInput
//     size="small"
//     id="confirmPassword"
//     type="password"
//     name="confirmPassword"
//     value={formData.confirmPassword}
//     onChange={handleChange}
//     fullWidth
// />
//                                             {confirmPasswordError && <FormHelperText error>{confirmPasswordError}</FormHelperText>}
//                                         </Stack>
//                                     </Stack>

//                                     <Stack direction="row" spacing={2} mt={3}>
// <LoadingButton loading={loading} fullWidth loadingPosition="center" variant="contained" type="submit">
//     Register
// </LoadingButton>
//                                         {/* <Button variant="contained" fullWidth type="submit">Register</Button> */}
//                                         <Button component={Link} href="login" variant="contained" fullWidth>Login</Button>
//                                     </Stack>
//                                 </Box>
//                                 <Box my={4}>
//                                     <Divider>
//                                         <Typography variant="caption"> Login with</Typography>
//                                     </Divider>
//                                 </Box>
//                                 <FirebaseSocial />
//                             </Paper>
//                         </Grid>
//                     </Grid>
//                 </Container>
//             </Box>
//         </Box>
//     );
// }

// /* eslint-disable react-hooks/exhaustive-deps */
// "use client"
// import {
//     Box,
//     Button,
//     Checkbox,
//     Container,
//     Divider,
//     FormControlLabel,
//     Grid,
//     InputBase,
//     InputLabel,
//     OutlinedInput,
//     Paper,
//     Stack,
//     Typography,
//     FormHelperText,
//     IconButton
// } from "@mui/material";
// import FirebaseSocial from "../components/FirebaseSocial";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { notify } from "../components/Toast";
// import axios from 'axios';
// import { LoadingButton } from "@mui/lab";
// import { allUsers, userDetails } from "@/middleware/userDetails";
// import { postResponse } from "../components/_apihandler";
// import ReferralCommunity from "../home/ReferralCommunity";

// export default function Login() {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//         signup_type: "normal"
//     });
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [passwordVisibility, setPasswordVisibility] = useState(false);
//     const [rememberMe, setRememberMe] = useState(false);
//     const [usersDetails, setUsersDetails] = useState([])

//     const router = useRouter();

//     useEffect(() => {
//         const storedEmail = localStorage.getItem('rememberMeEmail');
//         const storedPassword = localStorage.getItem('rememberMePassword');
//         if (storedEmail && storedPassword) {
//             setFormData({ email: storedEmail, password: storedPassword });
//             setRememberMe(true);
//         }
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//         setErrors({
//             ...errors,
//             [name]: ""
//         });
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.email.trim()) newErrors.email = "Email is required";
//         if (!formData.password.trim()) newErrors.password = "Password is required";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     // Fetch user details if token is present
//     const getUserDetails = async () => {
//         if (localStorage.getItem('token')) {
//             const response = await userDetails();
//             if (response.status === 200) {
//                 localStorage.setItem('user', JSON.stringify(response.data.data));
//                 router.push('/search-company');
//             }
//         }
//     };

//     const usersList = async () => {
//         try {

//             const response = await allUsers();
//             console.log(response, "response");

//         } catch (error) {
//             setUsersDetails([])
//         }
//     }

//     useEffect(() => {
//         getUserDetails();
//         // usersList();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         setLoading(true);

//         try {
//             const response = await postResponse("/api/login", formData);
//             if (response.status === 200) {
//                 notify(response.data.msg, 'success');
//                 if (rememberMe) {
//                     localStorage.setItem('rememberMeEmail', formData.email);
//                     localStorage.setItem('rememberMePassword', formData.password);
//                 } else {
//                     localStorage.removeItem('rememberMeEmail');
//                     localStorage.removeItem('rememberMePassword');
//                 }
//                 localStorage.setItem('token', response.data.token);
//                 getUserDetails();
//             } else {
//                 notify(response.data.msg, 'error');
//             }
//         } catch (error) {
//             console.log(error, "err")
//             notify(error.response?.data?.msg || "Something went wrong", 'error');

//         } finally {
//             setLoading(false);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setPasswordVisibility(!passwordVisibility);
//     };

//     const handleRememberMeChange = (e) => {
//         setRememberMe(e.target.checked);
//     };

//     return (
//         <Box className='reBg' pb={10}>
//             <Box py={4} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//                 <Typography textAlign='center' variant="h3" color='text.white'>ReferMyJob</Typography>
//                 <Typography textAlign='center' variant="h5" color='text.white'>Helping people apply for jobs through referrals</Typography>
//             </Box>
//             <Box mt={2}>
//                 <Container>
//                     <Grid container justifyContent="center" spacing={5} sx={{ px: 6 }}>
//                         <Grid item xs={12} sm={6}  >
//                             <Paper sx={{ mt: 4, px: 2, py: 4, borderRadius: 3, height: '100%' }}>
//                                 <Typography variant="h5" fontWeight='bold' sx={{ pb: 1.5 }}> Login to start sending job referrals</Typography>
//                                 <Divider sx={{ borderBottom: "solid", borderColor: 'primary.main', mb: 4 }} />

//                                 <Box component="form" onSubmit={handleSubmit}>
//                                     <Stack spacing={1} >
//                                         <InputLabel htmlFor="email-login" sx={{ fontWeight: '600', color: 'primary.main' }}>Email Address / Username</InputLabel>
//                                         <OutlinedInput
//                                             size="small"
//                                             id="email-login"
//                                             type="email"
//                                             name="email"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             error={!!errors.email}
//                                             placeholder="Enter your email"
//                                         />
//                                         {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
//                                     </Stack>
//                                     <Stack spacing={1} mt={3}>
//                                         <InputLabel htmlFor="password" sx={{ fontWeight: '600', color: 'primary.main' }}>Password</InputLabel>
//                                         <OutlinedInput
//                                             size="small"
//                                             id="password"
//                                             type={passwordVisibility ? "text" : "password"}
//                                             name="password"
//                                             value={formData.password}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             error={!!errors.password}
//                                             placeholder="Enter your password"
//                                             endAdornment={
//                                                 <IconButton onClick={togglePasswordVisibility} edge="end">
//                                                     {passwordVisibility ? <Visibility /> : <VisibilityOff />}
//                                                 </IconButton>
//                                             }
//                                         />
//                                         {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
//                                     </Stack>
//                                     <Stack direction="row" my={2} justifyContent="space-between" alignItems="center" spacing={2}>
//                                         <FormControlLabel
//                                             control={
//                                                 <Checkbox
//                                                     name="rememberMe"
//                                                     color="primary"
//                                                     size="small"
//                                                     checked={rememberMe}
//                                                     onChange={handleRememberMeChange}
//                                                 />
//                                             }
//                                             label={<Typography variant="subtitle2" color='text.secondary'>Keep me signed in</Typography>}
//                                         />

//                                         <Typography component={Link} href="forgotPassword" variant="subtitle2" color='text.secondary'>Forgot Password?</Typography>
//                                     </Stack>
//                                     <Typography component={Link} href="register" variant="subtitle2" color='text.primary'>New User? Register Here</Typography>
//                                     <Stack direction="row" spacing={2} mt={3}>
//                                         <LoadingButton loading={loading} variant="contained" fullWidth type="submit">Login</LoadingButton>
//                                     </Stack>
//                                 </Box>
// <Box my={4}>
//     <Divider>
//         <Typography variant="caption"> Login with</Typography>
//     </Divider></Box>
// <FirebaseSocial />
//                             </Paper>
//                         </Grid>
//                         <Grid item xs={12} sm={6} >
//                             <Paper sx={{ mt: 4, px: 2, py: 4, borderRadius: 3, height: '100%' }}>
//                                 <Typography variant="h5" fontWeight='bold' sx={{ pb: 1.5 }}>Search for refer buddies</Typography>
//                                 <Divider sx={{ borderBottom: "solid", borderColor: 'primary.main', mb: 4 }} />
//                                 <Stack spacing={1} mb={4}>
//                                     <Paper
//                                         component="form"
//                                         sx={{ p: '1px 4px', display: 'flex', alignItems: 'center', }}
//                                     >
//                                         <InputBase
//                                             sx={{ ml: 1, flex: 1 }}
//                                             placeholder="Search by company"
//                                             inputProps={{ 'aria-label': 'Search by company' }}
//                                         />
//                                         <Button variant="contained" >Search</Button>
//                                     </Paper>
//                                 </Stack>
//                                 <ul className="company-list" id="company-list">
//                                     <li>Google</li>
//                                     <li>Microsoft</li>
//                                     <li>Amazon</li>
//                                     <li>Apple</li>
//                                 </ul>
//                             </Paper>
//                         </Grid>
//                     </Grid>
//                 </Container>
//             </Box>
//             <Grid mt={6} width={'80%'} textAlign={'center'} ml={'10%'}>
//                 <ReferralCommunity />
//             </Grid>
//         </Box>
//     );
// }

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
  FormHelperText,
  IconButton,
  Avatar,
  Toolbar,
  AppBar,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { notify } from "../components/Toast";
import { LoadingButton } from "@mui/lab";
import { userDetails } from "@/middleware/userDetails";
import { postResponse } from "../components/_apihandler";
import FirebaseSocial from "../components/FirebaseSocial"; // Firebase social component

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    signup_type: "normal",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberMeEmail");
    const storedPassword = localStorage.getItem("rememberMePassword");
    if (storedEmail && storedPassword) {
      setFormData({ email: storedEmail, password: storedPassword });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getUserDetails = async () => {
    if (localStorage.getItem("token")) {
      const response = await userDetails();
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        router.push("/search-company");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await postResponse("/api/login", formData);
      if (response.status === 200) {
        notify(response.data.msg, "success");
        if (rememberMe) {
          localStorage.setItem("rememberMeEmail", formData.email);
          localStorage.setItem("rememberMePassword", formData.password);
        } else {
          localStorage.removeItem("rememberMeEmail");
          localStorage.removeItem("rememberMePassword");
        }
        localStorage.setItem("token", response.data.token);
        getUserDetails();
      } else {
        notify(response.data.msg, "error");
      }
    } catch (error) {
      notify(error.response?.data?.msg || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  //   const handleRememberMeChange = (e) => {
  //     setRememberMe(e.target.checked);
  //   };

  const handleRememberMeChange = () => {
    setRememberMe((prevState) => !prevState);
  };

  return (
    <Box
      pb={10}
      sx={{
        // background: "linear-gradient(to bottom, #6C63FF, #3F51B5)", // Gradient similar to the image
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
          }}
        >
          {/* Header Section */}
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{
              borderBottom: "1px solid #E5E7EB",
              mb: 2,
              display: { xs: "none", md: "block" },
            }}
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              {/* Logo */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Link href="/" passHref>
                  <Box
                    component="img"
                    src="/images/logo_trademarked.png" // Replace with actual logo path
                    alt="logo"
                    sx={{ height: "60px", cursor: "pointer" }}
                  />
                </Link>
                <Typography
                  variant="h5"
                  // component={Link}
                  // href="/"
                  sx={{ textDecoration: "none", color: "black" }}
                >
                  ReferMyJob
                </Typography>
              </Box>
              {/* Register and Profile */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  variant="outlined"
                  href="/register"
                  component={Link}
                  sx={{
                    textTransform: "none",
                    borderRadius: "24px",
                    px: 3,
                    color: "black",
                    backgroundColor: "#e5e7eb",
                    borderColor: "#E5E7EB",
                    "&:hover": {
                      borderColor: "#D1D5DB",
                    },
                  }}
                >
                  Register
                </Button>
                <Avatar alt="Profile" />
              </Box>
            </Toolbar>
          </AppBar>
          <Grid container spacing={4} sx={{ padding: "45px" }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: "none", md: "block" },
                // textAlign: "center",
              }}
            >
              <Box
                sx={{
                  // maxWidth: "500px",
                  // mx: "auto",
                  // mb: { xs: 2, md: 0 },
                  paddingLeft: "100px",
                }}
              >
                <img
                  src="/images/desktop_ver_image.png"
                  alt="ReferMyJob"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    // marginLeft: "auto",
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                // display: { xs: "none", md: "block" },
                textAlign: "center",
              }}
            >
              {/* Logo and Heading */}
              <Typography
                textAlign="center"
                variant="h4"
                fontWeight="bold"
                sx={{
                  color: "black",
                  display: { xs: "block", sm: "block", md: "none" },
                }}
              >
                ReferMyJob
              </Typography>
              <Typography
                textAlign="center"
                variant="h5"
                // color="text.secondary"
                sx={{ color: "black" }}
                mb={3}
              >
                Helping people apply for jobs through referrals
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <InputLabel
                    htmlFor="email-login"
                    sx={{
                      fontWeight: "400",
                      color: "#000",
                      textAlign: "left",
                      display: { xs: "block", sm: "block", md: "none" },
                    }}
                  >
                    Email Address / Username
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    id="email-login"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.email}
                    placeholder="Enter your email"
                    sx={{
                      borderRadius: "8px",
                      color: "black",
                    }}
                  />
                  {errors.email && (
                    <FormHelperText error>{errors.email}</FormHelperText>
                  )}
                </Stack>

                <Stack spacing={2} mt={2}>
                  <InputLabel
                    htmlFor="password"
                    sx={{
                      fontWeight: "400",
                      color: "#000",
                      textAlign: "left",
                      display: { xs: "block", sm: "block", md: "none" },
                    }}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    id="password"
                    type={passwordVisibility ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.password}
                    placeholder="Enter your password"
                    endAdornment={
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {passwordVisibility ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    }
                    sx={{
                      borderRadius: "8px",
                      color: "black",
                    }}
                  />
                  {errors.password && (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  )}
                </Stack>
                {/* 
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                   sx={{ color:"black"}}
                    size="small"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                }
                label="Keep me signed in"
                sx={{ fontSize: "14px" }}
              />
              <Typography
                component={Link}
                href="forgotPassword"
                variant="subtitle2"
               sx={{ color:"black"}}
              >
                Forgot Password?
              </Typography>
            </Stack> */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                >
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleRememberMeChange}
                    sx={{
                      backgroundColor: "#F3F4F6",
                      color: "black",
                      fontWeight: "bold",
                      textTransform: "none",
                      borderRadius: "24px",
                      padding: "4px 10px",
                      fontSize: "14px",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#E5E7EB",
                      },
                    }}
                  >
                    {rememberMe ? "Keep me signed out" : "Keep me signed in"}
                  </Button>

                  <Button
                    variant="contained"
                    disableElevation
                    component={Link}
                    href="forgotPassword"
                    sx={{
                      backgroundColor: "#F3F4F6",
                      color: "black",
                      fontWeight: "bold",
                      textTransform: "none",
                      borderRadius: "24px",
                      padding: "4px 10px",
                      fontSize: "14px",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#E5E7EB",
                      },
                    }}
                  >
                    Forgot Password?
                  </Button>
                </Stack>

                <Stack spacing={2} mt={2}>
                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                      backgroundColor: "#6366F1",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "24px",
                      height: "48px",
                      fontSize: "16px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#4F46E5",
                      },
                    }}
                  >
                    LOGIN
                  </LoadingButton>
                </Stack>

                <Box sx={{ textAlign: "center", marginTop: "10px" }}>
                  <Typography
                    component={Link}
                    href="register"
                    color="text.secondary"
                    sx={{
                      fontSize: "14px",
                      textDecoration: "underline",
                      textAlign: "center",
                    }}
                  >
                    New User? Register Here
                  </Typography>
                </Box>
              </Box>

              {/* Divider and Social Login */}
              <Box my={4}>
                {/* <Divider sx={{ mb: 2 }}> */}
                <Typography
                  variant="body"
                  color="text.secondary"
                  sx={{ fontWeight: "bold" }}
                >
                  Login with
                </Typography>
                {/* </Divider> */}

                {/* Social Buttons */}

                <Box justifyContent="center" mt={2}>
                  <FirebaseSocial />
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* Footer Section */}
          <Box
            component="footer"
            sx={{
              // py: 4,
              mt: 4,
              // backgroundColor: "#F9FAFB",
              // borderTop: "1px solid #E5E7EB",
              display: { xs: "none", md: "block" },
            }}
          >
            <Container maxWidth="lg" sx={{ textAlign: "center" }}>
              <Stack direction="row" justifyContent="center" spacing={4}>
                <MuiLink href="/about" color="text.secondary">
                  About
                </MuiLink>
                <MuiLink href="/careers" color="text.secondary">
                  Careers
                </MuiLink>
                <MuiLink href="/contact" color="text.secondary">
                  Contact
                </MuiLink>
              </Stack>

              <Stack direction="row" justifyContent="center" spacing={2}>
                <MuiLink href="#" color="text.secondary">
                  <i className="fab fa-twitter"></i>
                </MuiLink>
                <MuiLink href="#" color="text.secondary">
                  <i className="fab fa-instagram"></i>
                </MuiLink>
                <MuiLink href="#" color="text.secondary">
                  <i className="fab fa-linkedin"></i>
                </MuiLink>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                © 2023 ReferMyJob
              </Typography>
            </Container>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

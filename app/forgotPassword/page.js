// // components/ForgotPassword.js
// "use client"
// import { useState } from 'react';
// import { postResponse } from '../components/_apihandler';

// function ForgotPassword() {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const response = await postResponse('/api/forgot-password', { email })
//         console.log(response, "response");
//         // setMessage(data.message);
//     };

//     return (
//         <div>
//             <h1>Forgot Password</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter your email"
//                     required
//                 />
//                 <button type="submit">Send Reset Link</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// }

// export default ForgotPassword;

// "use client"
// import { useState } from 'react';
// import { Container, Box, TextField, Typography, Paper } from '@mui/material';
// import { postResponse } from '../components/_apihandler';
// import { LoadingButton } from '@mui/lab';
// import { notify } from '../components/Toast';

// function ForgotPassword() {
//     const [email, setEmail] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         try {
//             const response = await postResponse('/api/forgot-password', { email });
//             console.log(response, "response");

//             if (response.status === 200) {
//                 notify(response.data.message, 'success');
//                 setEmail('')
//             } else {
//                 notify("Something went wrong. Please try again!", 'error');
//                 setEmail('')
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             notify("Something went wrong. Please try again!", 'error');
//             setEmail('')
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Container maxWidth="sm">
//             <Box
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="center"
//                 alignItems="center"
//                 minHeight="100vh"
//             >
//                 <Paper elevation={3} style={{ padding: '2rem', width: '100%', backgroundColor: 'white' }}>
//                     <Typography variant="h4" component="h1" gutterBottom align="center">
//                         Forgot Password
//                     </Typography>
//                     <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//                         <TextField
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter your email"
//                             required
//                             fullWidth
//                             margin="normal"
//                         />
//                         <LoadingButton
//                             loading={loading}
//                             variant="contained"
//                             fullWidth
//                             type="submit"
//                             color="primary"
//                         >
//                             Send Reset Link
//                         </LoadingButton>
//                     </form>
//                 </Paper>
//             </Box>
//         </Container>
//     );
// }

// export default ForgotPassword;

"use client";
import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { postResponse } from "../components/_apihandler";
import { LoadingButton } from "@mui/lab";
import { notify } from "../components/Toast";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // For showing success icon
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    setEmailError(""); // Clear error
    try {
      const response = await postResponse("/api/forgot-password", { email });
      console.log(response, "response");

      if (response.status === 200) {
        notify(response.data.message, "success");
        setEmail("");
        setEmailSent(true);
      } else {
        notify("Something went wrong. Please try again!", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      notify("Something went wrong. Please try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ textAlign: "center" }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 3, md: 5 },
            width: "100%",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
          }}
        >
          {/* Success Message or Header */}
          {!emailSent ? (
            <>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ color: "black" }}
              >
                Forgot Password
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Enter your email address to receive a password reset link.
              </Typography>

              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  fullWidth
                  margin="normal"
                  error={!!emailError}
                  helperText={emailError}
                  InputProps={{
                    sx: {
                      color: "black", // Text color for the input field
                      "& .MuiInputBase-input::placeholder": {
                        color: "#5A5A5A", // Placeholder color
                        opacity: 1, // Ensures that the placeholder color is fully opaque
                      },
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#5A5A5A" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <LoadingButton
                  loading={loading}
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    // py: 1.5,
                    backgroundColor: "#F3F4F6",
                    color: "black",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#F3F4F6",
                    },
                    borderRadius: "8px",
                  }}
                >
                  Send Reset Link
                </LoadingButton>
              </form>
            </>
          ) : (
            <Box textAlign="center">
              <CheckCircleOutlineIcon
                sx={{ fontSize: 60, color: "#4caf50", mb: 2 }}
              />
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Email Sent!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                A reset link has been sent to your email address. Please check
                your inbox.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Go To Login Page{" "}
                <Link href="/login" passHref>
                  <Typography
                    component="a"
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </Typography>
                </Link>
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default ForgotPassword;

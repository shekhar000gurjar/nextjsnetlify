// // app/reset-password/page.js
// "use client";
// import { useState, useEffect, Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { postResponse } from '../components/_apihandler';
// import { CircularProgress } from '@mui/material';

// function ResetPasswordComponent() {
//     const searchParams = useSearchParams();
//     const token = searchParams.get('token'); // Get the token from the query parameters
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         if (!token) {
//             setMessage('Invalid or missing token.');
//         }
//     }, [token]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (password !== confirmPassword) {
//             setMessage("Passwords do not match.");
//             return;
//         }

//         const response = await postResponse('/api/reset-password', { token, password });

//         console.log(response, "res")
//         if (response.status === 200) {

//             setMessage(response.data.message);

//         }
//         // const data = await response.json();
//     };

//     return (
//         <div>
//             <h1>Reset Password</h1>
//             {message && <p>{message}</p>}
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter new password"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="Confirm new password"
//                     required
//                 />
//                 <button type="submit">Reset Password</button>
//             </form>
//         </div>
//     );
// };



// export default function ResetPassword() {
//     return (
//         <Suspense fallback={<CircularProgress />}>
//             <ResetPasswordComponent />
//         </Suspense>
//     );
// }

"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Box, TextField, Button, Typography, Paper, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { postResponse } from '../components/_apihandler';
import { notify } from '../components/Toast';

function ResetPasswordComponent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); // Get the token from the query parameters
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!token) {
            setMessage('Invalid or missing token.');
        }
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            // notify("Passwords do not match.", 'error');
            return;
        }

        setLoading(true);

        try {
            const response = await postResponse('/api/reset-password', { token, password });
            console.log(response, "response");

            if (response.status === 200) {
                // setMessage(response.data.message);
                notify(response.data.message, 'success');
            } else {
                // setMessage("Something went wrong. Please try again!");
                notify("Something went wrong. Please try again!", 'error');
            }
        } catch (error) {
            console.error("Error:", error);
            // setMessage("An unexpected error occurred. Please try again!");
            notify("An unexpected error occurred. Please try again!", 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Paper elevation={3} style={{ padding: '2rem', width: '100%', backgroundColor: 'white' }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Reset Password
                    </Typography>
                    {message && <Typography variant="body1" color="error" align="center">{message}</Typography>}
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            fullWidth
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            fullWidth
                            margin="normal"
                        />
                        <Box display="flex" justifyContent="center" marginTop="1rem">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "Reset Password"}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default function ResetPassword() {
    return (
        <Suspense fallback={<CircularProgress />}>
            <ResetPasswordComponent />
        </Suspense>
    );
}

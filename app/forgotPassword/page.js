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


"use client"
import { useState } from 'react';
import { Container, Box, TextField, Typography, Paper } from '@mui/material';
import { postResponse } from '../components/_apihandler';
import { LoadingButton } from '@mui/lab';
import { notify } from '../components/Toast';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await postResponse('/api/forgot-password', { email });
            console.log(response, "response");

            if (response.status === 200) {
                notify(response.data.message, 'success');
                setEmail('')
            } else {
                notify("Something went wrong. Please try again!", 'error');
                setEmail('')
            }
        } catch (error) {
            console.error("Error:", error);
            notify("Something went wrong. Please try again!", 'error');
            setEmail('')
        } finally {
            setLoading(false);
        }
    };

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
                        Forgot Password
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            fullWidth
                            margin="normal"
                        />
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            fullWidth
                            type="submit"
                            color="primary"
                        >
                            Send Reset Link
                        </LoadingButton>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
}

export default ForgotPassword;


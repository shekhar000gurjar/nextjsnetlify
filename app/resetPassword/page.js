// // components/ResetPassword.js
// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';  // Corrected the import from 'next/navigation' to 'next/router'
// import { postResponse } from '../components/_apihandler';

// function ResetPassword() {
//     const router = useRouter();
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             setMessage("Passwords do not match.");
//             return;  // Prevent the form from being submitted
//         }

//         // Proceed with the form submission if passwords match
//         const response = await postResponse('/api/reset-password', {
//             token: router.query.token,
//             password
//         });

//         console.log(response, "res");
//         setMessage(response.message);  // Assuming response includes a message field
//     };

//     return (
//         <div>
//             <h1>Reset Password</h1>
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
//             {message && <p>{message}</p>}
//         </div>
//     );
// }

// export default ResetPassword;

// app/reset-password/page.js
"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { postResponse } from '../components/_apihandler';
import { CircularProgress } from '@mui/material';

function ResetPasswordComponent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); // Get the token from the query parameters
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) {
            setMessage('Invalid or missing token.');
        }
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const response = await postResponse('/api/reset-password', { token, password });

        console.log(response, "res")
        if (response.status === 200) {

            setMessage(response.data.message);

        }
        // const data = await response.json();
    };

    return (
        <div>
            <h1>Reset Password</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};



export default function ResetPassword() {
    return (
        <Suspense fallback={<CircularProgress />}>
            <ResetPasswordComponent />
        </Suspense>
    );
}
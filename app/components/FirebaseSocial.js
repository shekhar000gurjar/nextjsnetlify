
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import Link from 'next/link';
// assets
// import Google from './assets/icons/google.svg';
// import Twitter from 'assets/icons/twitter.svg';
// import Facebook from 'assets/icons/facebook.svg';

// import { ReactComponent as Google } from '../assets/icons/google.svg'
// import Twitter from '/images/icons/google.svg'
// import Facebook from '../assets/icons/facebook.svg'

export default function FirebaseSocial() {
    // const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2 }}
            justifyContent={{ xs: 'space-around', sm: 'space-between' }}
            sx={{ '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 }, ml: { xs: 0, sm: -0.5 } } }}
        >


            <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<img src='/images/icons/google.svg' alt="Twitter" />}
                component={Link} href="https://www.google.co.in/" 
            >
                Google
            </Button>
            <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<img src='/images/icons/linkedin.svg' alt="linkedin" />}
                sx={{marginTop: '-5px'}}
                component={Link} href="https://www.linkedin.com/feed/" 
            >
                {'Linkedin'}
            </Button>
            <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<img src='/images/icons/facebook.svg' alt="Facebook" />}
                component={Link} href="https://www.facebook.com/" 
            >
                {'Facebook'}
            </Button>

        </Stack>
    )
}




// import { useState } from 'react';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
// import axios from 'axios';

// // Initialize Firebase App outside of the component if not already initialized
// import { firebaseApp } from '../firebase-config'; // Ensure you have this file configuring firebase

// const auth = getAuth(firebaseApp);
// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();

// const CLIENT_ID = 'YOUR_LINKEDIN_CLIENT_ID';
// const REDIRECT_URI = 'YOUR_REDIRECT_URI';
// const CLIENT_SECRET = 'YOUR_LINKEDIN_CLIENT_SECRET';
// const STATE = 'UNIQUE_STATE_STRING';

// export default function FirebaseSocial() {
//     const [authState, setAuthState] = useState({
//         user: null,
//         signupType: ''
//     });

//     const handleAuth = async (provider, type) => {
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;
//             setAuthState({ user: user, signupType: type }); // Save the user and the type of signup
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleLinkedInAuth = () => {
//         window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${STATE}&scope=r_liteprofile`;
//     };

//     const exchangeCodeForToken = async (code) => {
//         try {
//             const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, {
//                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//             });
//             return response.data.access_token;
//         } catch (error) {
//             console.error('Error fetching LinkedIn access token:', error);
//             throw error;
//         }
//     };

//     const fetchLinkedInProfile = async (accessToken) => {
//         try {
//             const profile = await axios.get('https://api.linkedin.com/v2/me', {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             });
//             console.log('LinkedIn Profile:', profile.data);
//             setAuthState({ user: profile.data, signupType: 'LinkedIn' });
//         } catch (error) {
//             console.error('Error fetching LinkedIn profile:', error);
//             throw error;
//         }
//     };

//     // This useEffect would handle the OAuth callback
//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const code = urlParams.get('code');
//         const state = urlParams.get('state');

//         if (code && state === STATE) {
//             exchangeCodeForToken(code)
//                 .then(accessToken => fetchLinkedInProfile(accessToken))
//                 .catch(console.error);
//         }
//     }, []);

//     return (
//         <Stack
//             direction="row"
//             spacing={{ xs: 1, sm: 2 }}
//             justifyContent={{ xs: 'space-around', sm: 'space-between' }}
//             sx={{ '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 }, ml: { xs: 0, sm: -0.5 } } }}
//         >
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/google.svg' alt="Google" />}
//                 onClick={() => handleAuth(googleProvider, 'Google')}
//             >
//                 Google
//             </Button>
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/linkedin.svg' alt="LinkedIn" />}
//                 sx={{marginTop: '-5px'}}
//                 onClick={handleLinkedInAuth}
//             >
//                 LinkedIn
//             </Button>
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/facebook.svg' alt="Facebook" />}
//                 onClick={() => handleAuth(facebookProvider, 'Facebook')}
//             >
//                 Facebook
//             </Button>
//         </Stack>
//     );
// }

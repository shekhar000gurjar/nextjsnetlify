/* eslint-disable @next/next/no-img-element */

// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Image from 'next/image'
// import Link from 'next/link';
// // assets
// // import Google from './assets/icons/google.svg';
// // import Twitter from 'assets/icons/twitter.svg';
// // import Facebook from 'assets/icons/facebook.svg';

// // import { ReactComponent as Google } from '../assets/icons/google.svg'
// // import Twitter from '/images/icons/google.svg'
// // import Facebook from '../assets/icons/facebook.svg'

// export default function FirebaseSocial() {
//     // const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
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
//                 startIcon={<img src='/images/icons/google.svg' alt="Twitter" />}
//                 component={Link} href="https://www.google.co.in/" 
//             >
//                 Google
//             </Button>
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/linkedin.svg' alt="linkedin" />}
//                 sx={{marginTop: '-5px'}}
//                 component={Link} href="https://www.linkedin.com/feed/" 
//             >
//                 {'Linkedin'}
//             </Button>
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/facebook.svg' alt="Facebook" />}
//                 component={Link} href="https://www.facebook.com/" 
//             >
//                 {'Facebook'}
//             </Button>

//         </Stack>
//     )
// }

//---------------------------------------------------------------------------------------------

// React component for social media buttons
// "use client";
// import React, { useState } from 'react';
// import { Button, Stack } from '@mui/material';
// import { signInWithGoogle, signInWithFacebook, signInWithLinkedIn } from './auth-services';
// import { postResponse } from './_apihandler';

// export default function FirebaseSocial() {

//     const [useData, setUserData] = useState({})

//     const handleLogin = async (singup_type) => {
//         try {
//             const response = await postResponse("/api/login", { ...useData, ...singup_type });
//             console.log(response, "res");
//         } catch (error) {
//             console.log(error, "err")
//         }
//     }

//     const handleGoogelLogin = async () => {
//         try {
//             const googleData = await signInWithGoogle();
//             if (googleData) {
//                 console.log(googleData, "google");
//             }
//         } catch (error) {
//             console.log(error, "err")
//         }
//     }


//     const handleFacebookLogin = async () => {
//         try {
//             const facebookData = await signInWithFacebook();
//             if (facebookData) {
//                 console.log(facebookData, "facebook");
//             }
//         } catch (error) {
//             console.log(error, "err")
//         }
//     }

//     const handleLinkedInLogin = async () => {
//         try {
//             const linkedInData = await signInWithLinkedIn();
//             if (linkedInData) {
//                 console.log(linkedInData, "LinkedIn");
//             }
//         } catch (error) {
//             console.log(error, "err")
//         }
//     }

//     return (
//         <Stack
//             direction="row"
//             spacing={{ xs: 1, sm: 2 }}
//             justifyContent={{ xs: 'space-around', sm: 'space-between' }}
//         >
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/google.svg' alt="Google" />}
//                 onClick={handleGoogelLogin}
//             >
//                 Google
//             </Button>
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/linkedin.svg' alt="LinkedIn" />}
//                 onClick={handleLinkedInLogin} // Placeholder function
//             >
//                 LinkedIn
//             </Button>
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/facebook.svg' alt="Facebook" />}
//                 onClick={handleFacebookLogin}
//             >
//                 Facebook
//             </Button>
//         </Stack>
//     )
// }

//=============================================================================================================================================
// 03-07
// "use client";
// import React, { useState } from 'react';
// import { Button, Stack, Modal, Box, Typography, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
// import { signInWithGoogle, signInWithLinkedIn } from './auth-services';

// const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

// export default function FirebaseSocial() {
//     const [userData, setUserData] = useState({});
//     const [formData, setFormData] = useState({
//         company_name: '',
//         company_email: '',
//         current_location: '',
//         position: '',
//         last_college: ''
//     });
//     const [errors, setErrors] = useState({});
//     const [modalOpen, setModalOpen] = useState(false);

//     const handleLogin = async (signup_type) => {
//         try {
//             const response = await postResponse("/api/login", { ...userData, ...signup_type });
//             console.log(response, "res");
//         } catch (error) {
//             console.log(error, "err");
//         }
//     };

//     const handleSocialLogin = async (socialLoginFunc, socialType) => {
//         try {
//             const socialData = await socialLoginFunc();
//             if (socialData) {
//                 setUserData(prevState => ({ ...prevState, [socialType]: socialData }));
//                 if (Object.keys(userData).length === 2) {  // If both logins are successful
//                     setModalOpen(true);
//                 }
//             }
//         } catch (error) {
//             console.log(error, "err");
//         }
//     };

//     const handleGoogleLogin = () => handleSocialLogin(signInWithGoogle, 'google');
//     const handleLinkedInLogin = () => handleSocialLogin(signInWithLinkedIn, 'linkedin');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({ ...prevState, [name]: value }));
//     };

//     const handleClose = () => setModalOpen(false);

//     return (
//         <Stack
//             direction="row"
//             spacing={{ xs: 1, sm: 2 }}
//             justifyContent={{ xs: 'space-around', sm: 'space-between' }}
//         >
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/google.svg' alt="Google" />}
//                 onClick={handleGoogleLogin}
//             >
//                 Google
//             </Button>
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/linkedin.svg' alt="LinkedIn" />}
//                 onClick={handleLinkedInLogin}
//             >
//                 LinkedIn
//             </Button>

//             <Modal
//                 open={modalOpen}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={modalStyle}>
//                     <Typography id="modal-modal-title" variant="h6" component="h2">
//                         Company Details
//                     </Typography>
//                     <Stack spacing={1} mt={3}>
//                         <InputLabel htmlFor="company_name" sx={{ fontWeight: '600', color: 'primary.main' }}>Company *</InputLabel>
//                         <OutlinedInput
//                             size="small"
//                             id="company_name"
//                             type="text"
//                             name="company_name"
//                             value={formData.company_name}
//                             onChange={handleChange}
//                             fullWidth
//                             placeholder="Enter your company name"
//                             error={!!errors.company_name}
//                         />
//                         {errors.company_name && <FormHelperText error>{errors.company_name}</FormHelperText>}
//                     </Stack>
//                     <Stack spacing={1} mt={3}>
//                         <InputLabel htmlFor="company_email" sx={{ fontWeight: '600', color: 'primary.main' }}>Company Email &nbsp;
//                             <Typography variant="caption">(optional)</Typography>
//                         </InputLabel>
//                         <OutlinedInput
//                             size="small"
//                             id="company_email"
//                             type="email"
//                             name="company_email"
//                             value={formData.company_email}
//                             onChange={handleChange}
//                             fullWidth
//                             placeholder="Enter your company email"
//                             error={!!errors.company_email}
//                         />
//                         {errors.company_email && <FormHelperText error>{errors.company_email}</FormHelperText>}
//                     </Stack>
//                     <Stack spacing={1} mt={3}>
//                         <InputLabel htmlFor="current_location" sx={{ fontWeight: '600', color: 'primary.main' }}>Current Location *</InputLabel>
//                         <OutlinedInput
//                             size="small"
//                             id="current_location"
//                             type="text"
//                             name="current_location"
//                             value={formData.current_location}
//                             onChange={handleChange}
//                             fullWidth
//                             placeholder="Enter your current location"
//                             error={!!errors.current_location}
//                         />
//                         {errors.current_location && <FormHelperText error>{errors.current_location}</FormHelperText>}
//                     </Stack>
//                     <Stack spacing={1} mt={3}>
//                         <InputLabel htmlFor="position" sx={{ fontWeight: '600', color: 'primary.main' }}>Position *</InputLabel>
//                         <OutlinedInput
//                             size="small"
//                             id="position"
//                             type="text"
//                             name="position"
//                             value={formData.position}
//                             onChange={handleChange}
//                             fullWidth
//                             placeholder="Enter your position"
//                             error={!!errors.position}
//                         />
//                         {errors.position && <FormHelperText error>{errors.position}</FormHelperText>}
//                     </Stack>
//                     <Stack spacing={1} mt={3}>
//                         <InputLabel htmlFor="last_college" sx={{ fontWeight: '600', color: 'primary.main' }}>Latest College Name *</InputLabel>
//                         <OutlinedInput
//                             size="small"
//                             id="last_college"
//                             type="text"
//                             name="last_college"
//                             value={formData.last_college}
//                             onChange={handleChange}
//                             fullWidth
//                             placeholder="Enter your latest college name"
//                             error={!!errors.last_college}
//                         />
//                         {errors.last_college && <FormHelperText error>{errors.last_college}</FormHelperText>}
//                     </Stack>
//                 </Box>
//             </Modal>
//         </Stack>
//     );
// }

// "use client";
// import React, { useState } from 'react';
// import { Button, Stack, Modal, Box, Typography, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
// import { signInWithGoogle, signInWithLinkedIn } from './auth-services';
// import { postResponse } from './_apihandler';

// const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

// export default function FirebaseSocial() {
//     const [userData, setUserData] = useState({
//         first_name,
//         last_name,
//         email,
//         phone_number: phone_number || '',
//         singup_type
//     });
//     const [formData, setFormData] = useState({
//         company_name: '',
//         company_email: '',
//         current_location: '',
//         position: '',
//         last_college: ''
//     });
//     const [errors, setErrors] = useState({});
//     const [modalOpen, setModalOpen] = useState(false);

//     const handleLogin = async (signup_type) => {
//         try {
//             const response = await postResponse("/api/login", { ...userData, ...signup_type });
//             console.log(response, "res");
//         } catch (error) {
//             console.log(error, "err");
//         }
//     };

//     const handleSocialLogin = async (socialLoginFunc, socialType) => {
//         try {
//             const socialData = await socialLoginFunc();
//             if (socialData) {
//                 setUserData(prevState => ({ ...prevState, [socialType]: socialData }));
//                 console.log(socialData, "socialData")
//                 setModalOpen(true);  // Open modal if any one login is successful
//             }
//         } catch (error) {
//             console.log(error, "err");
//         }
//     };
//     console.log(userData, "userData")
//     const handleGoogleLogin = () => handleSocialLogin(signInWithGoogle, 'google');
//     const handleLinkedInLogin = () => handleSocialLogin(signInWithLinkedIn, 'linkedin');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({ ...prevState, [name]: value }));
//     };

//     const handleClose = () => setModalOpen(false);

//     return (
//         <Stack
//             direction="row"
//             spacing={{ xs: 1, sm: 2 }}
//             justifyContent={{ xs: 'space-around', sm: 'space-between' }}
//         >
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/google.svg' alt="Google" />}
//                 onClick={handleGoogleLogin}
//             >
//                 Google
//             </Button>
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 startIcon={<img src='/images/icons/linkedin.svg' alt="LinkedIn" />}
//                 onClick={handleLinkedInLogin}
//             >
//                 LinkedIn
//             </Button>

//             <Modal
//                 open={modalOpen}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={modalStyle}>
//                     <Typography id="modal-modal-title" variant="h6" component="h2">
//                         Company Details
//                     </Typography>
//                     <Stack spacing={1} mt={3}>
//                         <InputLabel htmlFor="company_name" sx={{ fontWeight: '600', color: 'primary.main' }}>Company *</InputLabel>
//                         <OutlinedInput
//                             size="small"
//                             id="company_name"
//                             type="text"
//                             name="company_name"
//                             value={formData.company_name}
//                             onChange={handleChange}
//                             fullWidth
//                             placeholder="Enter your company name"
//                             error={!!errors.company_name}
//                         />
//                         {errors.company_name && <FormHelperText error>{errors.company_name}</FormHelperText>}
//                     </Stack>
//                     <Stack spacing={1} mt={3}>
//                         <InputLabel htmlFor="company_email" sx={{ fontWeight: '600', color: 'primary.main' }}>Company Email &nbsp;
//                             <Typography variant="caption">(optional)</Typography>
//                         </InputLabel>
//                         <OutlinedInput
//                             size="small"
//                             id="company_email"
//                             type="email"
//                             name="company_email"
//                             value={formData.company_email}
//                             onChange={handleChange}
//                             fullWidth
//                             placeholder="Enter your company email"
//                             error={!!errors.company_email}
//                         />
//                         {errors.company_email && <FormHelperText error>{errors.company_email}</FormHelperText>}
//                     </Stack>
//                     <Stack spacing={1} mt={3}>
//                         <InputLabel htmlFor="current_location" sx={{ fontWeight: '600', color: 'primary.main' }}>Current Location *</InputLabel>
//                         <OutlinedInput
//                             size="small"
//                             id="current_location"
//                             type="text"
//                             name="current_location"
//                             value={formData.current_location}
//                             onChange={handleChange}
//                             fullWidth
//                             placeholder="Enter your current location"
//                             error={!!errors.current_location}
//                         />
//                         {errors.current_location && <FormHelperText error>{errors.current_location}</FormHelperText>}
//                     </Stack>
//                     <Stack spacing={1} mt={3}>
//                         <InputLabel htmlFor="position" sx={{ fontWeight: '600', color: 'primary.main' }}>Position *</InputLabel>
//                         <OutlinedInput
//                             size="small"
//                             id="position"
//                             type="text"
//                             name="position"
//                             value={formData.position}
//                             onChange={handleChange}
//                             fullWidth
//                             placeholder="Enter your position"
//                             error={!!errors.position}
//                         />
//                         {errors.position && <FormHelperText error>{errors.position}</FormHelperText>}
//                     </Stack>
//                     <Stack spacing={1} mt={3}>
//                         <InputLabel htmlFor="last_college" sx={{ fontWeight: '600', color: 'primary.main' }}>Latest College Name *</InputLabel>
//                         <OutlinedInput
//                             size="small"
//                             id="last_college"
//                             type="text"
//                             name="last_college"
//                             value={formData.last_college}
//                             onChange={handleChange}
//                             fullWidth
//                             placeholder="Enter your latest college name"
//                             error={!!errors.last_college}
//                         />
//                         {errors.last_college && <FormHelperText error>{errors.last_college}</FormHelperText>}
//                     </Stack>
//                 </Box>
//             </Modal>
//         </Stack>
//     );
// }


"use client";
import React, { useState } from 'react';
import { Button, Stack, Modal, Box, Typography, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { signInWithGoogle, signInWithLinkedIn } from './auth-services';
import { postResponse } from './_apihandler';
import { userDetails } from '@/middleware/userDetails';
import { useRouter } from "next/navigation";

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

export default function FirebaseSocial() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        signup_type: ''
    });
    const [formData, setFormData] = useState({
        company_name: '',
        company_email: '',
        current_location: '',
        position: '',
        last_college: ''
    });
    const [errors, setErrors] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const getUserDetails = async () => {
        if (localStorage.getItem('token')) {
            const response = await userDetails();
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                router.push('/search-company');
            }
        }
    };

    const handleLogin = async (updatedUserData) => {
        try {
            const response = await postResponse("/api/login", updatedUserData);
            console.log(response, "login response");
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                getUserDetails()
                // setModalOpen(true);
            }
        } catch (error) {
            console.log(error, "err");
        }
    };

    const handleSocialLogin = async (socialLoginFunc, socialType) => {
        try {
            const socialData = await socialLoginFunc();
            if (socialData) {
                const { user } = socialData;
                const updatedUserData = {
                    first_name: user.displayName.split(' ')[0],
                    last_name: user.displayName.split(' ').slice(1).join(' '),
                    email: user.email,
                    signup_type: socialType
                };
                setUserData(updatedUserData);
                handleLogin(updatedUserData);  // Perform login after setting user data
            }
        } catch (error) {
            console.log(error, "err");
        }
    };
    // console.log(userData, "userData")
    const handleGoogleLogin = () => handleSocialLogin(signInWithGoogle, 'google');
    const handleLinkedInLogin = () => handleSocialLogin(signInWithLinkedIn, 'linkedin');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleClose = () => setModalOpen(false);

    return (
        <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2 }}
            justifyContent={{ xs: 'space-around', sm: 'space-between' }}
        >
            <Button
                // variant="outlined"
                // color="primary"
                // fullWidth
                // startIcon={<img src='/images/icons/google.svg' alt="Google" />}
                variant="outlined"
                sx={{
                    color:"text.secondary",
                    textTransform: 'none',
                    borderRadius: '24px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    width: '45%',
                    borderColor: '#E5E7EB',
                    backgroundColor:"#E5E7EB",
                    '&:hover': {
                        borderColor: '#D1D5DB',
                    }
                }}
                onClick={handleGoogleLogin}
            >
                Google
            </Button>
            <Button
                // variant="outlined"
                // color="primary"
                // fullWidth
                // startIcon={<img src='/images/icons/linkedin.svg' alt="LinkedIn" />}
                variant="outlined"
                sx={{
                    color:"text.secondary",
                    textTransform: 'none',
                    borderRadius: '24px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    width: '45%',
                    borderColor: '#E5E7EB',
                    backgroundColor:"#E5E7EB",
                    '&:hover': {
                        borderColor: '#D1D5DB',
                    }
                }}
                onClick={handleLinkedInLogin}
            >
                LinkedIn
            </Button>

            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Company Details
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
                </Box>
            </Modal>
        </Stack>
    );
}


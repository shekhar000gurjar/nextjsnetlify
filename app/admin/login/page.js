/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    InputBase,
    InputLabel,
    OutlinedInput,
    Paper,
    Stack,
    Typography,
    FormHelperText,
    IconButton
} from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { notify } from "../../components/Toast";
import { LoadingButton } from "@mui/lab";
import { postResponse } from "../../components/_apihandler";
import { getAdminDetails } from "@/middleware/userDetails";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        type: "admin"
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const storedEmail = localStorage.getItem('rememberMeAdminEmail');
        const storedPassword = localStorage.getItem('rememberMeAdminPassword');
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
            [name]: ""
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Fetch user details if token is present
    const adminDetails = async () => {
        if (localStorage.getItem('adminToken')) {
            const response = await getAdminDetails();
            if (response.status === 200) {
                localStorage.setItem('admin', JSON.stringify(response.data.data));
                router.push('/admin/home');
            }
        }
    };

    useEffect(() => {
        adminDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await postResponse("/api/admin/login", formData);
            if (response.status === 200) {
                notify(response.data.msg, 'success');
                if (rememberMe) {
                    localStorage.setItem('rememberMeAdminEmail', formData.email);
                    localStorage.setItem('rememberMeAdminPassword', formData.password);
                } else {
                    localStorage.removeItem('rememberMeAdminEmail');
                    localStorage.removeItem('rememberMeAdminPassword');
                }
                localStorage.setItem('adminToken', response.data.token);
                adminDetails();
            } else {
                notify(response.data.msg, 'error');
            }
        } catch (error) {
            console.log(error, "err")
            notify(error.response?.data?.msg || "Something went wrong", 'error');

        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    return (
        <Box className='reBg' pb={10}>
            <Box py={4} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <Typography textAlign='center' variant="h3" color='text.white'>ReferMyJob</Typography>
                <Typography textAlign='center' variant="h5" color='text.white'>Helping people apply for jobs through referrals</Typography>
            </Box>
            <Box mt={2}>
                <Container>
                    <Grid container justifyContent="center" spacing={5} sx={{ px: 6 }}>
                        <Grid item xs={12} sm={6}  >
                            <Paper sx={{ mt: 4, px: 2, py: 4, borderRadius: 3, height: '100%' }}>
                                {/* <Typography variant="h5" fontWeight='bold' sx={{ pb: 1.5 }}> Login to start sending job referrals</Typography> */}
                                <Divider sx={{ borderBottom: "solid", borderColor: 'primary.main', mb: 4 }} />

                                <Box component="form" onSubmit={handleSubmit}>
                                    <Stack spacing={1} >
                                        <InputLabel htmlFor="email-login" sx={{ fontWeight: '600', color: 'primary.main' }}>Email Address / Username</InputLabel>
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
                                        />
                                        {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                                    </Stack>
                                    <Stack spacing={1} mt={3}>
                                        <InputLabel htmlFor="password" sx={{ fontWeight: '600', color: 'primary.main' }}>Password</InputLabel>
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
                                                    {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            }
                                        />
                                        {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                                    </Stack>
                                    <Stack direction="row" my={2} justifyContent="space-between" alignItems="center" spacing={2}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="rememberMe"
                                                    color="primary"
                                                    size="small"
                                                    checked={rememberMe}
                                                    onChange={handleRememberMeChange}
                                                />
                                            }
                                            label={<Typography variant="subtitle2" color='text.secondary'>Keep me signed in</Typography>}
                                        />

                                        {/* <Typography component={Link} href="forgotPassword" variant="subtitle2" color='text.secondary'>Forgot Password?</Typography> */}
                                    </Stack>
                                    {/* <Typography component={Link} href="register" variant="subtitle2" color='text.primary'>New User? Register Here</Typography> */}
                                    <Stack direction="row" spacing={2} mt={3}>
                                        <LoadingButton loading={loading} variant="contained" fullWidth type="submit">Login</LoadingButton>
                                    </Stack>
                                </Box>
                                {/* <Box my={4}>
                                    <Divider>
                                        <Typography variant="caption"> Login with</Typography>
                                    </Divider></Box>
                                <FirebaseSocial /> */}
                            </Paper>
                        </Grid>
                        {/* <Grid item xs={12} sm={6} >
                            <Paper sx={{ mt: 4, px: 2, py: 4, borderRadius: 3, height: '100%' }}>
                                <Typography variant="h5" fontWeight='bold' sx={{ pb: 1.5 }}>Search for refer buddies</Typography>
                                <Divider sx={{ borderBottom: "solid", borderColor: 'primary.main', mb: 4 }} />
                                <Stack spacing={1} mb={4}>
                                    <Paper
                                        component="form"
                                        sx={{ p: '1px 4px', display: 'flex', alignItems: 'center', }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Search by company"
                                            inputProps={{ 'aria-label': 'Search by company' }}
                                        />
                                        <Button variant="contained" >Search</Button>
                                    </Paper>
                                </Stack>
                                <ul className="company-list" id="company-list">
                                    <li>Google</li>
                                    <li>Microsoft</li>
                                    <li>Amazon</li>
                                    <li>Apple</li>
                                </ul>
                            </Paper>
                        </Grid> */}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

/* eslint-disable react-hooks/exhaustive-deps */
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
    IconButton,
    Select,
    MenuItem,
    InputAdornment
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { notify } from "../components/Toast";
import { LoadingButton } from '@mui/lab';
import { postResponse } from "../components/_apihandler";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import validator from 'validator';
import { userDetails } from "@/middleware/userDetails";

// MenuProps for controlling the dropdown menu styling and positioning
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8, // Optional: limit the height of the dropdown
            zIndex: 1300, // Ensure the dropdown is on top
        },
    },
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'left',
    },
};

export default function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        email_otp: "",
        company_name: "",
        other_company_name: "",
        company_email: "",
        current_location: "",
        position: "",
        phone_number: "",
        graduationCollege: "",
        other_graduationCollege: "",
        postGradCollege: "N/A",
        other_postGradCollege: "",
        degree: "",
        sector: "",
        password: "",
        confirmPassword: "",
        signup_type: "normal"
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const [openPopup, setOpenPopup] = useState(false);
    const [referPoints, setReferPoints] = useState(0);


    const router = useRouter();

    const validateEmail = (email) => {
        return validator.isEmail(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name.trim()) newErrors.first_name = "First Name is required";
        if (!/^[a-zA-Z]+$/.test(formData.first_name)) newErrors.first_name = "First Name can only contain letters";
        if (!formData.last_name.trim()) newErrors.last_name = "Last Name is required";
        if (!/^[a-zA-Z]+$/.test(formData.last_name)) newErrors.last_name = "Last Name can only contain letters";
        if (!formData.email.trim() || !validateEmail(formData.email)) newErrors.email = "Valid email is required";
        if (!otpSent || !formData.email_otp.trim()) newErrors.email_otp = "OTP is required";
        if (!formData.company_name.trim()) newErrors.company_name = "Company Name is required";
        if (formData.company_name === "Others" && !formData.other_company_name.trim()) newErrors.other_company_name = "Please enter your company name";
        if (formData.company_email && !validateEmail(formData.company_email)) newErrors.company_email = "Invalid company email format";
        if (!formData.current_location.trim()) newErrors.current_location = "Current Location is required";
        if (formData.phone_number && !/^\d+$/.test(formData.phone_number)) newErrors.phone_number = "Phone number can only contain numbers";
        if (!formData.graduationCollege.trim()) newErrors.graduationCollege = "Graduation College is required";
        if (formData.graduationCollege === "Others" && !formData.other_graduationCollege.trim()) newErrors.other_graduationCollege = "Please enter your college name";
        if (!formData.postGradCollege.trim()) newErrors.postGradCollege = "Post Grad College is required";
        if (formData.postGradCollege === "Others" && !formData.other_postGradCollege.trim()) newErrors.other_postGradCollege = "Please enter your college name";
        if (!formData.degree.trim()) newErrors.degree = "Degree is required";
        if (!formData.sector.trim()) newErrors.sector = "Sector is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getUserDetails = async () => {
        if (localStorage.getItem('token')) {
            const response = await userDetails();
            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
                router.push('/search-company');
            }
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const handleSubmit = async (e) => {
        setLoading(true);
        if (!validateForm()) {
            setLoading(false);
            return;
        }

        const {
            first_name,
            last_name,
            email,
            email_otp,
            company_name,
            other_company_name,
            company_email,
            current_location,
            position,
            phone_number,
            graduationCollege,
            other_graduationCollege,
            postGradCollege,
            other_postGradCollege,
            degree,
            sector,
            password,
            signup_type
        } = formData;

        const dataToSend = {
            first_name,
            last_name,
            email,
            email_otp,
            company_name: company_name === "Others" ? other_company_name : company_name,
            company_email,
            current_location,
            position,
            phone_number,
            graduationCollege: graduationCollege === "Others" ? other_graduationCollege : graduationCollege,
            postGradCollege: postGradCollege === "Others" ? other_postGradCollege : postGradCollege,
            degree,
            sector,
            password,
            signup_type
        };

        try {
            const response = await postResponse("/api/register", dataToSend);
            if (response.status === 201) {
                localStorage.setItem("token", response.data.token);
                notify(response.data.msg, 'success');
                if (response.data.registration === true) {
                    // setReferPoints(response.data.total_refer_points);
                    // setOpenPopup(true);
                    localStorage.setItem("showPopup", true); // Add this line to set the flag
                    localStorage.setItem("referPoints", response.data.total_refer_points);
                }
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

    const handleSendOtp = async () => {
        setOtpSent(true);
        if (!formData.email || !validateEmail(formData.email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Valid email is required to send OTP"
            }));
            setOtpSent(false);
            return;
        }

        try {
            const response = await postResponse("/api/send-otp", { email: formData.email });
            if (response.status === 200) {
                notify("OTP sent to your email", 'success');
                setOtpSent(true);
            } else {
                notify(response.data.msg, 'error');
                setOtpSent(false);
            }
        } catch (error) {
            notify(error.response?.data?.msg || "Failed to send OTP", 'error');
            setOtpSent(false);
        }
    };

    const handleVerifyOtp = async () => {
        setOtpVerified(true);
        if (!formData.email_otp.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email_otp: "OTP is required"
            }));
            setOtpVerified(false);
            return;
        }

        try {
            const response = await postResponse("/api/verify-otp", { email: formData.email, otp: formData.email_otp });
            if (response.status === 200) {
                notify("OTP verified successfully", 'success');
                setOtpVerified(true);
            } else {
                notify(response.data.msg, 'error');
                setOtpVerified(false);
            }
        } catch (error) {
            notify(error.response?.data?.msg || "Failed to verify OTP", 'error');
            setOtpVerified(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisibility(!confirmPasswordVisibility);
    };

    const degreeOptions = [
        "Bachelor of Arts (B.A.)",
        "Bachelor of Science (B.Sc.)",
        "Bachelor of Commerce (B.Com.)",
        "Bachelor of Technology (B.Tech.)",
        "Bachelor of Engineering (B.E.)",
        "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
        "Bachelor of Computer Applications (BCA)",
        "Master of Arts (M.A.)",
        "Master of Science (M.Sc.)",
        "Master of Commerce (M.Com.)",
        "Master of Technology (M.Tech.)",
        "Master of Engineering (M.E.)",
        "Master of Business Administration (MBA)",
        "Master of Computer Applications (MCA)",
        "Doctor of Philosophy (Ph.D.)"
    ];

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
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Button onClick={handleSendOtp} disabled={otpSent || !formData.email}>Send OTP</Button>
                                                </InputAdornment>
                                            }
                                        />
                                        {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                                    </Stack>
                                    {otpSent && (
                                        <>
                                            <Stack spacing={1} mt={3}>
                                                <InputLabel htmlFor="email_otp" sx={{ fontWeight: '600', color: 'primary.main' }}>Email OTP *</InputLabel>
                                                <OutlinedInput
                                                    size="small"
                                                    id="email_otp"
                                                    type="text"
                                                    name="email_otp"
                                                    value={formData.email_otp}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    placeholder="Enter the OTP sent to your email"
                                                    error={!!errors.email_otp}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <Button onClick={handleVerifyOtp} disabled={otpVerified || !formData.email_otp}>Verify OTP</Button>
                                                        </InputAdornment>
                                                    }
                                                />
                                                {errors.email_otp && <FormHelperText error>{errors.email_otp}</FormHelperText>}
                                            </Stack>
                                        </>
                                    )}

                                    <Stack spacing={1} mt={3}>
                                        <InputLabel htmlFor="company_name" sx={{ fontWeight: '600', color: 'primary.main' }}>Company *</InputLabel>
                                        <Select
                                            size="small"
                                            id="company_name"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                            fullWidth
                                            displayEmpty
                                            error={!!errors.company_name}
                                            MenuProps={MenuProps}
                                        >
                                            <MenuItem value="" disabled>Select your company</MenuItem>
                                            <MenuItem value="Google">Google</MenuItem>
                                            <MenuItem value="Microsoft">Microsoft</MenuItem>
                                            <MenuItem value="Infosys">Infosys</MenuItem>
                                            <MenuItem value="Others">Others</MenuItem>
                                        </Select>
                                        {formData.company_name === "Others" && (
                                            <OutlinedInput
                                                size="small"
                                                id="other_company_name"
                                                type="text"
                                                name="other_company_name"
                                                value={formData.other_company_name}
                                                onChange={(e) => setFormData({ ...formData, other_company_name: e.target.value })}
                                                fullWidth
                                                placeholder="Enter your company name"
                                                error={!!errors.other_company_name}
                                                sx={{ mt: 2 }}
                                            />
                                        )}
                                        {errors.company_name && <FormHelperText error>{errors.company_name}</FormHelperText>}
                                        {errors.other_company_name && <FormHelperText error>{errors.other_company_name}</FormHelperText>}
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
                                        <Select
                                            size="small"
                                            id="current_location"
                                            name="current_location"
                                            value={formData.current_location}
                                            onChange={handleChange}
                                            fullWidth
                                            displayEmpty
                                            error={!!errors.current_location}
                                            MenuProps={MenuProps}
                                        >
                                            <MenuItem value="" disabled>Select your current location</MenuItem>
                                            <MenuItem value="India">India</MenuItem>
                                            <MenuItem value="USA">USA</MenuItem>
                                        </Select>
                                        {errors.current_location && <FormHelperText error>{errors.current_location}</FormHelperText>}
                                    </Stack>
                                    <Stack spacing={1} mt={3}>
                                        <InputLabel htmlFor="position" sx={{ fontWeight: '600', color: 'primary.main' }}>Position &nbsp;
                                            <Typography variant="caption">(optional)</Typography>
                                        </InputLabel>
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
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Paper sx={{ mt: 4, px: 2, py: 4, borderRadius: 3, height: '100%' }}>
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
                                    <InputLabel htmlFor="graduationCollege" sx={{ fontWeight: '600', color: 'primary.main' }}>Graduation College *</InputLabel>
                                    <Select
                                        size="small"
                                        id="graduationCollege"
                                        name="graduationCollege"
                                        value={formData.graduationCollege}
                                        onChange={handleChange}
                                        fullWidth
                                        displayEmpty
                                        error={!!errors.graduationCollege}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value="" disabled>Select your graduation college</MenuItem>
                                        <MenuItem value="College1">College1</MenuItem>
                                        <MenuItem value="College2">College2</MenuItem>
                                        <MenuItem value="College3">College3</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </Select>
                                    {formData.graduationCollege === "Others" && (
                                        <OutlinedInput
                                            size="small"
                                            id="other_graduationCollege"
                                            type="text"
                                            name="other_graduationCollege"
                                            value={formData.other_graduationCollege}
                                            onChange={(e) => setFormData({ ...formData, other_graduationCollege: e.target.value })}
                                            fullWidth
                                            placeholder="Enter your graduation college"
                                            error={!!errors.other_graduationCollege}
                                            sx={{ mt: 2 }}
                                        />
                                    )}
                                    {errors.graduationCollege && <FormHelperText error>{errors.graduationCollege}</FormHelperText>}
                                    {errors.other_graduationCollege && <FormHelperText error>{errors.other_graduationCollege}</FormHelperText>}
                                </Stack>

                                <Stack spacing={1} mt={3}>
                                    <InputLabel htmlFor="postGradCollege" sx={{ fontWeight: '600', color: 'primary.main' }}>Post Grad College *</InputLabel>
                                    <Select
                                        size="small"
                                        id="postGradCollege"
                                        name="postGradCollege"
                                        value={formData.postGradCollege}
                                        onChange={handleChange}
                                        fullWidth
                                        displayEmpty
                                        error={!!errors.postGradCollege}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value="N/A" disabled>N/A</MenuItem>
                                        <MenuItem value="College1">College1</MenuItem>
                                        <MenuItem value="College2">College2</MenuItem>
                                        <MenuItem value="College3">College3</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </Select>
                                    {formData.postGradCollege === "Others" && (
                                        <OutlinedInput
                                            size="small"
                                            id="other_postGradCollege"
                                            type="text"
                                            name="other_postGradCollege"
                                            value={formData.other_postGradCollege}
                                            onChange={(e) => setFormData({ ...formData, other_postGradCollege: e.target.value })}
                                            fullWidth
                                            placeholder="Enter your post grad college"
                                            error={!!errors.other_postGradCollege}
                                            sx={{ mt: 2 }}
                                        />
                                    )}
                                    {errors.postGradCollege && <FormHelperText error>{errors.postGradCollege}</FormHelperText>}
                                    {errors.other_postGradCollege && <FormHelperText error>{errors.other_postGradCollege}</FormHelperText>}
                                </Stack>

                                <Stack spacing={1} mt={3}>
                                    <InputLabel htmlFor="degree" sx={{ fontWeight: '600', color: 'primary.main' }}>Degree *</InputLabel>
                                    <Select
                                        size="small"
                                        id="degree"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleChange}
                                        fullWidth
                                        displayEmpty
                                        error={!!errors.degree}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value="" disabled>Select your degree</MenuItem>
                                        {degreeOptions.map((degree, index) => (
                                            <MenuItem key={index} value={degree}>{degree}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.degree && <FormHelperText error>{errors.degree}</FormHelperText>}
                                </Stack>
                                <Stack spacing={1} mt={3}>
                                    <InputLabel htmlFor="sector" sx={{ fontWeight: '600', color: 'primary.main' }}>Sector *</InputLabel>
                                    <Select
                                        size="small"
                                        id="sector"
                                        name="sector"
                                        value={formData.sector}
                                        onChange={handleChange}
                                        fullWidth
                                        displayEmpty
                                        error={!!errors.sector}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value="" disabled>Select your sector</MenuItem>
                                        <MenuItem value="IT & Technology">IT & Technology</MenuItem>
                                        <MenuItem value="Service">Service</MenuItem>
                                        <MenuItem value="Government">Government</MenuItem>
                                        <MenuItem value="Startup or Product based">Startup or Product based</MenuItem>
                                        <MenuItem value="Business Management">Business Management</MenuItem>
                                        <MenuItem value="Digital Media Marketing">Digital Media Marketing</MenuItem>
                                        <MenuItem value="Sales">Sales</MenuItem>
                                        <MenuItem value="Marketing">Marketing</MenuItem>
                                        <MenuItem value="Education">Education</MenuItem>
                                        <MenuItem value="Textile">Textile</MenuItem>
                                        <MenuItem value="Hospitality">Hospitality</MenuItem>
                                        <MenuItem value="Civil">Civil</MenuItem>
                                    </Select>
                                    {errors.sector && <FormHelperText error>{errors.sector}</FormHelperText>}
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
                                                    {passwordVisibility ? <Visibility /> : <VisibilityOff />}
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
                                                    {confirmPasswordVisibility ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            }
                                        />
                                        {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
                                    </Stack>
                                </Stack>
                                <Stack direction="row" spacing={2} mt={3}>
                                    <LoadingButton loading={loading} fullWidth loadingPosition="center" onClick={handleSubmit} variant="contained" type="submit" disabled={!otpVerified}>
                                        Register
                                    </LoadingButton>
                                </Stack>
                                <Typography component={Link} href="login" variant="subtitle2" color='text.primary'>I already have an account - Login</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

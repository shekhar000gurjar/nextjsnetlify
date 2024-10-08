/* eslint-disable @next/next/no-img-element */
'use client';
import {
  Box,
  Button,
  Container,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
  Modal,
  FormHelperText,
  Select,
  MenuItem,
  // LoadingButton,
  Autocomplete,
  TextField,
  InputAdornment
} from "@mui/material";
import MainLayout from '../layouts/MainLayout.js';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { notify } from "../components/Toast";
import { userDetails } from "@/middleware/userDetails.js";
import { postResponse } from "../components/_apihandler.js";
import ReferralCommunity from "./ReferralCommunity.js";
import Jobsearch from "../job_support/page.js";
import { LoadingButton } from '@mui/lab';


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

const sectorOptions = [
  "IT & Technology",
  "Service",
  "Government",
  "Startup or Product based",
  "Business Management",
  "Digital Media Marketing",
  "Sales",
  "Marketing",
  "Education",
  "Textile",
  "Hospitality",
  "Civil"
];

const companyOptions = ["Google", "Microsoft", "Infosys", "Others"];
const locationOptions = ["India", "USA"];

export default function Home() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    currentCompanyName: '',
    otherCompanyName: '',
    currentCompanyEmail: '',
    current_location: '',
    position: '',
    graduationCollege: 'N/A',
    otherGraduationCollege: '',
    postGradCollege: 'N/A',
    otherPostGradCollege: '',
    degree: '',
    sector: '',
    userId: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        setFormData(prevState => ({ ...prevState, userId: parsedUser._id }));
        console.log(parsedUser, parsedUser.signup_type, "parsedUser")
        if (parsedUser.signup_type === 'google' || parsedUser.signup_type === 'linkedin') {
          console.log(parsedUser.signup_type, "parsedUser.signup_type")
          setModalOpen(true);
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleClose = () => setModalOpen(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.currentCompanyName.trim()) newErrors.currentCompanyName = "Company Name is required";
    if (formData.currentCompanyName === "Others" && !formData.otherCompanyName.trim()) newErrors.otherCompanyName = "Please enter your company name";
    if (!formData.current_location.trim()) newErrors.current_location = "Current Location is required";
    if (!formData.graduationCollege.trim()) newErrors.graduationCollege = "Graduation College is required";
    if (formData.graduationCollege === "Others" && !formData.otherGraduationCollege.trim()) newErrors.otherGraduationCollege = "Please enter your graduation college name";
    if (!formData.postGradCollege.trim()) newErrors.postGradCollege = "Post Grad College is required";
    if (formData.postGradCollege === "Others" && !formData.otherPostGradCollege.trim()) newErrors.otherPostGradCollege = "Please enter your post grad college name";
    if (!formData.degree.trim()) newErrors.degree = "Degree is required";
    if (!formData.sector.trim()) newErrors.sector = "Sector is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const {
      currentCompanyName,
      otherCompanyName,
      currentCompanyEmail,
      position,
      current_location,
      graduationCollege,
      otherGraduationCollege,
      postGradCollege,
      otherPostGradCollege,
      degree,
      sector,
      userId
    } = formData;

    const dataToSend = {
      currentCompanyName: currentCompanyName === "Others" ? otherCompanyName : currentCompanyName,
      currentCompanyEmail,
      position,
      current_location,
      graduationCollege: graduationCollege === "Others" ? otherGraduationCollege : graduationCollege,
      postGradCollege: postGradCollege === "Others" ? otherPostGradCollege : postGradCollege,
      degree,
      sector,
      userId
    };

    try {
      const response = await postResponse("/api/add-company", dataToSend);
      if (response.status === 200) {
        notify(response.data.msg, 'success');
        getUserDetails();
        handleClose();
      } else {
        notify(response.data.msg, 'error');
      }
    } catch (error) {
      notify(error.response?.data?.msg || "Something went wrong", 'error');
    } finally {
      setLoading(false);
    }
  };

  const top100Films = [
    { label: 'Software Engineer', year: 1994 },
    { label: 'Marketing Manager', year: 1972 },
    { label: 'Graphic Designer', year: 1974 },
    { label: 'Financial Analyst', year: 2008 },
    { label: 'Sales Representative', year: 1957 },
    { label: 'IT jobs', year: 1957 },
    { label: 'Data Science jobs', year: 1957 },
    { label: 'HR jobs', year: 1957 },
    { label: 'HR jobs', year: 1957 },
    { label: 'Engineering jobs', year: 1957 },
  ];

  const countries = [
    { code: 'IN', label: 'India', phone: '91' },
    { code: 'AD', label: 'Andorra', phone: '376' },
    { code: 'AE', label: 'United Arab Emirates', phone: '971' },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    { code: 'AU', label: 'Australia', phone: '61', suggested: true },
  ];


  return (
    <>
      <MainLayout>
        <Box className='reBg' pt={12} pb={5} display='flex' alignItems='center'>
          <Container maxWidth="lg">
            <Paper elevation={3} sx={{ borderRadius: '15px', width: '100%', height: '40vh', display: 'flex', alignItems: 'center', justifyContent: "center", px: 5, }} >
              <Stack sx={{ width: '100%' }}>
                <Typography textAlign='center' variant="h3" mb={6} sx={{ fontWeight: '800' }}>Because impact matters</Typography>
                <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    fullWidth
                    renderInput={(params) => <TextField {...params}
                      label="Search by job title"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              {/* <VscSearch /> */}
                            </InputAdornment>
                          </>
                        )
                      }}
                    />}
                  />
                  <Autocomplete
                    id="country-select-demo"
                    fullWidth
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          width="20"
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          alt=""
                        />
                        {option.label} ({option.code}) +{option.phone}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose a location"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  <Button variant="contained" sx={{ width: '200px' }}>Find Job</Button>
                </Stack>
              </Stack>
            </Paper>
            <Jobsearch />
          </Container>
        </Box>

        <Modal
          open={modalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Please Fill Your Company Details
            </Typography>
            <Stack spacing={1} mt={3}>
              <InputLabel htmlFor="currentCompanyName" sx={{ fontWeight: '600', color: 'primary.main' }}>Company *</InputLabel>
              <Select
                size="small"
                id="currentCompanyName"
                name="currentCompanyName"
                value={formData.currentCompanyName}
                onChange={handleChange}
                fullWidth
                displayEmpty
                error={!!errors.currentCompanyName}
              >
                <MenuItem value="" disabled>Select your company</MenuItem>
                {companyOptions.map((company, index) => (
                  <MenuItem key={index} value={company}>{company}</MenuItem>
                ))}
              </Select>
              {errors.currentCompanyName && <FormHelperText error>{errors.currentCompanyName}</FormHelperText>}
            </Stack>
            {formData.currentCompanyName === "Others" && (
              <Stack spacing={1} mt={3}>
                <InputLabel htmlFor="otherCompanyName" sx={{ fontWeight: '600', color: 'primary.main' }}>Enter Company Name *</InputLabel>
                <OutlinedInput
                  size="small"
                  id="otherCompanyName"
                  type="text"
                  name="otherCompanyName"
                  value={formData.otherCompanyName}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Enter your company name"
                  error={!!errors.otherCompanyName}
                />
                {errors.otherCompanyName && <FormHelperText error>{errors.otherCompanyName}</FormHelperText>}
              </Stack>
            )}
            <Stack spacing={1} mt={3}>
              <InputLabel htmlFor="currentCompanyEmail" sx={{ fontWeight: '600', color: 'primary.main' }}>Company Email &nbsp;
                <Typography variant="caption">(optional)</Typography>
              </InputLabel>
              <OutlinedInput
                size="small"
                id="currentCompanyEmail"
                type="email"
                name="currentCompanyEmail"
                value={formData.currentCompanyEmail}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your company email"
                error={!!errors.currentCompanyEmail}
              />
              {errors.currentCompanyEmail && <FormHelperText error>{errors.currentCompanyEmail}</FormHelperText>}
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
              >
                <MenuItem value="" disabled>Select your current location</MenuItem>
                {locationOptions.map((location, index) => (
                  <MenuItem key={index} value={location}>{location}</MenuItem>
                ))}
              </Select>
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
              >
                <MenuItem value="N/A" disabled>N/A</MenuItem>
                {degreeOptions.map((college, index) => (
                  <MenuItem key={index} value={college}>{college}</MenuItem>
                ))}
                <MenuItem value="Others">Others</MenuItem>
              </Select>
              {errors.graduationCollege && <FormHelperText error>{errors.graduationCollege}</FormHelperText>}
            </Stack>
            {formData.graduationCollege === "Others" && (
              <Stack spacing={1} mt={3}>
                <InputLabel htmlFor="otherGraduationCollege" sx={{ fontWeight: '600', color: 'primary.main' }}>Enter Graduation College Name *</InputLabel>
                <OutlinedInput
                  size="small"
                  id="otherGraduationCollege"
                  type="text"
                  name="otherGraduationCollege"
                  value={formData.otherGraduationCollege}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Enter your graduation college"
                  error={!!errors.otherGraduationCollege}
                />
                {errors.otherGraduationCollege && <FormHelperText error>{errors.otherGraduationCollege}</FormHelperText>}
              </Stack>
            )}
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
              >
                <MenuItem value="N/A" disabled>N/A</MenuItem>
                {degreeOptions.map((college, index) => (
                  <MenuItem key={index} value={college}>{college}</MenuItem>
                ))}
                <MenuItem value="Others">Others</MenuItem>
              </Select>
              {errors.postGradCollege && <FormHelperText error>{errors.postGradCollege}</FormHelperText>}
            </Stack>
            {formData.postGradCollege === "Others" && (
              <Stack spacing={1} mt={3}>
                <InputLabel htmlFor="otherPostGradCollege" sx={{ fontWeight: '600', color: 'primary.main' }}>Enter Post Grad College Name *</InputLabel>
                <OutlinedInput
                  size="small"
                  id="otherPostGradCollege"
                  type="text"
                  name="otherPostGradCollege"
                  value={formData.otherPostGradCollege}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Enter your post grad college"
                  error={!!errors.otherPostGradCollege}
                />
                {errors.otherPostGradCollege && <FormHelperText error>{errors.otherPostGradCollege}</FormHelperText>}
              </Stack>
            )}
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
              >
                <MenuItem value="" disabled>Select your sector</MenuItem>
                {sectorOptions.map((sector, index) => (
                  <MenuItem key={index} value={sector}>{sector}</MenuItem>
                ))}
              </Select>
              {errors.sector && <FormHelperText error>{errors.sector}</FormHelperText>}
            </Stack>
            <Stack direction="row" spacing={2} mt={3}>
              {/* <LoadingButton loading={loading} fullWidth loadingPosition="center" onClick={handleSubmit} variant="contained" type="submit">
                Add Company
              </LoadingButton> */}
              <LoadingButton loading={loading} fullWidth loadingPosition="center" onClick={handleSubmit} variant="contained" type="submit" >
                Register
              </LoadingButton>
            </Stack>
          </Box>
        </Modal>
      </MainLayout>
    </>
  );
}


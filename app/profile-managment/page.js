// "use client";
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Select,
//   MenuItem,
//   InputLabel,
//   OutlinedInput,
//   FormHelperText,
//   Stack,
//   Typography,
//   Grid,
// } from "@mui/material";
// import { degreeOptions, sectorOptions, collegeOptions } from "./constants"; // Import shared data
// import MainLayout from "../layouts/MainLayout";

// const ProfileManagement = () => {
//   const [formData, setFormData] = useState({
//     current_location: "",
//     position: "",
//     dob: "",
//     experience: "",
//     graduationCollege: "",
//     otherGraduationCollege: "",
//     graduationPassingYear: "",
//     postGradCollege: "",
//     otherPostGradCollege: "",
//     postGradPassingYear: "",
//     degree: "",
//     sector: "",
//     phone_number: "",
//     currentCompanyEmail: "",
//     currentCompanyName: "",
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     setErrors({
//       ...errors,
//       [name]: "",
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.current_location.trim())
//       newErrors.current_location = "current_location is required";
//     if (!formData.currentCompanyName.trim())
//       newErrors.currentCompanyName = "currentCompanyName is required";

//     if (!formData.position.trim()) newErrors.position = "position is required";
//     if (!formData.graduationCollege.trim())
//       newErrors.graduationCollege = "Graduation College is required";
//     if (!formData.degree.trim()) newErrors.degree = "Degree is required";
//     if (!formData.sector.trim()) newErrors.sector = "Sector is required";
//     if (formData.phone_number && !/^\d+$/.test(formData.phone_number))
//       newErrors.phone_number = "phone_number number can only contain numbers";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Form data:", formData); // Replace with API call
//       //  router.push(`/send-request?userId=${selectedUser}`);
//     }
//   };

//   return (
//     <MainLayout
//       homeIcon={true}
//       headerText={"Profile Managment"}
//       homeIconSide={"left"}
//       page={"profile-managment"}
//     >
//       <Container maxWidth="sm" sx={{ mt: 4 }}>
//         <Typography
//           variant="h4"
//           gutterBottom
//           textAlign="center"
//           sx={{ color: "black" }}
//         >
//           Add details to your profile
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2} sx={{ color: "black" }}>
//             {/* current_location */}
//             <Grid item xs={12}>
//               <InputLabel
//                 htmlFor="currentCompanyName"
//                 sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//               >
//                 Current Company Name
//               </InputLabel>
//               <OutlinedInput
//                 size="small"
//                 id="currentCompanyName"
//                 name="currentCompanyName"
//                 value={formData.currentCompanyName}
//                 onChange={handleChange}
//                 fullWidth
//                 placeholder="Current Company Name"
//                 error={!!errors.currentCompanyName}
//                 sx={{ color: "black" }}
//               />
//               {errors.currentCompanyName && (
//                 <FormHelperText error>
//                   {errors.currentCompanyName}
//                 </FormHelperText>
//               )}
//             </Grid>
//             <Grid item xs={12}>
//               <InputLabel
//                 htmlFor="current_location"
//                 sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//               >
//                 Choose your location
//               </InputLabel>
//               <OutlinedInput
//                 size="small"
//                 id="current_location"
//                 name="current_location"
//                 value={formData.current_location}
//                 onChange={handleChange}
//                 fullWidth
//                 placeholder="Choose your location"
//                 error={!!errors.current_location}
//                 sx={{ color: "black" }}
//               />
//               {errors.current_location && (
//                 <FormHelperText error>{errors.current_location}</FormHelperText>
//               )}
//             </Grid>

//             {/* position */}
//             <Grid item xs={12}>
//               <InputLabel
//                 htmlFor="position"
//                 sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//               >
//                 Select Your designation
//               </InputLabel>
//               <OutlinedInput
//                 size="small"
//                 id="position"
//                 name="position"
//                 value={formData.position}
//                 onChange={handleChange}
//                 fullWidth
//                 placeholder="Select Your designation"
//                 error={!!errors.position}
//                 sx={{ color: "black" }}
//               />
//               {errors.position && (
//                 <FormHelperText error>{errors.position}</FormHelperText>
//               )}
//             </Grid>

//             {/* Date of Birth */}
//             <Grid item xs={12}>
//               <InputLabel
//                 htmlFor="dob"
//                 sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//               >
//                 Date of Birth
//               </InputLabel>
//               <OutlinedInput
//                 size="small"
//                 id="dob"
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//                 fullWidth
//                 sx={{ color: "black" }}
//               />
//             </Grid>

//             {/* Experience */}
//             <Grid item xs={12}>
//               <InputLabel
//                 htmlFor="experience"
//                 sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//               >
//                 Total Experience
//               </InputLabel>
//               <OutlinedInput
//                 size="small"
//                 id="experience"
//                 name="experience"
//                 value={formData.experience}
//                 onChange={handleChange}
//                 fullWidth
//                 placeholder=" Total Experience"
//                 sx={{ color: "black" }}
//               />
//             </Grid>

//             {/* Graduation College */}
//             <Grid item xs={12}>
//               <InputLabel
//                 htmlFor="graduationCollege"
//                 sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//               >
//                 Graduation College
//               </InputLabel>
//               <Select
//                 size="small"
//                 id="graduationCollege"
//                 name="graduationCollege"
//                 value={formData.graduationCollege}
//                 onChange={handleChange}
//                 fullWidth
//                 displayEmpty
//                 error={!!errors.graduationCollege}
//                 sx={{ color: "black" }}
//               >
//                 <MenuItem value="" disabled>
//                   Graduation College
//                 </MenuItem>
//                 {collegeOptions.map((college, index) => (
//                   <MenuItem key={index} value={college}>
//                     {college}
//                   </MenuItem>
//                 ))}
//                 <MenuItem value="Others">Others</MenuItem>
//               </Select>
//               {formData.graduationCollege === "Others" && (
//                 <OutlinedInput
//                   size="small"
//                   id="otherGraduationCollege"
//                   name="otherGraduationCollege"
//                   value={formData.otherGraduationCollege}
//                   onChange={handleChange}
//                   fullWidth
//                   placeholder="Graduation College"
//                   sx={{ mt: 2, color: "black" }}
//                 />
//               )}
//               {errors.graduationCollege && (
//                 <FormHelperText error>
//                   {errors.graduationCollege}
//                 </FormHelperText>
//               )}
//             </Grid>

// {/* Graduation Passing Year */}
// <Grid item xs={12}>
//   <InputLabel
//     htmlFor="graduationPassingYear"
//     sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//   >
//     Graduation Passing Year
//   </InputLabel>
//   <OutlinedInput
//     size="small"
//     id="graduationPassingYear"
//     name="graduationPassingYear"
//     value={formData.graduationPassingYear}
//     onChange={handleChange}
//     fullWidth
//     placeholder="Graduation Passing Year"
//     sx={{ color: "black" }}
//   />
// </Grid>

//             {/* Post Graduation College */}
//             <Grid item xs={12}>
//               <InputLabel
//                 htmlFor="postGradCollege"
//                 sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//               >
//                 Post Graduation College
//               </InputLabel>
//               <Select
//                 size="small"
//                 id="postGradCollege"
//                 name="postGradCollege"
//                 value={formData.postGradCollege}
//                 onChange={handleChange}
//                 fullWidth
//                 displayEmpty
//                 sx={{ color: "black" }}
//               >
//                 <MenuItem value="" disabled>
//                   Post Graduation College
//                 </MenuItem>
//                 {collegeOptions.map((college, index) => (
//                   <MenuItem key={index} value={college}>
//                     {college}
//                   </MenuItem>
//                 ))}
//                 <MenuItem value="Others">Others</MenuItem>
//               </Select>
//               {formData.postGradCollege === "Others" && (
//                 <OutlinedInput
//                   size="small"
//                   id="otherPostGradCollege"
//                   name="otherPostGradCollege"
//                   value={formData.otherPostGradCollege}
//                   onChange={handleChange}
//                   fullWidth
//                   placeholder="Post Graduation College"
//                   sx={{ mt: 2, color: "black" }}
//                 />
//               )}
//             </Grid>

// {/* Post Graduation Passing Year */}
// <Grid item xs={12}>
//   <InputLabel
//     htmlFor="postGradPassingYear"
//     sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//   >
//     Post Graduation Passing Year
//   </InputLabel>
//   <OutlinedInput
//     size="small"
//     id="postGradPassingYear"
//     name="postGradPassingYear"
//     value={formData.postGradPassingYear}
//     onChange={handleChange}
//     fullWidth
//     placeholder="Post Graduation Passing Year"
//     sx={{ color: "black" }}
//   />
// </Grid>

// {/* Degree */}
// <Grid item xs={12}>
//   <InputLabel
//     htmlFor="degree"
//     sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//   >
//     Degree
//   </InputLabel>
//   <Select
//     size="small"
//     id="degree"
//     name="degree"
//     value={formData.degree}
//     onChange={handleChange}
//     fullWidth
//     displayEmpty
//     error={!!errors.degree}
//     sx={{ color: "black" }}
//   >
//     <MenuItem value="" disabled>
//       Select your degree
//     </MenuItem>
//     {degreeOptions.map((degree, index) => (
//       <MenuItem key={index} value={degree}>
//         {degree}
//       </MenuItem>
//     ))}
//   </Select>
//   {errors.degree && (
//     <FormHelperText error>{errors.degree}</FormHelperText>
//   )}
// </Grid>

// {/* Sector */}
// <Grid item xs={12}>
//   <InputLabel
//     htmlFor="sector"
//     sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//   >
//     Sector
//   </InputLabel>
//   <Select
//     size="small"
//     id="sector"
//     name="sector"
//     value={formData.sector}
//     onChange={handleChange}
//     fullWidth
//     displayEmpty
//     error={!!errors.sector}
//     sx={{ color: "black" }}
//   >
//     <MenuItem value="" disabled>
//       Select your sector
//     </MenuItem>
//     {sectorOptions.map((sector, index) => (
//       <MenuItem key={index} value={sector}>
//         {sector}
//       </MenuItem>
//     ))}
//   </Select>
//   {errors.sector && (
//     <FormHelperText error>{errors.sector}</FormHelperText>
//   )}
// </Grid>

// {/* phone_number Number */}
// <Grid item xs={12}>
//   <InputLabel
//     htmlFor="phone_number"
//     sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//   >
//     Phone Number
//   </InputLabel>
//   <OutlinedInput
//     size="small"
//     id="phone_number"
//     name="phone_number"
//     value={formData.phone_number}
//     onChange={handleChange}
//     fullWidth
//     placeholder="Phone Number"
//     error={!!errors.phone_number}
//     sx={{ color: "black" }}
//   />
//   {errors.phone_number && (
//     <FormHelperText error>{errors.phone_number}</FormHelperText>
//   )}
// </Grid>

// {/* Personal Email */}
// <Grid item xs={12}>
//   <InputLabel
//     htmlFor="currentCompanyEmail"
//     sx={{ display: { xs: "none", sm: "none", md: "block" } }}
//     F
//   >
//     Official email ID(optional)
//   </InputLabel>
//   <OutlinedInput
//     size="small"
//     id="currentCompanyEmail"
//     name="currentCompanyEmail"
//     value={formData.currentCompanyEmail}
//     onChange={handleChange}
//     fullWidth
//     placeholder="Official email ID(optional)"
//     sx={{ color: "black" }}
//   />
// </Grid>

//             {/* Submit Button */}
//             <Grid item xs={12} sx={{ textAlign: "center" }}>
//               <Button
//                 variant="contained"
//                 type="submit"
//                 sx={{
//                   backgroundColor: "#4D5DFB",
//                   width: "80%",
//                   borderRadius: "20px",
//                 }}
//               >
//                 Save
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     </MainLayout>
//   );
// };

// export default ProfileManagement;

"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { degreeOptions, sectorOptions, collegeOptions } from "./constants"; // Import shared data
import MainLayout from "../layouts/MainLayout";
import { postFormResponse, postResponse } from "../components/_apihandler";
import axios from "axios";
import { notify } from "../components/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import { userDetails } from "@/middleware/userDetails";

const ProfileManagement = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  //   const [user_id, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  // useEffect to fetch userId from search params
  useEffect(() => {
    const id = searchParams.get("user");
    const seletcted = searchParams.get("userId");
    if (id) {
      console.log(id, "user");
      //   setUserId(id); // Set userId in local state
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: id, // Set the retrieved userId in formData
      }));
    }
    if (seletcted) {
      setSelectedUser(seletcted);
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    userId: "",
    current_location: "",
    position: "",
    dob: "",
    experience: "",
    graduationCollege: "",
    otherGraduationCollege: "",
    graduationPassingYear: "",
    postGradCollege: "",
    otherPostGradCollege: "",
    postGradPassingYear: "",
    degree: "",
    sector: "",
    phone_number: "",
    currentCompanyEmail: "",
    currentCompanyName: "",
    resume: null, // Added resume field for file upload
  });

  const [errors, setErrors] = useState({});

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

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0], // Set the resume file
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.current_location.trim())
      newErrors.current_location = "Current location is required";
    if (!formData.currentCompanyName.trim())
      newErrors.currentCompanyName = "Current company name is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.graduationCollege.trim())
      newErrors.graduationCollege = "Graduation College is required";
    if (!formData.degree.trim()) newErrors.degree = "Degree is required";
    if (!formData.sector.trim()) newErrors.sector = "Sector is required";
    if (formData.phone_number && !/^\d+$/.test(formData.phone_number))
      newErrors.phone_number = "Phone number can only contain numbers";
    if (!formData.resume) newErrors.resume = "Resume (PDF) is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getUserDetails = async () => {
    if (localStorage.getItem("token")) {
      const response = await userDetails();
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Creating a FormData object to handle the form fields and file upload
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      try {
        // Sending the FormData to the API using postResponse (adjust as per your API)
        const response = await postFormResponse(
          "/api/add-comapany",
          formDataToSend
        );
        console.log(response, "response");
        // Check if the response is successful (201 Created)
        if (response.status === 201) {
          getUserDetails();
          notify("Details Added Successfully", "success");
          router.push(`/send-request?userId=${selectedUser}`);
        } else {
          notify(response.data.msg || "An error occurred", "error");
        }
      } catch (error) {
        // Handle any errors that occur during the request
        notify(
          error.response?.data?.msg ||
            "An error occurred while submitting the form",
          "error"
        );
      }
    }
  };

  return (
    <MainLayout
      homeIcon={true}
      headerText={"Profile Management"}
      homeIconSide={"left"}
      page={"profile-management"}
    >
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{ color: "black" }}
        >
          Add details to your profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ color: "black" }}>
            {/* Current Company Name */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="currentCompanyName"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Current Company Name
              </InputLabel>
              <OutlinedInput
                size="small"
                id="currentCompanyName"
                name="currentCompanyName"
                value={formData.currentCompanyName}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your company name"
                error={!!errors.currentCompanyName}
                sx={{ color: "black" }}
              />
              {errors.currentCompanyName && (
                <FormHelperText error>
                  {errors.currentCompanyName}
                </FormHelperText>
              )}
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="current_location"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Choose your location
              </InputLabel>
              <OutlinedInput
                size="small"
                id="current_location"
                name="current_location"
                value={formData.current_location}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your location"
                error={!!errors.current_location}
                sx={{ color: "black" }}
              />
              {errors.current_location && (
                <FormHelperText error>{errors.current_location}</FormHelperText>
              )}
            </Grid>

            {/* Designation */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="position"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Select Your Designation
              </InputLabel>
              <OutlinedInput
                size="small"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                fullWidth
                placeholder="Enter your designation"
                error={!!errors.position}
                sx={{ color: "black" }}
              />
              {errors.position && (
                <FormHelperText error>{errors.position}</FormHelperText>
              )}
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="dob"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Date of Birth
              </InputLabel>
              <OutlinedInput
                size="small"
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                fullWidth
                sx={{ color: "black" }}
              />
            </Grid>

            {/* Experience */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="experience"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Total Experience In months
              </InputLabel>
              <OutlinedInput
                size="small"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                fullWidth
                placeholder="Total Experience In months"
                sx={{ color: "black" }}
              />
            </Grid>

            {/* Graduation College */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="graduationCollege"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Graduation College
              </InputLabel>
              <Select
                size="small"
                id="graduationCollege"
                name="graduationCollege"
                value={formData.graduationCollege}
                onChange={handleChange}
                fullWidth
                displayEmpty
                error={!!errors.graduationCollege}
                sx={{ color: "black" }}
              >
                <MenuItem value="" disabled>
                  Select Graduation College
                </MenuItem>
                {collegeOptions.map((college, index) => (
                  <MenuItem key={index} value={college}>
                    {college}
                  </MenuItem>
                ))}
                <MenuItem value="Others">Others</MenuItem>
              </Select>
              {formData.graduationCollege === "Others" && (
                <OutlinedInput
                  size="small"
                  id="otherGraduationCollege"
                  name="otherGraduationCollege"
                  value={formData.otherGraduationCollege}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Other Graduation College"
                  sx={{ mt: 2, color: "black" }}
                />
              )}
              {errors.graduationCollege && (
                <FormHelperText error>
                  {errors.graduationCollege}
                </FormHelperText>
              )}
            </Grid>

            {/* Graduation Passing Year */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="graduationPassingYear"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Graduation Passing Year
              </InputLabel>
              <OutlinedInput
                size="small"
                id="graduationPassingYear"
                name="graduationPassingYear"
                value={formData.graduationPassingYear}
                onChange={handleChange}
                fullWidth
                placeholder="Graduation Passing Year"
                sx={{ color: "black" }}
              />
            </Grid>

            {/* Post Graduation College */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="postGradCollege"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Post Graduation College
              </InputLabel>
              <Select
                size="small"
                id="postGradCollege"
                name="postGradCollege"
                value={formData.postGradCollege}
                onChange={handleChange}
                fullWidth
                displayEmpty
                sx={{ color: "black" }}
              >
                <MenuItem value="" disabled>
                  Select Post Graduation College
                </MenuItem>
                {collegeOptions.map((college, index) => (
                  <MenuItem key={index} value={college}>
                    {college}
                  </MenuItem>
                ))}
                <MenuItem value="Others">Others</MenuItem>
              </Select>
              {formData.postGradCollege === "Others" && (
                <OutlinedInput
                  size="small"
                  id="otherPostGradCollege"
                  name="otherPostGradCollege"
                  value={formData.otherPostGradCollege}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Other Post Grad College"
                  sx={{ mt: 2, color: "black" }}
                />
              )}
            </Grid>
            {/* Post Graduation Passing Year */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="postGradPassingYear"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Post Graduation Passing Year
              </InputLabel>
              <OutlinedInput
                size="small"
                id="postGradPassingYear"
                name="postGradPassingYear"
                value={formData.postGradPassingYear}
                onChange={handleChange}
                fullWidth
                placeholder="Post Graduation Passing Year"
                sx={{ color: "black" }}
              />
            </Grid>

            {/* Degree */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="degree"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Degree
              </InputLabel>
              <Select
                size="small"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                fullWidth
                displayEmpty
                error={!!errors.degree}
                sx={{ color: "black" }}
              >
                <MenuItem value="" disabled>
                  Select your degree
                </MenuItem>
                {degreeOptions.map((degree, index) => (
                  <MenuItem key={index} value={degree}>
                    {degree}
                  </MenuItem>
                ))}
              </Select>
              {errors.degree && (
                <FormHelperText error>{errors.degree}</FormHelperText>
              )}
            </Grid>

            {/* Sector */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="sector"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Sector
              </InputLabel>
              <Select
                size="small"
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                fullWidth
                displayEmpty
                error={!!errors.sector}
                sx={{ color: "black" }}
              >
                <MenuItem value="" disabled>
                  Select your sector
                </MenuItem>
                {sectorOptions.map((sector, index) => (
                  <MenuItem key={index} value={sector}>
                    {sector}
                  </MenuItem>
                ))}
              </Select>
              {errors.sector && (
                <FormHelperText error>{errors.sector}</FormHelperText>
              )}
            </Grid>

            {/* phone_number Number */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="phone_number"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Phone Number
              </InputLabel>
              <OutlinedInput
                size="small"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                fullWidth
                placeholder="Phone Number"
                error={!!errors.phone_number}
                sx={{ color: "black" }}
              />
              {errors.phone_number && (
                <FormHelperText error>{errors.phone_number}</FormHelperText>
              )}
            </Grid>

            {/* Personal Email */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="currentCompanyEmail"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                F
              >
                Official email ID(optional)
              </InputLabel>
              <OutlinedInput
                size="small"
                id="currentCompanyEmail"
                name="currentCompanyEmail"
                value={formData.currentCompanyEmail}
                onChange={handleChange}
                fullWidth
                placeholder="Official email ID(optional)"
                sx={{ color: "black" }}
              />
            </Grid>

            {/* Resume Upload */}
            <Grid item xs={12}>
              <InputLabel
                htmlFor="resume"
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Upload Resume (PDF only)
              </InputLabel>
              <OutlinedInput
                size="small"
                id="resume"
                type="file"
                inputProps={{ accept: "application/pdf" }}
                onChange={handleFileChange}
                fullWidth
                sx={{ color: "black" }}
              />
              {errors.resume && (
                <FormHelperText error>{errors.resume}</FormHelperText>
              )}
            </Grid>

            {/* Submit Button */}
            <Grid item mb={4} xs={12} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#4D5DFB",
                  width: "80%",
                  borderRadius: "20px",
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </MainLayout>
  );
};

export default ProfileManagement;

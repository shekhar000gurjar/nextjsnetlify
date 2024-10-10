// "use client";
// import { useEffect, useState } from "react";
// import MainLayout from "../layouts/MainLayout";
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Paper,
//   Stack,
//   Typography,
//   TextField,
//   IconButton,
//   Input,
//   CircularProgress,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import BusinessIcon from "@mui/icons-material/Business";
// import PaymentIcon from "@mui/icons-material/Payment";
// import WorkIcon from "@mui/icons-material/Work";
// import SchoolIcon from "@mui/icons-material/School";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import { userDetails } from "@/middleware/userDetails";
// import { notify } from "../components/Toast";
// import { LoadingButton } from "@mui/lab";
// import { putRequest } from "../components/_apihandler";

// export default function UserProfile() {
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);
//   const [user, setUser] = useState({});
//   const [formData, setFormData] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [resume, setResume] = useState(null);

//   // Fetch user details on component load
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       setPageLoading(true);
//       try {
//         const response = await userDetails();
//         if (response.status === 200) {
//           const userData = response.data.data;
//           setUser(userData);
//           setFormData({
//             first_name: userData.first_name,
//             last_name: userData.last_name,
//             currentCompanyName: userData.currentCompanyName,
//             upi_id: userData.upi_id,
//             sector: userData.sector,
//             position: userData.position,
//             experience: userData.experience,
//             graduationCollege: userData.graduationCollege,
//             postGradCollege: userData.postGradCollege,
//             degree: userData.degree,
//             resume: userData.resume,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching user details", error);
//       } finally {
//         setPageLoading(false);
//       }
//     };
//     fetchUserDetails();
//   }, []);

//   // Handle input change
//   const handleInputChange = (field, value) => {
//     setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));
//   };

//   // Handle file input change
//   const handleFileChange = (event, type) => {
//     if (type === "profilePicture") {
//       setProfilePicture(event.target.files[0]);
//     } else if (type === "resume") {
//       setResume(event.target.files[0]);
//     }
//   };

//   // Handle form submission to update details
//   const handleUpdateDetails = async () => {
//     setLoading(true);
//     const updatedData = new FormData();

//     // Append only updated fields
//     Object.keys(formData).forEach((key) => {
//       if (formData[key] !== user[key]) {
//         updatedData.append(key, formData[key]);
//       }
//     });

//     if (profilePicture) updatedData.append("profilePicture", profilePicture);
//     if (resume) updatedData.append("resume", resume);

//     console.log(updatedData, "dsd");

//     try {
//       const response = await putRequest("/api/updateUserDetails", updatedData);
//       if (response.success) {
//         notify(response.msg, "success");
//         await getUserDetails(); // Refresh details
//       } else {
//         notify("Failed to update user details", "error");
//       }
//     } catch (error) {
//       console.error("Error updating user details", error);
//       notify("An error occurred while updating your details.", "error");
//     } finally {
//       setLoading(false);
//       setEditMode(false); // Exit edit mode after saving
//     }
//   };

//   if (pageLoading) {
//     return <CircularProgress />;
//   }

//   return (
//     <MainLayout
//       homeIcon={true}
//       headerText={"Profile Management"}
//       homeIconSide={"left"}
//       page={"userprofile"}
//     >
//       <Box pt={2} display="flex" justifyContent="center">
//         <Container maxWidth="md">
//           <Paper
//             elevation={3}
//             sx={{
//               borderRadius: "15px",
//               mx: "auto",
//               px: { xs: 2, sm: 4 },
//               py: 4,
//             }}
//           >
//             {/* Profile Picture Section */}
//             <Stack
//               spacing={2}
//               alignItems="center"
//               sx={{ color: "black", textAlign: "center" }}
//             >
//               <Avatar
//                 src={
//                   profilePicture
//                     ? URL.createObjectURL(profilePicture)
//                     : user.profilePicture
//                 }
//                 sx={{ width: 120, height: 120 }}
//               />
//               <Typography>{`${user.first_name} ${user.last_name}`}</Typography>
//               <Typography>{user.currentCompanyName}</Typography>
//               <Box sx={{ display: "flex", gap: 3 }}>
//                 <Button
//                   variant="outlined"
//                   component="label"
//                   sx={{
//                     textTransform: "none",
//                     backgroundColor: "#617AFB",
//                     color: "white",
//                     borderRadius: "18px",
//                     "&:hover": {
//                       backgroundColor: "#617AFB", // Keeps the same background color on hover
//                     },
//                     "&:active": {
//                       backgroundColor: "#617AFB", // Keeps the same background color when clicked
//                     },
//                   }}
//                 >
//                   Edit Picture
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     hidden
//                     onChange={(e) => {
//                       handleFileChange(e, "profilePicture");
//                       setEditMode(true);
//                     }}
//                   />
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   component="label"
//                   sx={{
//                     display: { xs: "flex", sm: "flex", md: "none" },
//                     textTransform: "none",
//                     backgroundColor: "#EEEFF1",
//                     color: "black",
//                     borderRadius: "18px",
//                   }}
//                 >
//                   Upload Resume
//                   <Input
//                     type="file"
//                     accept=".pdf"
//                     hidden
//                     onChange={(e) => handleFileChange(e, "resume")}
//                   />
//                 </Button>
//               </Box>
//             </Stack>

//             {/* Profile Overview Section */}
//             <Stack mt={4} spacing={2}>
//               <Typography
//                 variant="h5"
//                 fontWeight="600"
//                 textAlign="start"
//                 sx={{ color: "black" }}
//               >
//                 Profile Overview
//               </Typography>

//               <ProfileField
//                 label="Company"
//                 value={formData.currentCompanyName}
//                 onChange={(e) =>
//                   handleInputChange("currentCompanyName", e.target.value)
//                 }
//                 editMode={editMode}
//                 icon={<BusinessIcon />}
//               />
//               <ProfileField
//                 label="UPI ID"
//                 value={formData.upi_id}
//                 onChange={(e) => handleInputChange("upi_id", e.target.value)}
//                 editMode={editMode}
//                 icon={<PaymentIcon />}
//               />
//               <ProfileField
//                 label="Job Sector"
//                 value={formData.sector}
//                 onChange={(e) => handleInputChange("sector", e.target.value)}
//                 editMode={editMode}
//                 icon={<WorkIcon />}
//               />
//               <ProfileField
//                 label="Position"
//                 value={formData.position}
//                 editMode={false}
//                 icon={<WorkIcon />}
//               />
//               <ProfileField
//                 label="Total Experience"
//                 value={formData.experience}
//                 onChange={(e) =>
//                   handleInputChange("experience", e.target.value)
//                 }
//                 editMode={editMode}
//                 icon={<WorkIcon />}
//               />

//               {formData.postGradCollege ? (
//                 <ProfileField
//                   label="Post Graduate College"
//                   value={formData.postGradCollege}
//                   editMode={false}
//                   icon={<SchoolIcon />}
//                 />
//               ) : (
//                 <ProfileField
//                   label="Graduation College"
//                   value={formData.graduationCollege}
//                   editMode={false}
//                   icon={<SchoolIcon />}
//                 />
//               )}
//               <ProfileField
//                 label="Degree"
//                 value={formData.degree}
//                 editMode={false}
//                 icon={<SchoolIcon />}
//               />
//             </Stack>

//             {/* Action Buttons Section */}
//             <Stack mt={4} direction="row" spacing={2} justifyContent="center">
//               {editMode ? (
//                 <>
//                   <LoadingButton
//                     loading={loading}
//                     variant="contained"
//                     onClick={handleUpdateDetails}
//                     sx={{
//                       backgroundColor: "#617AFB",
//                       color: "white",
//                       borderRadius: "18px",
//                     }}
//                   >
//                     Save
//                   </LoadingButton>
//                   <Button
//                     variant="outlined"
//                     onClick={() => setEditMode(false)}
//                     sx={{
//                       backgroundColor: "#617AFB",
//                       color: "white",
//                       borderRadius: "18px",
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button
//                     variant="contained"
//                     onClick={() => setEditMode(true)}
//                     sx={{
//                       textTransform: "none",
//                       backgroundColor: "#617AFB",
//                       color: "white",
//                       borderRadius: "18px",
//                     }}
//                   >
//                     Edit Profile Details
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     component="label"
//                     startIcon={<InsertDriveFileIcon />}
//                     sx={{
//                       display: { md: "flex" },
//                       textTransform: "none",
//                       backgroundColor: "#EEEFF1",
//                       color: "black",
//                       borderRadius: "18px",
//                     }}
//                   >
//                     Upload Resume
//                     <Input
//                       type="file"
//                       accept=".pdf"
//                       hidden
//                       onChange={(e) => handleFileChange(e, "resume")}
//                     />
//                   </Button>
//                 </>
//               )}
//             </Stack>
//           </Paper>
//         </Container>
//       </Box>
//     </MainLayout>
//   );
// }

// // ProfileField component to handle editable fields and icons
// const ProfileField = ({ label, value, onChange, editMode, icon }) => (
//   <Stack direction="row" spacing={1} alignItems="center">
//     <IconButton
//       edge="start"
//       size="small"
//       color="primary"
//       disableRipple
//       sx={{ color: "black" }}
//     >
//       {icon}
//     </IconButton>
//     <Typography
//       variant="body2"
//       fontWeight="600"
//       sx={{ width: "30%", color: "black" }}
//     >
//       {label}:
//     </Typography>
//     {editMode ? (
//       <TextField
//         variant="outlined"
//         size="small"
//         value={value}
//         onChange={onChange}
//         fullWidth
//       />
//     ) : (
//       <Typography variant="body2" sx={{ color: "black" }}>
//         {value}
//       </Typography>
//     )}
//   </Stack>
// );

"use client";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  IconButton,
  Input,
  CircularProgress,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PaymentIcon from "@mui/icons-material/Payment";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { userDetails } from "@/middleware/userDetails";
import { notify } from "../components/Toast";
import { LoadingButton } from "@mui/lab";
import { putRequest, putRequestForm } from "../components/_apihandler";

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null); // Profile picture file
  const [resume, setResume] = useState(null); // Resume file

  // Fetch user details on component load
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    setPageLoading(true);
    try {
      const response = await userDetails();
      if (response.status === 200) {
        const userData = response.data.data;
        setUser(userData);
        setFormData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          currentCompanyName: userData.currentCompanyName,
          upi_id: userData.upi_id,
          sector: userData.sector,
          position: userData.position,
          experience: userData.experience,
          graduationCollege: userData.graduationCollege,
          postGradCollege: userData.postGradCollege,
          degree: userData.degree,
          // resumename: userData.resume,
        });
      }
    } catch (error) {
      console.error("Error fetching user details", error);
    } finally {
      setPageLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));
  };

  // Handle file input change
  const handleFileChange = (event, type) => {
    if (type === "profilePicture") {
      setProfilePicture(event.target.files[0]);
    } else if (type === "resume") {
      setResume(event.target.files[0]);
    }
  };

  // Handle form submission to update details
  const handleUpdateDetails = async () => {
    setLoading(true);
    const updatedData = new FormData(); // Create a new FormData instance

    // Append text fields
    Object.keys(formData).forEach((key) => {
      updatedData.append(key, formData[key]);
    });

    // Append files
    if (profilePicture) {
      updatedData.append("profilePicture", profilePicture);
    }
    if (resume) {
      updatedData.append("resume", resume);
    }

    try {
      // Make API request to update user details
      const response = await putRequestForm(
        "/api/updateUserDetails",
        updatedData,
        true
      );
      if (response.status === 200) {
        await fetchUserDetails(); // Refresh user details after updating
        notify(response.msg, "success");
      } else {
        notify("Failed to update user details", "error");
      }
    } catch (error) {
      console.error("Error updating user details", error);
      notify("An error occurred while updating your details.", "error");
    } finally {
      setLoading(false);
      setEditMode(false); // Exit edit mode after saving
    }
  };

  if (pageLoading) {
    return <CircularProgress />;
  }

  return (
    <MainLayout
      homeIcon={true}
      headerText={"Profile Management"}
      homeIconSide={"left"}
      page={"userprofile"}
    >
      <Box pt={2} display="flex" justifyContent="center">
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              borderRadius: "15px",
              mx: "auto",
              px: { xs: 2, sm: 4 },
              py: 4,
            }}
          >
            {/* Profile Picture Section */}
            <Stack
              spacing={2}
              alignItems="center"
              sx={{ color: "black", textAlign: "center" }}
            >
              <Avatar
                src={
                  profilePicture
                    ? URL.createObjectURL(profilePicture)
                    : user.profilePicture
                }
                sx={{ width: 120, height: 120 }}
              />
              <Typography>{`${user.first_name} ${user.last_name}`}</Typography>
              <Typography>{user.currentCompanyName}</Typography>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#617AFB",
                    color: "white",
                    borderRadius: "18px",
                    "&:hover": {
                      backgroundColor: "#617AFB", // Keeps the same background color on hover
                    },
                    "&:active": {
                      backgroundColor: "#617AFB", // Keeps the same background color when clicked
                    },
                  }}
                >
                  Edit Picture
                  <Input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      handleFileChange(e, "profilePicture");
                      setEditMode(true);
                    }}
                  />
                </Button>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    display: { xs: "flex", sm: "flex", md: "none" },
                    textTransform: "none",
                    backgroundColor: "#EEEFF1",
                    color: "black",
                    borderRadius: "18px",
                  }}
                >
                  Upload Resume
                  <Input
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={(e) => {handleFileChange(e, "resume"), setEditMode(true);}}
                  />
                </Button>
              </Box>
            </Stack>

            {/* Profile Overview Section */}
            <Stack mt={4} spacing={2}>
              <Typography
                variant="h5"
                fontWeight="600"
                textAlign="start"
                sx={{ color: "black" }}
              >
                Profile Overview
              </Typography>

              <ProfileField
                label="Company"
                value={formData.currentCompanyName}
                onChange={(e) =>
                  handleInputChange("currentCompanyName", e.target.value)
                }
                editMode={editMode}
                icon={<BusinessIcon />}
              />
              <ProfileField
                label="UPI ID"
                value={formData.upi_id}
                onChange={(e) => handleInputChange("upi_id", e.target.value)}
                editMode={editMode}
                icon={<PaymentIcon />}
              />
              <ProfileField
                label="Job Sector"
                value={formData.sector}
                onChange={(e) => handleInputChange("sector", e.target.value)}
                editMode={editMode}
                icon={<WorkIcon />}
              />
              <ProfileField
                label="Position"
                value={formData.position}
                editMode={false}
                icon={<WorkIcon />}
              />
              <ProfileField
                label="Total Experience"
                value={formData.experience}
                onChange={(e) =>
                  handleInputChange("experience", e.target.value)
                }
                editMode={editMode}
                icon={<WorkIcon />}
              />

              {formData.postGradCollege ? (
                <ProfileField
                  label="Post Graduate College"
                  value={formData.postGradCollege}
                  editMode={false}
                  icon={<SchoolIcon />}
                />
              ) : (
                <ProfileField
                  label="Graduation College"
                  value={formData.graduationCollege}
                  editMode={false}
                  icon={<SchoolIcon />}
                />
              )}
              <ProfileField
                label="Degree"
                value={formData.degree}
                editMode={false}
                icon={<SchoolIcon />}
              />
            </Stack>

            {/* Action Buttons Section */}
            <Stack mt={4} direction="row" spacing={2} justifyContent="center">
              {editMode ? (
                <>
                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    onClick={handleUpdateDetails}
                    sx={{
                      backgroundColor: "#617AFB",
                      color: "white",
                      borderRadius: "18px",
                    }}
                  >
                    Save
                  </LoadingButton>
                  <Button
                    variant="outlined"
                    onClick={() => setEditMode(false)}
                    sx={{
                      backgroundColor: "#617AFB",
                      color: "white",
                      borderRadius: "18px",
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    onClick={() => setEditMode(true)}
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#617AFB",
                      color: "white",
                      borderRadius: "18px",
                    }}
                  >
                    Edit Profile Details
                  </Button>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<InsertDriveFileIcon />}
                    sx={{
                      display: { md: "flex" },
                      textTransform: "none",
                      backgroundColor: "#EEEFF1",
                      color: "black",
                      borderRadius: "18px",
                    }}
                  >
                    Upload Resume
                    <Input
                      type="file"
                      accept=".pdf"
                      hidden
                      onChange={(e) => {handleFileChange(e, "resume"), setEditMode(true);}}
                    />
                  </Button>
                </>
              )}
            </Stack>
          </Paper>
        </Container>
      </Box>
    </MainLayout>
  );
}

// ProfileField component to handle editable fields and icons
const ProfileField = ({ label, value, onChange, editMode, icon }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <IconButton
      edge="start"
      size="small"
      color="primary"
      disableRipple
      sx={{ color: "black" }}
    >
      {icon}
    </IconButton>
    <Typography
      variant="body2"
      fontWeight="600"
      sx={{ width: "30%", color: "black" }}
    >
      {label}:
    </Typography>
    {editMode ? (
      <TextField
        variant="outlined"
        size="small"
        value={value}
        onChange={onChange}
        fullWidth
      />
    ) : (
      <Typography variant="body2" sx={{ color: "black" }}>
        {value}
      </Typography>
    )}
  </Stack>
);

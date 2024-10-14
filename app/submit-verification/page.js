// /* eslint-disable react-hooks/exhaustive-deps */
// "use client"
// import React, { Suspense, useEffect, useState } from 'react';
// import { Box, Typography, Button, TextField, IconButton, List, ListItem, ListItemText, Avatar, CircularProgress } from '@mui/material';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import CloseIcon from '@mui/icons-material/Close';
// import { notify } from '../components/Toast';
// import { postResponse } from '../components/_apihandler';
// import MainLayout from '../layouts/MainLayout';
// import { useRouter, useSearchParams } from "next/navigation";
// import Loading from '../components/Loading';

// const SubmitVerification = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [files, setFiles] = useState([]);
//     const [remarks, setRemarks] = useState('');
//     const [requestId, setRequestId] = useState(''); // Set the requestId here

//     useEffect(() => {
//         const reqId = searchParams.get('requestId'); // Get the token from the query parameters
//         setRequestId(reqId)
//     }, [])

//     const handleFileChange = (e) => {
//         const selectedFiles = Array.from(e.target.files);
//         const validFiles = selectedFiles.filter(file => file.size <= 5 * 1024 * 1024); // Filter files less than 5 MB
//         if (validFiles.length !== selectedFiles.length) {
//             notify("Some files exceed the size limit of 5 MB and were not added", "error");
//         }
//         setFiles(prevFiles => [...prevFiles, ...validFiles]);
//     };

//     const handleRemarksChange = (e) => {
//         setRemarks(e.target.value);
//     };

//     const handleRemoveFile = (index) => {
//         setFiles(prevFiles => prevFiles.filter((file, i) => i !== index));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (files.length === 0) {
//             notify("Please attach a file", "error");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('requestId', requestId);
//         formData.append('remark', remarks);
//         files.forEach(file => formData.append('attachments', file));

//         try {
//             const response = await postResponse('/api/submitVerification', formData);
//             if (response.status === 201) {
//                 notify(response.data.message, "success");
//                 setFiles([]);
//                 setRemarks('');
//                 setRequestId('');
//                 router.push('/requests-received')
//             } else {
//                 notify("Something went wrong!", "error");
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 notify(error.response.data.message, "error");
//             } else {
//                 notify("Server error", "error");
//             }
//         }
//     };

//     return (
//         <>
//             <Loading />
//             <MainLayout>
//                 <Box className='reBg' px={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
//                     <Box
//                         color="white"
//                         borderRadius={2}
//                         p={4}
//                         boxShadow={3}
//                         maxWidth={600}
//                         width="100%"
//                         textAlign="center"
//                     >
//                         <Typography variant="h6" gutterBottom>
//                             Submit proof for verification of submission
//                         </Typography>
//                         <Box
//                             bgcolor="white"
//                             color="black"
//                             borderRadius={2}
//                             p={2}
//                             mt={2}
//                         >
//                             <Typography variant="body1" gutterBottom>
//                                 Please attach mail or screenshot of referral submission
//                             </Typography>
//                             <Box
//                                 display="flex"
//                                 flexDirection="column"
//                                 alignItems="center"
//                                 mb={2}
//                             >
//                                 <IconButton
//                                     color="primary"
//                                     aria-label="upload file"
//                                     component="label"
//                                     sx={{
//                                         backgroundColor: '#e0e0e0',
//                                         borderRadius: '50%',
//                                         width: 100,
//                                         height: 100,
//                                         mb: 1,
//                                     }}
//                                 >
//                                     <input
//                                         type="file"
//                                         hidden
//                                         accept=".pdf,.png"
//                                         multiple
//                                         onChange={handleFileChange}
//                                     />
//                                     <AttachFileIcon sx={{ fontSize: 40 }} />
//                                 </IconButton>
//                                 <List>
//                                     {files.map((file, index) => (
//                                         <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
//                                             <Avatar
//                                                 src={URL.createObjectURL(file)}
//                                                 sx={{ width: 35, height: 35, mr: 2 }}
//                                                 variant="square"
//                                             />
//                                             <ListItemText primary={file.name} />
//                                             <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
//                                                 <CloseIcon />
//                                             </IconButton>
//                                         </ListItem>
//                                     ))}
//                                 </List>
//                             </Box>
//                             <TextField
//                                 variant="outlined"
//                                 fullWidth
//                                 multiline
//                                 rows={4}
//                                 placeholder="Add comments or remarks"
//                                 value={remarks}
//                                 onChange={handleRemarksChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={handleSubmit}
//                                 disabled={files.length === 0}
//                             >
//                                 Submit
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Box>
//             </MainLayout>
//         </>
//     );
// };

// // export default SubmitVerificationPage;

// export default function SubmitVerificationPage() {
//     return (
//         <Suspense fallback={<CircularProgress />}>
//             <SubmitVerification />
//         </Suspense>
//     );
// }

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CircularProgress,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { notify } from "../components/Toast";
import { postResponse } from "../components/_apihandler";
import MainLayout from "../layouts/MainLayout";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../components/Loading";
import Image from "next/image";

const SubmitVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [files, setFiles] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [requestId, setRequestId] = useState(""); // Set the requestId here

  useEffect(() => {
    const reqId = searchParams.get("requestId"); // Get the requestId from the query parameters
    setRequestId(reqId);
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(
      (file) => file.size <= 5 * 1024 * 1024
    ); // Filter files less than 5 MB
    if (validFiles.length !== selectedFiles.length) {
      notify(
        "Some files exceed the size limit of 5 MB and were not added",
        "error"
      );
    }
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      notify("Please attach a file", "error");
      return;
    }

    const formData = new FormData();
    formData.append("requestId", requestId);
    formData.append("remark", remarks);
    files.forEach((file) => formData.append("attachments", file));

    try {
      const response = await postResponse("/api/submitVerification", formData);
      if (response.status === 201) {
        notify(response.data.message, "success");
        setFiles([]);
        setRemarks("");
        setRequestId("");
        router.push("/requests-received");
      } else {
        notify("Something went wrong!", "error");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notify(error.response.data.message, "error");
      } else {
        notify("Server error", "error");
      }
    }
  };

  return (
    <>
      <Loading />
      <MainLayout
        homeIcon={true}
        headerText={"Submit Verification Documents"}
        homeIconSide={"left"}
        page={"submit-verification"}
      >
        <Box
          px={2}
          py={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            "@media (max-width: 600px)": {
              px: 1,
              py: 2,
            },
          }}
        >
          {/* Container for the form */}
          <Box
            // width="100%"
            // maxWidth={500}
            // bgcolor="white"
            // boxShadow={3}
            // p={3}
            // borderRadius={4}
            textAlign="center"
            sx={{
              color: "black",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              Upload your referral submission
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Please provide proof that you&apos;ve submitted your referral.
            </Typography>

            {/* File Upload Section */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={2}
              sx={{
                mt: 2,
                // "@media (max-width: 600px)": {
                //   width: "100%",
                // },
              }}
            >
              <IconButton
                color="primary"
                aria-label="upload file"
                component="label"
                sx={{
                  backgroundColor: "#e0e0e0",
                  borderRadius: "10px",
                  width: "100%",
                  height: 50,
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "none",
                }}
              >
                <input
                  type="file"
                  hidden
                  accept=".pdf,.png"
                  multiple
                  onChange={handleFileChange}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "black",
                  }}
                >
                  Add validation proof (pdf, photo)
                </Typography>
                <AttachFileIcon sx={{ fontSize: 20, mr: 1, color: "black" }} />
              </IconButton>

              {/* Display selected files */}
              <List>
                {files.map((file, index) => (
                  <ListItem key={index} sx={{ position: "relative", mb: 2 }}>
                    {/* Image with Next.js Image component */}
                    <Box sx={{ position: "relative", width: 350, height: 350 }}>
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        layout="fill" // Ensures the image fills the box
                        objectFit="cover" // Maintain image aspect ratio and cover the box
                        style={{ borderRadius: "8px" }} // Optional styling
                      />

                      {/* Delete Icon in the top-right corner */}
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveFile(index)}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                          },
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Remarks TextArea */}
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              placeholder="Add a comment..."
              value={remarks}
              onChange={handleRemarksChange}
              sx={{ mb: 2, color: "black" }}
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={files.length === 0}
              sx={{
                py: 1,
                textTransform: "none",
                backgroundColor: "#007bff",
                width: "80%",
                borderRadius: "15px",
                "&:disabled": {
                  backgroundColor: "#a6a6a6",
                  color: "black",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </MainLayout>
    </>
  );
};

export default function SubmitVerificationPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <SubmitVerification />
    </Suspense>
  );
}

// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Button,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const CreditRequestModal = () => {
//   const [open, setOpen] = useState(true);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
//       <DialogTitle>
//         Pay or Request
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <Typography
//           variant="h6"
//           component="div"
//           align="center"
//           sx={{ textDecoration: "line-through", marginBottom: 2 }}
//         >
//           Send and request money
//         </Typography>
//         <Typography variant="h5" component="div" align="center" gutterBottom>
//           Credit
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ marginBottom: 2 }}
//         >
//           Send request for credits
//         </Button>
//         <Button variant="outlined" color="primary" fullWidth>
//           Deposit into your account
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreditRequestModal;

import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MainLayout from "../layouts/MainLayout";

const CreditsBuyingPage = () => {
  return (
    <MainLayout
      homeIcon={true}
      headerText={"credit buying by user"}
      homeIconSide={"left"}
      page={"buy-credits"}
    >
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          color: "black",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "400px" },
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: 3,
            p: 3,
            position: "relative",
          }}
        >
          {/* Close button in top-right corner */}
          {/* <IconButton
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#000",
            }}
          >
            <CloseIcon />
          </IconButton> */}

          {/* Title Section */}

          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Pay or Request
          </Typography>

          {/* Struck-through text */}
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            request credit
          </Typography>

          {/* Script-style word 'Credit' */}

          {/* Button for requesting credits */}
          <Box sx={{ marginTop: "70%" }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#007bff",
                color: "#fff",
                mb: 2,
                // py: 1.5,
                fontSize: "16px",
                textTransform: "none",
                borderRadius: "15px",
                fontWeight: "bold",
              }}
            >
              Send request for credits
            </Button>

            {/* Button for depositing */}
            <Button
              variant="outlined"
              fullWidth
              sx={{
                color: "black",
                // borderColor: "#007bff",
                // py: 1.5,
                fontSize: "16px",
                textTransform: "none",
                borderRadius: "15px",
                backgroundColor: "#e0e0e0",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Deposit into your account
            </Button>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default CreditsBuyingPage;

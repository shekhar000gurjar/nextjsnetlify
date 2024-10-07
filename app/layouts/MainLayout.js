// import React from 'react'
// import { Box, useMediaQuery } from '@mui/material';
// import HeaderCom from '../components/headerCom';

// export default function MainLayout({ children }) {

//     return (
//         <>
//             <HeaderCom />
//             <Box >
//                 {children}
//             </Box >
//         </>
//     )
// }

"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import HeaderCom from "../components/headerCom";

export default function MainLayout({
  children,
  homeIcon,
  headerText,
  homeIconSide,
  page,
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user details from localStorage
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  console.log(homeIcon, headerText, homeIconSide, page, "mainlayout");

  return (
    <>
      <HeaderCom
        user={user}
        homeIcon={homeIcon}
        headerText={headerText}
        homeIconSide={homeIconSide}
        page={page}
      />
      <Box sx={{ paddingTop: "64px" }}>{children}</Box>
    </>
  );
}

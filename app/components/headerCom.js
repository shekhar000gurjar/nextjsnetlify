//current code---------------------------------------------------
// "use client";
// import {
//   AppBar,
//   Box,
//   Container,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   InputBase,
// } from "@mui/material";
// import React, { useState } from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

// export default function HeaderCom({
//   user,
//   homeIcon,
//   headerText,
//   homeIconSide,
//   page,
// }) {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [drawerOpenRight, setDrawerOpenRight] = useState(false);

//   const router = useRouter();

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };
//   const handleDrawerToggleRight = () => {
//     setDrawerOpenRight(!drawerOpenRight);
//   };

//   const handleLoginClick = () => {
//     router.push("/login");
//   };

//   const handleProfileClick = () => {
//     router.push("/profile");
//   };

//   const menuItems = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Services", path: "/services" },
//     { name: "Contact", path: "/contact" },
//   ];

//   let headerLabel = "Refer My Job";
//   if (page === "search-company") {
//     headerLabel = headerText;
//   }
//   if (page === "company-page") {
//     headerLabel = headerText;
//   }
//   if (page === "profile-managment") {
//     headerLabel = headerText;
//   }
//   if (page === "send-request") {
//     headerLabel = headerText;
//   }

//   return (
//     <AppBar position="fixed" sx={{ background: "#ffffff" }} elevation={2}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* Mobile Menu (Hamburger Menu) */}
//           <Box
//             sx={{
//               display:
//                 page === "search-company" ? { xs: "flex", md: "none" } : "none",
//             }}
//           >
//             <IconButton
//               edge="start"
//               color="black"
//               aria-label="menu"
//               onClick={handleDrawerToggle}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Drawer
//               anchor="left"
//               open={drawerOpen}
//               onClose={handleDrawerToggle}
//             >
//               <List>
//                 {menuItems.map((item) => (
//                   <ListItem
//                     button
//                     key={item.name}
//                     onClick={() => router.push(item.path)}
//                   >
//                     <ListItemText primary={item.name} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Drawer>
//           </Box>

//           <Box
//             sx={{
//               display:
//                 page === "search-company" ? "none" : { xs: "flex", md: "none" },
//             }}
//           >
//             <Link href="/" passHref>
//               <IconButton edge="start" color="black" aria-label="home">
//                 <HomeOutlinedIcon />
//               </IconButton>
//             </Link>
//           </Box>

//           {/* Logo (Visible on Desktop) */}
//           <Box sx={{ display: { xs: "none", md: "block" } }}>
//             <Link href="/" passHref>
//               <Box
//                 component="img"
//                 src="/images/logo_trademarked.png"
//                 alt="logo"
//                 sx={{ height: "50px", cursor: "pointer" }}
//               />
//             </Link>
//           </Box>

//           {/* Header Text */}
//           {/* <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               flexGrow: 1,
//               justifyContent: {
//                 xs: "flex-start",
//                 sm: "flex-start",
//                 md: "flex-start",
//               },
//               width: "auto",
//             }}
//           >

//           </Box> */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "start",
//               flexGrow: 1,
//               justifyContent: user
//                 ? { xs: "flex-start", md: "flex-start" }
//                 : { xs: "center", md: "flex-start" },
//             }}
//           >
//             <Typography
//               variant="h6"
//               noWrap
//               sx={{
//                 color: "black",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//                 ml: { xs: 0, md: 1 }, // Ensure text is centered on mobile
//                 display: { xs: "none", sm: "none", md: "flex" },
//               }}
//             >
//               Refer My Job
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "black",
//                 fontWeight: "bold",
//                 textAlign: "start",
//                 whiteSpace: "normal", // Allow breaking lines
//                 wordWrap: "break-word", // Support long text wrap
//                 fontSize: { xs: "14px", sm: "16px", md: "18px" }, // Responsive font sizes
//                 lineHeight: "1.2", // Line height for better readability
//                 maxWidth: { xs: "80%", sm: "70%", md: "50%" }, // Max width to avoid overflow
//                 display: { xs: "flex", sm: "flex", md: "none" },
//               }}
//             >
//               {headerLabel}
//             </Typography>
//           </Box>

//           {/* Desktop Menu */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               flexGrow: 1,
//               justifyContent: user ? "end" : "start",
//             }}
//           >
//             {menuItems.map((item) => (
//               <Button
//                 key={item.name}
//                 sx={{ color: "black", mx: 2, fontWeight: 500 }}
//                 onClick={() => router.push(item.path)}
//               >
//                 {item.name}
//               </Button>
//             ))}
//           </Box>

//           {/* Search Bar */}
//           <Box
//             sx={{
//               display: user ? "none" : { xs: "none", md: "flex" }, //{ xs: "none", md: "flex" }
//               alignItems: "center",
//               backgroundColor: "#f1f1f1",
//               padding: "0 12px",
//               borderRadius: "24px",
//               width: "200px",
//             }}
//           >
//             <SearchIcon sx={{ color: "#8a8a8a" }} />
//             <InputBase
//               placeholder="Search"
//               sx={{
//                 ml: 1,
//                 flex: 1,
//                 color: "#8a8a8a",
//               }}
//             />
//           </Box>

//           {/* User Profile or Login Button */}
//           <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
//             {!user ? (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{
//                   backgroundColor: "#6756f0b8",
//                   borderRadius: "24px",
//                   textTransform: "none",
//                   fontWeight: "bold",
//                   ml: 2,
//                 }}
//                 onClick={handleLoginClick}
//               >
//                 Sign Up / Log In
//               </Button>
//             ) : (
//               <Box
//                 sx={{
//                   display: { xs: "none", sm: "none", md: "flex" },
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography sx={{ mr: 1 }}>
//                   {user.firstName} {user.lastName}
//                 </Typography>
//                 <IconButton onClick={handleProfileClick}>
//                   <Avatar alt={user.firstName} src="/profile.jpg" />
//                 </IconButton>
//               </Box>
//             )}
//           </Box>

//           {/* Mobile Home Icon */}
//           <Box
//             sx={{
//               display:
//                 page === "search-company" ? { xs: "flex", md: "none" } : "none",
//             }}
//           >
//             <Link href="/" passHref>
//               <IconButton edge="start" color="black" aria-label="home">
//                 <HomeOutlinedIcon />
//               </IconButton>
//             </Link>
//           </Box>
//           <Box
//             sx={{
//               display:
//                 page === "search-company"
//                   ? "none"
//                   : user
//                   ? { xs: "flex", md: "none" }
//                   : "none",
//             }}
//           >
//             <IconButton
//               edge="start"
//               color="black"
//               aria-label="menu"
//               onClick={handleDrawerToggleRight}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Drawer
//               anchor="right"
//               open={drawerOpenRight}
//               onClose={handleDrawerToggleRight}
//             >
//               <List>
//                 {menuItems.map((item) => (
//                   <ListItem
//                     button
//                     key={item.name}
//                     onClick={() => router.push(item.path)}
//                   >
//                     <ListItemText primary={item.name} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Drawer>
//           </Box>
//           {/* Logo (Visible on Desktop) */}
//           <Box sx={{ display: user ? "none" : { xs: "block", md: "none" } }}>
//             <Link href="/" passHref>
//               <Box
//                 component="img"
//                 src="/images/logo_trademarked.png"
//                 alt="logo"
//                 sx={{ height: "50px", cursor: "pointer" }}
//               />
//             </Link>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

"use client";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Popper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Grow,
  Paper,
} from "@mui/material";
import React, { useState, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function HeaderCom({
  user,
  homeIcon,
  headerText,
  homeIconSide,
  page,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpenRight, setDrawerOpenRight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for the dropdown menu
  const anchorRef = useRef(null); // Ref for the profile icon

  const router = useRouter();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerToggleRight = () => {
    setDrawerOpenRight(!drawerOpenRight);
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleProfileClick = () => {
    setMenuOpen((prev) => !prev); // Toggle the dropdown menu
  };

  const handleMenuItemClick = (path) => {
    router.push(path);
    setMenuOpen(false); // Close the dropdown after navigating
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const profileMenuItems = [
    { name: "Profile", path: "/userprofile" },
    { name: "Sent Requests", path: "/requests-sent" },
    { name: "Received Requests", path: "/requests-received" },
    { name: "Account Summary", path: "/summary" },
    { name: "Logout", path: "/logout" }, // Ensure to implement the logout functionality
  ];

  let headerLabel = "Refer My Job";
  if (page === "search-company") {
    headerLabel = headerText;
  }
  if (page === "company-page") {
    headerLabel = headerText;
  }
  if (page === "profile-managment") {
    headerLabel = headerText;
  }
  if (page === "send-request") {
    headerLabel = headerText;
  }
  if (page === "userprofile") {
    headerLabel = headerText;
  }
  if (page === "summary") {
    headerLabel = headerText;
  }

  const handleClose = (event) => {
    if (
      event &&
      event.target &&
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setMenuOpen(false);
  };

  const handleLogout = () => {
    handleClose(); // Close the menu
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("user"); // Remove user details from local storage
    router.push("/login"); // Redirect to the login page
  };

  return (
    <AppBar position="fixed" sx={{ background: "#ffffff" }} elevation={2}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu (Hamburger Menu) */}
          <Box
            sx={{
              display:
                page === "search-company" ? { xs: "flex", md: "none" } : "none",
            }}
          >
            <IconButton
              edge="start"
              color="black"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    key={item.name}
                    onClick={() => router.push(item.path)}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>

          <Box
            sx={{
              display:
                page === "search-company" ? "none" : { xs: "flex", md: "none" },
            }}
          >
            <Link href="/" passHref>
              <IconButton edge="start" color="black" aria-label="home">
                <HomeOutlinedIcon />
              </IconButton>
            </Link>
          </Box>

          {/* Logo (Visible on Desktop) */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Link href="/" passHref>
              <Box
                component="img"
                src="/images/logo_trademarked.png"
                alt="logo"
                sx={{ height: "50px", cursor: "pointer" }}
              />
            </Link>
          </Box>

          {/* Header Text */}
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexGrow: 1,
              justifyContent: user
                ? { xs: "flex-start", md: "flex-start" }
                : { xs: "center", md: "flex-start" },
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                color: "black",
                cursor: "pointer",
                fontWeight: "bold",
                ml: { xs: 0, md: 1 },
                display: { xs: "none", sm: "none", md: "flex" },
              }}
            >
              Refer My Job
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "black",
                fontWeight: "bold",
                textAlign: "start",
                whiteSpace: "normal",
                wordWrap: "break-word",
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                lineHeight: "1.2",
                maxWidth: { xs: "80%", sm: "70%", md: "50%" },
                display: { xs: "flex", sm: "flex", md: "none" },
              }}
            >
              {headerLabel}
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: user ? "end" : "start",
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.name}
                sx={{ color: "black", mx: 2, fontWeight: 500 }}
                onClick={() => router.push(item.path)}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              display: user ? "none" : { xs: "none", md: "flex" },
              alignItems: "center",
              backgroundColor: "#f1f1f1",
              padding: "0 12px",
              borderRadius: "24px",
              width: "200px",
            }}
          >
            <SearchIcon sx={{ color: "#8a8a8a" }} />
            <InputBase
              placeholder="Search"
              sx={{
                ml: 1,
                flex: 1,
                color: "#8a8a8a",
              }}
            />
          </Box>

          {/* User Profile or Login Button */}
          <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
            {!user ? (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#6756f0b8",
                  borderRadius: "24px",
                  textTransform: "none",
                  fontWeight: "bold",
                  ml: 2,
                }}
                onClick={handleLoginClick}
              >
                Sign Up / Log In
              </Button>
            ) : (
              <Box
                sx={{
                  display: { xs: "none", sm: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <Typography sx={{ mr: 1 }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <IconButton onClick={handleProfileClick} ref={anchorRef}>
                  <Avatar alt={user.firstName} src="/profile.jpg" />
                </IconButton>
                {/* Profile Menu */}
                <Popper
                  open={menuOpen}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList>
                            {profileMenuItems.map((item) => (
                              <MenuItem
                                key={item.name}
                                onClick={() => {
                                  if (item.name === "Logout") {
                                    handleLogout(); // Call the logout function
                                  } else {
                                    handleMenuItemClick(item.path); // Navigate for other items
                                  }
                                }}
                                sx={{ color: "black" }}
                              >
                                {item.name}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>
            )}
          </Box>

          {/* Mobile Home Icon */}
          <Box
            sx={{
              display:
                page === "search-company" ? { xs: "flex", md: "none" } : "none",
            }}
          >
            <Link href="/" passHref>
              <IconButton edge="start" color="black" aria-label="home">
                <HomeOutlinedIcon />
              </IconButton>
            </Link>
          </Box>

          <Box
            sx={{
              display:
                page === "search-company"
                  ? "none"
                  : user
                  ? { xs: "flex", md: "none" }
                  : "none",
            }}
          >
            <IconButton
              edge="start"
              color="black"
              aria-label="menu"
              onClick={handleDrawerToggleRight}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpenRight}
              onClose={handleDrawerToggleRight}
            >
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    key={item.name}
                    onClick={() => router.push(item.path)}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>

          {/* Logo (Visible on Mobile) */}
          <Box sx={{ display: user ? "none" : { xs: "block", md: "none" } }}>
            <Link href="/" passHref>
              <Box
                component="img"
                src="/images/logo_trademarked.png"
                alt="logo"
                sx={{ height: "50px", cursor: "pointer" }}
              />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

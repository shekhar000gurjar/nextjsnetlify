// "use client";
// import {
//     AppBar,
//     Box,
//     Container,
//     Toolbar,
//     Typography,
//     Paper,
//     ClickAwayListener,
//     Grow,
//     MenuItem,
//     MenuList,
//     Popper,
//     Stack,
// } from "@mui/material";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from 'next/navigation';

// export default function HeaderCom({ user }) {
//     const [open, setOpen] = useState(false);
//     const anchorRef = useRef(null);
//     const router = useRouter();

//     const handleToggle = () => {
//         setOpen((prevOpen) => !prevOpen);
//     };

//     const handleClose = (event) => {
//         // Ensure event is defined and has a target
//         if (event && event.target && anchorRef.current && anchorRef.current.contains(event.target)) {
//             return;
//         }
//         setOpen(false);
//     };

//     const handleLogout = () => {
//         handleClose();
//         localStorage.removeItem('token'); // Example for removing token from local storage
//         localStorage.removeItem('user');  // Remove user details from local storage
//         router.push('/login');
//     };

//     const handleHomeClick = () => {
//         handleClose();
//         router.push('/search-company'); // Navigate to the user profile page
//     };

//     const handleProfileClick = () => {
//         handleClose();
//         router.push('/userprofile'); // Navigate to the user profile page
//     };

//     const handleSendRequestClick = () => {
//         handleClose();
//         router.push('/requests-sent'); // Navigate to the user profile page
//     };

//     const handleReceivedRequestClick = () => {
//         handleClose();
//         router.push('/requests-received'); // Navigate to the user profile page
//     };

//     const handleSummaryClick = () => {
//         handleClose();
//         router.push('/summary'); // Navigate to the user profile page
//     };

//     const handleListKeyDown = (event) => {
//         if (event.key === 'Tab') {
//             event.preventDefault();
//             setOpen(false);
//         } else if (event.key === 'Escape') {
//             setOpen(false);
//         }
//     };

//     const prevOpen = useRef(open);
//     useEffect(() => {
//         if (prevOpen.current === true && open === false) {
//             if (anchorRef.current) {
//                 anchorRef.current.focus();
//             }
//         }
//         prevOpen.current = open;
//     }, [open]);

//     const capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//     };

//     return (
//         <AppBar position="fixed" sx={{ background: "#ffffff" }} elevation={2}>
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>
//                     <Link href="/search-company" sx={{ display: { xs: "none", md: "flex" } }}>
//                         <Box
//                             component="img"
//                             src='/logor.png'
//                             alt="logo"
//                             sx={{ maxHeight: "50px", mr: 3 }}
//                         />
//                     </Link>
//                     <Box sx={{ flexGrow: 1 }} />
//                     {user && (
//                         <Stack direction="row" spacing={2}>
//                             <Typography
//                                 variant="h6"
//                                 sx={{
//                                     cursor: "pointer",
//                                     color: "#3498db",
//                                     mr: 2,
//                                 }}
//                                 ref={anchorRef}
//                                 aria-controls={open ? 'composition-menu' : undefined}
//                                 aria-expanded={open ? 'true' : undefined}
//                                 aria-haspopup="true"
//                                 onClick={handleToggle}
//                             >
//                                 {/* {user.first_name} {user.last_name} */}
//                                 {capitalizeFirstLetter(user?.first_name)} {capitalizeFirstLetter(user?.last_name)}
//                             </Typography>
//                             <Popper
//                                 open={open}
//                                 anchorEl={anchorRef.current}
//                                 role={undefined}
//                                 placement="bottom-start"
//                                 transition
//                                 disablePortal
//                             >
//                                 {({ TransitionProps, placement }) => (
//                                     <Grow
//                                         {...TransitionProps}
//                                         style={{
//                                             transformOrigin:
//                                                 placement === 'bottom-start' ? 'left top' : 'left bottom',
//                                         }}
//                                     >
//                                         <Paper>
//                                             <ClickAwayListener onClickAway={handleClose}>
//                                                 <MenuList
//                                                     autoFocusItem={open}
//                                                     id="composition-menu"
//                                                     aria-labelledby="composition-button"
//                                                     onKeyDown={handleListKeyDown}
//                                                 >
//                                                     <MenuItem onClick={handleHomeClick}>Home</MenuItem>
//                                                     <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
//                                                     <MenuItem onClick={handleSendRequestClick}>Sent Requests</MenuItem>
//                                                     <MenuItem onClick={handleReceivedRequestClick}>Received Requests</MenuItem>
//                                                     <MenuItem onClick={handleSummaryClick}>Account Summary</MenuItem>
//                                                     <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                                                 </MenuList>
//                                             </ClickAwayListener>
//                                         </Paper>
//                                     </Grow>
//                                 )}
//                             </Popper>
//                         </Stack>
//                     )}
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     );
// }

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
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import React, { useState } from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function HeaderCom({ user }) {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const router = useRouter();

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
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

//   return (
//     <AppBar position="fixed" sx={{ background: "#ffffff" }} elevation={2}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* Mobile Menu (Hamburger Menu) */}
//           <Box sx={{ display: { xs: "block", md: "none" } }}>
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
//               <List sx={{ height: "auto" }}>
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

//           {/* Logo */}
//           <Box sx={{ display: "flex", flexGrow: 1 }}>
//             <Link href="/" passHref>
//               <Typography
//                 variant="h6"
//                 noWrap
//                 component="div"
//                 sx={{
//                   mr: 2,
//                   display: "flex",
//                   color: "black",
//                   cursor: "pointer",
//                 }}
//               >
//                 Refer My Job
//               </Typography>
//             </Link>
//           </Box>

//           {/* Desktop Menu */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
//             {menuItems.map((item) => (
//               <Button
//                 key={item.name}
//                 sx={{ color: "black", mx: 2 }}
//                 onClick={() => router.push(item.path)}
//               >
//                 {item.name}
//               </Button>
//             ))}
//           </Box>

//           {/* Search Bar */}
//           <Box
//             sx={{
//               flexGrow: 1,
//               display: { xs: "none", md: "flex" },
//               justifyContent: "center",
//             }}
//           >
//             <Box
//               component="form"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: "#f1f1f1",
//                 padding: "0 8px",
//                 borderRadius: "5px",
//                 width: "300px",
//               }}
//             >
//               <SearchIcon />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 style={{
//                 //   border: "none",
//                   background: "none",
//                   marginLeft: "8px",
//                   outline: "none",
//                   flex: 1,
//                 }}
//               />
//             </Box>
//           </Box>

//           {/* Sign Up / Log In Button or User Profile */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             {!user ? (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ display: { xs: "none", md: "block" } }}
//                 onClick={handleLoginClick}
//               >
//                 Sign Up / Log In
//               </Button>
//             ) : (
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Typography
//                   variant="body1"
//                   sx={{ display: { xs: "none", md: "block" }, marginRight: 1 }}
//                 >
//                   {user.firstName} {user.lastName}
//                 </Typography>
//                 <IconButton onClick={handleProfileClick}>
//                   <Avatar alt={user.firstName} src="/profile.jpg" />
//                 </IconButton>
//               </Box>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
//============================================
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
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function HeaderCom({
//   user,
//   homeIcon,
//   headerText,
//   homeIconSide,
//   page,
// }) {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const router = useRouter();

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleLoginClick = () => {
//     router.push("/login");
//   };

//   const handleProfileClick = () => {
//     router.push("/profile");
//   };

//   const handleHomeIconClick = () => {
//     router.push("/");
//   };

//   const menuItems = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Services", path: "/services" },
//     { name: "Contact", path: "/contact" },
//   ];

//   console.log(homeIcon, headerText, homeIconSide, page, "headerComp");

//   return (
//     <AppBar position="fixed" sx={{ background: "#ffffff" }} elevation={2}>
//       <Container maxWidth="xl" sx={{ alignItems: "center" }}>
//         <Toolbar disableGutters>
//           {/* Mobile Menu (Hamburger Menu) */}
//           <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
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
//               <List sx={{ height: "auto" }}>
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

//           {/* Logo and Title */}
//           <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
//             <Typography
//               variant="h6"
//               noWrap
//               sx={{
//                 // display: { xs: "none",sm:"block", md: "block" },
//                 color: "black",
//                 cursor: "pointer",
//                 fontWeight: "bold", // Font-weight as per the image
//               }}
//             >
//               Refer My Job
//             </Typography>
//           </Box>

//           {/* Desktop Menu */}
//           <Box
//             sx={{
//               display: { xs: "none", sm: "flex", md: "flex" },
//               flexGrow: 1,
//             }}
//           >
//             {menuItems.map((item) => (
//               <Button
//                 key={item.name}
//                 sx={{ color: "black", mx: 2, fontWeight: 500 }} // Add proper font-weight
//                 onClick={() => router.push(item.path)}
//               >
//                 {item.name}
//               </Button>
//             ))}
//           </Box>

//           {/* Search Bar */}
//           <Box
//             sx={{
//               flexGrow: { xs: 1, md: 0 },
//               display: { xs: "none", sm: "none", md: "flex" },
//               alignItems: "center",
//               backgroundColor: "#f1f1f1", // Match the color seen in the image
//               //   padding: "0 12px",
//               borderRadius: "24px", // Rounded borders for the search bar
//               //   width: { xs: "100%", sm: "300px", md: "300px" },
//               width: "200px",
//               //   height: "40px", // Adjust height to match the image
//             }}
//           >
//             <SearchIcon sx={{ color: "#8a8a8a" }} />
//             <InputBase
//               placeholder="Search"
//               sx={{
//                 ml: 1,
//                 flex: 1,
//                 input: {
//                   //   background: "none",
//                   color: "#8a8a8a",
//                   outline: "none",
//                   border: "none",
//                   width: "100%",
//                 },
//               }}
//             />
//           </Box>

//           {/* Sign Up / Log In Button or User Profile */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             {!user ? (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{
//                   display: { xs: "none", sm: "block", md: "block" },
//                   backgroundColor: "#6756f0b8", // Button color as per the image
//                   borderRadius: "24px", // Rounded button style
//                   //   padding: "8px 24px",
//                   textTransform: "none", // Remove uppercase text
//                   fontWeight: { lg: "bold" },
//                   marginLeft: "5px",
//                 }}
//                 onClick={handleLoginClick}
//               >
//                 Sign Up / Log In
//               </Button>
//             ) : (
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Typography
//                   variant="body1"
//                   sx={{ display: { xs: "none", md: "block" }, marginRight: 1 }}
//                 >
//                   {user.firstName} {user.lastName}
//                 </Typography>
//                 <IconButton onClick={handleProfileClick}>
//                   <Avatar alt={user.firstName} src="/profile.jpg" />
//                 </IconButton>
//               </Box>
//             )}
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             {/* <IconButton
//               edge="start"
//               color="black"
//               aria-label="menu"
//               onClick={handleHomeIconClick}
//             >
//               <HomeOutlinedIcon />
//             </IconButton> */}

// <Link href="/" passHref>
//               <Box
//                 component="img"
//                 src="/images/logo_trademarked.png" // Replace with actual logo path
//                 alt="logo"
//                 sx={{ height: "50px", marginRight: "8px", cursor: "pointer" }}
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
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderCom({ user }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <AppBar position="fixed" sx={{ background: "#ffffff" }} elevation={2}>
      <Container maxWidth="xl" sx={{ alignItems: "center" }}>
        <Toolbar disableGutters>
          {/* Mobile Menu (Hamburger Menu) */}
          <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
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

          {/* Logo and Title (Center-aligned on mobile, no logo on desktop) */}
          <Box sx={{ display: { xs: "none", sm: "block", md: "block" } }}>
            <IconButton
              edge="start"
              color="black"
              aria-label="menu"
              // onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' } }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                color: "black",
                cursor: "pointer",
                fontWeight: "bold",
                ml: { xs: 0, md: 1 }, // Ensure text is centered on mobile
              }}
            >
              Refer My Job
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex", md: "flex" },
              flexGrow: 1,
              justifyContent: "start",
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
              display: { xs: "none", sm: "none", md: "flex" },
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

          {/* Sign Up / Log In Button or User Profile (Hide on Mobile) */}
          <Box sx={{ display: { xs: "none", sm: "flex", md: "flex" }, alignItems: "center" }}>
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ display: { xs: "none", md: "block" }, mr: 1 }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <IconButton onClick={handleProfileClick}>
                  <Avatar alt={user.firstName} src="/profile.jpg" />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Logo for Mobile (Hide on Desktop) */}
          <Box sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}>
            <Link href="/" passHref>
              <Box
                component="img"
                src="/images/logo_trademarked.png" // Replace with actual logo path
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

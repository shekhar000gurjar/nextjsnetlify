"use client";
import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    Popover,
    Link as MuiLink,
    Divider,
} from "@mui/material";
import React, { useRef, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Logo from '../logo.png'
console.log(Logo)
export default function HeaderCom() {





    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setSubmenuAnchorEl(null);
    };


    const onLogoutClick = () => {
        handleClose();
        dispatch(AuhMethods[CurrentAuthMethod].onLogout());
        router.push('/login');
    };

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
    // const [anchorElUser, setAnchorElUser] = useState(null);
    // const [menuPosition, setMenuPosition] = useState(null);
    const pages = [
        {
            id: 1,
            Name: "Careers",
            link: "/careers",
        },
        {
            id: 2,
            Name: "Locations",
            link: "/locations",
        },
        {
            id: 3,
            Name: "Professions",
            link: "/professions",
        },
        {
            id: 4,
            Name: "Programs",
            link: "/programs",
        },
        {
            id: 5,
            Name: "Lift at Microsoft",
            link: "/lift-at-microsoft",
        },
        {
            id: 6,
            Name: "Hiring tips",
            link: "/hiring-tips",
        },
    ];
    const settings = ["Profile", "Account", "Dashboard", "Logout"];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    // const handleOpenUserMenu = (event) => {
    //   setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // const handleCloseUserMenu = () => {
    //   setAnchorElUser(null);
    // };

    const handleProfileHover = (event) => {
        // This will position the submenu relative to the hovered item
        setSubmenuAnchorEl(event.currentTarget);
    };

    const handleCloseSubmenu = () => {
        setSubmenuAnchorEl(null);
    };
    // Open submenu on hover
    // const handleSubMenuOpen = (event) => {
    //   setMenuPosition(event.currentTarget.getBoundingClientRect());
    // };


    // hover menu functinality 
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);

    return (
        <AppBar position="fixed" sx={{ background: "#ffffff" }} elevation={2}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link
                        href="/"
                        sx={{
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Box
                            component="img"
                            src='./logo.png'
                            alt="logo"
                            sx={{   maxHeight: "50px",  mr: 3 }}
                        />
                    </Link>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >

                            {pages.map((page) => (
                                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                    <Link href={`${page.link}`}>{page.Name}</Link>{" "}
                                    {/* mobile menu */}
                                </MenuItem>
                            ))}

                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Link key={page.id} href={`${page.link}`} className="mainMenu">
                                {" "}
                                {page.Name}
                            </Link> //desktop menu
                        ))}
                    </Box>  
                   
                </Toolbar>
            </Container>
        </AppBar>
    )
}

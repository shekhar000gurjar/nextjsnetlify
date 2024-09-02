"use client";
import {
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography,
    Paper,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Popper,
    Stack,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function HeaderCom({ user }) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const router = useRouter();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        // Ensure event is defined and has a target
        if (event && event.target && anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleLogout = () => {
        handleClose();
        localStorage.removeItem('token'); // Example for removing token from local storage
        localStorage.removeItem('user');  // Remove user details from local storage
        router.push('/login');
    };

    const handleHomeClick = () => {
        handleClose();
        router.push('/search-company'); // Navigate to the user profile page
    };

    const handleProfileClick = () => {
        handleClose();
        router.push('/userprofile'); // Navigate to the user profile page
    };

    const handleSendRequestClick = () => {
        handleClose();
        router.push('/requests-sent'); // Navigate to the user profile page
    };

    const handleReceivedRequestClick = () => {
        handleClose();
        router.push('/requests-received'); // Navigate to the user profile page
    };

    const handleSummaryClick = () => {
        handleClose();
        router.push('/summary'); // Navigate to the user profile page
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            if (anchorRef.current) {
                anchorRef.current.focus();
            }
        }
        prevOpen.current = open;
    }, [open]);


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <AppBar position="fixed" sx={{ background: "#ffffff" }} elevation={2}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link href="/search-company" sx={{ display: { xs: "none", md: "flex" } }}>
                        <Box
                            component="img"
                            src='/logor.png'
                            alt="logo"
                            sx={{ maxHeight: "50px", mr: 3 }}
                        />
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    {user && (
                        <Stack direction="row" spacing={2}>
                            <Typography
                                variant="h6"
                                sx={{
                                    cursor: "pointer",
                                    color: "#3498db",
                                    mr: 2,
                                }}
                                ref={anchorRef}
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                {/* {user.first_name} {user.last_name} */}
                                {capitalizeFirstLetter(user?.first_name)} {capitalizeFirstLetter(user?.last_name)}
                            </Typography>
                            <Popper
                                open={open}
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
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown}
                                                >
                                                    <MenuItem onClick={handleHomeClick}>Home</MenuItem>
                                                    <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                                                    <MenuItem onClick={handleSendRequestClick}>Sent Requests</MenuItem>
                                                    <MenuItem onClick={handleReceivedRequestClick}>Received Requests</MenuItem>
                                                    <MenuItem onClick={handleSummaryClick}>Account Summary</MenuItem>
                                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Stack>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}


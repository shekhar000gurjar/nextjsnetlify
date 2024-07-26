import React from 'react'
import HeaderCom from '../components/headerCom'

import { Box, Button, Container, Divider, Grid, InputBase, InputLabel, OutlinedInput, Paper, Stack, TextField, Typography } from "@mui/material";

export default function About() {
    return (
        <>
            <HeaderCom />

            <Box bgcolor='primary.main' pt={10} height='100vh' display='flex' alignItems='center'>
                <Container>
                    <Box py={4}  >
                        <Typography textAlign='center' variant="h3" color='text.white'>Because impact matters</Typography>
                    </Box>
                </Container>
            </Box>

        </>
    )
}

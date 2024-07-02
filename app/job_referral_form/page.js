
import { Box, Button, Container, Divider, Grid, InputBase, InputLabel, OutlinedInput, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import FirebaseSocial from "../components/FirebaseSocial";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';



export default function Jobreferralform() {
  return (
    <Box className='reBg' pb={10}>
      <Box pt={4} >
        <Typography textAlign='center' variant="h3" color='text.white'>Job Referral Form</Typography>
      </Box>
      <Box  >
        <Container>
          <Paper sx={{ mt: 4, px: 2, py: 4, borderRadius: 3, height: '100%', mx: 'auto', width: { xs: '100%', sm: '45%' } }}>

            <Box
              component="form"
            >
              <Stack spacing={1} sx={{ width: '100%' }} >
                <InputLabel htmlFor="full-name" sx={{ fontWeight: '600', color: 'primart.main' }}>Name:</InputLabel>
                <OutlinedInput
                  size="small"
                  id="full-name"
                  type="text"
                  name="fullname"
                  fullWidth
                />
              </Stack>
              <Stack spacing={1} mt={3}>
                <InputLabel htmlFor="email-login" sx={{ fontWeight: '600', color: 'primart.main' }}>Current Company:</InputLabel>
                <OutlinedInput
                  size="small"
                  id="email-login"
                  type="email"
                  name="email"
                  fullWidth
                />
              </Stack>
              <Stack spacing={1} mt={3}>
                <InputLabel htmlFor="Company" sx={{ fontWeight: '600', color: 'primart.main' }}>Current Role:</InputLabel>
                <OutlinedInput
                  size="small"
                  id="Company"
                  type="text"
                  name="company"
                  fullWidth
                />
              </Stack>
              <Stack spacing={1} mt={3}>
                <InputLabel htmlFor="Companyemail" sx={{ fontWeight: '600', color: 'primart.main' }}>Application Job ID:</InputLabel>
                <OutlinedInput
                  size="small"
                  id="Companyemail"
                  type="email"
                  name="Companyemail"
                  fullWidth
                />
              </Stack>
              <Stack spacing={1} mt={3}>
                <InputLabel htmlFor="currentlocation" sx={{
                  fontWeight: '600',
                  color: 'primart.main'
                }}>Link for Job Applying To:</InputLabel>
                <OutlinedInput
                  size="small"
                  id="currentlocation"
                  type="text"
                  name="currentlocation"
                  fullWidth
                />
              </Stack>

              <Stack spacing={1} mt={3}>
                <InputLabel htmlFor="position" sx={{ fontWeight: '600', color: 'primart.main' }}>Attach Resume:</InputLabel>
                <OutlinedInput
                  size="small"
                  id="position"
                  type="file"
                  name="position"
                  fullWidth
                />
              </Stack>
              <Stack spacing={1} mt={3}>
                <InputLabel htmlFor="phonenumber" sx={{ fontWeight: '600', color: 'primart.main' }}>Attach Cover Letter  <Typography variant="caption"    >
                  (optional)
                </Typography>: &nbsp;
                </InputLabel>
                <OutlinedInput
                  size="small"
                  id="position"
                  type="file"
                  name="position"
                  fullWidth
                />
              </Stack>
              <Stack spacing={1} mt={3}>
                <InputLabel htmlFor="latestcollegename" sx={{ fontWeight: '600', color: 'primart.main' }}>Reward Amount:</InputLabel>
                <OutlinedInput
                  size="small"
                  id="latestcollegename"
                  type="text"
                  name="latestcollegename"
                  fullWidth
                  placeholder="Enter min amount Rs.50"
                />
              </Stack>

              <Stack direction="row" spacing={2} mt={3}  >
                <Button component={Link} href="login" variant="contained" fullWidth>Login</Button>

              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}

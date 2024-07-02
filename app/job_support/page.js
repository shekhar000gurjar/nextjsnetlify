
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Link from "next/link";
import { RiShareForward2Fill } from "react-icons/ri";

import { LuBookmark } from "react-icons/lu";
export default function Jobsearch() {
    const jobdata = [
        { Name: 'Date posted', value: 'Jun 26, 2024' },
        { Name: 'Job number', value: '1731808' },
        { Name: 'Work site', value: 'Microsoft on-site only' },
        { Name: 'Travel', value: '0-25 %' },

        { Name: 'Role type', value: 'Individual Contributor' },
        { Name: 'Profession', value: 'Software Engineering' },

        { Name: 'Discipline', value: 'Software Engineering' },
        { Name: 'Employment type', value: 'Full-Time' },

    ]
    return (
        <Box mt={4}>
            <Paper elevation={3} sx={{ borderRadius: '15px', px: 5, py: 8 }} >
                <Stack sx={{ width: '100%' }}>
                    <Typography variant="h5" fontWeight='800' color='text.secondary'>Support Engineering Manager</Typography>
                    <Typography variant="subtitle1" color='text.secondary'>Hyderabad, Telangana, India</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
                    <Stack direction="row" spacing={3}>
                        <Button variant="contained">Apply</Button>
                        <Button startIcon={<LuBookmark fontSize="large" />}>
                            Save
                        </Button>

                    </Stack>

                    <Link href='#' style={{ display: 'flex', gap: 12, alignItems: 'center', color: '#1170c0' }}>
                        <RiShareForward2Fill fontSize="large" />
                        Share job
                    </Link>

                </Stack>

                <Grid container spacing={2} mt={7}>


                    {
                        jobdata.map((Item, index) => {
                            return (
                                <>
                                    <Grid xs={12} sm={4}>
                                        <Stack direction="row" alignItems='center'  >
                                            <Typography variant="body2" color='text.secondary' gutterBottom='flase' sx={{ width: '40%' }}>{Item.Name} </Typography>
                                            <Typography variant="body2" color='text.secondary' sx={{ fontSize: '15px', fontWeight: '600' }}>{Item.value}</Typography>
                                        </Stack>
                                    </Grid>
                                </>
                            )

                        })
                    }

                </Grid>
            </Paper>
        </Box >

    )
}

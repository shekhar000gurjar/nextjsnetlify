"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';

const ReferralCommunity = () => {
    return (
        <Box>
            <Box
                sx={{
                    // background: 'linear-gradient(135deg, #87ceeb, #4682b4)',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    fontFamily: 'Arial, sans-serif'
                }}
            >
                <Box
                    sx={{
                        fontSize: '1.5em',
                        marginBottom: '10px',
                        padding: '10px',
                        backgroundColor: 'rgba(240 236 236 / 43%)',
                        borderRadius: '15px'
                    }}
                >
                    <Typography variant="h6">
                        Building community of industry peers and alumni to create a referral network
                    </Typography>
                </Box>
                <Box
                    sx={{
                        fontSize: '1.2em',
                        marginBottom: '10px',
                        padding: '10px',
                        backgroundColor: 'rgba(240 236 236 / 43%)',
                        borderRadius: '15px'
                    }}
                >
                    <Typography variant="subtitle1">
                        How to navigate the referral community:
                    </Typography>
                </Box>
                <Box
                    sx={{
                        backgroundColor: 'rgba(240 236 236 / 43%)',
                        padding: '15px',
                        borderRadius: '15px'
                    }}
                >
                    <ol style={{ paddingLeft: '20px' }}>
                        <Typography component="li" sx={{ margin: '10px 0' }}>
                            Go to the desired company's career website and search for relevant job.
                        </Typography>
                        <Typography component="li" sx={{ margin: '10px 0' }}>
                            Shortlist the vacancy & note down the job id and application link.
                        </Typography>
                        <Typography component="li" sx={{ margin: '10px 0' }}>
                            Search for company name & navigate to send referral request.
                        </Typography>
                        <Typography component="li" sx={{ margin: '10px 0' }}>
                            Wait for confirmation of referral submission.
                        </Typography>
                        <Typography component="li" sx={{ margin: '10px 0' }}>
                            Multiple requests for same jobID could be cancelled.
                        </Typography>
                    </ol>
                </Box>
            </Box>
        </Box>
    );
}

export default ReferralCommunity;

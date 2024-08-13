// "use client";

// import React from 'react';
// import { Box, Typography } from '@mui/material';

// const ReferralCommunity = () => {
//     return (
//         <Box
//             sx={{
//                 color: 'white',
//                 padding: '20px',
//                 borderRadius: '10px',
//                 fontFamily: 'Arial, sans-serif'
//             }}
//         >
//             <Box
//                 sx={{
//                     fontSize: '1.5em',
//                     marginBottom: '10px',
//                     padding: '10px',
//                     backgroundColor: 'rgba(240, 236, 236, 0.43)',
//                     borderRadius: '15px'
//                 }}
//             >
//                 <Typography variant="h5">
//                     Building community of industry peers and alumni to create a referral network
//                 </Typography>
//             </Box>
//             <Box
//                 sx={{
//                     fontSize: '1.2em',
//                     marginBottom: '10px',
//                     padding: '10px',
//                     backgroundColor: 'rgba(240, 236, 236, 0.43)',
//                     borderRadius: '15px'
//                 }}
//             >
//                 <Typography variant="h6">
//                     How to navigate the referral community:
//                 </Typography>
//             </Box>
//             <Box
//                 sx={{
//                     backgroundColor: 'rgba(240, 236, 236, 0.43)',
//                     padding: '15px',
//                     borderRadius: '15px'
//                 }}
//             >
//                 <ol style={{ paddingLeft: '20px' }}>
//                     <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
//                         Go to the desired company's career website and search for relevant job.
//                     </Typography>
//                     <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
//                         Shortlist the vacancy & note down the job id and application link.
//                     </Typography>
//                     <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
//                         Search for company name & navigate to send referral request.
//                     </Typography>
//                     <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
//                         Wait for confirmation of referral submission.
//                     </Typography>
//                     <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
//                         Multiple requests for same job ID could be cancelled.
//                     </Typography>
//                 </ol>
//             </Box>
//             <Box
//                 sx={{
//                     marginTop: '20px',
//                     padding: '15px',
//                     backgroundColor: 'rgba(240, 236, 236, 0.43)',
//                     borderRadius: '15px'
//                 }}
//             >
//                 <Typography variant="h6" sx={{ marginBottom: '10px' }}>
//                     Watch this video to learn more:
//                 </Typography>
//                 <video width="100%" controls>
//                     <source src="/images/icons/DIRECTIONS_TO_USE.mp4" type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//             </Box>
//         </Box>
//     );
// };

// export default ReferralCommunity;


"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';

const ReferralCommunity = () => {
    return (
        <Box
            sx={{
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
                    backgroundColor: 'rgba(240, 236, 236, 0.43)',
                    borderRadius: '15px'
                }}
            >
                <Typography variant="h5">
                    Building community of industry peers and alumni to create a referral network
                </Typography>
            </Box>
            <Box
                sx={{
                    fontSize: '1.2em',
                    marginBottom: '10px',
                    padding: '10px',
                    backgroundColor: 'rgba(240, 236, 236, 0.43)',
                    borderRadius: '15px'
                }}
            >
                <Typography variant="h6">
                    How to navigate the referral community:
                </Typography>
            </Box>
            <Box
                sx={{
                    backgroundColor: 'rgba(240, 236, 236, 0.43)',
                    padding: '15px',
                    borderRadius: '15px',
                    textAlign: 'left'
                }}
            >
                <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    {/* <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
                        Go to the desired company's career website and search for relevant job.
                    </Typography> */}
                    <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
                        Go to the desired company&apos;s career website and search for relevant job.
                    </Typography>
                    <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
                        Shortlist the vacancy & note down the job id and application link.
                    </Typography>
                    <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
                        Search for company name & navigate to send referral request.
                    </Typography>
                    <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
                        Wait for confirmation of referral submission.
                    </Typography>
                    <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
                        Multiple requests for same job ID could be cancelled.
                    </Typography>
                </ul>
            </Box>
            <Box
                sx={{
                    backgroundColor: 'rgba(240, 236, 236, 0.43)',
                    padding: '15px',
                    borderRadius: '15px',
                    marginTop: '20px',
                    textAlign: 'left'
                }}
            >
                <Typography variant="h6" sx={{
                    textAlign: 'center'
                }}>
                    Refer Points System:
                </Typography>
                <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                    <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
                        Each referral request sent by a user will require 1 refer point to be deposited.
                    </Typography>
                    <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
                        Each successful referral submission by another user will earn 1 refer point (post validation).
                    </Typography>
                    <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
                        On registration, each user gets 2 refer points credited.
                    </Typography>
                    <Typography component="li" sx={{ margin: '10px 0' }} variant="h6">
                        More refer points can be bought for Rs.100 per 4 credits.
                    </Typography>
                </ul>
            </Box>
            <Box
                sx={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: 'rgba(240, 236, 236, 0.43)',
                    borderRadius: '15px'
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                    Watch this video to learn more:
                </Typography>
                <video width="100%" controls>
                    <source src="/images/icons/DIRECTIONS_TO_USE.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Box>
        </Box>
    );
};

export default ReferralCommunity;

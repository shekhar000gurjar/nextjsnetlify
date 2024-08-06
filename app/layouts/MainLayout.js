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


import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import HeaderCom from '../components/headerCom';

export default function MainLayout({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user details from localStorage
        const userDetails = localStorage.getItem('user');
        if (userDetails) {
            setUser(JSON.parse(userDetails));
        }
    }, []);

    return (
        <>
            <HeaderCom user={user} />
            <Box sx={{ paddingTop: '64px' }}>
                {children}
            </Box>
        </>
    );
}


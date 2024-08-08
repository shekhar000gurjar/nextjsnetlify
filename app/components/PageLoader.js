// "use client";
// import React from 'react';
// import { Box } from '@mui/material';
// // import { makeStyles } from '@mui/styles';
// import { CircularProgress } from '@mui/material';

/* const useStyles = makeStyles(theme => ({
  circularProgressRoot: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 999999,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})); */

// const PageLoader = () => {
// //   const classes = useStyles();

//   return (
//     <Box className={"circularProgressRoot"}>
//       <CircularProgress />
//     </Box>
//   );
// };

// export default PageLoader;

"use client";
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

const PageLoaderWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f0f2f5',
  animation: 'fadeIn 1s ease-in-out infinite',
  '@keyframes fadeIn': {
    '0%, 100%': { opacity: 0 },
    '50%': { opacity: 1 },
  }
});

const PageLoader = () => {
  return (
    <PageLoaderWrapper>
      <CircularProgress size={60} thickness={4.5} />
      <Typography variant="h6" color="textSecondary" mt={2}>
        Loading, please wait...
      </Typography>
    </PageLoaderWrapper>
  );
};

export default PageLoader;


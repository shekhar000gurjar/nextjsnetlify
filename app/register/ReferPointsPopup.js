// // components/ReferPointsPopup.js

// import React from 'react';
// import { Box, Typography, Modal, Button } from '@mui/material';

// const ReferPointsPopup = ({ open, onClose, points }) => {
//     return (
//         <Modal
//             open={open}
//             onClose={onClose}
//             aria-labelledby="refer-points-popup-title"
//             aria-describedby="refer-points-popup-description"
//         >
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: 400,
//                     bgcolor: 'background.paper',
//                     boxShadow: 24,
//                     p: 4,
//                     borderRadius: '10px',
//                     textAlign: 'center'
//                 }}
//             >
//                 <Typography id="refer-points-popup-title" variant="h6" component="h2">
//                     Registration Successful!
//                 </Typography>
//                 <Typography id="refer-points-popup-description" sx={{ mt: 2 }}>
//                     You have been credited with {points} refer points.
//                 </Typography>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     sx={{ mt: 2 }}
//                     onClick={onClose}
//                 >
//                     Okay
//                 </Button>
//             </Box>
//         </Modal>
//     );
// };

// export default ReferPointsPopup;


// components/ReferPointsPopup.js

import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import Confetti from 'react-confetti';

// Keyframes for animations
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0); 
  }
  40% {
    transform: translateY(-30px); 
  }
  60% {
    transform: translateY(-15px); 
  }
`;

const StyledModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(5px)',
}));

const PopupBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[24],
    padding: theme.spacing(4),
    borderRadius: '10px',
    textAlign: 'center',
    animation: `${bounce} 1s ease`,
    overflow: 'hidden',
}));

const BackgroundEffect = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    zIndex: -1,
    opacity: 0.5,
}));

const ReferPointsPopup = ({ open, onClose, points }) => {
    return (
        <StyledModal
            open={open}
            onClose={onClose}
            aria-labelledby="refer-points-popup-title"
            aria-describedby="refer-points-popup-description"
        >
            <PopupBox>
                <BackgroundEffect />
                {open && <Confetti width={window.innerWidth} height={window.innerHeight} />}
                <Typography id="refer-points-popup-title" variant="h6" component="h2">
                    Registration Successful!
                </Typography>
                <Typography id="refer-points-popup-description" sx={{ mt: 2 }}>
                    You have been credited with {points} refer points.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={onClose}
                >
                    Okay
                </Button>
            </PopupBox>
        </StyledModal>
    );
};

export default ReferPointsPopup;

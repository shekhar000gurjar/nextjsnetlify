// src/theme.ts
'use client'; 
import { createTheme } from '@mui/material/styles';

 
const theme = createTheme({
    palette: {
        primary: {
          main: '#1170c0',
        },
        secondary: {
          main: '#000',
        }, 
        text: {
          primary: '#1170c0',
          secondary: '#5A5A5A',
          disabled: 'rgba(0, 0, 0, 0.38)',
          hint: 'rgba(0, 0, 0, 0.3)',
          white: '#fff',
          black: '#000'
        },
        
      },
      typography: { 
        color: '#0066ee',
      },
//   typography: {
//     
//   },

});

export default theme;

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        mode: 'light'
    },
    typography: {
        fontFamily: [
            'Inter',
            'Arial',
            'sans-serif'
            ].join(','),
    }
});


export const lightTheme = {
    background: "#ffffff",
    text: "#000000",
  };
  
export const darkTheme = {
    background: "#000000",
    text: "#ffffff",
};
  
export default theme;
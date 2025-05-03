import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Divider, FormControl, FormControlLabel, Switch, TextField, Typography, Link, createTheme } from "@mui/material";
import videoSvg from '../assets/video.svg';
import { FcGoogle } from 'react-icons/fc';
import styled, { ThemeProvider } from 'styled-components';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from "../theme";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials.username, credentials.password);
            navigate('/home');
        } catch (error) {
            alert('Login failed');
        }
    };

    const ResponsiveImage = styled.img`
        object-fit: cover;
        height: 30rem;

        @media (max-width: 1168px) {
            height: 28rem;
        }
        @media (max-width: 1094px) {
            height: 25rem;
        }
        @media (max-width: 1000px) {
            height: 22rem;
        }
        @media (max-width: 894px) {
            height: 20rem;
        }
        @media (max-width: 836px) {
            height: 18rem;
        }
    `;

    return (
        <ThemeProvider
            theme={theme}
        >
            <Box sx={{
                display: 'flex',
                height: '100vh',
                background: 'linear-gradient(100deg, #FFD700 50%, black 50%)',
                '@media (max-width: 786px)': { background: 'none', flexDirection: 'column' },
            }}>
                {/* Left side - Image */}
                <Box
                    sx={{
                        flex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        padding: '4rem',
                        height: '100%',
                        '@media (max-width: 786px)': { display: 'none' }, // Hide on small screens
                    }}
                >
                    <ResponsiveImage src={videoSvg} alt="Blog" />
                </Box>

                {/* Right side - Login Form */}
                <Container sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 2,
                    padding: '3rem',
                    '@media (max-width: 786px)': { backgroundColor: 'black', flexDirection: 'column' },
                }}>
                    <Typography variant="h4" fontWeight={600} gutterBottom sx={{ color: '#FFD700' }}>
                        Welcome Back!
                    </Typography>
                    <Typography sx={{ color: 'white' }}>
                        Don't have an account? <Link href="/register" sx={{ color: '#FFD700', fontWeight: 'bold' }}>Register</Link>
                    </Typography>

                    <FormControl fullWidth sx={{ maxWidth: '25rem' }}>
                        <TextField
                            name="username"
                            label="Username"
                            variant="outlined"
                            value={credentials.username}
                            onChange={handleChange}
                            sx={{
                                marginTop: '20px',
                                input: { color: 'white' },
                                label: { color: '#FFD700' },
                                fieldset: { borderColor: '#FFD700' }
                            }}
                        />
                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={credentials.password}
                            onChange={handleChange}
                            sx={{
                                marginY: '20px',
                                input: { color: 'white' },
                                label: { color: '#FFD700' },
                                fieldset: { borderColor: '#FFD700' }
                            }}
                        />

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <FormControlLabel control={<Switch sx={{ color: '#FFD700' }} />} label={<span style={{ color: 'white' }}>Remember Me</span>} />
                            <Link to="#" style={{ textDecoration: 'none', color: '#FFD700', fontWeight: 'bold' }}>
                                Forgot Password?
                            </Link>
                        </Box>

                        <Button
                            variant="contained"
                            sx={{
                                marginY: '2rem',
                                borderRadius: '20px',
                                backgroundColor: '#FFD700',
                                color: 'black',
                                fontWeight: 'bold'
                            }}
                            onClick={handleSubmit}
                        >
                            Sign in
                        </Button>

                        <Divider sx={{ color: '#FFD700', fontWeight: 'bold' }}>or</Divider>

                        <Button
                            variant="outlined"
                            sx={{
                                marginTop: '2rem',
                                color: 'white',
                                borderRadius: '18px',
                                border: '2px solid #FFD700',
                                fontWeight: 'bold'
                            }}
                        >
                            <FcGoogle style={{ marginRight: '10px' }} />
                            Sign in with Google
                        </Button>
                    </FormControl>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Login;

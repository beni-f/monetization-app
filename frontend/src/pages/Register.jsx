import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
    Box, Button, Container, Divider, FormControl, TextField, Typography, Link,
    InputLabel, Select, MenuItem
} from "@mui/material";
import videoSvg from "../assets/video.svg";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import axiosInstance from "../axios";
import { ThemeProvider } from 'styled-components';
import theme from "../theme";

const Register = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        referral_code: null,
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let validationErrors = {};
        
        if (credentials.password !== credentials.confirm_password) {
            validationErrors.confirm_password = "Passwords do not match";
        }
        
        if (!credentials.email.includes("@")) {
            validationErrors.email = "Enter a valid email address";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axiosInstance.post('http://localhost:8000/api/register/', {
                first_name: credentials.first_name,
                last_name: credentials.last_name,
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
                referral_code: credentials.referral_code   
            })
            .then(res => navigate('/login'))
            .catch(err => {
                console.error(err);
                alert("Registration failed");
            });
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
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: "flex",
                height: "100vh",
                background: "linear-gradient(100deg, #FFD700 50%, black 50%)",
                "@media (max-width: 786px)": { background: "black", flexDirection: "column" }
            }}>
                {/* Left side - Image */}
                <Box
                    sx={{
                        flex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        padding: "4rem",
                        height: "100%",
                        "@media (max-width: 786px)": { display: "none" },
                    }}
                >
                    <ResponsiveImage
                        src={videoSvg}
                        alt="Blog"
                    />
                </Box>

                {/* Right side - Registration Form */}
                <Container sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "6rem",
                    flex: 2,
                    "@media (max-width: 786px)": { backgroundColor: "black" }
                }}>
                    <Typography variant="h4" fontWeight={600} gutterBottom sx={{ color: "#FFD700" }}>
                        Hello, There!
                    </Typography>
                    <Typography sx={{ color: "white" }}>
                        Already have an account? <Link href="/login" sx={{ color: "#FFD700", fontWeight: "bold" }}>Login</Link>
                    </Typography>

                    <FormControl 
                        fullWidth 
                        sx={{
                            maxWidth: "35rem",
                            width: "100%",
                            marginTop: "20px",
                            padding: "1rem",
                            borderRadius: "8px",
                            overflowY: "auto",
                            maxHeight: "80vh",
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'rgba(255, 215, 0, 0.1)',
                                borderRadius: '10px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'grey',
                                borderRadius: '10px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: 'white',
                            },
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'grey rgba(255, 215, 0, 0.1)',
                        }}
                    >
                        <TextField
                            name="first_name"
                            label="First Name"
                            variant="outlined"
                            value={credentials.first_name}
                            onChange={handleChange}
                            sx={{ 
                                marginTop: "20px",
                                input: { color: "white" },
                                label: { color: "#FFD700" },
                                fieldset: { borderColor: "#FFD700" }
                            }}
                        />
                        <TextField
                            name="last_name"
                            label="Last Name"
                            variant="outlined"
                            value={credentials.last_name}
                            onChange={handleChange}
                            sx={{ 
                                marginTop: "20px",
                                input: { color: "white" },
                                label: { color: "#FFD700" },
                                fieldset: { borderColor: "#FFD700" }
                            }}
                        />
                        <TextField
                            name="username"
                            label="Username"
                            variant="outlined"
                            value={credentials.username}
                            onChange={handleChange}
                            sx={{ 
                                marginTop: "20px",
                                input: { color: "white" },
                                label: { color: "#FFD700" },
                                fieldset: { borderColor: "#FFD700" }
                            }}
                        />
                        <TextField
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            value={credentials.email}
                            onChange={handleChange}
                            sx={{ 
                                marginTop: "20px",
                                input: { color: "white" },
                                label: { color: "#FFD700" },
                                fieldset: { borderColor: "#FFD700" }
                            }}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={credentials.password}
                            onChange={handleChange}
                            sx={{ 
                                marginY: "20px",
                                input: { color: "white" },
                                label: { color: "#FFD700" },
                                fieldset: { borderColor: "#FFD700" }
                            }}
                        />
                        <TextField
                            name="confirm_password"
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            value={credentials.confirm_password}
                            onChange={handleChange}
                            sx={{ 
                                marginBottom: "20px",
                                input: { color: "white" },
                                label: { color: "#FFD700" },
                                fieldset: { borderColor: "#FFD700" }
                            }}
                            error={!!errors.confirm_password}
                            helperText={errors.confirm_password}
                        />
                        <TextField
                            name="referral_code"
                            type="text"
                            label="Referral Code"
                            variant="outlined"
                            value={credentials.referral_code}
                            onChange={handleChange}
                            sx={{ 
                                marginBottom: "20px",
                                input: { color: "white" },
                                label: { color: "#FFD700" },
                                fieldset: { borderColor: "#FFD700" }
                            }}
                            error={!!errors.referral_code}
                            helperText={errors.referral_code}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                marginY: "2rem",
                                borderRadius: "20px",
                                backgroundColor: "#FFD700",
                                color: "black",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#FFD700",
                                    opacity: 0.9
                                }
                            }}
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>

                        <Divider sx={{ color: "#FFD700", fontWeight: "bold" }}>or</Divider>

                        <Button
                            variant="outlined"
                            sx={{ 
                                marginTop: "2rem", 
                                color: "white", 
                                borderRadius: "18px",
                                border: "2px solid #FFD700",
                                fontWeight: "bold",
                                "&:hover": {
                                    border: "2px solid #FFD700"
                                }
                            }}
                        >
                            <FcGoogle style={{ marginRight: "10px" }} />
                            Register with Google
                        </Button>
                    </FormControl>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Register;
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Box, CircularProgress, Typography } from "@mui/material";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // ✅ Ensure we return a loader while checking auth state
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "black",
                    color: "yellow",
                    textAlign: "center",
                    animation: "fadeIn 1s ease-in-out"
                }}
            >
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontWeight: "bold", 
                        mb: 2, 
                        letterSpacing: "2px",
                        animation: "pulse 1.5s infinite alternate"
                    }}
                >
                    Loading, please wait...
                </Typography>
                <CircularProgress sx={{ color: "yellow" }} />
    
                {/* Keyframes for fade-in and pulse animations */}
                <style>
                    {`
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes pulse {
                            from { opacity: 0.6; }
                            to { opacity: 1; }
                        }
                    `}
                </style>
            </Box>
        );
    }
    

    // ✅ If user is not authenticated, redirect them to login
    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  Box, 
  Container, 
  Typography, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  Paper
} from "@mui/material";
import Sidebar from "../components/SideBar";
import Videos from "../components/Videos";
import { Link } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Home() {
    const { loading } = useContext(AuthContext);
    console.log(localStorage.getItem("token"))

    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    useEffect(() => {
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeModal');
        if (!hasSeenWelcome) {
            setTimeout(() => setShowWelcomeModal(true), 1000);
            localStorage.setItem('hasSeenWelcomeModal', 'true');
        }
    }, []);

    const handleCloseWelcomeModal = () => {
        setShowWelcomeModal(false);
    };

    if (loading) {
        return <h1>loading...</h1>;
    }

    const pricingTiers = [
        {
            name: "Free",
            price: "0 ETB",
            features: [
                "5 videos/day",
                "Basic content",
                "Standard support"
            ],
            color: "#6b7280",
            buttonVariant: "outlined"
        },
        {
            name: 'Pro',
            price: '299 ETB',
            features: [
                '50 videos limit',
                '2x coin multiplier',
                'Priority support',
                'Access for referral code to earn more coins'
            ],
            color: '#FFC000',
            buttonVariant: "contained",
            popular: true
        },
        {
            name: 'Premium',
            price: '600 ETB',
            features: [
                'Unlimited videos',
                '3x coin multiplier',
                'VIP support',
                'Access for referral code to earn more coins',
                'Exclusive money making opportunities',
            ],
            color: '#FFA500',
            buttonVariant: "contained"
        }
    ];

    return (
        <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white flex relative">
            <Sidebar />
            <Videos />
            
            <Dialog
                open={showWelcomeModal}
                onClose={handleCloseWelcomeModal}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                    }
                }}
            >
                <Box sx={{ 
                    background: 'linear-gradient(90deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.05) 100%)',
                    p: 3,
                    textAlign: 'center'
                }}>
                    <Typography variant="h4" sx={{ 
                        fontWeight: 800, 
                        color: '#FFD700',
                        mb: 1,
                        letterSpacing: '-0.5px'
                    }}>
                        Welcome!!
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#9ca3af' }}>
                        Choose your plan to get started
                    </Typography>
                </Box>

                <DialogContent sx={{ px: 4, py: 3 }}>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        {pricingTiers.map((tier) => (
                            <Grid item xs={12} md={4} key={tier.name}>
                                <Paper elevation={0} sx={{
                                    height: '100%',
                                    p: 2.5,
                                    borderRadius: '12px',
                                    border: `1px solid ${tier.color}${tier.popular ? 'FF' : '33'}`,
                                    background: `rgba(17, 24, 39, 0.7)`,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    ...(tier.popular && {
                                        borderWidth: '2px',
                                        boxShadow: `0 0 0 1px ${tier.color}`
                                    })
                                }}>
                                    {tier.popular && (
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 16,
                                            bgcolor: tier.color,
                                            color: '#000',
                                            px: 2,
                                            py: 0.5,
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            borderBottomLeftRadius: '4px',
                                            borderBottomRightRadius: '4px'
                                        }}>
                                            POPULAR
                                        </Box>
                                    )}
                                    
                                    <Typography variant="h5" sx={{ 
                                        fontWeight: 700,
                                        color: tier.color,
                                        mb: 1
                                    }}>
                                        {tier.name}
                                    </Typography>
                                    
                                    <Typography variant="h3" sx={{ 
                                        fontWeight: 800,
                                        mb: 2,
                                        color: '#fff'
                                    }}>
                                        {tier.price}
                                        <Typography component="span" variant="body2" sx={{ 
                                            color: '#9ca3af',
                                            ml: 1
                                        }}>
                                            {tier.name !== "Free" ? "/month" : ""}
                                        </Typography>
                                    </Typography>
                                    
                                    <Box sx={{ mb: 3 }}>
                                        {tier.features.map((feature, index) => (
                                            <Box key={index} sx={{ 
                                                display: 'flex',
                                                alignItems: 'center',
                                                mb: 1,
                                                color: '#e5e7eb'
                                            }}>
                                                <CheckCircleIcon sx={{ 
                                                    fontSize: '1rem',
                                                    color: tier.color,
                                                    mr: 1
                                                }} />
                                                <Typography variant="body2">
                                                    {feature}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    
                                    <Button
                                        fullWidth
                                        variant={tier.buttonVariant}
                                        sx={{
                                            mt: 'auto',
                                            fontWeight: 700,
                                            py: 1.5,
                                            borderRadius: '8px',
                                            ...(tier.buttonVariant === 'contained' && {
                                                bgcolor: tier.color,
                                                color: '#000',
                                                '&:hover': {
                                                    bgcolor: `${tier.color}dd`
                                                }
                                            }),
                                            ...(tier.buttonVariant === 'outlined' && {
                                                borderColor: tier.color,
                                                color: tier.color,
                                                '&:hover': {
                                                    bgcolor: `${tier.color}11`
                                                }
                                            })
                                        }}
                                        component={tier.name === "Free" ? undefined : Link}
                                        to={tier.name === "Free" ? undefined : "/pricings"}
                                        onClick={tier.name === "Free" ? handleCloseWelcomeModal : undefined}
                                    >
                                        {tier.name === "Free" ? "Continue Free" : "Get Started"}
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  Box, 
  Avatar, 
  Container, 
  Typography, 
  useMediaQuery, 
  Badge,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoImage from '../assets/images.png'

export default function Sidebar() {
    const { user, loading, logout } = useContext(AuthContext);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("Home");
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const isMobile = useMediaQuery('(max-width:768px)');
    const navigate = useNavigate();

    console.log(user)

    useEffect(() => {
        const currentItem = menuItems.find(item => location.pathname === item.link);
        if (currentItem) {
            setActiveLink(currentItem.name);
        }
    }, [location.pathname]);
        
    const menuItems = [
        { name: "Home", icon: <HomeFilledIcon />, link: '/home' },
        { name: "Pricings", icon: <AttachMoneyIcon />, link: '/pricings' },
        { name: "Withdraw", icon: <BarChartIcon />, link: '/withdraw' },
    ];

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
    };

    const handleWithdraw = () => {
        navigate('/withdraw');
        handleMenuClose();
    };

    const copyReferralCode = () => {
        if (user.referral_code) {
            navigator.clipboard.writeText(user.referralCode);
            setSnackbar({ 
                open: true, 
                message: 'Referral code copied!', 
                severity: 'success' 
            });
        }
    };

    if (loading) {
        return <h1>loading...</h1>;
    }

    const getInitials = (name) => {
        if (!name) return '';
        const names = name.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    const isProUser = ['pro', 'premium'].includes(user?.subscription?.toLowerCase());

    return (
        <Box sx={{ 
            position: 'fixed',
            left: 0,
            bottom: isMobile ? 0 : 'auto',
            top: isMobile ? 'auto' : 0,
            flexShrink: 0,
            borderRight: isMobile ? 'none' : 'solid 1px rgba(255, 255, 255, 0.2)',
            borderTop: isMobile ? 'solid 1px rgba(255, 255, 255, 0.2)' : 'none',
            boxShadow: isMobile ? '0px -5px 10px rgba(0, 0, 0, 0.2)' : '5px 0px 10px rgba(0, 0, 0, 0.2)',
            height: isMobile ? '80px' : '100vh',
            width: isMobile ? '100vw' : '80px',
            zIndex: 1000,
            backgroundColor: 'black',
            fontFamily: 'roboto',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            justifyContent: isMobile ? 'space-around' : 'space-between',
            alignItems: 'center',
            padding: isMobile ? '8px 0' : '0'
        }}>
            {!isMobile && (
                <Container
                    sx={{
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        paddingX: "0px",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <img src={LogoImage} style={{
                        backgroundColor: 'black',
                        width: '50px',
                        height: '50px',
                    }} alt="Logo" />
                </Container>
            )}

            {/* Menu Items */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "row" : "column",
                    alignItems: "center",
                    gap: isMobile ? '0' : '24px',
                    width: isMobile ? '100%' : 'auto',
                    justifyContent: isMobile ? 'space-around' : 'center'
                }}
            >
                {menuItems.map((item) => (
                    <Tooltip key={item.name} title={item.name} placement={isMobile ? "top" : "right"} arrow>
                        <Box>
                            <Link
                                onClick={() => {
                                    setActiveLink(item.name)
                                }}
                                to={item.link}
                                style={{
                                    display: "flex",
                                    flexDirection: isMobile ? "column" : "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: activeLink === item.name ? "#FFD700" : "white",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    padding: isMobile ? '4px 8px' : '8px',
                                    borderRadius: '8px',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                    }
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {item.icon}
                                </Box>
                                {isMobile && (
                                    <Typography sx={{
                                        fontSize: '10px',
                                        marginTop: '4px',
                                        color: activeLink === item.name ? "#FFD700" : "white"
                                    }}>
                                        {item.name}
                                    </Typography>
                                )}
                            </Link>
                        </Box>
                    </Tooltip>
                ))}
            </Box>

            {/* User Profile */}
            <Tooltip title={`${user.first_name} ${user.last_name} (${user.coins} coins)`} placement={isMobile ? "top" : "right"} arrow>
                <Box
                    sx={{
                        padding: isMobile ? '0' : '16px',
                        marginBottom: isMobile ? '0' : '20px',
                        paddingRight: isMobile && '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }
                    }}
                    onClick={handleMenuOpen}
                >
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <Box sx={{
                                backgroundColor: '#FFD700',
                                color: 'black',
                                borderRadius: '12px',
                                padding: '2px 6px',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                minWidth: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {user.coins}
                            </Box>
                        }
                    >
                        <Avatar
                            sx={{
                                bgcolor: '#FFD700',
                                color: 'black',
                                width: isMobile ? 32 : 40,
                                height: isMobile ? 32 : 40,
                                fontSize: isMobile ? '14px' : '16px',
                                fontWeight: 'bold'
                            }}
                        >
                            {getInitials(`${user?.first_name} ${user?.last_name}` || '')}
                        </Avatar>
                    </Badge>
                </Box>
            </Tooltip>

            {/* User Menu Dropdown */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: isMobile ? 'top' : 'bottom',
                    horizontal: isMobile ? 'center' : 'left'
                }}
                transformOrigin={{
                    vertical: isMobile ? 'bottom' : 'top',
                    horizontal: isMobile ? 'center' : 'right'
                }}
                PaperProps={{
                    style: {
                        backgroundColor: '#333',
                        color: 'white',
                        minWidth: '200px',
                    },
                }}
            >
                {(user.subscription == 'Pro' || user.subscription == 'Premium') && (
                    <>
                        <MenuItem 
                            onClick={copyReferralCode}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                }
                            }}
                        >
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AccountBalanceWalletIcon sx={{ 
                                        marginRight: '8px', 
                                        color: '#FFD700' 
                                    }} />
                                    <Typography variant="body2">
                                        Referral Code: {user.referral_code}
                                    </Typography>
                                </Box>
                                <ContentCopyIcon fontSize="small" />
                            </Box>
                        </MenuItem>
                        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                    </>
                )}
                
                <MenuItem 
                    onClick={handleWithdraw}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                        }
                    }}
                >
                    <AccountBalanceWalletIcon sx={{ marginRight: '8px', color: '#FFD700' }} />
                    Withdraw
                </MenuItem>
                <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                <MenuItem 
                    onClick={handleLogout}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                        }
                    }}
                >
                    <LogoutIcon sx={{ marginRight: '8px', color: '#FFD700' }} />
                    Logout
                </MenuItem>
            </Menu>

            {/* Snackbar for copy notification */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
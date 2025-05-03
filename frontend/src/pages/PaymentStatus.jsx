import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress,
  Paper,
  Button
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Sidebar from '../components/SideBar';
import axiosInstance from '../axios';

const PaymentStatus = () => {
  const { tx_ref } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const hasVerified = useRef(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (hasVerified.current) return;
      hasVerified.current = true;
      try {
        const verificationResponse = await axiosInstance.get(
          `/api/pay/verify/${tx_ref}/`
        );

        if (verificationResponse.data.status === 'completed') {
            const updateResponse = await axiosInstance.post(
                '/api/user/update-limits/',
                {
                    plan: verificationResponse.data.plan,
                }
            );

            setStatus('completed')
            setPaymentData({
                ...verificationResponse.data,
                newLimits: updateResponse.data
            });
        } else {
            setStatus(verificationResponse.data.status)
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Verification failed');
        setStatus('failed');
      }
    };

    verifyPayment();
  }, [tx_ref, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <Container
        maxWidth="xl"
        sx={{
          marginLeft: { xs: 0, md: '80px' },
          padding: 4,
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #000000, #1a1a1a)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Paper
          sx={{
            width: '100%',
            maxWidth: 600,
            p: 4,
            bgcolor: '#1e1e1e',
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            border: '1px solid #333',
            textAlign: 'center'
          }}
        >
          {status === 'verifying' && (
            <>
              <CircularProgress 
                size={60} 
                thickness={4}
                sx={{ color: '#ffd700', mb: 3 }}
              />
              <Typography variant="h4" sx={{ color: '#ffd700', mb: 2 }}>
                Verifying Payment
              </Typography>
              <Typography variant="body1" sx={{ color: 'white' }}>
                Please wait while we verify your transaction and update your account...
              </Typography>
            </>
          )}

          {status === 'completed' && (
            <>
              <CheckCircleOutlineIcon 
                sx={{ 
                  fontSize: 80, 
                  color: '#ffd700', 
                  mb: 2 
                }} 
              />
              <Typography variant="h4" sx={{ color: '#ffd700', mb: 2 }}>
                Payment Successful!
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', mb: 1 }}>
                Your account has been upgraded successfully.
              </Typography>
              
              <Box sx={{ 
                bgcolor: '#2a2a2a', 
                p: 2, 
                borderRadius: 1, 
                mt: 3,
                borderLeft: '4px solid #ffd700'
              }}>
                <Typography variant="body2" sx={{ color: '#aaa' }}>
                  Transaction Reference:
                </Typography>
                <Typography variant="h6" sx={{ color: '#ffd700' }}>
                  {tx_ref}
                </Typography>
                
                {paymentData && (
                  <>
                    <Typography variant="body2" sx={{ color: '#aaa', mt: 2 }}>
                      New Account Limits:
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Box>
                        <Typography variant="body2" className='text-white'>Watch Limit:</Typography>
                        <Typography variant="h6" sx={{ color: '#ffd700' }}>
                          {paymentData.newLimits.watch_limit}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" className='text-white'>Coin Multiplier:</Typography>
                        <Typography variant="h6" sx={{ color: '#ffd700' }}>
                          x{paymentData.newLimits.coin_multiplier}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
              
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#ffd700',
                  color: '#121212',
                  mt: 4,
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#ffd700'
                  }
                }}
                onClick={() => navigate('/home')}
              >
                Go to Home
              </Button>
            </>
          )}

          {status === 'failed' && (
            <>
              <ErrorOutlineIcon 
                sx={{ 
                  fontSize: 80, 
                  color: '#e74c3c', 
                  mb: 2 
                }} 
              />
              <Typography variant="h4" sx={{ color: '#e74c3c', mb: 2 }}>
                Payment Failed
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                There was an issue processing your payment.
              </Typography>
              
              {error && (
                <Box sx={{ 
                  bgcolor: '#2a1a1a', 
                  p: 2, 
                  borderRadius: 1,
                  borderLeft: '4px solid #e74c3c',
                  mb: 3
                }}>
                  <Typography variant="body1" sx={{ color: '#e74c3c' }}>
                    {error}
                  </Typography>
                </Box>
              )}
              
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#ffd700',
                  color: '#121212',
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#ffd700'
                  }
                }}
                onClick={() => navigate('/pricing')}
              >
                Try Again
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default PaymentStatus;
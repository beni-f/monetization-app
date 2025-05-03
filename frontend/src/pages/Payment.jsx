import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle
} from '@mui/material';
import { Lock, ErrorOutline, CheckCircleOutline } from '@mui/icons-material';
import Sidebar from '../components/SideBar';
import axiosInstance from '../axios';

const Payment = () => {
  const { state } = useLocation();
  console.log(state)
  const [formData, setFormData] = useState({
    plan: state?.name,
    amount: state?.amount,
    currency: 'ETB',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log(formData)
      const response = await axiosInstance.post(
        '/api/pay/initiate/',
        {
          ...formData,
          amount: formData.amount,
          plan: formData.plan,
        }
      );
      
      window.open(response.data.checkout_url, '_blank')
      navigate('/home')
      
    } catch (err) {
      setError(err.response?.data?.error || 'Payment initiation failed');
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      bgcolor: '#121212',
      p: 3
    }}>
      <Sidebar />
      <Card sx={{
        width: '100%',
        maxWidth: 500,
        bgcolor: '#1e1e1e',
        borderRadius: 2,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        border: '1px solid #333'
      }}>
        <Box sx={{
          bgcolor: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
          p: 3,
          borderBottom: '2px solid #ffd700',
          position: 'relative'
        }}>
          <Typography variant="h5" component="h2" sx={{
            color: '#ffd700',
            fontWeight: 600,
            textAlign: 'center'
          }}>
            Complete Your Payment
          </Typography>
          <Box sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: '#ffd700',
            color: '#1a1a1a',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontWeight: 'bold',
            fontSize: '0.9rem',
            letterSpacing: 1
          }}>
            CHAPA
          </Box>
        </Box>

        <CardContent sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} icon={<ErrorOutline />}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}

          {success ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircleOutline sx={{ fontSize: 60, color: '#ffd700', mb: 2 }} />
              <Typography variant="h5" sx={{ color: '#ffd700', mb: 1 }}>
                Payment Successful!
              </Typography>
              <Typography variant="body1" sx={{ color: '#aaa', mb: 3 }}>
                Your transaction has been completed successfully.
              </Typography>
              <Button 
                variant="contained"
                sx={{
                  bgcolor: '#d4af37',
                  color: '#121212',
                  '&:hover': { bgcolor: '#c9a227' }
                }}
                onClick={() => setSuccess(false)}
              >
                Make Another Payment
              </Button>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <Box sx={{
                bgcolor: '#2a2a2a',
                p: 2,
                borderRadius: 1,
                mb: 3,
                borderLeft: '4px solid #d4af37',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="body1" sx={{ color: '#aaa' }}>
                  Amount Due:
                </Typography>
                <Typography variant="h6" sx={{ color: '#d4af37', fontWeight: 600 }}>
                  {state?.amount || formData.amount} ETB
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    bgcolor: '#2a2a2a',
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#333'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ffd700'
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { color: '#ffd700' }
                }}
              />

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    InputProps={{
                      sx: {
                        bgcolor: '#2a2a2a',
                        color: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#333'
                        }
                      }
                    }}
                    InputLabelProps={{
                      sx: { color: '#ffd700' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    InputProps={{
                      sx: {
                        bgcolor: '#2a2a2a',
                        color: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#333'
                        }
                      }
                    }}
                    InputLabelProps={{
                      sx: { color: '#ffd700' }
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    bgcolor: '#2a2a2a',
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#333'
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { color: '#ffd700' }
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: '#ffd700',
                  color: '#121212',
                  py: 1.5,
                  mt: 2,
                  '&:hover': {
                    bgcolor: '#ffd700',
                    transform: 'translateY(-2px)'
                  },
                  '&:disabled': {
                    bgcolor: '#ffd700',
                    opacity: 0.7
                  }
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: '#121212', mr: 1 }} />
                    Processing...
                  </>
                ) : (
                  'PAY NOW'
                )}
              </Button>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 3,
                color: '#777'
              }}>
                <Lock sx={{ fontSize: 16, color: '#ffd700', mr: 0.5 }} />
                <Typography variant="caption">
                  Secure payment powered by Chapa
                </Typography>
              </Box>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payment;
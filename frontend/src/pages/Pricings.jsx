import { Box, Container, Typography, Button, Paper, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import CheckIcon from '@mui/icons-material/Check';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Sidebar from '../components/SideBar';
import { Link, useNavigate } from 'react-router-dom';

const Pricings = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'For casual viewers',
      features: [
        '10 videos limit',
        'Basic coin rewards',
        'Standard video quality',
        'Limited categories'
      ],
      color: '#FFD700',
      popular: false,
      amount: 0,
    },
    {
      name: 'Pro',
      price: '299 ETB',
      description: 'For regular users',
      features: [
        '50 videos limit',
        '2x coin multiplier',
        'Priority support',
        'Access for referral code to earn more coins'
      ],
      color: '#FFC000',
      popular: true,
      amount: 299
    },
    {
      name: 'Premium',
      price: '600 ETB',
      description: 'For power users',
      features: [
        'Unlimited videos',
        '3x coin multiplier',
        'VIP support',
        'Access for referral code to earn more coins',
        'Exclusive money making opportunities',
      ],
      color: '#FFA500',
      popular: false,
      amount: 600
    }
  ];

  const handleUpgradeClick = (amount, name) => {
    if (amount > 0) {
      navigate('/payment', { state: { amount, name} });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xl"
        sx={{
          marginLeft: { xs: 0, md: '80px' },
          padding: 4,
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #000000, #1a1a1a)'
        }}
      >
        <Sidebar />
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h4"  
            sx={{ 
              color: '#FFD700', 
              fontWeight: '500',
              mb: 2,
              textTransform: 'uppercase'
            }}
          >
            Upgrade Your Experience
          </Typography>
          <Typography variant="h5" sx={{ color: 'white' }}>
            Choose the plan that fits your viewing habits
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
            mt: 4
          }}
        >
          {plans.map((plan) => (
            <Paper
              key={plan.name}
              elevation={plan.popular ? 8 : 4}
              sx={{
                flex: 1,
                minWidth: 300,
                maxWidth: 400,
                p: 4,
                borderRadius: 2,
                border: plan.popular ? '2px solid #FFD700' : '1px solid #333',
                background: 'rgba(30, 30, 30, 0.9)',
                position: 'relative',
                transform: plan.popular ? 'translateY(-10px)' : 'none',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: plan.popular ? 'translateY(-12px)' : 'translateY(-5px)'
                }
              }}
            >
              {plan.popular && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -15,
                    right: 20,
                    bgcolor: '#FFD700',
                    color: 'black',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 'bold',
                    fontSize: '0.8rem'
                  }}
                >
                  MOST POPULAR
                </Box>
              )}
              
              <Box textAlign="center" mb={3}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: plan.color, 
                    fontWeight: 'bold',
                    mb: 1
                  }}
                >
                  {plan.name}
                </Typography>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {plan.price}
                </Typography>
                {plan.price !== 'Free' && (
                  <Typography variant="body2" sx={{ color: '#aaa' }}>
                    per month
                  </Typography>
                )}
                <Typography variant="body1" sx={{ color: 'white', mt: 1 }}>
                  {plan.description}
                </Typography>
              </Box>

              <Divider sx={{ bgcolor: '#333', my: 2 }} />

              <List>
                {plan.features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 30, color: plan.color }}>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature} 
                      primaryTypographyProps={{ color: 'white' }} 
                    />
                  </ListItem>
                ))}
              </List>

              <Box textAlign="center" mt={4}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: plan.color,
                    color: 'black',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: '20px',
                    '&:hover': plan.amount > 0 ? {
                      bgcolor: plan.color,
                      opacity: 0.9
                    } : {},
                    opacity: plan.amount > 0 ? 1 : 0.7
                  }}
                  onClick={() => handleUpgradeClick(plan.amount, plan.name)}
                  disabled={plan.amount === 0}
                >
                  {plan.price === 'Free' ? 'Current Plan' : 'Upgrade Now'}
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: '#FFD700', mb: 2 }}>
            Enterprise Solutions
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', maxWidth: 800, mx: 'auto' }}>
            Need custom limits or features for your organization? Contact our sales team for
            tailored solutions that match your specific requirements.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#FFD700',
              color: '#FFD700',
              mt: 3,
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              '&:hover': {
                borderColor: '#FFD700',
                bgcolor: 'rgba(255, 215, 0, 0.1)'
              }
            }}
          >
            Contact Sales
          </Button>
        </Box>

        <Box sx={{ mt: 8, bgcolor: 'rgba(255, 215, 0, 0.1)', p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ color: '#FFD700', mb: 2, textAlign: 'center' }}>
            Frequently Asked Questions
          </Typography>
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {[
              {
                question: "Can I change plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time."
              },
              {
                question: "How does the coin multiplier work?",
                answer: "Premium plans multiply the coins you earn from watching videos."
              },
              {
                question: "Is there a yearly subscription option?",
                answer: "Yes! Contact us for yearly billing options with 15% discount."
              }
            ].map((faq, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#FFD700' }}>
                  {faq.question}
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {faq.answer}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Pricings;
import { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  ImageList, 
  ImageListItem, 
  useMediaQuery, 
  Modal, 
  Paper, 
  Tooltip,
  IconButton,
  Divider,
  Button
} from "@mui/material";
import { ThemeProvider } from "styled-components";
import theme from "../theme";
import InfoIcon from '@mui/icons-material/Info';
import InstagramIcon from '@mui/icons-material/Instagram';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import VideoGalleryGrid from "./VideoGallery";
import VideoModal from "./VideoModal";
import axiosInstance from "../axios";

const coinConfig = {
  rate: 0.10,
  minWithdrawal: 1000,
  currency: 'ETB'
};

export default function Videos() {
  const [videos, setVideos] = useState([])
  const [activeCategory, setActiveCategory] = useState("Youtube");
  const [openModal, setOpenModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [instagramAuthPopup, setInstagramAuthPopup] = useState(null);
  const [showInstagramAuth, setShowInstagramAuth] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');

  const categories = ["Youtube", "Tiktok", "Instagram", "Facebook", ];

  const handleOpenModal = (video) => {
    setCurrentVideo(video);
    setOpenModal(true);
    setShowInstagramAuth(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentVideo(null);
    setShowInstagramAuth(false);
  };

  const handleInstagramAction = (videoId) => {
    const width = 500;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    const popup = window.open(
      `https://www.instagram.com/reel/${videoId}/?variant=compact`,
      'InstagramAuth',
      `width=${width},height=${height},top=${top},left=${left}`
    );
    
    if (popup) {
      setInstagramAuthPopup(popup);
      
      // Check for popup closure
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup);
          setInstagramAuthPopup(null);
        }
      }, 500);
    } else {
      // If popup blocked, show direct auth view
      setShowInstagramAuth(true);
    }
  };

  useEffect(() => {
    return () => {
      if (instagramAuthPopup && !instagramAuthPopup.closed) {
        instagramAuthPopup.close();
      }
    };
  }, [instagramAuthPopup]);

  useEffect(() => {
    axiosInstance.get(`/api/media/?category=${activeCategory}`, {headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`
    }})
      .then((res => {
        console.log(res.data)
        setVideos(res.data)
      }))
      .catch((err) => console.error(err));
  }, [activeCategory])

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xl"
        sx={{
          marginLeft: { xs: 0, md: '80px' },
          padding: 2,
          width: '100%',
          minHeight: '100vh'
        }}
      >
        {/* Coin Value Information Bar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          mb: 2,
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 1.5,
              backgroundColor: 'rgba(30, 30, 30, 0.95)',
              color: 'white',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              backdropFilter: 'blur(8px)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                <Box component="span" sx={{ color: '#FFD700', fontWeight: 'bold' }}>1 coin</Box> = {coinConfig.rate} {coinConfig.currency}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.2)', mx: 1 }} />
              <Typography variant="body2">
                Withdraw at <Box component="span" sx={{ color: '#FFD700', fontWeight: 'bold' }}>{coinConfig.minWithdrawal}+ coins</Box>
              </Typography>
            </Box>
            <Tooltip 
              title={
                <Box sx={{ p: 1 }}>
                  <Typography variant="body2">Earn coins by watching videos</Typography>
                  <Typography variant="body2">{coinConfig.minWithdrawal} coins = {coinConfig.minWithdrawal * coinConfig.rate} {coinConfig.currency}</Typography>
                </Box>
              } 
              arrow
            >
              <IconButton sx={{ color: '#FFD700', p: 0.5 }}>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Paper>
        </Box>

        {/* Category Navigation */}
        <Box 
          sx={{
            display: 'flex',
            gap: isMobile ? 1 : 3,
            px: isMobile ? 0.5 : 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          {categories.map((category) => (
            <Typography
              key={category}
              onClick={() => setActiveCategory(category)}
              sx={{
                cursor: "pointer",
                marginTop: '10px',
                fontWeight: activeCategory === category ? "bold" : "normal",
                color: activeCategory === category ? "#FFD700" : "white",
                borderBottom: activeCategory === category ? "2px solid #FFD700" : "none",
                pb: "4px",
                fontFamily: 'inherit',
                transition: "all 0.2s ease",
                px: 1,
                fontSize: isMobile ? '1.05rem' : '1.25rem',
                whiteSpace: 'nowrap',
                '&:hover': {
                  color: "#FFD700",
                }
              }}
            >
              {category}
            </Typography>
          ))}
        </Box>
        
        <VideoGalleryGrid
          videos={videos}
          handleOpenModal={handleOpenModal}
        />
        
        <VideoModal 
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          currentVideo={currentVideo}
          showInstagramAuth={showInstagramAuth}
          handleInstagramAction={handleInstagramAction}
          isMobile={isMobile}
        />
      </Container>
    </ThemeProvider>
  );
}
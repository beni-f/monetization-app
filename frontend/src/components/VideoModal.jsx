// VideoModal.js
import React, { useEffect, useRef, useState } from 'react';
import { Box, Modal, Typography, Divider, Button } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import axiosInstance from '../axios';

const VideoModal = ({
  openModal,
  handleCloseModal,
  currentVideo,
  showInstagramAuth,
  handleInstagramAction,
  isMobile
}) => {
  const [duration, setDuration] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (openModal && currentVideo) {
      startTimeRef.current = Date.now();
      setDuration(0);
      timerRef.current = setInterval(() => {
        const currentDuration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setDuration(currentDuration);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [openModal, currentVideo]);

  console.log(duration)

  const handleClose = () => {
    if (currentVideo?.category.toLowerCase() === 'youtube') {
      const finalDuration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      axiosInstance.post(`/api/media/${currentVideo.id}/record_view/`, {
        duration: finalDuration
      })
        .then(() => {
          console.log('View Recorded');
        })
        .catch(err => {
          console.error('Error recording view:', err);
        });
    }

    handleCloseModal();
    setDuration(0);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)',
        p: isMobile ? 1 : 2,
        overflowY: 'auto',
        py: 4
      }}
    >
      <Box
        sx={{
          width: isMobile ? '95vw' : '80vw',
          maxWidth: '900px',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          my: 2
        }}
      >
        {currentVideo && (
          <>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'black',
                overflow: 'visible',
                ...(currentVideo.category.toLowerCase() === 'youtube' && {
                  paddingTop: '56.25%',
                  position: 'relative',
                  overflow: 'hidden'
                })
              }}
            >
              {currentVideo.category.toLowerCase() === 'youtube' ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentVideo.url}?autoplay=1`}
                  title={currentVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                />
              ) : currentVideo.category.toLowerCase() === 'instagram' && !showInstagramAuth ? (
                <Box sx={{
                  width: '100%',
                  maxWidth: '500px',
                  minHeight: '500px',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <iframe
                    src={`https://www.instagram.com/reel/${currentVideo.url}/embed`}
                    title={currentVideo.title}
                    style={{
                      width: '100%',
                      height: '500px',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                    frameBorder="0"
                    allowFullScreen
                  />
                  
                  <Box sx={{ 
                    mt: 2,
                    display: 'flex',
                    gap: 2,
                    width: '100%',
                    justifyContent: 'center'
                  }}>
                    <Button 
                      variant="contained" 
                      onClick={() => handleInstagramAction(currentVideo.url)}
                      sx={{
                        bgcolor: '#E1306C',
                        '&:hover': { bgcolor: '#C13584' },
                        color: 'white'
                      }}
                    >
                      <InstagramIcon sx={{ mr: 1 }} />
                      Like on Instagram
                    </Button>
                    
                    <Button 
                      variant="outlined"
                      onClick={handleCloseModal}
                      sx={{
                        borderColor: 'text.secondary',
                        color: 'text.primary'
                      }}
                    >
                      Close
                    </Button>
                  </Box>
                  
                  <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    Note: You'll need to authenticate with Instagram to like this reel
                  </Typography>
                </Box>
              ) : currentVideo.category.toLowerCase() === 'instagram' ? (
                <Box sx={{ 
                  width: '100%',
                  height: '600px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <iframe
                    src={`https://www.instagram.com/reel/${currentVideo.url}/?variant=compact`}
                    title={currentVideo.title}
                    style={{
                      width: '100%',
                      maxWidth: '500px',
                      height: '100%',
                      border: 'none'
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{
                  width: '100%',
                  maxWidth: '380px',
                  minHeight: '700px',
                  p: 2
                }}>
                  <iframe
                    src={`https://www.tiktok.com/embed/v2/${currentVideo.url}`}
                    title={currentVideo.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '700px',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                    frameBorder="0"
                    allowFullScreen
                  />
                </Box>
              )}
            </Box>
            
            <Box sx={{ 
              p: 3,
              flexShrink: 0,
              borderTop: '1px solid rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h6" gutterBottom>
                {currentVideo.title}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1
              }}>
                <Typography variant="body2" color="text.secondary">
                  {currentVideo.views} views
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1
                }}>
                  <Box component="span" sx={{ mr: 0.5 }}>
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                        fill="#FFD700" 
                        stroke="#FFD700" 
                        strokeWidth="2"
                      />
                      <path 
                        d="M12 6V18M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5" 
                        stroke="#000000" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                    </svg>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    {currentVideo.coins} coins
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default VideoModal;

import { useMediaQuery } from "@mui/material";
import { ImageList, ImageListItem, Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import WatchLimitModal from "./WatchLimitModal";

export default function VideoGalleryGrid({ videos, handleOpenModal }) {
  const { user } = useContext(AuthContext);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {

  }, [handleOpenModal])

  return (
    <>
      <ImageList 
        variant="masonry" 
        cols={isMobile ? 1 : (isTablet ? 2 : 3)} 
        gap={isMobile ? 16 : 24}
        sx={{ m: 0 }}
      >
        {videos.map((video) => (
          <ImageListItem 
            key={`${video.category}-${video.url}`}
            onClick={() => {
              if (user && user.videos_watched >= user.watch_limit) {
                setShowLimitModal(true)
              } else {
                handleOpenModal(video);
              }
            }}
            sx={{ cursor: 'pointer' }}
          >
            <Box sx={{ position: 'relative' }}>
              {video.category.toLowerCase() === 'youtube' ? (
                <Box
                  component="img"
                  src={`https://img.youtube.com/vi/${video.url}/maxresdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    }
                  }}
                />
              ) : video.category.toLowerCase() === 'instagram' ? (
                <Box
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease',
                    backgroundColor: '#000',
                    aspectRatio: '9/16',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={`https://instagram.com/p/${video.url}/media/?size=l`}
                    alt={video.title}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.7
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))'
                    }}
                  />
                  <Typography 
                    variant="h6" 
                    sx={{
                      position: 'absolute',
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      px: 2
                    }}
                  >
                    Instagram Reel
                  </Typography>
                </Box>
              ) : (
                // TikTok Thumbnail
                <Box
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease',
                    backgroundColor: '#000',
                    aspectRatio: '9/16',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={`https://www.tiktok.com/api/img/?itemId=${video.url}`}
                    alt={video.title}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.7
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))'
                    }}
                  />
                  <Typography 
                    variant="h6" 
                    sx={{
                      position: 'absolute',
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      px: 2
                    }}
                  >
                    TikTok Video
                  </Typography>
                </Box>
              )}
              
              {/* Play Button Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontSize: '4rem',
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 0.9,
                    transform: 'translate(-50%, -50%) scale(1.1)'
                  }
                }}
              >
                ▶
              </Box>

              {/* Coin Indicator */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: '#FFD700',
                  borderRadius: '12px',
                  px: 1.5,
                  py: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  fontWeight: 'bold',
                  backdropFilter: 'blur(2px)'
                }}
              >
                <Box component="span" sx={{ mr: 0.5 }}>
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: '4px' }}
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
                {video.coins * user.coin_multiplier}
              </Box>

              {/* Video Info */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  color: 'white',
                  p: 2,
                  borderRadius: '0 0 8px 8px'
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  {video.title}
                </Typography>
                <Typography variant="caption">
                  {video.views} views
                </Typography>
              </Box>
            </Box>
          </ImageListItem>
        ))}
      </ImageList>
      <WatchLimitModal 
        open={showLimitModal} 
        onClose={() => setShowLimitModal(false)} />
    </>
  );
}
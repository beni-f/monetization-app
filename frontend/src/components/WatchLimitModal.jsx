import { useMediaQuery } from "@mui/material";
import { 
  ImageList, 
  ImageListItem, 
  Box, 
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";

import { Link } from "react-router-dom";

export default function WatchLimitModal({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="watch-limit-dialog"
      PaperProps={{
        style: {
          backgroundColor: '#1a1a1a',
          color: 'white',
          borderRadius: '12px',
          padding: '16px',
          maxWidth: '400px',
          width: '100%',
          margin: '16px'
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
          Watch Limit Reached
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ py: 1 }}>
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
              fill="#FFD700" 
              stroke="#FFD700" 
              strokeWidth="2"
            />
            <path 
              d="M12 8V12M12 16H12.01" 
              stroke="#000000" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </Box>
        <DialogContentText sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
          You've used all your available watches.
        </DialogContentText>
        <DialogContentText sx={{ color: '#aaa', textAlign: 'center' }}>
          Upgrade your plan to continue watching more videos.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', py: 2 }}>
        <Button 
          onClick={onClose}
          sx={{
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            mr: 2,
            px: 3,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Close
        </Button>
        <Button 
          component={Link}
          to="/pricings"
          onClick={onClose}
          sx={{
            backgroundColor: '#FFD700',
            color: 'black',
            fontWeight: 'bold',
            px: 3,
            '&:hover': {
              backgroundColor: '#ffc800'
            }
          }}
        >
          Upgrade Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}

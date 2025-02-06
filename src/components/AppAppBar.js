import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { collection, addDoc } from 'firebase/firestore';
import confetti from 'canvas-confetti';
import { db } from '../firebase'; // Import the Firestore instance

// Create a slide transition for the modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Create custom styled components for a nicer modal appearance
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 20,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '1.75rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  marginBottom: theme.spacing(1),
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  justifyContent: 'center',
}));

// Optional: A custom styled TextField for a softer look.
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    '& fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.5),
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

// Modal component for joining the waitlist with enhanced styling
function JoinWaitlistModal({ open, handleClose }) {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter an email.');
      return;
    }
    setLoading(true);
    try {
      // Add email to the 'waitlist' collection in Firestore
      const waitlistRef = collection(db, 'waitlist');
      await addDoc(waitlistRef, { email, timestamp: new Date() });
      
      // Trigger confetti effect on success
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Clear the field and close the modal after success.
      setEmail('');
      handleClose();
    } catch (err) {
      console.error('Error adding email to waitlist: ', err);
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <StyledDialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <StyledDialogTitle>Join our Waitlist</StyledDialogTitle>
      <form onSubmit={handleSubmit}>
        <StyledDialogContent dividers>
          <StyledTextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </StyledDialogActions>
      </form>
    </StyledDialog>
  );
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  height: 64,
  borderRadius: theme.shape.borderRadius,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.1),
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  boxShadow: theme.shadows[1],
  padding: '8px 16px',
}));

export default function AppAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // Function to scroll to the features section
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setDrawerOpen(false); // Close the mobile drawer if open
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 'calc(var(--template-frame-height, 0px) + 16px)',
        }}
      >
        <Container maxWidth="md">
          <StyledToolbar variant="dense" disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
              <img 
                src="/images/deaflingo_dark.png"
                alt="Deaflingo Logo"
                style={{ 
                  height: '40px',
                  width: 'auto',
                  maxWidth: '120px',
                  objectFit: 'contain',
                  marginRight: '12px'
                }}
              />
              <Box
                component="span"
                sx={{
                  fontSize: '25px',
                  fontWeight: 'bold',
                  color: 'text.primary'
                }}
              >
                Deaflingo
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {!isMobile && (
                <>
                  <Button
                    variant="text"
                    color="success"
                    size="medium"
                    onClick={scrollToFeatures}
                  >
                    Features
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleModalOpen}
                    sx={{
                      bgcolor: 'white',
                      color: 'black',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                      },
                      '&:active': {
                        bgcolor: 'rgba(255, 255, 255, 0.6)',
                      },
                    }}
                  >
                    Join Waitlist
                  </Button>
                </>
              )}
              {isMobile && (
                <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                  backgroundColor: 'background.default',
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Button
                  variant="text"
                  color="info"
                  fullWidth
                  onClick={() => {
                    scrollToFeatures();
                    setDrawerOpen(false);
                  }}
                >
                  Features
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleModalOpen}
                  sx={{
                    bgcolor: 'white',
                    color: 'black',
                  }}
                >
                  Join Waitlist
                </Button>
              </Box>
            </Drawer>
          </StyledToolbar>
        </Container>
      </AppBar>
      {/* Modal for Join Waitlist */}
      <JoinWaitlistModal open={modalOpen} handleClose={handleModalClose} />
    </>
  );
}

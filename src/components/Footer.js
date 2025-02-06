import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, textAlign: 'center' }}>
      {'Copyright © '}
      <Link color="text.secondary" href="#">
        Deaflingo
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const navigate = useNavigate();

  // Helper function to scroll to a specific element id
  const scrollToId = (id) => (event) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'black', py: 6, px: 2 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <img src="images/deaflingo_dark.png" alt="Deaflingo Logo" style={{ width: 50 }} />
          <Stack direction="row" spacing={2} sx={{ mt: { xs: 3, sm: 0 } }}>
            <IconButton color="inherit" href="#">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" href="#">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="inherit" href="#">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" href="#">
              <EmailIcon />
            </IconButton>
            <IconButton color="inherit" href="#">
              <PhoneIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            textAlign: 'center',
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="body2" fontWeight="medium">
              Contact Us
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              Email
            </Link>
            <br />
            <Link color="text.secondary" variant="body2" href="#">
              Phone
            </Link>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              Features
            </Typography>
            <Link
              color="text.secondary"
              variant="body2"
              href="#"
              onClick={scrollToId('features')}
            >
              Our Features
            </Link>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              Who Are We
            </Typography>
            <Link
              color="text.secondary"
              variant="body2"
              href="#"
              onClick={scrollToId('whoarewe')}
            >
              About Us
            </Link>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              Legal Stuff
            </Typography>
            <Link color="text.secondary" variant="body2" onClick={() => navigate('/terms-of-service')}>
              Terms of Service
            </Link>
            <br />
            <Link color="text.secondary" variant="body2" onClick={() => navigate('/privacy-policy')}>
              Privacy Policy
            </Link>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </Box>
  );
}

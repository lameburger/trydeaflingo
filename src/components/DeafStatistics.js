import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes, styled } from '@mui/system';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

// Keyframes for animations
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 10px rgba(39, 255, 0, 0.3); }
  50% { box-shadow: 0 0 20px rgba(39, 255, 0, 0.6); }
  100% { box-shadow: 0 0 10px rgba(39, 255, 0, 0.3); }
`;

// Styled Stat Card with expansion on hover
const StatCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '2px solid',
  borderColor: alpha(theme.palette.divider, 0.2),
  borderRadius: '12px',
  padding: '24px',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  animation: `${fadeInUp} 1s ease-out`,
  '&:hover': {
    transform: 'scale(1.1)', // Expands on hover
    boxShadow: theme.shadows[10], // Adds shadow
    animation: `${glow} 1s infinite alternate`, // Glowing effect
  },
}));

// Styled Stat Number with bounce on hover
const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#27ff00', // Accent color
  transition: 'transform 0.2s ease',
  '&:hover': {
    animation: `${bounce} 0.5s ease-in-out`,
  },
}));

const stats = [
  {
    number: '466M',
    description: 'Deaf and hard-of-hearing people worldwide.',
  },
  {
    number: '70M',
    description: 'People use sign language as their main  language.',
  },
  {
    number: '300+',
    description: 'Different sign languages exist globally.',
  },
  {
    number: '90%',
    description: 'Of deaf children are born to hearing parents.',
  },
];

export default function DeafStatistics() {
  return (
    <Container
      id="statistics"
      sx={{
        py: { xs: 8, sm: 16 },
        color: 'text.primary',
      }}
    >
      {/* Title Animation */}
      <Fade in={true} timeout={1000}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 8 } }}>
          <Typography
            component="h2"
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              animation: `${fadeInUp} 1s ease-in-out`,
            }}
          >
            The Deaf Community in Numbers
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Here is the impact and scale of the deaf and hard-of-hearing community worldwide.
          </Typography>
        </Box>
      </Fade>

      {/* Stats Section with Slide-In Animation */}
      <Grid container spacing={4} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Slide direction="up" in={true} timeout={(index + 1) * 500}>
              <StatCard>
                <StatNumber>{stat.number}</StatNumber>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {stat.description}
                </Typography>
              </StatCard>
            </Slide>
          </Grid>
        ))}
      </Grid>

      {/* CTA Animation */}
      <Slide direction="up" in={true} timeout={1000}>
        <Box sx={{ textAlign: 'center', mt: { xs: 4, sm: 8 }, animation: `${fadeInUp} 1.5s ease-in-out` }}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            So what's our solution to making it easier to communicate with the deaf and hard-of-hearing community?
          </Typography>
        </Box>
      </Slide>
    </Container>
  );
}

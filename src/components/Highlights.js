import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';

const items = [
  {
    icon: <PublicRoundedIcon />,  
    title: 'Expanding Global Sign Languages',  
    description:  
      'Supporting the most widely used sign languages worldwide to make communication truly global.',  
  },
  {
    icon: <SchoolRoundedIcon />,  
    title: 'Enterprise for Education',  
    description:  
      'A powerful version tailored for schools and classrooms, enhancing sign language accessibility in education.',  
  },
  {
    icon: <TextFieldsRoundedIcon />,  
    title: 'Sign Language from Text',  
    description:  
      'Convert written text into sign language production, bridging the gap for more inclusive communication.',  
  },
  {
    icon: <SpeedRoundedIcon />,  
    title: 'Blazing-Fast Translation',  
    description:  
      'Experience ultra-fast sign language translation with our high-performance AI-driven technology.',  
  },
  {
    icon: <CodeRoundedIcon />,  
    title: 'Open Source & Community Driven',  
    description:  
      'Freely accessible datasets and models empower developers and researchers to push innovation forward.',  
  },
  {
    icon: <AccessibilityNewRoundedIcon />,  
    title: 'Accessible for Everyone',  
    description:  
      'Designed to be user-friendly and inclusive, making sign language communication available to all ages.',  
  },
];


export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'text.primary',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              width: { sm: '100%', md: '60%' },
              textAlign: { sm: 'left', md: 'center' },
            }}
          >
            <Typography component="h2" variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Our Visions
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Here are just some of the goals that we hope to achieve.
            </Typography>
          </Box>
        </Fade>
        <Grid container spacing={4}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Grow in={true} timeout={(index + 1) * 500}>
                <Stack
                  direction="column"
                  component={Card}
                  spacing={2}
                  useFlexGap
                  sx={{
                    p: 3,
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: (theme) => theme.shadows[8],
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main', opacity: 0.9 }}>
                    {React.cloneElement(item.icon, {
                      sx: { fontSize: '2.5rem' },
                    })}
                  </Box>
                  <div>
                    <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.description}
                    </Typography>
                  </div>
                </Stack>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
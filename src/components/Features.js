import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import MuiChip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import { styled } from '@mui/material/styles';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

// Sample feature data
const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Real-Time Sign Language Recognition',
    description:
      "Deaflingo revolutionizes sign language learning by using real-time AI-powered recognition. No need for pre-recorded videos—just use your camera and start signing with interactive feedback that helps you improve instantly.",
    image: "/images/demo.gif", // Mobile fallback image
    images: ["/images/demo.gif", "/images/hello.png"],
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Learn Multiple Sign Languages with a Variety of Lessons',
    description:
      "Expand your signing skills beyond a single language! Deaflingo provides structured lessons covering ASL, BSL, and other major sign languages. With an intuitive interface and diverse lesson plans, mastering a new sign language has never been easier.",
    image: "/images/lessons_sc.png", // Mobile fallback image
    images: ["/images/lessons_sc.png", "/images/lessons_languages_sc.png", "/images/onboarding_sc.png"],
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Gamified Learning with Competitive Rankings',
    description:
      "Turn learning into a fun challenge! With Deaflingo gamified ranking system, track your progress, compete with friends, and unlock achievements as you advance. Every sign you master brings you closer to the top of the leaderboard!",
    image: "/images/ranking.png", // Mobile fallback image
    images: ["/images/ranking.png"],
  },
];

// A styled Chip for mobile view; highlights the selected feature.
const Chip = styled(MuiChip)(({ theme, selected }) => ({
  ...(selected && {
    background:
      'linear-gradient(to bottom right, hsl(0, 0%, 0%), hsl(0, 0%, 0%))',
    color: 'hsl(0, 0%, 100%)',
    borderColor: (theme.vars || theme).palette.primary.light,
    '& .MuiChip-label': {
      color: 'hsl(0, 0%, 100%)',
    },
  }),
}));

// MobileLayout displays a horizontally scrollable Chip selector and a Card with a fallback image.
function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
  if (!items[selectedItemIndex]) return null;
  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', px: 2 }}>
        {items.map(({ title }, index) => (
          <Chip
            key={index}
            size="medium"
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
            clickable
          />
        ))}
      </Box>
      <Card variant="outlined">
        <Box
          sx={{
            mb: 2,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 280,
            backgroundImage: `url(${selectedFeature.image})`,
          }}
        />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

MobileLayout.propTypes = {
  handleItemClick: PropTypes.func.isRequired,
  selectedFeature: PropTypes.shape({
    description: PropTypes.string.isRequired,
    icon: PropTypes.element,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
};

// ManualSlider is a custom slider component that displays one image at a time with a fade transition.
function ManualSlider({ images, slideIndex }) {
  return (
    <Fade in key={slideIndex} timeout={500}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${images[slideIndex]})`,
        }}
      />
    </Fade>
  );
}

ManualSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  slideIndex: PropTypes.number.isRequired,
};

export default function Features() {
  // State for the selected feature.
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  // State for the current slide index for the current feature.
  const [slideIndex, setSlideIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  // Reset the slide index when the selected feature changes.
  React.useEffect(() => {
    setSlideIndex(0);
  }, [selectedItemIndex]);

  const selectedFeature = items[selectedItemIndex];

  // Handlers for the navigation arrow buttons.
  const handlePrev = () => {
    setSlideIndex((prev) =>
      prev === 0 ? selectedFeature.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSlideIndex((prev) =>
      prev === selectedFeature.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Fade in timeout={1000}>
        <Box sx={{ width: { xs: '100%', sm: '60%' }, textAlign: 'center', mx: 'auto' }}>
          <Typography
            component="h1"
            variant="h1"
            gutterBottom
            sx={{ color: 'text.primary', fontWeight: 'bold' }}
          >
            Deaflingo
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}>
            An easier way to learn sign language.
          </Typography>
        </Box>
      </Fade>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row-reverse' },
          gap: 2,
        }}
      >
        <div>
          {/* Desktop Feature List */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Grow in timeout={(index + 1) * 500} key={index}>
                <Box
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={[
                    (theme) => ({
                      p: 2,
                      height: '100%',
                      width: '100%',
                      textAlign: 'left',
                      '&:hover': {
                        backgroundColor: (theme.vars || theme).palette.action.hover,
                        transform: 'translateY(-4px)',
                      },
                      transition: 'transform 0.3s ease, background-color 0.3s ease',
                    }),
                    selectedItemIndex === index && {
                      backgroundColor: 'action.selected',
                    },
                  ]}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 1,
                      textAlign: 'left',
                      textTransform: 'none',
                      color: 'text.secondary',
                    }}
                  >
                    {React.cloneElement(icon, { sx: { fontSize: '2rem', color: 'primary.main' } })}
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {title}
                    </Typography>
                    <Typography variant="body2">{description}</Typography>
                  </Box>
                </Box>
              </Grow>
            ))}
          </Box>
          {/* Mobile Layout */}
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        {/* Desktop Slide Show */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: { xs: '100%', sm: '60%' },
            height: '500px',
            position: 'relative',
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <ManualSlider images={selectedFeature.images} slideIndex={slideIndex} />
            {/* Navigation Arrows */}
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 8,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
              }}
            >
              <ArrowBackIosNewRoundedIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 8,
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
              }}
            >
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}

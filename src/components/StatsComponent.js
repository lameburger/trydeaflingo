import React from 'react';
import { Box, Typography, Paper, Grow } from '@mui/material';
import { keyframes } from '@emotion/react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

// Define a gradient animation for the text
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// A reusable stat card component that animates each time it scrolls into view
const StatCard = ({
  end,
  duration,
  label,
  growTimeout,
  paperGradient,
  formattingFn,
}) => {
  // The ref is attached to a wrapping div so we know when this card enters/exits view.
  const { ref, inView } = useInView({
    triggerOnce: false, // re-triggers every time it enters the viewport
    threshold: 0.3,     // 30% of the component is visible before triggering
  });

  return (
    <div ref={ref}>
      <Grow
        in={inView}
        style={{ transformOrigin: '0 0 0' }}
        timeout={growTimeout}
      >
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 3,
            minWidth: 300,
            background: paperGradient,
            boxShadow: '0 4px 20px rgba(255,255,255,0.3)',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              background: 'linear-gradient(45deg, #27ff00, #FF00FF, #00FFFF)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: `${gradientAnimation} 3s ease infinite`,
            }}
          >
            {/* When in view, mount CountUp; when out, show 0 so that it reanimates on reentry */}
            {inView ? (
              <CountUp
                key={String(inView)} // use key to force remount each time inView toggles
                start={0}
                end={end}
                duration={duration}
                formattingFn={formattingFn}
                separator=","
              />
            ) : (
              0
            )}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mt: 2, color: 'white', fontWeight: 'bold' }}
          >
            {label}
          </Typography>
        </Paper>
      </Grow>
    </div>
  );
};

const GlamorousStats = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        minHeight: '100vh',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Animated Gradient Heading (always visible) */}
      <Typography
        variant="h1"
        sx={{
          background: 'linear-gradient(45deg, #27ff00, #FF00FF, #00FFFF)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `${gradientAnimation} 4s ease infinite`,
          mb: 6,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Deaflingo's numbers so far
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        {/* Card for demo'ers */}
        <StatCard
          end={200000}
          duration={2.5}
          label="demo'ers"
          growTimeout={1000}
          paperGradient="linear-gradient(135deg, #ff0066, #27ff00, #0066ff)"
          formattingFn={null} // CountUp will use comma separation
        />

        {/* Card for impressions */}
        <StatCard
          end={2200000}
          duration={2.5}
          label="impressions of Deaflingo"
          growTimeout={1500}
          paperGradient="linear-gradient(135deg, #0066ff, #27ff00, #ff0066)"
          formattingFn={(value) =>
            value >= 1000000
              ? (value / 1000000).toFixed(1) + 'M'
              : value.toLocaleString()
          }
        />
      </Box>
    </Box>
  );
};

export default GlamorousStats;

import * as React from 'react';
import styled from '@emotion/styled';

const HeroContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  font-family: 'JetBrains Mono', monospace;
  background: radial-gradient(
    ellipse 100% 50% at 50% 0%, /* Ellipse shape, wider horizontally */
    rgba(39, 255, 0, 0.5) 0%, /* Start color */
    rgba(39, 255, 0, 0) 70% /* End color */
  );

  /* Grid background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px; /* Grid size */
    mask: radial-gradient(
      circle at center,
      rgba(0, 0, 0, 0.8) 30%, /* More visible in the center */
      transparent 70% /* Fade out towards the edges */
    );
    pointer-events: none; /* Ensure the grid doesn't interfere with interactions */
    z-index: 0; /* Place the grid behind the content */
  }
`;

const Title = styled.h1`
  font-size: clamp(2em, 8vw, 4rem);
  text-align: center;
  margin: 0;
  line-height: 1.2;
  font-weight: 800;
  padding-top: 7%;
  position: relative;
  z-index: 1; /* Ensure the title is above the grid */

  /* Increase padding on mobile devices */
  @media (max-width: 768px) {
    padding-top: 24%;
  }

  span {
    color: #27ff00;
    position: relative;
    display: inline-block;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 1rem 0 1rem; /* Reduced margin to bring GIF closer */
  text-align: center;
  max-width: 600px;
  position: relative;
  z-index: 1; /* Ensure the subtitle is above the grid */
`;

const GifContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0; /* Reduced margin to bring GIF closer */
  position: relative;
  z-index: 1; /* Ensure the GIF is above the grid */
`;

const GifWrapper = styled.div`
  width: 700px; /* Increased size */
  height: 700px; /* Increased size */
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    width: 500px; /* Adjusted for mobile */
    height: 500px; /* Adjusted for mobile */
  }
`;

const DemoButton = styled.a`
  background: #27ff00;
  color: #000;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.25rem; /* Increased font size */
  transition: all 0.2s ease;
  margin-top: 2rem;
  display: inline-block;
  border: 2px solid transparent;
  position: relative;
  z-index: 1; /* Ensure the button is above the grid */

  &:hover {
    background: transparent;
    color: #27ff00;
    border-color: #27ff00;
  }
`;

// New styled component for the fine print note with the App Store logo.
const AppStoreNote = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  position: relative;
  z-index: 1; /* Ensure the note is above the grid */

  img {
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
  }
`;

export default function Hero() {
  return (
    <HeroContainer>
      <Title>
        Duolingo but for
        <br />
        <span>Sign Language</span>
      </Title>
      
      <Subtitle>
        Using computer vision to make learning sign language easier
      </Subtitle>

      <GifContainer>
        <GifWrapper>
          <img
            src="/images/white-hand.gif"
            alt="Sign Language demo"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </GifWrapper>
      </GifContainer>

      <p style={{ marginTop: '1rem', fontWeight: 1000, color: 'rgba(255, 255, 255, 0.7)', position: 'relative', zIndex: 1}}>
        Check out our interactive demo here! ↓
      </p>

      <DemoButton href="/website/index.html">
        Try Live Demo
      </DemoButton>

      <AppStoreNote>
        <img src="/images/app-store-logo.png" alt="App Store Logo" />
        Coming to the App Store Soon
      </AppStoreNote>
    </HeroContainer>
  );
}

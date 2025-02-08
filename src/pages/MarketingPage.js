import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import LogoCollection from '../components/LogoCollection';
import Highlights from '../components/Highlights';
import Pricing from '../components/Pricing';
import DeafStatistics from '../components/DeafStatistics';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import WhoAreWe from '../components/WhoAreWe';
import StatsComponent from '../components/StatsComponent';

export default function MarketingPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero />
      <div>
        <DeafStatistics></DeafStatistics>
        <Features />
        <StatsComponent></StatsComponent>
        <Highlights />
        <FAQ />
        <WhoAreWe></WhoAreWe>
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}

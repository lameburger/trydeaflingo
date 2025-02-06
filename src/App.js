import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'; // Import the CSS file to apply the background override
import MarketingPage from './pages/MarketingPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // This sets the theme to dark mode
  },
});

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MarketingPage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          1. Introduction
        </Typography>
        <Typography variant="body1">
          Welcome to Deaflingo. Your privacy is important to us, and this Privacy Policy explains how we collect, use, and protect your information.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          2. Information We Collect
        </Typography>
        <Typography variant="body1">
          We collect information you provide directly, such as when you create an account, as well as data collected automatically through your use of the app.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          3. How We Use Your Information
        </Typography>
        <Typography variant="body1">
          We use your information to improve our services, personalize your experience, and communicate with you.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          4. Sharing Your Information
        </Typography>
        <Typography variant="body1">
          We do not sell or rent your personal data. However, we may share information with trusted partners to provide certain features.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          5. Security
        </Typography>
        <Typography variant="body1">
          We take reasonable measures to protect your data, but no system is completely secure.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          6. Your Rights
        </Typography>
        <Typography variant="body1">
          You can request access to your data, ask us to delete it, or update your preferences at any time.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          7. Contact Us
        </Typography>
        <Typography variant="body1">
          If you have any questions about this Privacy Policy, contact us at support@deaflingo.com.
        </Typography>
      </Box>
    </Container>
  );
}

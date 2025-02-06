import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function TermsOfService() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          1. Introduction
        </Typography>
        <Typography variant="body1">
          Welcome to Deaflingo! By using our app, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          2. Acceptance of Terms
        </Typography>
        <Typography variant="body1">
          By accessing or using Deaflingo, you agree to these Terms of Service. If you do not agree with any part of these terms, please do not use the app.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          3. Use of the App
        </Typography>
        <Typography variant="body1">
          You agree to use Deaflingo only for lawful purposes and in a way that does not infringe on the rights of others.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          4. User Accounts
        </Typography>
        <Typography variant="body1">
          You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account information.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          5. Changes to Terms
        </Typography>
        <Typography variant="body1">
          We reserve the right to modify these terms at any time. Continued use of the app after changes means you accept the new terms.
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          6. Contact Us
        </Typography>
        <Typography variant="body1">
          If you have any questions about these terms, please contact us at support@deaflingo.com.
        </Typography>
      </Box>
    </Container>
  );
}

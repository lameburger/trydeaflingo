import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Lane', role: 'Lead Developer & Co-Founder', linkedin: 'https://www.linkedin.com/in/laneburgett/' },
  { name: 'Ahmed', role: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/ahmedzeee/' },
];

export default function WhoAreWe() {
  return (
    <Container id="who-are-we" sx={{ py: { xs: 8, sm: 12 }, textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Typography component="h2" variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Who Are We?
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
          Deaflingo is a student-driven project based out of Vanderbilt University. 
        </Typography>
      </motion.div>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        {teamMembers.map((member, index) => (
          <motion.div key={member.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: index * 0.3 }}>
            <Card variant="outlined" sx={{ minWidth: 200, p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>{member.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{member.role}</Typography>
                <Link href={member.linkedin} target="_blank" rel="noopener" sx={{ textDecoration: 'none', color: 'primary.main' }}>
                  LinkedIn Profile
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
}

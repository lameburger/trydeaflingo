import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import GamesRoundedIcon from '@mui/icons-material/GamesRounded';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(
      isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel),
    );
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Questions we might be able to answer.
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion expanded={expanded.includes('panel1')} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
            <SchoolRoundedIcon sx={{ mr: 1 }} />
            <Typography component="span" variant="subtitle2">Is this free?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom>
              Yes (for now)! We will always have a version of this app that anyone can use without any paywall. We believe that this is the most concrete way to make learning sign language more accessible. In future releases of the app, there will be <i>pro</i> features available to paying customers.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded.includes('panel2')} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2d-content" id="panel2d-header">
            <LanguageRoundedIcon sx={{ mr: 1 }} />
            <Typography component="span" variant="subtitle2">How will the app work?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom>
              Think Duolingo but for sign language meets a typing website. The main premise of the app will be to offer a skew of lessons that will help teach basic sign language, this includes the alphabet, basic greetings, and so on. However, we also off a playground feature that allows the user to try signing 
              as if they were on a typing website. We call this feature "Playground" where the user will be met with many words in many categories.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded.includes('panel3')} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
            <VideocamRoundedIcon sx={{ mr: 1 }} />
            <Typography component="span" variant="subtitle2">What do I need to run the app?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom>
              Literally just your phone.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded.includes('panel4')} onChange={handleChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4d-content" id="panel4d-header">
            <GamesRoundedIcon sx={{ mr: 1 }} />
            <Typography component="span" variant="subtitle2">What's with the rankings?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom>
              It's a less serious way to gamify the whole thing. We think sign language could be learned better if you are competing with your friends!
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

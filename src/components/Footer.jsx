import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { styled, useTheme } from '@mui/material/styles';

// Styled Link component for the gradient hover effect
const GradientLink = styled(Link)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'color 0.3s ease-in-out',
  
  '&:hover': {
    color: theme.palette.primary.main,
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -4,
    left: 0,
    width: '100%',
    height: '2px',
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: 'scaleX(0)',
    transformOrigin: 'bottom left',
    transition: 'transform 0.3s ease-out',
  },

  '&:hover::after': {
    transform: 'scaleX(1)',
  },
}));

// Styled IconButton for the amazing social icon effect
const SocialIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
  
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.main,
  },
}));

// Dummy data for the footer links
const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', url: '/about' },
      { name: 'Careers', url: '/careers' },
      { name: 'Press', url: '/press' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'List a Property', url: '/list' },
      { name: 'Find an Office', url: '/offices' },
      { name: 'Blog', url: '/blog' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'FAQ', url: '/faq' },
      { name: 'Contact Us', url: '/contact' },
      { name: 'Privacy Policy', url: '/privacy' },
    ],
  },
];

export function Footer() {
  const theme = useTheme();

  return (
    <Paper
      component="footer"
      elevation={6} // Added elevation for a "floating" effect
      square
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.100', // Subtle color change
        py: 8,
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo and Description Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4" // Larger, more prominent logo/brand name
              component="div"
              gutterBottom
              fontWeight="bold"
              color="primary"
            >
              Your Brand
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A modern platform for discovering your next home, office, or investment. We provide curated listings and expert advice to help you find the perfect space.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}> {/* Added gap for spacing */}
              <SocialIconButton aria-label="Facebook" component="a" href="#">
                <FacebookIcon />
              </SocialIconButton>
              <SocialIconButton aria-label="Twitter" component="a" href="#">
                <TwitterIcon />
              </SocialIconButton>
              <SocialIconButton aria-label="Instagram" component="a" href="#">
                <InstagramIcon />
              </SocialIconButton>
              <SocialIconButton aria-label="LinkedIn" component="a" href="#">
                <LinkedInIcon />
              </SocialIconButton>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          {footerLinks.map((section) => (
            <Grid item xs={6} md={2} key={section.title}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {section.title}
              </Typography>
              <Box component="nav">
                {section.links.map((link) => (
                  <GradientLink
                    key={link.name}
                    href={link.url}
                    display="block"
                    sx={{ my: 1 }}
                  >
                    {link.name}
                  </GradientLink>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Contact Information Section */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Real Estate Ave, Suite 456
              <br />
              Naaldwijk, South Holland 12345
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Email: info@yourbrand.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +31 123 456 7890
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright Section with Divider */}
        <Divider sx={{ my: 4 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {'© '}
            {new Date().getFullYear()}
            {' Your Brand. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
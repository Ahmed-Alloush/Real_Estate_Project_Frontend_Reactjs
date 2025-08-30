// import React from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Link,
//   IconButton,
//   Divider,
//   Paper,
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import { styled, useTheme } from '@mui/material/styles';

// // Styled Link component for the gradient hover effect
// const GradientLink = styled(Link)(({ theme }) => ({
//   position: 'relative',
//   color: theme.palette.text.secondary,
//   textDecoration: 'none',
//   transition: 'color 0.3s ease-in-out',
  
//   '&:hover': {
//     color: theme.palette.primary.main,
//   },

//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     bottom: -4,
//     left: 0,
//     width: '100%',
//     height: '2px',
//     background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//     transform: 'scaleX(0)',
//     transformOrigin: 'bottom left',
//     transition: 'transform 0.3s ease-out',
//   },

//   '&:hover::after': {
//     transform: 'scaleX(1)',
//   },
// }));

// // Styled IconButton for the amazing social icon effect
// const SocialIconButton = styled(IconButton)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   color: theme.palette.text.secondary,
//   border: `1px solid ${theme.palette.divider}`,
//   transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
  
//   '&:hover': {
//     transform: 'scale(1.1)',
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     borderColor: theme.palette.primary.main,
//   },
// }));

// // Dummy data for the footer links
// const footerLinks = [
//   {
//     title: 'Company',
//     links: [
//       { name: 'About Us', url: '/about' },
//       { name: 'Careers', url: '/careers' },
//       { name: 'Press', url: '/press' },
//     ],
//   },
//   {
//     title: 'Services',
//     links: [
//       { name: 'List a Property', url: '/list' },
//       { name: 'Find an Office', url: '/offices' },
//       { name: 'Blog', url: '/blog' },
//     ],
//   },
//   {
//     title: 'Support',
//     links: [
//       { name: 'FAQ', url: '/faq' },
//       { name: 'Contact Us', url: '/contact' },
//       { name: 'Privacy Policy', url: '/privacy' },
//     ],
//   },
// ];

// export function Footer() {
//   const theme = useTheme();

//   return (
//     <Paper
//       component="footer"
//       elevation={6} // Added elevation for a "floating" effect
//       square
//       sx={{
//         bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.100', // Subtle color change
//         py: 8,
//         color: 'text.primary',
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={6}>
//           {/* Logo and Description Section */}
//           <Grid item xs={12} md={4}>
//             <Typography
//               variant="h4" // Larger, more prominent logo/brand name
//               component="div"
//               gutterBottom
//               fontWeight="bold"
//               color="primary"
//             >
//               Your Brand
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               A modern platform for discovering your next home, office, or investment. We provide curated listings and expert advice to help you find the perfect space.
//             </Typography>
//             <Box sx={{ mt: 4, display: 'flex', gap: 2 }}> {/* Added gap for spacing */}
//               <SocialIconButton aria-label="Facebook" component="a" href="#">
//                 <FacebookIcon />
//               </SocialIconButton>
//               <SocialIconButton aria-label="Twitter" component="a" href="#">
//                 <TwitterIcon />
//               </SocialIconButton>
//               <SocialIconButton aria-label="Instagram" component="a" href="#">
//                 <InstagramIcon />
//               </SocialIconButton>
//               <SocialIconButton aria-label="LinkedIn" component="a" href="#">
//                 <LinkedInIcon />
//               </SocialIconButton>
//             </Box>
//           </Grid>

//           {/* Quick Links Section */}
//           {footerLinks.map((section) => (
//             <Grid item xs={6} md={2} key={section.title}>
//               <Typography variant="h6" gutterBottom fontWeight="bold">
//                 {section.title}
//               </Typography>
//               <Box component="nav">
//                 {section.links.map((link) => (
//                   <GradientLink
//                     key={link.name}
//                     href={link.url}
//                     display="block"
//                     sx={{ my: 1 }}
//                   >
//                     {link.name}
//                   </GradientLink>
//                 ))}
//               </Box>
//             </Grid>
//           ))}

//           {/* Contact Information Section */}
//           <Grid item xs={6} md={2}>
//             <Typography variant="h6" gutterBottom fontWeight="bold">
//               Contact
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               123 Real Estate Ave, Suite 456
//               <br />
//               Naaldwijk, South Holland 12345
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//               Email: info@yourbrand.com
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Phone: +31 123 456 7890
//             </Typography>
//           </Grid>
//         </Grid>

//         {/* Copyright Section with Divider */}
//         <Divider sx={{ my: 4 }} />
//         <Box sx={{ textAlign: 'center' }}>
//           <Typography variant="body2" color="text.secondary">
//             {'© '}
//             {new Date().getFullYear()}
//             {' Your Brand. All rights reserved.'}
//           </Typography>
//         </Box>
//       </Container>
//     </Paper>
//   );
// }



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
import { useTranslation } from 'react-i18next';

// Styled Link component for the gradient hover effect with RTL support
const GradientLink = styled(Link)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'color 0.3s ease-in-out',
  fontFamily: theme.direction === 'rtl' ? "'Cairo', sans-serif" : "inherit",
  
  '&:hover': {
    color: theme.palette.primary.main,
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -4,
    left: theme.direction === 'rtl' ? 'auto' : 0,
    right: theme.direction === 'rtl' ? 0 : 'auto',
    width: '100%',
    height: '2px',
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: 'scaleX(0)',
    transformOrigin: theme.direction === 'rtl' ? 'bottom right' : 'bottom left',
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

export function Footer() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Footer links data with translations
  const footerLinks = [
    {
      title: t('footer.company'),
      links: [
        { name: t('footer.aboutUs'), url: '/about' },
        { name: t('footer.careers'), url: '/careers' },
        { name: t('footer.press'), url: '/press' },
      ],
    },
    {
      title: t('footer.services'),
      links: [
        { name: t('footer.listProperty'), url: '/list' },
        { name: t('footer.findOffice'), url: '/offices' },
        { name: t('footer.blog'), url: '/blog' },
      ],
    },
    {
      title: t('footer.support'),
      links: [
        { name: t('footer.faq'), url: '/faq' },
        { name: t('footer.contactUs'), url: '/contact' },
        { name: t('footer.privacyPolicy'), url: '/privacy' },
      ],
    },
  ];

  return (
    <Paper
      component="footer"
      elevation={6}
      square
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.100',
        py: 8,
        color: 'text.primary',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo and Description Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              fontWeight="bold"
              color="primary"
              sx={{
                fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {t('footer.brandName', 'MyRealEstate')}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                textAlign: isRTL ? 'right' : 'left',
                lineHeight: 1.6,
              }}
            >
              {t('footer.description')}
            </Typography>
            <Box sx={{ 
              mt: 4, 
              display: 'flex', 
              gap: 2,
              justifyContent: isRTL ? 'flex-end' : 'flex-start',
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}>
              <SocialIconButton aria-label={t('footer.facebook')} component="a" href="#">
                <FacebookIcon />
              </SocialIconButton>
              <SocialIconButton aria-label={t('footer.twitter')} component="a" href="#">
                <TwitterIcon />
              </SocialIconButton>
              <SocialIconButton aria-label={t('footer.instagram')} component="a" href="#">
                <InstagramIcon />
              </SocialIconButton>
              <SocialIconButton aria-label={t('footer.linkedin')} component="a" href="#">
                <LinkedInIcon />
              </SocialIconButton>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          {footerLinks.map((section, index) => (
            <Grid item xs={6} md={2} key={section.title}>
              <Typography 
                variant="h6" 
                gutterBottom 
                fontWeight="bold"
                sx={{
                  fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                  textAlign: isRTL ? 'right' : 'left',
                }}
              >
                {section.title}
              </Typography>
              <Box 
                component="nav"
                sx={{
                  textAlign: isRTL ? 'right' : 'left',
                }}
              >
                {section.links.map((link) => (
                  <GradientLink
                    key={link.name}
                    href={link.url}
                    display="block"
                    sx={{ 
                      my: 1,
                      textAlign: isRTL ? 'right' : 'left',
                    }}
                  >
                    {link.name}
                  </GradientLink>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Contact Information Section */}
          <Grid item xs={6} md={2}>
            <Typography 
              variant="h6" 
              gutterBottom 
              fontWeight="bold"
              sx={{
                fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {t('footer.contact')}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                textAlign: isRTL ? 'right' : 'left',
                lineHeight: 1.6,
              }}
            >
              {t('footer.address')}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mt: 1,
                fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {t('footer.email')}: info@yourbrand.com
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {t('footer.phone')}: +31 123 456 7890
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright Section with Divider */}
        <Divider sx={{ my: 4 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit",
            }}
          >
            {t('footer.copyright', {
              year: new Date().getFullYear(),
              brandName: t('footer.brandName', 'MyRealEstate')
            })}
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
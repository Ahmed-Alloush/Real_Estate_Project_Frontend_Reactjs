// // src/components/LanguageSwitcher.js
// import React from 'react';
// import { useTranslation } from 'react-i18next';

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     // Update document direction for Arabic
//     document.dir = lng === 'ar' ? 'rtl' : 'ltr';
//     document.documentElement.lang = lng;
//   };

//   return (
//     <div className="language-switcher">
//       <button 
//         onClick={() => changeLanguage('en')}
//         className={i18n.language === 'en' ? 'active' : ''}
//       >
//         English
//       </button>
//       <button 
//         onClick={() => changeLanguage('ar')}
//         className={i18n.language === 'ar' ? 'active' : ''}
//       >
//         العربية
//       </button>
//     </div>
//   );
// };

// export default LanguageSwitcher;


import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import {
  Language as LanguageIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';

const LanguageSwitcher = ({ variant = 'button' }) => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
    
    // Update document direction and language
    document.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    document.body.className = lng === 'ar' ? 'rtl' : 'ltr';
  };

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  if (variant === 'icon') {
    return (
      <>
        <IconButton
          onClick={handleClick}
          color="inherit"
          size="small"
          sx={{ ml: 1 }}
          aria-controls={open ? 'language-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'language-button',
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {languages.map((language) => (
            <MenuItem 
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              selected={i18n.language === language.code}
              sx={{ minWidth: 120 }}
            >
              <Typography variant="body2">
                {language.nativeName}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  return (
    <>
      <Button
        id="language-button"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        endIcon={<ArrowDownIcon />}
        variant="outlined"
        size="small"
        sx={{ 
          minWidth: 100,
          textTransform: 'none',
        }}
      >
        {currentLanguage.nativeName}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {languages.map((language) => (
          <MenuItem 
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            selected={i18n.language === language.code}
            sx={{ minWidth: 150 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" fontWeight="medium">
                {language.nativeName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {language.name}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
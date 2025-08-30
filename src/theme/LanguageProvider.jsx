import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { arEG, enUS } from '@mui/material/locale';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import i18n from '../i18n';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import axios from '../api/axios';

const LanguageContext = createContext(null);
export const useLanguage = () => useContext(LanguageContext);

function createEmotionCache(direction) {
  return createCache({
    key: direction === 'rtl' ? 'mui-rtl' : 'mui',
    stylisPlugins: direction === 'rtl' ? [prefixer, rtlPlugin] : [prefixer]
  });
}

export function LanguageProvider({ children }) {
  const detected = i18n.resolvedLanguage || i18n.language || 'en';
  const [lang, setLang] = useState(detected);

  const direction = lang === 'ar' ? 'rtl' : 'ltr';
  const muiLocale = lang === 'ar' ? arEG : enUS;
  const cache = useMemo(() => createEmotionCache(direction), [direction]);

  const theme = useMemo(() =>
    createTheme(
      {
        direction,
        typography: {
          fontFamily: lang === 'ar'
            ? 'Tajawal, Roboto, Arial, sans-serif'
            : 'Inter, Roboto, Arial, sans-serif'
        }
      },
      muiLocale
    ), [direction, muiLocale, lang]);

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', direction);
    dayjs.locale(lang === 'ar' ? 'ar' : 'en');
    axios.defaults.headers.common['Accept-Language'] = lang;
    localStorage.setItem('app.lang', lang);
  }, [lang, direction]);

  useEffect(() => {
    const saved = localStorage.getItem('app.lang');
    if (saved && saved !== lang) setLang(saved);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </LanguageContext.Provider>
  );
}


export const createAppTheme = (lang) =>
  createTheme({
    direction: lang === "ar" ? "rtl" : "ltr",
    typography: { fontFamily: lang === "ar" ? "Tajawal, sans-serif" : "Roboto" },
  });



// MUI + Emotion RTL cache
export const createRtlCache = () =>
  createCache({
    key: "mui-rtl",
    stylisPlugins: [rtlPlugin],
  });


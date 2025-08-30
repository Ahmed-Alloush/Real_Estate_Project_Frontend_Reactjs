// // import i18n from 'i18next';
// // import { initReactI18next } from 'react-i18next';
// // import LanguageDetector from 'i18next-browser-languagedetector';
// // import HttpBackend from 'i18next-http-backend';

// // i18n
// //   .use(HttpBackend)
// //   .use(LanguageDetector)
// //   .use(initReactI18next)
// //   .init({
// //     fallbackLng: 'en',
// //     supportedLngs: ['en', 'ar'],
// //     ns: ['common'],
// //     defaultNS: 'common',
// //     interpolation: { escapeValue: false },
// //     detection: {
// //       order: ['querystring', 'cookie', 'localStorage', 'navigator'],
// //       caches: ['localStorage', 'cookie']
// //     },
// //     backend: {
// //       loadPath: '/locales/{{lng}}/{{ns}}.json'
// //     }
// //   });

// // export default i18n;


// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import HttpApi from 'i18next-http-backend';

// i18n
//   .use(HttpApi)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',
//     debug: process.env.NODE_ENV === 'development',
    
//     interpolation: {
//       escapeValue: false,
//     },
    
//     backend: {
//       loadPath: '/locales/{{lng}}/{{ns}}.json',
//     },
    
//     detection: {
//       order: ['localStorage', 'navigator', 'htmlTag'],
//       caches: ['localStorage'],
//     },
    
//     react: {
//       useSuspense: false,
//     }
//   });

// export default i18n;




import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import {translation as translationAR} from './locales/ar/translation';
import {translation as translationEN} from './locales/en/translation';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false,
    },

    // Resources for immediate loading (prevents loading delay)
    resources: {
      en: {
        translation: translationEN
      },
      ar: {
        translation:translationAR

      }
    }
  });

export default i18n;
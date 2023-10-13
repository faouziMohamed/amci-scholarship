import { extendTheme } from '@chakra-ui/react';

import {
  fontsVariables,
  mavenPro,
  notoSans,
  roboto,
  ropaSans,
} from '@/styles/fonts';

const breakpoints = {
  xs: '20rem', // 320px
  xxs: '23.375rem', // 375px
  sm: '30rem', // 480px
  xsm: '30.313rem', // 485px
  // "529px": '33.063rem', // 529px
  sidebar: '34.25rem', // 548px
  md: '48rem', // 768px
  xmd: '52rem', // 832px
  // xmd: '53.563rem', // 847px
  lg: '62rem', // 992px
  xlg: '68.75rem', // 1104px
  xl: '80rem', // 1280px
  '2xl': '96rem', // 1536px
};

const colors = {
  primary: {
    main: '#005A87',
    light: '#0077B5',
    dark: '#03283a',
    semiDark: 'rgba(35,77,98,0.31)',
    500: '#034667',
    400: '#0077B5',
    300: '#0096E0',
    200: '#00B5FF',
    100: '#B3E5FC',
    50: '#E1F5FE',
  },
  secondary: {
    main: '#017401',
    light: '#019B03',
    dark: '#014C00',
    500: '#017401',
    400: '#019B03',
    300: '#01C305',
    200: '#01E906',
    100: '#B3F9C4',
    50: '#E1FCEA',
  },
  danger: {
    main: '#f50055',
    light: '#ff4081',
    dark: '#720025',
    500: '#8d0751',
    400: '#a80039',
    300: '#d5006b',
    200: '#fc1e97',
    100: '#ffc4e0',
    50: '#ffeef0',
  },
};

const styles = {
  global: {
    'body,h1,h2,h3,h4,p': {
      fontFamily: `var(--font-primary, var(--font-secondary)) !important`,
    },
  },
};

const theme = {
  breakpoints,
  colors,
  styles,
  fonts: {
    ropaSans,
    roboto,
    notoSans,
    mavenPro,
    variables: fontsVariables,
  },
};

export const extendedTheme = extendTheme(theme);
export default theme;

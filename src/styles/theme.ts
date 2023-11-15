import { extendTheme } from '@chakra-ui/react';

import {
  fontsVariables,
  mavenPro,
  notoSans,
  roboto,
  ropaSans,
} from '@/styles/fonts';
import { appCcolors, breakpoints } from '@/styles/theme-config';

const styles = {
  global: {
    'body,h1,h2,h3,h4,p': {
      fontFamily: `var(--font-primary, var(--font-secondary)) !important`,
    },
  },
};

const theme = {
  breakpoints,
  colors: appCcolors,
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

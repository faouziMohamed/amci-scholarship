import { Maven_Pro, Noto_Sans, Roboto, Ropa_Sans } from 'next/font/google';

export const ropaSans = Ropa_Sans({
  weight: '400',
  variable: '--font-quaternary',
  subsets: ['latin'],
});
export const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-secondary',
  subsets: ['latin'],
});
export const notoSans = Noto_Sans({
  weight: ['400', '500', '700'],
  variable: '--font-tertiary',
  subsets: ['latin'],
});
export const mavenPro = Maven_Pro({
  weight: ['400', '500', '700'],
  variable: '--font-primary',
  subsets: ['latin'],
});

export const fontsVariables = [
  ropaSans.variable,
  notoSans.variable,
  roboto.variable,
  mavenPro.variable,
];

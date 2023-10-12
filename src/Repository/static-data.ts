import { IconType } from 'react-icons';
import { FaFacebookF } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { TfiYoutube } from 'react-icons/tfi';

import { SIGN_IN_PAGE, SIGNUP_PAGE } from '@/lib/client-route';

export type FooterLinkData = {
  name: string;
  url: string;
};

export type FooterLinks = Record<string, FooterLinkData[]>;
export const footerLinks: FooterLinks = {
  membres: [
    { name: 'Connexion', url: SIGN_IN_PAGE },
    { name: 'Activation du compte', url: SIGNUP_PAGE },
  ],

  annexe: [
    { name: 'ACEM Tech', url: 'https://acemtech.org/' },
    { name: 'ACEM FaQ', url: 'https://acem-officiel.com/pages/AcemfaQ.php' },
  ],

  viesEstudiantines: [
    {
      name: 'Enseignement supérieur',
      url: 'https://acem-officiel.com/assets/docs/pdfs/Enseignement_superieur.pdf',
    },
    {
      name: 'ENSA',
      url: 'https://acem-officiel.com/pages/LesEnsa.php',
    },
    {
      name: 'Bourse AMCI',
      url: 'https://acem-officiel.com/pages/amci.php',
    },
    {
      name: 'Assurance AMCI',
      url: 'https://acem-officiel.com/pages/assurance.php',
    },
  ],
};
export type ACEMSocialData = {
  link: string;
  Icon: IconType;
};
export const acemSocials = {
  facebook: {
    link: 'https://www.facebook.com/acemmaroc',
    Icon: FaFacebookF,
    handle: '@acemmaroc',
  },
  youtube: {
    link: 'https://www.youtube.com/@acemaroc',
    Icon: TfiYoutube,
    handle: '@acemaroc',
  },
  instagram: {
    link: 'https://www.instagram.com/acem_officiel',
    Icon: RiInstagramFill,
    handle: '@acem_officiel',
  },
} as const;

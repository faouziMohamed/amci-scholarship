import { IconType } from 'react-icons';
import { FaFacebookF } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { TfiYoutube } from 'react-icons/tfi';

export type FooterLinkData = {
  name: string;
  url: string;
};

export type FooterLinks = Record<string, FooterLinkData[]>;
export const footerLinks: FooterLinks = {
  annexe: [
    { name: 'ACEM Tech', url: 'http://acemtech.org/' },
    { name: 'ACEM FaQ', url: 'http://acem-officiel.com/pages/AcemfaQ.php' },
  ],

  viesEstudiantines: [
    {
      name: 'Enseignement supérieur',
      url: 'http://acem-officiel.com/assets/docs/pdfs/Enseignement_superieur.pdf',
    },
    {
      name: 'ENSA',
      url: 'http://acem-officiel.com/pages/LesEnsa.php',
    },
    {
      name: 'Bourse AMCI',
      url: 'http://acem-officiel.com/pages/amci.php',
    },
    {
      name: 'Assurance AMCI',
      url: 'http://acem-officiel.com/pages/assurance.php',
    },
  ],
  bibliotheque: [
    {
      name: 'Article',
      url: 'http://acem-officiel.com/pages/article.php',
    },
    {
      name: 'Documents',
      url: 'http://acem-officiel.com/pages/document.php',
    },
  ],
};
export type ACEMSocialData = {
  link: string;
  Icon: IconType;
};
export const acemSocials: Record<string, ACEMSocialData> = {
  facebook: { link: 'https://www.facebook.com/acemmaroc', Icon: FaFacebookF },
  youtube: { link: 'https://www.youtube.com/@acemaroc', Icon: TfiYoutube },
  instagram: {
    link: 'https://www.instagram.com/acem_officiel',
    Icon: RiInstagramFill,
  },
};

import { Metadata } from 'next';

import { SITE_URL } from '@/lib/client-route';

export const seoTemplate = {
  title: 'Code du bourse AMCI | Association des Comoriens Étudiant au Maroc',
  description:
    "Récuperer le code du bourse de l'AMCI avec une interface simple, facile, rapide et moderne",
  siteName: 'Code du bourse AMCI',
  url: SITE_URL,
  image: `${SITE_URL}/logo/acem-modern-logo.png`,
  imageWidth: '512',
  imageHeight: '512',
  imageAlt: 'https://acem-officiel.com/assets/images/acem-logo.png',
  imageAltWidth: '717',
  imageAltHeight: '717',
  imageAltAlt: 'Logo from official website of the ACEM',
  type: 'website',
  robots: 'index, follow',
  keywords: [
    'bourse',
    'scholarship',
    'amci',
    'acem',
    'code',
    'association',
    'comoriens',
    'étudiant',
    'maroc',
  ].join(', '),
};

export const metadata: Metadata = {
  title: 'Bourse AMCI | Association des Comoriens Étudiant au Maroc',
  applicationName: seoTemplate.siteName,
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Faouzi Mohamed' }],
  metadataBase: new URL(SITE_URL),
  colorScheme: 'light',
  themeColor: '#005A87',
  description: 'Bourse AMCI | Association des Comoriens Étudiant au Maroc',
  keywords: seoTemplate.keywords,
  category: 'Education',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  manifest: `${SITE_URL}/site.webmanifest`,
  openGraph: {
    url: SITE_URL,
    title: seoTemplate.title,
    type: 'website',
    description: seoTemplate.description,
    siteName: seoTemplate.siteName,
    locale: 'fr_FR',
  },
  twitter: {
    // other metadata will be automatically be taken from openGraph's metadata
    creator: '@fz_faouzi',
  },
  alternates: { canonical: '/' },
  other: {
    copyright: `A.C.E.M © ${new Date().getFullYear()}`,
  },
};

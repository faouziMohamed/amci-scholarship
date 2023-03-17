import { SITE_URL } from '@/lib/client-route';

const seoTemplate = {
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
export default function App() {
  return (
    <head>
      <title>Bourse AMCI | Association des Comoriens Étudiant au Maroc</title>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='description' content={seoTemplate.description} />
      <meta name='keywords' content={seoTemplate.keywords} />
      <meta name='author' content='Faouzi Mohamed' />
      <meta name='language' content='fr' />
      <meta name='distribution' content='global' />
      <meta name='robots' content={seoTemplate.robots} />

      <meta property='og:url' content={seoTemplate.url} />
      <meta property='og:type' content='website' />
      <meta property='og:Name' content={seoTemplate.title} />
      <meta property='og:site_name' content={seoTemplate.siteName} />
      <meta property='og:description' content={seoTemplate.description} />
      <meta property='og:image' content={seoTemplate.image} name='image' />
      <meta property='og:image:width' content={seoTemplate.imageWidth} />
      <meta property='og:image:height' content={seoTemplate.imageHeight} />
      <meta property='og:image:alt' content={seoTemplate.imageAlt} />
      <meta property='og:image:alt:width' content={seoTemplate.imageAltWidth} />
      <meta name='og:image:alt:height' content={seoTemplate.imageAltHeight} />
      <meta property='og:image:alt' content={seoTemplate.imageAltAlt} />
      <meta
        property='og:image:alt:height'
        content={seoTemplate.imageAltHeight}
      />
      <meta property='og:locale' content='fr_FR' />

      <meta name='twitter:Name' content={seoTemplate.title} />
      <meta name='twitter:description' content={seoTemplate.description} />
      <meta name='twitter:image' content={seoTemplate.image} />
      <meta name='twitter:card' content='summary_large_image' />

      <meta name='twitter:creator' content='@fz_faouzi' />

      <link rel='canonical' href={seoTemplate.url} />

      <meta
        name='copyright'
        content={`A.C.E.M © Copyrights 2021${new Date().getFullYear()}`}
      />
      <meta name='author' property='og:author' content='Faouzi Mohamed' />
      <meta name='classification' content='website' />

      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-touch-fullscreen' content='yes' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicons/apple-touch-icon.png?v=1.0'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicons/favicon-32x32.png?v=1.0'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='192x192'
        href='/favicons/android-chrome-192x192.png?v=1.0'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicons/favicon-16x16.png?v=1.0'
      />
      <link rel='manifest' href='/favicons/site.webmanifest?v=1.0' />
      <link
        rel='mask-icon'
        href='/favicons/safari-pinned-tab.svg?v=1.0'
        color='#5bd5b9'
      />
      <link rel='shortcut icon' href='/favicons/favicon.ico?v=1.0' />
      <meta name='msapplication-TileColor' content='#008987' />
      <meta
        name='msapplication-TileImage'
        content='/favicons/mstile-144x144.png?v=1.0'
      />
      <meta
        name='msapplication-config'
        content='/favicons/browserconfig.xml?v=1.0'
      />
      <meta name='theme-color' content='#9fe0c8' />
    </head>
  );
}

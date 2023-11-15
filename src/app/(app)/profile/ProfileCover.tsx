import { chakra } from '@chakra-ui/react';
import Image from 'next/image';

import cover from '~/images/cover_4.jpg';

const NextImage = chakra(Image, {
  shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt'].includes(prop),
});

export function ProfileCover({ alt }: { alt: string }) {
  return (
    <NextImage
      zIndex={-1}
      position='absolute'
      inset={0}
      filter='saturate(0.5) contrast(1.2) brightness(0.7)'
      src={cover}
      alt={alt}
      w='100%'
      h='100%'
      rounded='2xl'
      objectFit='cover'
      objectPosition='center'
      color='white'
      bgColor='primary.dark'
    />
  );
}

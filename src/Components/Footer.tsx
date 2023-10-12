'use client';

import { Box, Flex, SimpleGrid, Stack } from '@chakra-ui/react';

import {
  AddressLocation,
  EmailLink,
  FooterLink,
  FooterTitle,
  SocialLink,
} from '@/Components/FooterUtils';
import { acemSocials, footerLinks } from '@/Repository/static-data';

export default function Footer() {
  return (
    <Flex
      bg='primary.dark'
      display='flex'
      py='2rem'
      px='1rem'
      color='whiteAlpha.700'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Box as='section' w='100%' maxW='75rem'>
        <SimpleGrid
          w='100%'
          minChildWidth='16rem'
          spacingY='2rem'
          spacingX={{ base: '1rem', xlg: '0' }}
        >
          {Object.entries(footerLinks).map(([label, links]) => (
            <Stack key={label}>
              <FooterTitle title={label} />
              <Stack alignItems='flex-start' pl='2rem'>
                {links.map((link) => (
                  <FooterLink key={link.url} link={link} />
                ))}
              </Stack>
            </Stack>
          ))}
          <Stack
            gridColumn={{ xmd: '1/-1', xlg: '4/5' }}
            alignItems='center'
            w='100%'
          >
            <Box>
              <FooterTitle title='Contact' />
              <Stack alignItems='flex-start' pl='2rem' gap='0.5rem'>
                <AddressLocation />
                <EmailLink />
                <Flex alignItems='center' gap='1rem' pt='0.3rem'>
                  {Object.entries(acemSocials).map(([title, social]) => (
                    <SocialLink
                      key={social.link}
                      social={social}
                      socialName={title}
                    />
                  ))}
                </Flex>
              </Stack>
            </Box>
          </Stack>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

import { Avatar, Heading, Stack, Text } from '@chakra-ui/react';

import { capitalizeEachWord } from '@/lib/utils';

type Props = {
  src?: string;
  name: string;
  role: string;
};

export function ProfileUserAvatarWithDetailsOnCover(props: Props) {
  const { name, role, src } = props;
  return (
    <Stack h='100%' w='100%' alignItems='center' justifyContent='center'>
      <Avatar size='lg' src={src} name={name} border='2px solid #eee' />
      <Stack w='100%' spacing={1} alignItems='center'>
        <Heading
          color='#fff'
          as='h1'
          fontSize='1.2rem'
          fontWeight={600}
          py={0}
          px='0.3rem'
          m={0}
          textAlign='center'
        >
          {capitalizeEachWord(name)}
        </Heading>
        <Text fontSize='0.8rem' fontWeight={500} color='gray.100'>
          {role}
        </Text>
      </Stack>
    </Stack>
  );
}

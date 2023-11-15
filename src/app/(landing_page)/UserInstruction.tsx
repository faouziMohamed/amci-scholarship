import { Text } from '@chakra-ui/react';

export function UserInstruction() {
  return (
    <Text
      fontWeight={600}
      as='h3'
      fontSize='1.1rem'
      textAlign='center'
      display='inline-block'
      pb='0.3rem'
      bgImage={
        'linear-gradient(transparent, transparent), ' +
        'linear-gradient(to right, #016f54, #01c4a4)'
      }
      _hover={{
        bgImage:
          'linear-gradient(transparent, transparent),' +
          'linear-gradient(to right, #2652d7, #e10909,#a1e8c7, #038c03, #fae011 85%)',
      }}
      bgSize='0 0px,100% 4px'
      bgPosition='0 0, 0 100%'
      bgRepeat='no-repeat'
      transition={{
        bgSize: '0.3s ease-in-out',
        transitionProperty: 'background-size, color, border-color',
      }}
    >
      Veuillez saisir votre nom complet ou votre Numéro de matricule
    </Text>
  );
}

/* eslint-disable react/jsx-props-no-spreading */
import { Text, VStack } from '@chakra-ui/react';
import { DropzoneInputProps, DropzoneState } from 'react-dropzone';

export function DragAndDropZone({
  isDragActive,
  inputProps,
  rootProps,
  isSubmitting,
}: {
  rootProps: DropzoneState['getRootProps'];
  inputProps: DropzoneInputProps;
  isDragActive: boolean;
  isSubmitting?: boolean;
}) {
  return (
    <VStack
      justifyContent='center'
      minH='15rem'
      border='1px dashed'
      borderColor={isSubmitting ? '#ddd' : '#222'}
      rounded='md'
      p='0.5rem'
      w='100%'
      cursor={isSubmitting ? 'not-allowed' : 'pointer'}
      {...rootProps}
      bgColor={isDragActive ? 'gray.100' : 'gray.50'}
      _hover={isSubmitting ? {} : { bgColor: 'gray.100' }}
    >
      <input {...inputProps} disabled={isSubmitting} />
      {isDragActive ? (
        <Text fontWeight={500} fontSize='1rem'>
          Déposez le fichier ici...
        </Text>
      ) : (
        <>
          <Text
            fontWeight={500}
            fontSize='1rem'
            color={isSubmitting ? 'gray.500' : 'initial'}
          >
            Glissez et déposez le fichier ici, ou cliquez pour sélectionner un
            fichier
          </Text>
          <Text fontSize='0.9rem' color='gray.500'>
            (Seul un fichier *.csv sera accepté)
          </Text>
        </>
      )}
    </VStack>
  );
}

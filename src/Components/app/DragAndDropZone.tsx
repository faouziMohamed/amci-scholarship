/* eslint-disable react/jsx-props-no-spreading */
import { Text, VStack } from '@chakra-ui/react';
import { DropzoneInputProps, DropzoneState } from 'react-dropzone';

export function DragAndDropZone({
  isDragActive,
  inputProps,
  rootProps,
}: {
  rootProps: DropzoneState['getRootProps'];
  inputProps: DropzoneInputProps;
  isDragActive: boolean;
}) {
  return (
    <VStack
      justifyContent='center'
      minH='15rem'
      border='1px dashed #222'
      rounded='md'
      p='0.5rem'
      w='100%'
      cursor='pointer'
      {...rootProps}
    >
      <input {...inputProps} />
      {isDragActive ? (
        <Text>Déposez le fichier ici...</Text>
      ) : (
        <>
          <Text fontWeight={500} fontSize='1rem'>
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

import { Box, FormErrorMessage, Text, TextProps } from '@chakra-ui/react';

export type CustomErrorMessageProps = {
  heading: string;
  rules?: string[];
  as?: TextProps['as'];
};
export default function CustomFormControlErrorMessage({
  heading,
  rules,
  as = 'h3',
}: CustomErrorMessageProps) {
  return (
    <FormErrorMessage flexDirection='column' pb='1rem' alignItems='flex-start'>
      <Text fontWeight={600} as={as} fontSize='xs'>
        {heading}
      </Text>
      {!!rules && (
        <Box as='ul' listStyleType='disc' ml={4}>
          {rules.map((item) => (
            <Text key={item} as='li'>
              {item}
            </Text>
          ))}
        </Box>
      )}
    </FormErrorMessage>
  );
}

import { Stack, StackProps } from '@chakra-ui/react';

export default function Loader(
  props: StackProps & { overlayBgColor?: string },
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Stack {...props}>Loading...</Stack>;
}

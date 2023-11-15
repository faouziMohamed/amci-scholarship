import { SystemStyleObject } from '@chakra-ui/styled-system';

import { adjustColor } from '@/lib/utils';

import theme from '@/styles/theme';

export const oddRowsBg: SystemStyleObject = {
  bg: `${adjustColor(theme.colors.primary.main, 70, 20)} !important`,
  _hover: {
    bg: `${adjustColor(theme.colors.primary.main, 70, 30)} !important`,
  },
};
export const evenRowsBg: SystemStyleObject = {
  bg: 'whiteAlpha.700 !important',
  _hover: {
    bg: `${adjustColor(theme.colors.secondary.main, 80, 20)} !important`,
  },
};

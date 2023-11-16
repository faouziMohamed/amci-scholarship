import { Icon, IconProps } from '@chakra-ui/react';

import AcemLogo from '~/logo/acem-logo.svg';

// export const CkAcemLogo = chakra(AcemLogo);

export function CkAcemLogo(props: IconProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Icon {...props} as={AcemLogo} />;
}

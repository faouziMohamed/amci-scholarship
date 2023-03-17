/* eslint-disable react/jsx-props-no-spreading */

import { chakra } from '@chakra-ui/react';
import { forwardRef } from 'react';

import UnStyledLink, {
  UnStyledLinkProps,
} from '@/Components/Links/UnStyledLink';

const LinkUnderlined = forwardRef<HTMLAnchorElement, UnStyledLinkProps>(
  ({ children, className = '', ...rest }, ref) => {
    return (
      <UnStyledLink
        ref={ref}
        className={`underlined-link animated-underline ${className}`}
        outline='none'
        fontWeight='600'
        borderBlockEnd='1px dotted'
        display='inline-flex'
        px='2px'
        fontSize='initial'
        alignItems='center'
        color='primary.400'
        bgImage={
          'linear-gradient(transparent, transparent), ' +
          'linear-gradient(to right, #016f54, #01c4a4)'
        }
        bgSize='100% 2px, 0 2px'
        bgPosition='115% 115%, 0 115%'
        bgRepeat='no-repeat'
        _hover={{
          color: 'primary.500',
          borderColor: '#000',
          bgSize: '0 2px, 100% 4px',
        }}
        _focusVisible={{ bgSize: '0 2px, 100% 4px' }}
        _active={{
          bgImage:
            'linear-gradient(transparent, transparent), ' +
            'linear-gradient(to right, #01c4a4, #016f54)',
        }}
        transition={{
          bgSize: '0.3s ease-in-out',
          transitionProperty: 'background-size, color, border-color',
        }}
        {...rest}
      >
        {children}
      </UnStyledLink>
    );
  },
);

LinkUnderlined.displayName = 'LinkUnderlined';

const UnderlineLink = chakra(LinkUnderlined);
export default UnderlineLink;

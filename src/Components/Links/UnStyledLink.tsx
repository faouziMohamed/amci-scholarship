/* eslint-disable react/jsx-props-no-spreading */
import { chakra } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';
import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';

import { SITE_URL } from '@/lib/client-route';

export type UnStyledLinkProps = {
  href: string;
  children: ReactNode;
  openNewTab?: boolean;
  className?: string;
  nextLinkProps?: Omit<LinkProps, 'href'>;
} & ComponentPropsWithRef<'a'>;

const NextLink = forwardRef<HTMLAnchorElement, UnStyledLinkProps>(
  (
    { children, href, openNewTab, className, nextLinkProps, ...others },
    ref,
  ) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href &&
          !href.startsWith('/') &&
          !href.startsWith('#') &&
          !href.includes(SITE_URL);

    if (!isNewTab) {
      return (
        <Link
          href={href}
          {...nextLinkProps}
          ref={ref}
          {...others}
          className={className}
        >
          {children}
        </Link>
      );
    }

    return (
      <chakra.a
        ref={ref}
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        {...others}
        className={className}
      >
        {children}
      </chakra.a>
    );
  },
);

NextLink.displayName = 'NextLink';
const UnStyledLink = chakra(NextLink, {
  shouldForwardProp(prop: string): boolean {
    return [
      'href',
      'children',
      'openNewTab',
      'className',
      'nextLinkProps',
    ].includes(prop);
  },
});

UnStyledLink.displayName = 'UnStyledLink';

export default UnStyledLink;

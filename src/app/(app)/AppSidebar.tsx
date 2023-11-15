'use client';

import { Link } from '@chakra-ui/next-js';
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  List,
  ListIcon,
  ListItem,
  Stack,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { HOME_PAGE, SIGN_IN_PAGE } from '@/lib/client-route';
import { capitalizeEachWord, log, ROLE_ID_OF } from '@/lib/utils';

import { navList } from '@/app/(app)/NavList.utils';
import { SideBarUserInfo } from '@/app/(app)/SideBarUserInfo';
import { CkAcemLogo } from '@/Components/CkAcemLogo';
import {
  useSidebarContext,
  useSidebarMediaQueryIsSmallScreen,
} from '@/Components/react-contexts/SidebarContextProvider';

import { userRoleValue } from '@/types/app.types';

export default function AppSidebar() {
  const { setOpened, opened } = useSidebarContext();

  const { data: session } = useSession();
  const { user } = session!;
  const isSmallScreen = useSidebarMediaQueryIsSmallScreen();
  const role = userRoleValue[user.role];

  if (isSmallScreen)
    return (
      <Drawer placement='left' isOpen={opened} onClose={() => setOpened(false)}>
        <DrawerOverlay />
        <DrawerContent bgColor='primary.main'>
          <DrawerCloseButton color='primary.50' />
          <DrawerBody px={0}>
            <SideBar
              fullName={capitalizeEachWord(user.name)}
              role={role}
              isSmallScreen={isSmallScreen}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );

  return (
    <SideBar
      fullName={capitalizeEachWord(user.name)}
      role={role}
      isSmallScreen={isSmallScreen}
    />
  );
}

function SideBar({
  fullName,
  role,
  isSmallScreen,
}: {
  fullName: string;
  role: string;
  isSmallScreen?: boolean;
}) {
  const { data: session } = useSession();
  const { setOpened } = useSidebarContext();
  const { user } = session!;
  const roleId = ROLE_ID_OF[user.role];
  // filter the navList based on the user role
  const sideBarList = navList.filter(({ minRole }) => roleId >= minRole);
  const pathname = usePathname();
  const activePage = sideBarList.find(({ href }) => pathname.startsWith(href));

  return (
    <Stack
      h='100%'
      bgColor='primary.main'
      color='#eee'
      px='1rem'
      py='2rem'
      width='100%'
      maxW={isSmallScreen ? 'none' : '15rem'}
      overflowY='auto'
    >
      <Stack spacing={5}>
        <Link href={HOME_PAGE}>
          <CkAcemLogo w='3rem' />
        </Link>
        <SideBarUserInfo name={fullName} role={role} />
        <Divider opacity={0.4} />
        <List w='100%'>
          {sideBarList.map(({ id, name, icon, href }, index) => (
            <ListItem px={0} py='0.2rem' key={id}>
              <Link
                href={href}
                bgColor={
                  activePage?.id === id ? 'primary.semiDark' : 'transparent'
                }
                w='100%'
                px='0.6rem'
                py='0.6rem'
                rounded='md'
                display='block'
                fontSize='1.05rem'
                _hover={{
                  textDecoration: 'none',
                  bgColor: 'primary.semiDark',
                }}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async (e) => {
                  // the last element is the logout button, then do not act like a link at all
                  if (index === sideBarList.length - 1) {
                    e.preventDefault();
                    log('User sign out');
                    await signOut({
                      redirect: true,
                      callbackUrl: SIGN_IN_PAGE,
                    });
                    window.location.href = SIGN_IN_PAGE;
                  }
                  setOpened(false);
                }}
              >
                <ListIcon
                  as={icon}
                  color={activePage?.id === id ? 'primary.200' : 'primary.50'}
                  fontSize='1.2rem'
                />
                {name}
              </Link>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
}

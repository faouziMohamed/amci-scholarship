'use client';

import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Divider,
  List,
  ListIcon,
  ListItem,
  Stack,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { AiOutlineNumber } from 'react-icons/ai';
import { HiUsers } from 'react-icons/hi';
import { IoLogOut } from 'react-icons/io5';
import { MdManageAccounts, MdSpaceDashboard } from 'react-icons/md';

import { CkAcemLogo } from '@/Components/CkAcemLogo';

const navList: {
  name: string;
  icon: IconType;
  href: string;
  id: number;
}[] = [
  {
    id: 0,
    name: 'Tableau de bord',
    icon: MdSpaceDashboard,
    href: '/dashboard',
  },
  {
    id: 1,
    name: 'Codes de la bourse',
    icon: AiOutlineNumber,
    href: '/codes',
  },
  {
    id: 2,
    name: 'Utilisateurs',
    icon: HiUsers,
    href: '/codes',
  },
  {
    id: 3,
    name: 'Mon compte',
    icon: MdManageAccounts,
    href: '/codes',
  },
  {
    id: 4,
    name: 'Déconnexion',
    icon: IoLogOut,
    href: '/codes',
  },
];
export default function AppSidebar() {
  const firstName = 'Faouzi';
  const role = 'Administateur';
  const activePage = 1;
  return (
    <Stack
      h='100%'
      bgColor='primary.main'
      color='#eee'
      px='1rem'
      py='2rem'
      width='100%'
      maxW='15rem'
      overflowY='auto'
    >
      <Stack spacing={5}>
        <CkAcemLogo w='3rem' />
        <SideBarUserInfo name={firstName} role={role} />
        <Divider opacity={0.4} />
        <List w='100%'>
          {navList.map(({ id, name, icon, href }) => (
            <ListItem px={0} py='0.2rem' key={id}>
              <Link
                href={href}
                bgColor={activePage === id ? 'primary.semiDark' : 'transparent'}
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
              >
                <ListIcon
                  as={icon}
                  color={activePage === id ? 'primary.200' : 'primary.50'}
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

function SideBarUserInfo({ name, role }: { name: string; role: string }) {
  return (
    <Stack
      rounded='md'
      px='0.6rem'
      py='0.4rem'
      spacing={0}
      bgColor='primary.semiDark'
    >
      <Box as='h1' lineHeight='1.5rem' fontSize='1.2rem' fontWeight='600'>
        {name}
      </Box>
      <Box as='span' fontSize='0.8rem' fontWeight='500' color='whiteAlpha.700'>
        {role}
      </Box>
    </Stack>
  );
}

import { IconType } from 'react-icons';
import { AiOutlineNumber } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi';
import { IoLogOut } from 'react-icons/io5';
import { MdManageAccounts, MdSpaceDashboard } from 'react-icons/md';

import {
  CODES_PAGE,
  DASHBOARD_PAGE,
  PROFILE_PAGE,
  SETTINGS_PAGE,
  USERS_PAGE,
} from '@/lib/client-route';
import { ROLE_ID_OF } from '@/lib/utils';

export const navList: {
  name: string;
  icon: IconType;
  href: string;
  id: number;
  minRole: number;
  isLogout?: boolean;
}[] = [
  {
    id: 0,
    name: 'Tableau de bord',
    icon: MdSpaceDashboard,
    href: DASHBOARD_PAGE,
    minRole: ROLE_ID_OF.ADMIN,
  },
  {
    id: 0,
    name: 'Profile',
    icon: FaUser,
    href: PROFILE_PAGE,
    minRole: ROLE_ID_OF.USER,
  },
  {
    id: 1,
    name: 'Codes de la bourse',
    icon: AiOutlineNumber,
    href: CODES_PAGE,
    minRole: ROLE_ID_OF.ADMIN,
  },
  {
    id: 2,
    name: 'Utilisateurs',
    icon: HiUsers,
    href: USERS_PAGE,
    minRole: ROLE_ID_OF.ADMIN,
  },
  {
    id: 3,
    name: 'Mon compte',
    icon: MdManageAccounts,
    href: SETTINGS_PAGE,
    minRole: ROLE_ID_OF.USER,
  },
  {
    id: 4,
    name: 'Déconnexion',
    icon: IoLogOut,
    href: '/logout',
    isLogout: true,
    minRole: ROLE_ID_OF.USER,
  },
];

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

const genSequences = () => {
  let i = -1;
  return () => {
    // eslint-disable-next-line no-plusplus
    return ++i;
  };
};

export const genId = genSequences();
export const navList: {
  name: string;
  icon: IconType;
  href: string;
  id: number;
  minRole: number;
  isLogout?: boolean;
}[] = [
  {
    id: genId(),
    name: 'Tableau de bord',
    icon: MdSpaceDashboard,
    href: DASHBOARD_PAGE,
    minRole: ROLE_ID_OF.ADMIN,
  },
  {
    id: genId(),
    name: 'Profile',
    icon: FaUser,
    href: PROFILE_PAGE,
    minRole: ROLE_ID_OF.USER,
  },
  {
    id: genId(),
    name: 'Codes de la bourse',
    icon: AiOutlineNumber,
    href: CODES_PAGE,
    minRole: ROLE_ID_OF.ADMIN,
  },
  {
    id: genId(),
    name: 'Utilisateurs',
    icon: HiUsers,
    href: USERS_PAGE,
    minRole: ROLE_ID_OF.ADMIN,
  },
  {
    id: genId(),
    name: 'Mon compte',
    icon: MdManageAccounts,
    href: SETTINGS_PAGE,
    minRole: ROLE_ID_OF.USER,
  },
  {
    id: genId(),
    name: 'Déconnexion',
    icon: IoLogOut,
    href: '/logout',
    isLogout: true,
    minRole: ROLE_ID_OF.USER,
  },
];

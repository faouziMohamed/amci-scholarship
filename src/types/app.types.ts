import { FORM_AUTOCOMPLETE } from '@/lib/utils.constant';

export const scholarshipPeriods = {
  septembre: 'Septembre/Octobre',
  novembre: 'Novembre/Décembre',
  janvier: 'Janvier/Février',
  mars: 'Mars/Avril',
  mai: 'Mai/juin',
  juin: 'Juillet/Août',
} as const;

export type ScholarshipPeriod = keyof typeof scholarshipPeriods;
export type ScholarshipPeriodValue =
  (typeof scholarshipPeriods)[ScholarshipPeriod];

export type ScholarshipCode = {
  country: string;
  matricule: string;
  name: string;
  periodCode: string;
  scholarshipCode: string;
  period: ScholarshipPeriod;
};

export type ScholarshipCodeWithPassport = ScholarshipCode & {
  numPassport: string;
};

type ScholarshipCodeFromServer = {
  id: number;
  scholarshipCode: string;
  periodCode: string;
  period: ScholarshipPeriod;
  matricule: string;
  name: string;
  country: string;
  passport: string;
  createdAt: string;
};
export type PaginatedScholarshipCode = {
  timestamp?: string;
  codes: ScholarshipCodeFromServer[];
  totalCodes: number;
  totalPages: number;
  nextPage: number;
  pageSize: number;
  currentCount: number;
};

export type FetchedCodes = {
  codes: ScholarshipCodeFromServer[];
  totalCount: number;
  nextPage: number;
};
export type ViewMode = 'list' | 'grid';
export type ScholarshipCodeRow = [
  country: string,
  matricule: string,
  name: string,
  numPassport: string,
  periodCode: string,
  scholarchipCode: string,
  period: ScholarshipPeriod,
];

export type FormAutocomplete = (typeof FORM_AUTOCOMPLETE)[number];

export type ApiErrorResponse = {
  timestamp?: string;
  message: string;
  statusCode: number;
};

export type UserRole = 'ADMIN' | 'USER';
export const userRoleValue: Record<UserRole, string> = {
  ADMIN: 'Administrateur',
  USER: 'Membre',
} as const;

export type AppUser = {
  id: number;
  matricule: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: UserRole;
  isEmailVerified?: string;
  profession?: string | null;
  description?: string | null;
};
export type AppUserWithToken = AppUser & {
  token: string;
  tokenExpirationDate: string;
};
export type LoginResponse = {
  timestamp?: string;
  user: AppUser;
  jwtToken: string;
  tokenExpirationDate: string;
};

export type RegistrationBody = {
  email: string;
  password: string;
  passportNumber: string;
  matricule: string;
};

export type RegistrationResponse = {
  timestamp?: string;
  userId: number;
  email: string;
};

export type LoginBody = {
  email: string;
  password: string;
};
type AuthAction = 'SIGN_IN' | 'SIGN_UP';
export type AuthSignIn = LoginBody & { action: AuthAction };
export type AuthSignUp = RegistrationBody & { action: 'SIGN_UP' };
export type AppStats = {
  regularUsersCount: number;
  usersCount: number;
  adminsCount: number;
  matriculesCount: number;
  codesCount: number;
  usersWithCodesCount: number;
  usersWithoutCodesCount: number;
  importHistoryCount: number;
  importHistorySuccessCount: number;
  importHistoryFailedCount: number;
};

export type ImportStatus = 'SUCCESS' | 'FAILURE';
export type ImportHistory = {
  id: number;
  importDate: string;
  nbAdded: number;
  status: ImportStatus;
  importedBy: AppUser;
};
export type CodeImportStatus = {
  timestamp: string;
  message: string;
  statusCode: number;
  status:
    | 'STARTED'
    | 'IN_PROGRESS'
    | 'PROCESSING'
    | 'SAVING'
    | 'FINISHED'
    | 'FAILED'
    | 'NO_IMPORT_IN_PROGRESS';
};

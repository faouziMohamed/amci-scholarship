export type ScholarshipCode = {
  country: string;
  matricule: string;
  name: string;
  amciCountryCode: string;
  scholarshipCode: string;
  period: string;
};

export type ScholarshipCodeWithPassport = ScholarshipCode & {
  numPassport: string;
};
export const scholarshipPeriods = {
  septembre: 'Septembre/Octobre',
  novembre: 'Novembre/Décembre',
  janvier: 'Janvier/Février',
  mars: 'Mars/Avril',
  mai: 'Mai/Juin',
  Juin: 'Juillet/Août',
} as const;
export type ScholarshipPeriod = keyof typeof scholarshipPeriods;
export type ScholarshipPeriodValue =
  (typeof scholarshipPeriods)[ScholarshipPeriod];

export type FetchedCodes = {
  codes: ScholarshipCode[];
  totalCount: number;
  nextPage: number;
};
export type ViewMode = 'list' | 'grid';
export const VIEW_MODE_QUERY_NAME = 'view';
export const VIEW_MODE_STORAGE_KEY = 'viewMode';

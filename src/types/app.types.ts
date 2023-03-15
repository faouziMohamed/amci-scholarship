export type ScholarshipCode = {
  country: string;
  matricule: string;
  name: string;
  periodCode: string;
  scholarshipCode: string;
  period: string;
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

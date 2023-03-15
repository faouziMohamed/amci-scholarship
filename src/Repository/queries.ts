import { matriculeRegexp } from '@/lib/utils';

import prisma from './prisma';

import { ScholarshipCode } from '@/types/app.types';

export async function addCode(code: ScholarshipCode) {
  return prisma.code.create({ data: code });
}

export async function addMultipleCodes(codes: ScholarshipCode[]) {
  return prisma.code.createMany({ data: codes });
}

export function isNotAPossibleMatricule(q: string) {
  return q.at(0)?.match(/\d/) && (q.length > 8 || Number.isNaN(Number(q)));
}

function getQueryHelper(page: number) {
  return {
    skip: Number(page) * 10,
    take: 10,
    select: {
      matricule: true,
      name: true,
      scholarshipCode: true,
      periodCode: true,
    },
  };
}

function buildQuery(str: string) {
  const query = str.trim().toLowerCase();
  // - check if it's a matricule and look for it in the database (full text search)
  // and take the first 10 results
  // - if it's not a matricule, try to find it in the database in the name field
  // and take the first 10 results
  return Number.isNaN(Number(query))
    ? { name: { contains: query } }
    : { matricule: { startsWith: query } };
}

async function getOneCodeByMatricule(str: string) {
  return prisma.code.findFirst({ where: { matricule: str } });
}

export async function searchCodeByMatricule(str: string, page: number) {
  if (str.match(matriculeRegexp)) {
    const res = await getOneCodeByMatricule(str);
    if (res) {
      return { codes: [res], count: 1, nextPage: -1 };
    }
  }

  const whereClause = buildQuery(str);
  const searchHelper = getQueryHelper(page);
  const codes = await prisma.code.findMany({
    where: whereClause,
    orderBy: { name: 'asc' },
    ...searchHelper,
  });
  const count = await prisma.code.count({ where: whereClause });
  const nextPage = getNextPage(page, count);
  return { codes, count, nextPage };
}

function getNextPage(page: number, count: number) {
  return Number(page) * 10 + 10 < count ? Number(page) + 1 : -1;
}

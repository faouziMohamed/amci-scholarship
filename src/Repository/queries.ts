import { DEFAULT_PAGE_SIZE, getNextPage, matriculeRegexp } from '@/lib/utils';

import prisma from './prisma';

import { FetchedCodes, ScholarshipCode } from '@/types/app.types';

const SELECT_CODE_CLAUSE = {
  country: true,
  matricule: true,
  name: true,
  scholarshipCode: true,
  periodCode: true,
};

export async function addMultipleCodes(codes: ScholarshipCode[]) {
  return prisma.code.createMany({ data: codes });
}

function getQueryHelper(page: number) {
  return {
    skip: Number(page) * DEFAULT_PAGE_SIZE,
    take: DEFAULT_PAGE_SIZE,
    select: SELECT_CODE_CLAUSE,
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
  return prisma.code.findFirst({
    where: { matricule: str },
    select: SELECT_CODE_CLAUSE,
  });
}

export async function searchScholarshipCode(
  str: string,
  page: number,
): Promise<FetchedCodes> {
  if (str.match(matriculeRegexp)) {
    const res = (await getOneCodeByMatricule(str)) as ScholarshipCode;
    if (res) {
      return { codes: [res], totalCount: 1, nextPage: -1 };
    }
  }

  const whereClause = buildQuery(str);
  const searchHelper = getQueryHelper(page);
  const foundCodes = await prisma.code.findMany({
    where: whereClause,
    orderBy: { name: 'asc' },
    ...searchHelper,
  });
  if (!foundCodes.length) {
    return { codes: [], totalCount: 0, nextPage: -1 };
  }

  const count = await prisma.code.count({ where: whereClause });
  const codes = foundCodes as ScholarshipCode[];
  const nextPage = getNextPage(page, count);
  return { codes, totalCount: count, nextPage };
}

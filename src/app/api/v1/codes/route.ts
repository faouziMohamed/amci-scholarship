import { NextResponse } from 'next/server';

import { isNotAPossibleMatricule } from '@/lib/utils';
import {
  CODES_QUERY_PARAM_NAME,
  PAGE_NUMBER_QUERY_PARAM_NAME,
} from '@/lib/utils.constant';

import { searchScholarshipCode } from '@/Repository/queries';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get(CODES_QUERY_PARAM_NAME);
    const p = searchParams.get(PAGE_NUMBER_QUERY_PARAM_NAME);

    if (!q) {
      return NextResponse.json({ message: '🥸 No query provided' });
    }

    // return immediately if it's can't be a matricule
    if (isNotAPossibleMatricule(q)) {
      return NextResponse.json({ message: 'Invalid matricule' });
    }

    const page = Number.isNaN(p) ? 0 : Number(p);
    const result = await searchScholarshipCode(q, Number(page));
    return NextResponse.json(result);
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ message: error.message || 'Error' });
  }
}

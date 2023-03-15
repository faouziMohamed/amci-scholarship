import { NextResponse } from 'next/server';

import { CSV_FILE_PATH } from '@/lib/server-route';

import { importScholarshipCodes } from '@/Repository/utils.repository';

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET() {
  try {
    await importScholarshipCodes(CSV_FILE_PATH, 'mars');
    return NextResponse.json({ message: '🥸 Importation in progress...' });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ message: error.message || 'Error' });
  }
}

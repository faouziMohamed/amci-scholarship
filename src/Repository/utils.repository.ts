import { parse } from 'csv-parse';
import fs from 'fs';

import { csvToScholarshipCode } from '@/lib/utils';

import { addMultipleCodes } from '@/Repository/queries';

import {
  ScholarshipCodeRow,
  ScholarshipCodeWithPassport,
  ScholarshipPeriod,
} from '@/types/app.types';

const BATCH_SIZE = 200;

export async function importScholarshipCodes(
  filePath: string,
  period: ScholarshipPeriod,
) {
  if (!filePath) {
    throw new Error('No file path provided');
  }
  const fileRows: ScholarshipCodeWithPassport[] = [];
  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({ trim: true, delimiter: ',' }));
  try {
    // eslint-disable-next-line no-restricted-syntax
    for await (const row of parser) {
      const oneRow = row as unknown as ScholarshipCodeRow;
      const codeRow = csvToScholarshipCode(oneRow, period);
      fileRows.push(codeRow);
      if (hasReachedAmImportableBatchSize(fileRows.length)) {
        await importAndFlush(fileRows);
      }
    }
    if (fileRows.length) {
      await importAndFlush(fileRows);
    }
  } catch (e) {
    const error = e as Error;
    // eslint-disable-next-line no-console
    console.log('😿 >', error.message);
    throw Error('Data import failed');
  }
}

async function importAndFlush(fileRows: ScholarshipCodeWithPassport[]) {
  await addMultipleCodes(fileRows);
  fileRows.length = 0;
}

function hasReachedAmImportableBatchSize(newCount: number) {
  return newCount > 0 && newCount % BATCH_SIZE === 0;
}

import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import {
  isNotAPossibleMatricule,
  searchCodeByMatricule,
} from '@/Repository/queries';

const handler = nc();
interface NextApiRequestWithQuery extends NextApiRequest {
  query: {
    q: string;
    page?: string;
  };
}

handler.get(async (req: NextApiRequestWithQuery, res: NextApiResponse) => {
  const { q, page: p = 0 } = req.query;
  if (!q) {
    res.status(400).json({ message: '🥸 No query provided' });
    return;
  }
  // return immediately if it's can't be a matricule
  if (isNotAPossibleMatricule(q)) {
    res.status(200).json({ message: 'Invalid matricule' });
    return;
  }
  const page = Number.isNaN(p) ? 0 : Number(p);

  const result = await searchCodeByMatricule(q, Number(page));
  const { codes, count, nextPage } = result;
  res.status(200).json({ codes, nextPage, count });
});

export default handler;

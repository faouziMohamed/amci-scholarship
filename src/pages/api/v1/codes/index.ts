import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { apiMiddleware } from '@/lib/middleware';
import { isNotAPossibleMatricule } from '@/lib/utils';

import { searchScholarshipCode } from '@/Repository/queries';

import { FetchedCodes } from '@/types/app.types';

interface NextApiRequestWithQuery extends NextApiRequest {
  query: {
    q: string;
    page?: string;
  };
}

type ApiErrorMessage = {
  message: string;
};

const router = createRouter<
  NextApiRequestWithQuery,
  NextApiResponse<FetchedCodes | ApiErrorMessage>
>().use(apiMiddleware);

router.get(
  async (
    req: NextApiRequestWithQuery,
    res: NextApiResponse<FetchedCodes | ApiErrorMessage>,
  ) => {
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
    const result = await searchScholarshipCode(q, Number(page));
    res.status(200).json(result);
  },
);

export default router.handler();

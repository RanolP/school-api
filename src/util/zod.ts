import { z } from 'zod';

export const numberString = z.preprocess(
  (s) => Number(s),
  z.number().refine((x) => Number.isFinite(x)),
);

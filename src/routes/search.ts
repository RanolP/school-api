import { RouteHandler } from 'fastify';
import * as z from 'zod';
import { SchoolRegion, searchSchool } from '../lib/common.js';

const SearchQuery = z.object({
  region: z.nativeEnum(SchoolRegion),
  name: z.string().nonempty('학교 이름은 비어 있을 수 없습니다'),
});

export const SearchHandler: RouteHandler = async (req) => {
  const query = await SearchQuery.parseAsync(req.query);
  const schools = await searchSchool(query.region, query.name);
  return schools;
};

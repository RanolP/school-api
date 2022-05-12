import * as z from 'zod';
import { SchoolRegion, searchSchool } from '../lib/common';
import { route } from '../util/web';

const SearchQuery = z.object({
  region: z.nativeEnum(SchoolRegion),
  name: z.string().nonempty('학교 이름은 비어 있을 수 없습니다'),
});

export default route(async (req) => {
  const query = await SearchQuery.parseAsync(req.query);
  const schools = await searchSchool(query.region, query.name);
  return schools;
});

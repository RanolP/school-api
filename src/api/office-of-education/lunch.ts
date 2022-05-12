import * as z from 'zod';
import {
  mapSchoolRegion,
  mapSchoolType,
  SchoolRegion,
  SchoolType,
} from '../../lib/common';
import { getLunch } from '../../lib/office-of-education';
import { route } from '../../util/web';
import { numberString } from '../../util/zod';

const LunchQuery = z.object({
  id: z.string(),
  region: z.nativeEnum(SchoolRegion),
  type: z.nativeEnum(SchoolType),
  year: numberString.optional(),
  month: numberString.optional(),
});

export default route(async (req) => {
  const query = await LunchQuery.parseAsync(req.query);
  const timetable = await getLunch(
    mapSchoolType(query.type),
    mapSchoolRegion(query.region),
    query.id,
    query.year,
    query.month,
  );
  return timetable;
});

import { RouteHandler } from 'fastify';
import * as z from 'zod';
import { readTimetable } from '../../lib/comcigan.js';
import {
  mapSchoolRegion,
  mapSchoolType,
  SchoolRegion,
  SchoolType,
} from '../../lib/common.js';
import { getLunch } from '../../lib/office-of-education.js';
import { numberString } from '../../util/zod.js';

const LunchQuery = z.object({
  id: z.string(),
  region: z.nativeEnum(SchoolRegion),
  type: z.nativeEnum(SchoolType),
  year: numberString.optional(),
  month: numberString.optional(),
});

export const LunchHandler: RouteHandler = async (req) => {
  const query = await LunchQuery.parseAsync(req.query);
  const timetable = await getLunch(
    mapSchoolType(query.type),
    mapSchoolRegion(query.region),
    query.id,
    query.year,
    query.month,
  );
  return timetable;
};

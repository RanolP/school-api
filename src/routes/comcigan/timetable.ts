import { RouteHandler } from 'fastify';
import * as z from 'zod';
import { readTimetable } from '../../lib/comcigan.js';
import { numberString } from '../../util/zod.js';

const TimetableQuery = z.object({
  school: numberString,
});

export const TimetableHandler: RouteHandler = async (req) => {
  const query = await TimetableQuery.parseAsync(req.query);
  const timetable = await readTimetable(query.school);
  return timetable;
};

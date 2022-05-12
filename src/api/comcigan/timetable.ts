import * as z from 'zod';
import { readTimetable } from '../../lib/comcigan';
import { route } from '../../util/web';
import { numberString } from '../../util/zod';

const TimetableQuery = z.object({
  school: numberString,
});

export default route(async (req) => {
  const query = await TimetableQuery.parseAsync(req.query);
  const timetable = await readTimetable(query.school);
  return timetable;
});

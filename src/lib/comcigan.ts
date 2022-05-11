import Timetable, { School, TimetableData } from 'comcigan-parser';

const GlobalTimetable: Map<number | null, Promise<Timetable>> = new Map();

function getApi(schoolCode: number | null): Promise<Timetable> {
  const got = GlobalTimetable.get(schoolCode);
  if (got) {
    return got;
  } else {
    const newPromise = (async () => {
      const timetable = new Timetable();
      await timetable.init();
      if (schoolCode !== null) {
        await timetable.setSchool(schoolCode);
      }
      return timetable;
    })();
    GlobalTimetable.set(schoolCode, newPromise);
    return newPromise;
  }
}

export async function searchSchool(keyword: string): Promise<School[]> {
  const api = await getApi(null);
  const schools = await api.search(keyword);
  return schools;
}

export async function readTimetable(
  schoolCode: number,
): Promise<TimetableData> {
  const api = await getApi(schoolCode);
  return await api.getTimetable();
}

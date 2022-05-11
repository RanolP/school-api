import School, {
  IRegion,
  IType,
  MealRetuenType,
  SearchReturnType,
} from 'school-kr';

export const SchoolType = School.Type;
export type SchoolType = IType[keyof IType];

export const SchoolRegion = School.Region;
export type SchoolRegion = IRegion[keyof IRegion];

const GlobalSchool: Map<string, Promise<School>> = new Map();

function getApi(
  type: SchoolType,
  region: SchoolRegion,
  schoolCode: string,
): Promise<School> {
  const got = GlobalSchool.get(schoolCode);
  if (got) {
    return got;
  } else {
    const newPromise = (async () => {
      const school = new School();
      school.init(type, region, schoolCode);
      return school;
    })();
    GlobalSchool.set(schoolCode, newPromise);
    return newPromise;
  }
}

export async function searchSchool(
  region: SchoolRegion,
  name: string,
): Promise<SearchReturnType[]> {
  const result = await new School().search(region, name);
  return result;
}

export async function getLunch(
  type: SchoolType,
  region: SchoolRegion,
  schoolCode: string,
  year?: number,
  month?: number,
): Promise<MealRetuenType> {
  const api = await getApi(type, region, schoolCode);
  const result = await api.getMeal(year, month);
  return result;
}

import * as Comcigan from './comcigan';
import * as Ooe from './office-of-education';

export enum SchoolRegion {
  Seoul = '서울',
  Incheon = '인천',
  Busan = '부산',
  Gwangju = '광주',
  Daejeon = '대전',
  Daegu = '대구',
  Sejong = '세종',
  Ulsan = '울산',
  Gyeonggi = '경기',
  Kangwon = '강원',
  Chungbuk = '충북',
  Chungnam = '충남',
  Gyeongbuk = '경북',
  Gyeongnam = '경남',
  Jeonbuk = '전북',
  Jeonnam = '전남',
  Jeju = '제주',
}

export function mapSchoolRegion(region: SchoolRegion): Ooe.SchoolRegion {
  switch (region) {
    case SchoolRegion.Seoul:
      return Ooe.SchoolRegion.SEOUL;
    case SchoolRegion.Incheon:
      return Ooe.SchoolRegion.INCHEON;
    case SchoolRegion.Busan:
      return Ooe.SchoolRegion.BUSAN;
    case SchoolRegion.Gwangju:
      return Ooe.SchoolRegion.GWANGJU;
    case SchoolRegion.Daejeon:
      return Ooe.SchoolRegion.DAEJEON;
    case SchoolRegion.Daegu:
      return Ooe.SchoolRegion.DAEGU;
    case SchoolRegion.Sejong:
      return Ooe.SchoolRegion.SEJONG;
    case SchoolRegion.Ulsan:
      return Ooe.SchoolRegion.ULSAN;
    case SchoolRegion.Gyeonggi:
      return Ooe.SchoolRegion.GYEONGGI;
    case SchoolRegion.Kangwon:
      return Ooe.SchoolRegion.KANGWON;
    case SchoolRegion.Chungbuk:
      return Ooe.SchoolRegion.CHUNGBUK;
    case SchoolRegion.Chungnam:
      return Ooe.SchoolRegion.CHUNGNAM;
    case SchoolRegion.Gyeongbuk:
      return Ooe.SchoolRegion.GYEONGBUK;
    case SchoolRegion.Gyeongnam:
      return Ooe.SchoolRegion.GYEONGNAM;
    case SchoolRegion.Jeonbuk:
      return Ooe.SchoolRegion.JEONBUK;
    case SchoolRegion.Jeonnam:
      return Ooe.SchoolRegion.JEONNAM;
    case SchoolRegion.Jeju:
      return Ooe.SchoolRegion.JEJU;
  }
}

export enum SchoolType {
  Kindergarten = '유치원',
  Elementary = '초등학교',
  Middle = '중학교',
  High = '고등학교',
}

export function mapSchoolType(region: SchoolType): Ooe.SchoolType {
  switch (region) {
    case SchoolType.Kindergarten:
      return Ooe.SchoolType.KINDERGARTEN;
    case SchoolType.Elementary:
      return Ooe.SchoolType.ELEMENTARY;
    case SchoolType.Middle:
      return Ooe.SchoolType.MIDDLE;
    case SchoolType.High:
      return Ooe.SchoolType.HIGH;
  }
}

export interface School {
  name: string;
  comciganId: number;
  
  region: SchoolRegion;
  ooeId: string;
}

export async function searchSchool(
  region: SchoolRegion,
  name: string,
): Promise<School[]> {
  const [comcigan, ooe] = await Promise.all([
    Comcigan.searchSchool(name),
    Ooe.searchSchool(mapSchoolRegion(region), name),
  ]);
  const comciganMap = Object.fromEntries(
    comcigan.map((school) => [school.name, school]),
  );

  const validSchools: School[] = [];

  for (const school of ooe) {
    if (school.name in comciganMap) {
      validSchools.push({
        name: school.name,
        comciganId: comciganMap[school.name].code,
        
        region,
        ooeId: school.schoolCode,
      });
    }
  }

  return validSchools;
}

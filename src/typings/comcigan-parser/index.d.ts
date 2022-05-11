declare module "comcigan-parser" {
  export interface TimetableInitOption {
    maxGrade?: number;
    cache?: number;
  }

  export interface School {
    region: string;
    name: string;
    code: number;
  }

  export type Grade = "1" | "2" | "3";

  export type Monday = 0;
  export type Tuesday = 1;
  export type Wednesday = 2;
  export type Thursday = 3;
  export type Friday = 4;

  export type Weekday = Monday | Tuesday | Wednesday | Thursday | Friday;

  export interface Lesson {
    grade: number;
    class: number;
    weekday: number;
    weekdayString: string;
    /**
     * 교시
     */
    classTime: number;
    teacher: string;
    subject: string;
  }

  // TimetableData[Grade][Class][Weekday]
  export type TimetableData = Lesson[][][][];

  export default class Timetable {
    init(options?: TimetableInitOption): Promise<void>;

    search(keyword: string): Promise<School[]>;

    setSchool(code: number): Promise<void>;

    getTimetable(): Promise<TimetableData>;

    getClassTime(): Promise<string[]>;
  }
}

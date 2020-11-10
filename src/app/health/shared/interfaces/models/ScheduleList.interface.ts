import { Schedule } from './Schedule.interface';
export interface ScheduleList {
  morning?: Schedule;
  lunch?: Schedule;
  evening?: Schedule;
  snacks?: Schedule;
  [key: string]: any;
}

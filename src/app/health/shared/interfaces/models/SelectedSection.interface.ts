import { Schedule } from './Schedule.interface';
export interface SelectedSection {
  type: string;
  assigned: string[];
  data: Schedule;
  day?: Date;
  sectionKey?: string;
}

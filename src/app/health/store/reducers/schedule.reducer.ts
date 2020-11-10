import { createReducer, Action, on } from '@ngrx/store';
import * as ScheduleActions from '../actions/schedule.actions';
import { Schedule } from '../../shared/interfaces/models/Schedule.interface';
import { ScheduleList } from '../../shared/interfaces/models/ScheduleList.interface';
import { SelectedSection } from '../../shared/interfaces/models/SelectedSection.interface';

function serializeSchedule(schedule: Schedule[]): ScheduleList {
  return schedule.reduce((acc, schedul) => {
    acc[schedul.section] = schedul;
    return acc;
  }, {});
}
export interface ScheduleState {
  date: Date;
  schedule: ScheduleList;
  selectedSection: SelectedSection;
}

export const initialState: ScheduleState = {
  date: null,
  schedule: null,
  selectedSection: null,
};

const scheduleReducer = createReducer(
  initialState,
  on(ScheduleActions.setDate, (state, { date }) => {
    return {
      ...state,
      date
    };
  }),
  on(ScheduleActions.loadAllSheculesSuccess, (state, { schedule }) => {
    return {
      ...state,
      schedule: serializeSchedule(schedule)
    };
  }),
  on(ScheduleActions.setSection, (state, { section }) => {
    return {
      ...state,
      selectedSection: section
    };
  }),
  on(ScheduleActions.resetSection, (state) => {
    return {
      ...state,
      selectedSection: null
    };
  })
);

export function reducer(state: ScheduleState | undefined, action: Action): ScheduleState {
  return scheduleReducer(state, action);
}



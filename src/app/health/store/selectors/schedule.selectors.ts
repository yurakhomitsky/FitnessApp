import { createSelector } from '@ngrx/store';
import { selectHealthState, HealthState } from '../reducers/index';
import { ScheduleState } from '../reducers/schedule.reducer';
export const selectScheduleState = createSelector(
  selectHealthState,
  (state: HealthState) => state.schedule
);

export const selectDate = createSelector(
  selectScheduleState,
  (state: ScheduleState) => state.date
);

export const selectSchedule = createSelector(
  selectScheduleState,
  (state: ScheduleState) => state.schedule
);

export const selectSection = createSelector(
  selectScheduleState,
  (state: ScheduleState) => state.selectedSection
);

import { createAction, props } from '@ngrx/store';
import { Schedule } from '../../shared/interfaces/models/Schedule.interface';
import { SelectedSection } from '../../shared/interfaces/models/SelectedSection.interface';

export const setDate = createAction(
  '[Schedule] Set Date',
  props<{ date: Date; }>()
);


export const loadAllSheculesSuccess = createAction(
  '[Schedule] All Schedules Loaded',
  props<{ schedule: Schedule[]; }>()
);

export const loadSchedulesFailure = createAction(
  '[Schedule] Load Schedules Failure',
  props<{ errorMessage: string; }>()
);

export const setSection = createAction(
  '[Schedule] Set Section',
  props<{ section: SelectedSection; }>()
);

export const resetSection = createAction(
  '[Schedule] Reset Section',
);

export const updateItems = createAction(
  '[Schedule] Update items',
  props<{ items: { [key: string]: string[]; }; }>()
);

export const updateSection = createAction(
  '[Schedule] Update Section',
  props<{ id: string, payload: Schedule; }>()
);

export const createSection = createAction(
  '[Schedule] Create Section',
  props<{ payload: Schedule; }>()
);

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromMeals from './meals.reducer';
import * as fromWorkouts from './workouts.reducer';
import * as fromSchedule from './schedule.reducer';

export const healthFeatureKey = 'healthModule';

export interface HealthState {
  meals: fromMeals.MealsState;
  workouts: fromWorkouts.WorkoutsState;
  schedule: fromSchedule.ScheduleState;
}

export const reducers: ActionReducerMap<HealthState> = {
  meals: fromMeals.reducer,
  workouts: fromWorkouts.reducer,
  schedule: fromSchedule.reducer
};

export const selectHealthState = createFeatureSelector<HealthState>(healthFeatureKey);

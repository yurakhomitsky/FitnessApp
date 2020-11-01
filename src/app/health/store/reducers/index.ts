import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromMeals from './meals.reducer';
import * as fromWorkouts from './workouts.reducer';


export const healthFeatureKey = 'healthModule';

export interface HealthState {
  meals: fromMeals.MealsState;
  workouts: fromWorkouts.WorkoutsState;
}

export const reducers: ActionReducerMap<HealthState> = {
  meals: fromMeals.reducer,
  workouts: fromWorkouts.reducer
};

export const selectHealthState = createFeatureSelector<HealthState>(healthFeatureKey);

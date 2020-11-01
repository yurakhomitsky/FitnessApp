import { createSelector } from '@ngrx/store';
import { selectHealthState, HealthState } from '../reducers/index';
import { WorkoutsState } from '../reducers/workouts.reducer';


export const selectWorkoutsState = createSelector(
  selectHealthState,
  (state: HealthState) => state.workouts
);

export const selectAllWorkouts = createSelector(
  selectWorkoutsState,
  (state: WorkoutsState) => state.workoutsList
);

export const selectIsLoadingWorkouts = createSelector(
  selectWorkoutsState,
  (state: WorkoutsState) => state.isLoading
);

export const selectWorkout = createSelector(
  selectWorkoutsState,
  (state: WorkoutsState) => state.currentWorkout
);

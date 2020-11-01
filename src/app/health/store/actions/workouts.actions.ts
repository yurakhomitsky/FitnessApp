import { createAction, props } from '@ngrx/store';
import { Meal } from '../../shared/interfaces/Meal.interface';
import { Workout } from '../../shared/interfaces/Workout.interface';


export const loadAllWorkouts = createAction(
  '[Workouts] Load All Workouts'
);

export const loadAllWorkoutsSuccess = createAction(
  '[Workouts] All Workouts Loaded',
  props<{ workouts: Workout[]; }>()
);

export const loadWorkoutsFailure = createAction(
  '[Workouts] Load Workouts Failure',
  props<{ errorMessage: string; }>()
);

export const loadWorkout = createAction(
  '[Workouts] Load Workout',
  props<{ key: string; }>()
);

export const loadWorkoutSuccess = createAction(
  '[Workouts] Load Workout Success',
  props<{ workout: Workout; }>()
);

export const loadWorkoutFailure = createAction(
  '[Workouts] Load Workout Failure',
  props<{ errorMessage: string; }>()
);
export const resetCurrentWorkout = createAction(
  '[Workouts] Reset Current Workout',
);

export const createWorkout = createAction(
  '[Workouts] Create Workout',
  props<{ workout: Workout; }>()
);

export const createWorkoutSuccess = createAction(
  '[Workouts] Workout has been created',
  props<{ workout: Workout; }>()
);

export const createWorkoutFailure = createAction(
  '[Workouts] Create Workout Failure',
  props<{ errorMessage: string; }>()
);


export const updateWorkout = createAction(
  '[Workouts] Update Workout',
  props<{ workout: Workout; }>()
);

export const updateWorkoutSuccess = createAction(
  '[Workouts] Workout has been updated',
  props<{ workout: Workout; }>()
);

export const updateWorkoutFailure = createAction(
  '[Workouts] Update Workout Failure',
  props<{ errorMessage: string; }>()
);

export const removeWorkout = createAction(
  '[Workouts] Remove Workout',
  props<{ key: string; }>()
);

export const removeSuccess = createAction(
  '[Workouts] Workout has been removed',
);

export const removeFailure = createAction(
  '[Workouts] Remove Workout Failure',
  props<{ errorMessage: string; }>()
);

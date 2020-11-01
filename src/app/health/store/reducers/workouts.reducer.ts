import { Workout } from '../../shared/interfaces/Workout.interface';
import { createReducer, on, Action } from '@ngrx/store';
import * as WorkoutsActions from '../actions/workouts.actions';

export interface WorkoutsState {
  workoutsList: Workout[];
  currentWorkout: Workout;
  errorMessage: string;
  isLoading: boolean;
}

export const initialState: WorkoutsState = {
  workoutsList: [],
  currentWorkout: null,
  errorMessage: '',
  isLoading: false,
};

const workoutsReducer = createReducer(
  initialState,
  on(WorkoutsActions.loadAllWorkouts, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(WorkoutsActions.loadAllWorkoutsSuccess, (state, { workouts }) => {
    return {
      ...state,
      workoutsList: workouts,
      isLoading: false,
      errorMessage: '',
    };
  }),
  on(WorkoutsActions.loadWorkoutsFailure, (state, { errorMessage }) => {
    return {
      ...state,
      errorMessage,
      isLoading: false,
    };
  }),
  on(WorkoutsActions.loadWorkout, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(WorkoutsActions.loadWorkoutSuccess, (state, { workout }) => {
    return {
      ...state,
      currentWorkout: workout,
      isLoading: false,
      errorMessage: ''
    };
  }),
  on(WorkoutsActions.loadWorkoutFailure, (state, { errorMessage }) => {
    return {
      ...state,
      currentWorkout: null,
      isLoading: false,
      errorMessage
    };
  }),
  on(WorkoutsActions.resetCurrentWorkout, (state) => {
    return {
      ...state,
      currentWorkout: null,
    };
  })
);

export function reducer(state: WorkoutsState | undefined, action: Action): WorkoutsState {
  return workoutsReducer(state, action);
}

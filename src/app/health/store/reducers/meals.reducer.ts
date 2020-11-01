import { Action, createReducer, on } from '@ngrx/store';
import * as MealsActions from '../actions/meals.actions';
import { Meal } from '../../shared/interfaces/Meal.interface';

export interface MealsState {
  mealsList: Meal[];
  currentMeal: Meal;
  errorMessage: string;
  isLoading: boolean;
}

export const initialState: MealsState = {
  mealsList: [],
  currentMeal: null,
  errorMessage: '',
  isLoading: false,
};


const mealsReducer = createReducer(
  initialState,
  on(MealsActions.loadAllMeals, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(MealsActions.allMealsLoaded, (state, { meals }) => {
    return {
      ...state,
      mealsList: meals,
      isLoading: false,
      errorMessage: '',
    };
  }),
  on(MealsActions.loadMealsFailure, (state, { errorMessage }) => {
    return {
      ...state,
      errorMessage,
      isLoading: false,
    };
  }),
  on(MealsActions.loadMeal, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(MealsActions.loadMealSuccess, (state, { meal }) => {
    return {
      ...state,
      currentMeal: meal,
      isLoading: false,
      errorMessage: ''
    };
  }),
  on(MealsActions.loadMealFailure, (state, { errorMessage }) => {
    return {
      ...state,
      currentMeal: null,
      isLoading: false,
      errorMessage
    };
  }),
  on(MealsActions.resetCurrentMeal, (state) => {
    return {
      ...state,
      currentMeal: null,
    };
  })
);

export function reducer(state: MealsState | undefined, action: Action): MealsState {
  return mealsReducer(state, action);
}


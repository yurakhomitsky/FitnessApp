import { createSelector } from '@ngrx/store';
import { selectHealthState, HealthState } from '../reducers/index';
import { MealsState } from '../reducers/meals.reducer';

export const selectMealsState = createSelector(
  selectHealthState,
  (state: HealthState) => state.meals
);


export const selectAllMeals = createSelector(
  selectMealsState,
  (state: MealsState) => state.mealsList
);

export const selectIsLoadingMeals = createSelector(
  selectMealsState,
  (state: MealsState) => state.isLoading
);

export const selectMeal = createSelector(
  selectMealsState,
  (state: MealsState) => state.currentMeal
);

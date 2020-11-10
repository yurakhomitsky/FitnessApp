import { createAction, props } from '@ngrx/store';
import { Meal } from '../../shared/interfaces/models/Meal.interface';


export const loadAllMeals = createAction(
  '[Meals] Load All Meals'
);

export const allMealsLoaded = createAction(
  '[Meals] All Meals Loaded',
  props<{ meals: Meal[]; }>()
);

export const loadMealsFailure = createAction(
  '[Meals] Load Meals Failure',
  props<{ errorMessage: string; }>()
);

export const loadMeal = createAction(
  '[Meals] Load Meal',
  props<{ key: string; }>()
);

export const loadMealSuccess = createAction(
  '[Meals] Load Meal Success',
  props<{ meal: Meal; }>()
);

export const loadMealFailure = createAction(
  '[Meals] Load Meal Failure',
  props<{ errorMessage: string; }>()
);
export const resetCurrentMeal = createAction(
  '[Meals] Reset Current Meal',
);

export const createMeal = createAction(
  '[Meals] Create Meal',
  props<{ meal: Meal; }>()
);

export const createMealSuccess = createAction(
  '[Meals] Meal has been created',
  props<{ meal: Meal; }>()
);

export const createFailure = createAction(
  '[Meals] Create Meal Failure',
  props<{ errorMessage: string; }>()
);


export const updateMeal = createAction(
  '[Meals] Update Meal',
  props<{ meal: Meal; }>()
);

export const updateMealSuccess = createAction(
  '[Meals] Meal has been updated',
  props<{ meal: Meal; }>()
);

export const updateFailure = createAction(
  '[Meals] Update Meal Failure',
  props<{ errorMessage: string; }>()
);

export const removeMeal = createAction(
  '[Meals] Remove Meal',
  props<{ key: string; }>()
);

export const removeSuccess = createAction(
  '[Meals] Meal has been removed',
);

export const removeFailure = createAction(
  '[Meals] Remove Meal Failure',
  props<{ errorMessage: string; }>()
);

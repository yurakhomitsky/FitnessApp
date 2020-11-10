import { Meal } from './Meal.interface';
import { Workout } from './Workout.interface';

export interface Schedule {
  meals: Meal[];
  workouts: Workout[];
  section: string;
  timestamp?: number;
  key?: string;
}

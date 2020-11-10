import { BaseCRUD } from './BaseCRUD.interface';
import { Meal } from '../models/Meal.interface';

export interface MealsCRUD extends BaseCRUD<Meal> { }

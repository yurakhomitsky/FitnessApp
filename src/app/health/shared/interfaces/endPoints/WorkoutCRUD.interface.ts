import { BaseCRUD } from './BaseCRUD.interface';
import { Workout } from '../models/Workout.interface';

export interface WorkoutCRUD extends BaseCRUD<Workout> { }

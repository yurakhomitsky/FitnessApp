import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { WorkoutCRUD } from '../interfaces/endPoints/WorkoutCRUD.interface';

import { ResourseService } from '../classes/resourse';
import { Workout } from '../interfaces/models/Workout.interface';

@Injectable()
export class WorkoutsService extends ResourseService<Workout> implements WorkoutCRUD {

  constructor(db: AngularFireDatabase) {
    super(db, 'workouts');
  }

}

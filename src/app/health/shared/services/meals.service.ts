import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MealsCRUD } from '../interfaces/endPoints/MealsCRUD.interface';
import { Meal } from '../interfaces/models/Meal.interface';
import { ResourseService } from '../classes/resourse';

@Injectable()
export class MealsService extends ResourseService<Meal> implements MealsCRUD {

  constructor(public db: AngularFireDatabase) {
    super(db, 'meals');
  }
}

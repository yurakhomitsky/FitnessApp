import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MealsState } from '../reducers/meals.reducer';
import { loadAllMeals, createMeal, removeMeal, loadMeal, resetCurrentMeal, updateMeal } from '../actions/meals.actions';
import { Observable } from 'rxjs';
import { selectAllMeals, selectIsLoadingMeals, selectMeal } from '../selectors/meals.selectors';
import { Meal } from '../../shared/interfaces/models/Meal.interface';

@Injectable()
export class MealsStoreService {
  constructor(private store: Store<MealsState>) { }

  get selectAllMeals(): Observable<Meal[]> {
    return this.store.pipe(select(selectAllMeals));
  }

  get isLoading(): Observable<boolean> {
    return this.store.pipe(select(selectIsLoadingMeals));
  }

  get selectMeal(): Observable<Meal> {
    return this.store.pipe(select(selectMeal));
  }

  public findAll(): void {
    this.store.dispatch(loadAllMeals());
  }

  public find(key: string): void {
    this.store.dispatch(loadMeal({ key }));
  }

  public create(meal: Meal): void {
    this.store.dispatch(createMeal({ meal }));
  }

  public update(meal: Meal): void {
    this.store.dispatch(updateMeal({ meal }));
  }

  public remove(key: string): void {
    this.store.dispatch(removeMeal({ key }));
  }
  public resetCurrentMeal(): void {
    this.store.dispatch(resetCurrentMeal());
  }
}

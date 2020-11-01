import { Injectable } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthStoreService } from '../../../auth/store/services/auth.store.service';
import { Meal } from '../../shared/interfaces/Meal.interface';
import { MealsService } from '../../shared/services/meals.service';
import * as MealsActions from '../actions/meals.actions';

// tslint:disable: typedef

@Injectable()
export class MealsEffects {
  constructor(
    private actions$: Actions,
    private mealsService: MealsService,
    private authStoreService: AuthStoreService,
    private router: Router) { }

  public loadAllMeals$ = this.loadAllMeal();
  public loadMeal$ = this.loadMeal();
  public createMeal$ = this.createMeal();
  public removeMeal$ = this.removeMeal();
  public createMealSuccess$ = this.createMealSuccess();
  public loadMealFailure$ = this.loadMealFailure();
  public updateMeal$ = this.updateMeal();
  public updateMealSuccess$ = this.updateMealSuccess();

  private loadAllMeal() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(MealsActions.loadAllMeals),
        withLatestFrom(this.authStoreService.selectUser),
        switchMap(([action, user]) => this.mealsService.findAll(user.uid).pipe(
          map((meals) => {
            const serializedMeals = this.serializeMeals(meals);
            return MealsActions.allMealsLoaded({ meals: serializedMeals });
          }),
          catchError(({ message }) => {
            return of(MealsActions.loadMealsFailure({ errorMessage: message }));
          })
        )),
      );
    });
  }

  private loadMeal() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(MealsActions.loadMeal),
        withLatestFrom(this.authStoreService.selectUser, this.authStoreService.selectUser),
        switchMap(([{ key }, user]) => this.mealsService.find(user.uid, key).pipe(
          map((meals) => {
            if (meals.length) {
              const meal = this.serializeMeals(meals)[0];
              return MealsActions.loadMealSuccess({ meal });
            }
            return MealsActions.loadMealFailure({ errorMessage: 'Could not find meal' });
          }),
          catchError(({ message }) => {
            return of(MealsActions.loadMealFailure({ errorMessage: message }));
          })
        )),
      );
    });
  }

  private loadMealFailure() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(MealsActions.loadMealFailure),
        tap(() => this.router.navigate(['meals']))
      );
    }, {
      dispatch: false
    });
  }

  private createMeal() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(MealsActions.createMeal),
        withLatestFrom(this.authStoreService.selectUser),
        switchMap(([{ meal }, user]) => this.mealsService.create(meal, user.uid).pipe(
          map((resp) => {
            return MealsActions.createMealSuccess({ meal });
          }),
          catchError(({ message }) => {
            return of(MealsActions.createFailure({ errorMessage: message }));
          })
        )),
      );
    });
  }

  private updateMeal() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(MealsActions.updateMeal),
        withLatestFrom(this.authStoreService.selectUser),
        switchMap(([{ meal }, user]) => this.mealsService.update(meal, user.uid, meal.key).pipe(
          map((resp) => {
            return MealsActions.updateMealSuccess({ meal });
          }),
          catchError(({ message }) => {
            return of(MealsActions.updateFailure({ errorMessage: message }));
          })
        )),
      );
    });
  }

  private updateMealSuccess() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(MealsActions.updateMealSuccess),
        tap(() => this.router.navigate(['meals']))
      );
    }, {
      dispatch: false
    });
  }

  private removeMeal() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(MealsActions.removeMeal),
        withLatestFrom(this.authStoreService.selectUser),
        switchMap(([{ key }, user]) => this.mealsService.remove(key, user.uid).pipe(
          map(() => {
            return MealsActions.removeSuccess();
          }),
          catchError(({ message }) => {
            return of(MealsActions.removeFailure({ errorMessage: message }));
          })
        )),
      );
    });
  }


  private createMealSuccess() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(MealsActions.createMealSuccess),
        tap(() => this.router.navigate(['meals']))
      );
    }, {
      dispatch: false
    });
  }

  private serializeMeals(meals: SnapshotAction<Meal>[]): Meal[] {
    // this.items = this.itemsRef.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );
    return meals.map(meal => {
      const { name, ingredients } = meal.payload.val();
      const { key, exists } = meal.payload;
      return {
        key,
        name,
        ingredients,
        exists
      };
    });
  }

}

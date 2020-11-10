import { Injectable } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthStoreService } from '../../../auth/store/services/auth.store.service';
import * as WorkoutsActions from '../actions/workouts.actions';
import { WorkoutsService } from '../../shared/services/workouts.service';
import { Workout } from '../../shared/interfaces/models/Workout.interface';

// tslint:disable: typedef

@Injectable({
  providedIn: 'root'
})
export class WorkoutsEffects {
  constructor(
    private actions$: Actions,
    private workoutsService: WorkoutsService,
    private authStoreService: AuthStoreService,
    private router: Router) { }

  public loadAllWorkouts$ = this.loadAllWorkouts();
  public loadWorkout$ = this.loadWorkout();
  public createWorkout$ = this.createWorkout();
  public removeWorkout$ = this.removeWorkout();
  public createWorkoutSuccess$ = this.createWorkoutSuccess();
  public loadWorkoutFailure$ = this.loadWorkoutFailure();
  public updateWorkout$ = this.updateWorkout();
  public updateWorkoutSuccess$ = this.updateWorkoutSuccess();

  private loadAllWorkouts() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(WorkoutsActions.loadAllWorkouts),
        withLatestFrom(this.authStoreService.selectUser),
        switchMap(([action, user]) => this.workoutsService.findAll(user.uid).pipe(
          map((workouts) => {
            const serializedWorkouts = this.serializeWorkouts(workouts);
            return WorkoutsActions.loadAllWorkoutsSuccess({ workouts: serializedWorkouts });
          }),
          catchError(({ message }) => {
            return of(WorkoutsActions.loadWorkoutsFailure({ errorMessage: message }));
          })
        )),
      );
    });
  }

  private loadWorkout() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(WorkoutsActions.loadWorkout),
        withLatestFrom(this.authStoreService.selectUser, this.authStoreService.selectUser),
        switchMap(([{ key }, user]) => this.workoutsService.find(user.uid, key).pipe(
          map((workouts) => {
            if (workouts.length) {
              const workout = this.serializeWorkouts(workouts)[0];
              return WorkoutsActions.loadWorkoutSuccess({ workout });
            }
            return WorkoutsActions.loadWorkoutFailure({ errorMessage: 'Could not find workout' });
          }),
          catchError(({ message }) => {
            return of(WorkoutsActions.loadWorkoutFailure({ errorMessage: message }));
          })
        )),
      );
    });
  }

  private loadWorkoutFailure() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(WorkoutsActions.loadWorkoutFailure),
        tap(() => this.router.navigate(['workouts']))
      );
    }, {
      dispatch: false
    });
  }

  private createWorkout() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(WorkoutsActions.createWorkout),
        withLatestFrom(this.authStoreService.selectUser),
        switchMap(([{ workout }, user]) => this.workoutsService.create(workout, user.uid).pipe(
          map((resp) => {
            return WorkoutsActions.createWorkoutSuccess({ workout });
          }),
          catchError(({ message }) => {
            return of(WorkoutsActions.createWorkoutFailure({ errorMessage: message }));
          })
        )),
      );
    });
  }

  private updateWorkout() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(WorkoutsActions.updateWorkout),
        withLatestFrom(this.authStoreService.selectUser),
        switchMap(([{ workout }, user]) => this.workoutsService.update(workout, user.uid, workout.key).pipe(
          map((resp) => {
            return WorkoutsActions.updateWorkoutSuccess({ workout });
          }),
          catchError(({ message }) => {
            return of(WorkoutsActions.updateWorkoutFailure({ errorMessage: message }));
          })
        )),
      );
    });
  }

  private updateWorkoutSuccess() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(WorkoutsActions.updateWorkoutSuccess),
        tap(() => this.router.navigate(['workouts']))
      );
    }, {
      dispatch: false
    });
  }

  private removeWorkout() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(WorkoutsActions.removeWorkout),
        withLatestFrom(this.authStoreService.selectUser),
        switchMap(([{ key }, user]) => this.workoutsService.remove(key, user.uid).pipe(
          map(() => {
            return WorkoutsActions.removeSuccess();
          }),
          catchError(({ message }) => {
            return of(WorkoutsActions.removeFailure({ errorMessage: message }));
          })
        )),
      );
    });
  }


  private createWorkoutSuccess() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(WorkoutsActions.createWorkoutSuccess),
        tap(() => this.router.navigate(['workouts']))
      );
    }, {
      dispatch: false
    });
  }

  private serializeWorkouts(workouts: SnapshotAction<Workout>[]): Workout[] {

    return workouts.map(meal => {
      const { name, type, strength, endurance } = meal.payload.val();
      const { key, exists } = meal.payload;
      return {
        key,
        name,
        type,
        strength,
        endurance,
        exists
      };
    });
  }

}

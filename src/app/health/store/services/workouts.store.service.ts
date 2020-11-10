import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// tslint:disable-next-line: max-line-length
import { createWorkout, loadAllWorkouts, loadWorkout, removeWorkout, resetCurrentWorkout, updateWorkout } from '../actions/workouts.actions';
import { WorkoutsState } from '../reducers/workouts.reducer';
import { selectAllWorkouts, selectIsLoadingWorkouts, selectWorkout } from '../selectors/workouts.selectors';
import { Workout } from '../../shared/interfaces/models/Workout.interface';

@Injectable()
export class WorkoutsStoreService {
  constructor(private store: Store<WorkoutsState>) { }

  get selectAllWokrouts(): Observable<Workout[]> {
    return this.store.pipe(select(selectAllWorkouts));
  }

  get isLoading(): Observable<boolean> {
    return this.store.pipe(select(selectIsLoadingWorkouts));
  }

  get selectWorkout(): Observable<Workout> {
    return this.store.pipe(select(selectWorkout));
  }

  public findAll(): void {
    this.store.dispatch(loadAllWorkouts());
  }

  public find(key: string): void {
    this.store.dispatch(loadWorkout({ key }));
  }

  public create(workout: Workout): void {
    this.store.dispatch(createWorkout({ workout }));
  }

  public update(workout: Workout): void {
    this.store.dispatch(updateWorkout({ workout }));
  }

  public remove(key: string): void {
    this.store.dispatch(removeWorkout({ key }));
  }
  public resetCurrentWorkout(): void {
    this.store.dispatch(resetCurrentWorkout());
  }
}

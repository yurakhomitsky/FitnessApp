import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { WorkoutsStoreService } from '../../../store/services/workouts.store.service';
import { filter, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Workout } from '../../../shared/interfaces/models/Workout.interface';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public data$: Observable<{
    workout: Workout,
    isLoading: boolean;
  }>;

  constructor(private workoutsStoreService: WorkoutsStoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.workoutsStoreService.resetCurrentWorkout();
    this.subscription = this.initRouterListener().subscribe();
    this.data$ = this.initData();
  }

  get isLoading$(): Observable<boolean> {
    return this.workoutsStoreService.isLoading;
  }

  get workout$(): Observable<Workout> {
    return this.workoutsStoreService.selectWorkout;
  }

  public onAddWorkout(workout: Workout): void {
    this.workoutsStoreService.create(workout);
  }

  public onUpdateWorkout(workout: Workout): void {
    this.workoutsStoreService.update(workout);
  }

  public onRemoveWorkout(workout: Workout): void {
    this.workoutsStoreService.remove(workout.key);
  }

  private initData(): Observable<{
    workout: Workout,
    isLoading: boolean;
  }> {
    return combineLatest(this.workout$, this.isLoading$).pipe(
      map(([workout, isLoading]) => {
        return {
          workout,
          isLoading
        };
      }),
    );
  }

  private initRouterListener(): Observable<Params> {
    return this.route.params.pipe(
      filter((param) => param.id),
      tap((param) => {
        if (param.id) {
          this.workoutsStoreService.find(param.id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

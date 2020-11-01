import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from '../../../shared/interfaces/Workout.interface';
import { WorkoutsStoreService } from '../../../store/services/workouts.store.service';
import { selectIsLoadingWorkouts } from '../../../store/selectors/workouts.selectors';

@Component({
  selector: 'workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {
  public workouts$: Observable<Workout[]>;
  constructor(private workoutsStoreService: WorkoutsStoreService) { }

  ngOnInit(): void {
    this.workoutsStoreService.findAll();
    this.workouts$ = this.workoutsStoreService.selectAllWokrouts;
  }
  public onRemoveWorkout(workout: Workout): void {
    this.removeWorkout(workout);
  }

  private removeWorkout(workout: Workout): void {
    this.workoutsStoreService.remove(workout.key);
  }
}

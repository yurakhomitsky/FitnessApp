import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkoutsStoreService } from '../../../store/services/workouts.store.service';
import { Workout } from '../../../shared/interfaces/models/Workout.interface';

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

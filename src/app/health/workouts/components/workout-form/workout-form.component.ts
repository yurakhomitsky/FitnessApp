import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Workout } from '../../../shared/interfaces/models/Workout.interface';

@Component({
  selector: 'workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit, OnChanges {
  @Input() workout: Workout;

  @Output() create: EventEmitter<Workout> = new EventEmitter<Workout>();
  @Output() update: EventEmitter<Workout> = new EventEmitter<Workout>();
  @Output() remove: EventEmitter<Workout> = new EventEmitter<Workout>();

  public form: FormGroup;
  public toggled = false;
  public exists = false;


  constructor(private fb: FormBuilder) {
    this.form = this.initForm();
  }

  ngOnInit(): void {
    this.workoutTypeChange().subscribe(this.resetWorkoutType.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workout && this.workout.name && this.form) {
      this.exists = true;
      const value = this.workout;
      this.form.patchValue(value);
    }
  }

  get required(): boolean {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  get typeOfWorkout(): string {
    return this.form.get('type').value;
  }

  get isStrength(): boolean {
    return this.form.get('type').value === 'strength';
  }

  get isEndurance(): boolean {
    return this.form.get('type').value === 'endurance';
  }

  get placeholder(): string {
    return `e.g ${this.isStrength ? 'Benchpress' : 'Treadmill'}`;
  }

  public createWorkout(): void {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  public updateWorkout(): void {
    if (this.form.valid) {
      const workout = {
        key: this.workout.key,
        ...this.form.value
      };
      this.update.emit(workout);
    }
  }

  public removeWorkout(): void {
    this.remove.emit(this.form.value);
  }

  public toggle(): void {
    this.toggled = !this.toggled;
  }
  private initForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      type: 'strength',
      strength: this.fb.group({
        reps: 0,
        sets: 0,
        weight: 0
      }),
      endurance: this.fb.group({
        distance: 0,
        duration: 0,
      })

    });
  }

  private workoutTypeChange(): Observable<string> {
    return this.form.get('type').valueChanges.pipe(distinctUntilChanged());
  }

  private resetWorkoutType(type: string): void {
    if (this.exists && this.workout.type !== type) {
      this.form.get(type).reset();
    }
    if (!this.exists) {
      this.form.get(type).reset();
    }
  }
}

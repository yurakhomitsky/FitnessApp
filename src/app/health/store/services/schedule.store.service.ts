import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { iif, Observable, partition } from 'rxjs';
import { setDate, setSection, resetSection, updateItems } from '../actions/schedule.actions';
import { ScheduleState } from '../reducers/schedule.reducer';
import { selectDate, selectSchedule, selectSection } from '../selectors/schedule.selectors';
import { MealsStoreService } from './meals.store.service';
import { WorkoutsStoreService } from './workouts.store.service';
import { Meal } from '../../shared/interfaces/models/Meal.interface';

import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { ScheduleList } from '../../shared/interfaces/models/ScheduleList.interface';
import { SelectedSection } from '../../shared/interfaces/models/SelectedSection.interface';
import { Workout } from '../../shared/interfaces/models/Workout.interface';

@Injectable()
export class ScheduleStoreService {

  constructor(
    private store: Store<ScheduleState>,
    private mealsStoreService: MealsStoreService,
    private workoutsStoreService: WorkoutsStoreService) { }

  get selectDate(): Observable<Date> {
    return this.store.pipe(select(selectDate));
  }

  get selectSchedule(): Observable<ScheduleList> {
    return this.store.pipe(select(selectSchedule));
  }

  get selectSection(): Observable<SelectedSection> {
    return this.store.pipe(select(selectSection), shareReplay());
  }

  get selectListBySelectedSectionType(): Observable<Meal[] | Workout[]> {
    return this.selectSection.pipe(
      filter(section => !!section),
      switchMap(section =>
        iif(() => section.type === 'meals'
          , this.mealsStoreService.selectAllMeals
          , this.workoutsStoreService.selectAllWokrouts
        )
      )
    );
  }

  public setDate(date: Date): void {
    this.store.dispatch(setDate({ date }));
  }

  public setSection(section: SelectedSection): void {
    this.store.dispatch(setSection({ section }));
  }

  public updateItems(items: { [key: string]: string[]; }): void {
    this.store.dispatch(updateItems({ items }));
  }

  public resetSection(): void {
    this.store.dispatch(resetSection());
  }

  public loadMealsAndWorkouts(): void {
    this.mealsStoreService.findAll();
    this.workoutsStoreService.findAll();
  }
}

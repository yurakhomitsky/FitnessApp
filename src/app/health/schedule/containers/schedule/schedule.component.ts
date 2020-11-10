import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ScheduleStoreService } from '../../../store/services/schedule.store.service';
import { ScheduleList } from '../../../shared/interfaces/models/ScheduleList.interface';
import { SelectedSection } from '../../../shared/interfaces/models/SelectedSection.interface';
import { Workout } from '../../../shared/interfaces/models/Workout.interface';
import { Meal } from '../../../shared/interfaces/models/Meal.interface';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  public date$: Observable<Date>;
  public schedule$: Observable<ScheduleList>;
  public selectedSection$: Observable<SelectedSection>;
  public list$: Observable<Meal[] | Workout[]>;
  public isModalOpen = false;
  constructor(private scheduleStoreService: ScheduleStoreService) { }

  ngOnInit(): void {
    this.setDate(new Date());
    this.initValues();
    this.scheduleStoreService.loadMealsAndWorkouts();
  }

  public setDate(date: Date): void {
    this.scheduleStoreService.setDate(date);
  }

  public initValues(): void {
    this.date$ = this.scheduleStoreService.selectDate;
    this.schedule$ = this.scheduleStoreService.selectSchedule;
    this.selectedSection$ = this.scheduleStoreService.selectSection;
    this.list$ = this.scheduleStoreService.selectListBySelectedSectionType;
  }

  public onChangeDate(changedDate: Date): void {
    this.setDate(changedDate);
  }

  public onChangeSection(sectionData: SelectedSection): void {
    this.isModalOpen = true;
    this.scheduleStoreService.setSection(sectionData);
  }

  public onUpdateAssigned(assigned: { [key: string]: string[]; }): void {
    // {meals: ['test', test]} -> ['test, 'test]
    this.scheduleStoreService.updateItems(assigned);
    this.closeAssign();
  }

  public closeAssign(): void {
    this.isModalOpen = false;
    this.scheduleStoreService.resetSection();
  }
}

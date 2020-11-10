import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ScheduleList } from '../../../shared/interfaces/models/ScheduleList.interface';
import { SelectedSection } from '../../../shared/interfaces/models/SelectedSection.interface';
import { Schedule } from '../../../shared/interfaces/models/Schedule.interface';

interface Section {
  key: string;
  name: string;
}

@Component({
  selector: 'schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {

  public selectedDay: number;
  public selectedDate: Date;
  public selectedWeek: Date;

  public sections: Section[] = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks and Drinks' },
  ];

  @Input() set date(date: Date) {
    this.selectedDate = date;
  }
  @Input() items: ScheduleList;
  @Output() changeDate: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() changeSection: EventEmitter<SelectedSection> = new EventEmitter<SelectedSection>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date) {
      this.selectedDay = this.getToday(this.selectedDate);
      this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDate));
    }
  }

  public getSection(name: string): Schedule {
    return this.items && this.items[name] || {};
  }

  public onDateChange(weekOffset: number): void {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.changeDate.emit(startDate);
  }

  public onSelectDay(day: number): void {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + day);
    this.changeDate.emit(selectedDay);
  }

  public onSelectSection(selectedSection: SelectedSection, sectionKey: string): void {
    const day = this.selectedDate;
    this.changeSection.emit({
      ...selectedSection,
      sectionKey,
      day
    });
  }

  private getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private getToday(date: Date): number {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }
}

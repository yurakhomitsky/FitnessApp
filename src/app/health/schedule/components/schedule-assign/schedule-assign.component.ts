import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from 'src/app/health/shared/interfaces/models/Meal.interface';
import { Workout } from '../../../shared/interfaces/models/Workout.interface';
import { SelectedSection } from '../../../shared/interfaces/models/SelectedSection.interface';

@Component({
  selector: 'schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleAssignComponent implements OnInit {
  @Input() section: SelectedSection;
  @Input() list: Meal[] | Workout[];
  @Output() updateAssigned = new EventEmitter<{
    [key: string]: string[],
  }>();
  @Output() cancel = new EventEmitter<any>();

  private assigned: string[] = [];
  constructor() { }

  ngOnInit(): void {
    this.assigned = [...this.section.assigned];
  }

  public toggleItem(name: string): void {
    if (this.exists(name)) {
      this.assigned = this.assigned.filter(item => item !== name);
    } else {
      this.assigned = [...this.assigned, name];
    }
  }

  public exists(name: string): boolean {
    return !!this.assigned.includes(name);
  }

  public getRoute(type: string): string[] {
    return [`../${type}/new`];
  }

  public updateAssign(): void {
    this.updateAssigned.emit({
      [this.section.type]: this.assigned
    });
  }

  public cancelAssign(): void {
    this.cancel.emit();
  }

}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDaysComponent implements OnInit {
  @Input() selected: number;

  @Output() selectNewDay: EventEmitter<number> = new EventEmitter<number>();

  public days: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  constructor() { }

  ngOnInit(): void {
  }

  public selectDay(day: number): void {
    this.selectNewDay.emit(day);
  }
}

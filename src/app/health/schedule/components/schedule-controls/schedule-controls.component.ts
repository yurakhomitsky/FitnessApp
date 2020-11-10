import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleControlsComponent implements OnInit {
  @Input() selected: Date;
  @Output() move: EventEmitter<number> = new EventEmitter<number>();

  public offset = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public moveDate(offset: number): void {
    this.offset = offset;
    this.move.emit(offset);
  }
}

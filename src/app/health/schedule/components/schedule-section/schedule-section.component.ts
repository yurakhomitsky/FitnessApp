import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Schedule } from '../../../shared/interfaces/models/Schedule.interface';
import { SelectedSection } from '../../../shared/interfaces/models/SelectedSection.interface';


@Component({
  selector: 'schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss']
})
export class ScheduleSectionComponent implements OnInit {
  @Input() name: string;
  @Input() section: Schedule;

  @Output() selectSection: EventEmitter<SelectedSection> = new EventEmitter<SelectedSection>();
  constructor() { }

  ngOnInit(): void {
  }

  public onSelect(type: string, assigned: string[] = []): void {
    const data = this.section;
    this.selectSection.emit({
      type,
      assigned,
      data
    });
  }
}

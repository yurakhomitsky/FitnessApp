import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Meal } from '../../interfaces/models/Meal.interface';
import { Workout } from '../../interfaces/models/Workout.interface';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ListItemComponent implements OnInit {

  @Input() item: Meal | Workout;
  @Output() remove = new EventEmitter<Meal | Workout>();

  @ContentChild('item') itemTemplate;

  public toggled = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  public removeItem(): void {
    this.remove.emit(this.item);
  }
}

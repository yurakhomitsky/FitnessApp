import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};


@Component({
  selector: 'workout-type',
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class WorkoutTypeComponent implements OnInit, ControlValueAccessor {

  public value: string;
  public selectors: string[] = ['strength', 'endurance'];

  private onTouch: () => void;
  private onModelChange: (value: string) => void;

  constructor() { }


  ngOnInit(): void {
  }

  public registerOnTouched(fn): void {
    this.onTouch = fn;
  }

  public registerOnChange(fn): void {
    this.onModelChange = fn;
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public setSelected(selector: string): void {
    this.value = selector;
    this.onModelChange(selector);
    this.onTouch();
  }
}

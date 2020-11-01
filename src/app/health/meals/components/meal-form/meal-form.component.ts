import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meal } from '../../../shared/interfaces/Meal.interface';

@Component({
  selector: 'meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent implements OnInit, OnChanges {
  @Input() meal: Meal;

  @Output() create: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output() update: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output() remove: EventEmitter<Meal> = new EventEmitter<Meal>();

  public form: FormGroup;
  public toggled = false;
  public exists = false;

  constructor(private fb: FormBuilder) {
    this.form = this.initForm();
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.meal && this.meal.name && this.form) {
      this.exists = true;
      this.emptyIngredients();
      const value = this.meal;
      this.form.patchValue(value);
      const ingredientsContorls = this.setupIngredientsControls(value.ingredients);
      ingredientsContorls.forEach(control => this.ingredients.push(control));
    }
  }

  get required(): boolean {
    return (this.form.get('name').hasError('required') && this.form.get('name').touched);
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  public addIngredient(): void {
    this.ingredients.push(new FormControl(''));
  }

  public createMeal(): void {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  public updateMeal(): void {
    if (this.form.valid) {
      const meal = {
        key: this.meal.key,
        ...this.form.value
      };
      this.update.emit(meal);
    }
  }
  public removeMeal(): void {
    this.remove.emit(this.meal);
  }

  public removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  private initForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      ingredients: this.fb.array([''])
    });
  }

  private emptyIngredients(): void {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  private setupIngredientsControls(ingredients: string[]): FormControl[] {
    return ingredients.map(ingredient => this.createIngredientControl(ingredient));
  }

  private createIngredientControl(inredient: string): FormControl {
    return new FormControl(inredient);
  }
}

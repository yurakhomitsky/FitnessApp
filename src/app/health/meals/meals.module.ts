import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsComponent } from './containers/meals/meals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MealComponent } from './containers/meal/meal.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { EffectsModule } from '@ngrx/effects';
import { MealsEffects } from '../store/effects/meals.effects';

const ROUTES: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent },
  { path: ':id', component: MealComponent }
];

@NgModule({
  declarations: [MealsComponent, MealComponent, MealFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
  ]
})
export class MealsModule { }

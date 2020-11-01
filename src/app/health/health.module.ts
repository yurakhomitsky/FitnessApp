import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/shared/guards/auth.guard';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { healthFeatureKey, reducers } from './store/reducers/index';
import { MealsEffects } from './store/effects/meals.effects';
import { EffectsModule } from '@ngrx/effects';
import { WorkoutsEffects } from './store/effects/workouts.effects';

export const ROUTES: Routes = [
  { path: 'meals', canActivate: [AuthGuard], loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule) },
  { path: 'schedule', canActivate: [AuthGuard], loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) },
  { path: 'workouts', canActivate: [AuthGuard], loadChildren: () => import('./workouts/workouts.module').then(m => m.WorkoutsModule) }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(healthFeatureKey, reducers),
    EffectsModule.forFeature([MealsEffects, WorkoutsEffects]),
    RouterModule.forChild(ROUTES)
  ]
})
export class HealthModule { }

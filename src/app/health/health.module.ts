import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/shared/guards/auth.guard';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { healthFeatureKey, reducers } from './store/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { WorkoutsEffects } from './store/effects/workouts.effects';
import { MealsEffects } from './store/effects/meals.effects';
import { MealsService } from './shared/services/meals.service';
import { WorkoutsService } from './shared/services/workouts.service';
import { ScheduleService } from './shared/services/schedule.service';
import { ScheduleEffects } from './store/effects/schedule.effects';
import { ScheduleStoreService } from './store/services/schedule.store.service';
import { MealsStoreService } from './store/services/meals.store.service';
import { WorkoutsStoreService } from './store/services/workouts.store.service';

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
    EffectsModule.forFeature([WorkoutsEffects, MealsEffects, ScheduleEffects]),
    RouterModule.forChild(ROUTES)
  ],
  providers: [MealsService, WorkoutsService, ScheduleService, ScheduleStoreService, MealsStoreService, WorkoutsStoreService]
})
export class HealthModule { }

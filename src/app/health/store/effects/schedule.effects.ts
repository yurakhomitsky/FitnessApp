import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ScheduleActions from '../actions/schedule.actions';
import { AuthStoreService } from '../../../auth/store/services/auth.store.service';
import { withLatestFrom, switchMap, map, catchError, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ScheduleService } from '../../shared/services/schedule.service';
import { SnapshotAction } from '@angular/fire/database';
import { ScheduleStoreService } from '../services/schedule.store.service';
import { Schedule } from '../../shared/interfaces/models/Schedule.interface';
// tslint:disable: typedef
@Injectable()
export class ScheduleEffects {

  constructor(
    private actions$: Actions,
    private authStoreService: AuthStoreService,
    private sheduleStoreService: ScheduleStoreService,
    private scheduleService: ScheduleService) { }

  public loadSchedule$ = this.loadSchedule();
  public updateItems$ = this.updateItems();
  public updateSection$ = this.updateSection();
  public createSection$ = this.createSection();

  private loadSchedule() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.setDate),

        map(({ date }) => {
          const startAt = (
            new Date(date.getFullYear(), date.getMonth(), date.getDate())
          ).getTime();

          const endAt = (
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
          ).getTime() - 1;
          return { startAt, endAt };
        }),
        withLatestFrom(this.authStoreService.selectUser),
        switchMap(([dateRange, user]) => this.scheduleService.findAll(user.uid, dateRange).pipe(
          map((scheduls) => {
            const serializedScheduls = this.serializeScheduls(scheduls);
            return ScheduleActions.loadAllSheculesSuccess({ schedule: serializedScheduls });
          }),
          catchError(({ message }) => {
            return of(ScheduleActions.loadSchedulesFailure({ errorMessage: message }));
          })
        )));

    });
  }
  private updateItems() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.updateItems),
        withLatestFrom(this.sheduleStoreService.selectSection),
        map(([{ items }, section]) => {
          const id = section.data.key;
          const defaults: Schedule = {
            workouts: null,
            meals: null,
            section: section.sectionKey,
            timestamp: new Date(section.day).getTime()
          };
          const payload = {
            ...(id ? section.data : defaults),
            ...items
          };
          if (id) {
            return ScheduleActions.updateSection({ id, payload });
          } else {
            return ScheduleActions.createSection({ payload });
          }
        }));
    });
  }
  private updateSection() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.updateSection),
        withLatestFrom(this.authStoreService.selectUser),
        switchMap(([{ id, payload }, user]) => this.scheduleService.update(payload, user.uid, id,).pipe(
          catchError(({ message }) => {
            return throwError(message);
          })
        )),
      );
    }, { dispatch: false });
  }

  private createSection() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(ScheduleActions.createSection),
        withLatestFrom(this.authStoreService.selectUser),
        switchMap(([{ payload }, user]) => this.scheduleService.create(payload, user.uid).pipe(
          catchError(({ message }) => {
            return throwError(message);
          })
        )),
      );
    }, { dispatch: false });
  }

  private serializeScheduls(scheduls: SnapshotAction<Schedule>[]): Schedule[] {
    return scheduls.map(schedule => {
      const { meals, workouts, section, timestamp } = schedule.payload.val();
      const { key } = schedule.payload;
      return {
        key,
        section,
        meals,
        timestamp,
        workouts,
      };
    });
  }
}

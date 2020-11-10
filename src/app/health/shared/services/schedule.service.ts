import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { from, Observable } from 'rxjs';

import { ResourseService } from '../classes/resourse';
import { ScheduleCRUD } from '../interfaces/endPoints/ScheduleCRUD.interface';
import { Schedule } from '../interfaces/models/Schedule.interface';

@Injectable()
export class ScheduleService extends ResourseService<Schedule> implements ScheduleCRUD {

  constructor(db: AngularFireDatabase) {
    super(db, 'schedule');
  }

  public findAll(uid: string, dateRange: { startAt: number, endAt: number; }): Observable<SnapshotAction<Schedule>[]> {
    const { startAt, endAt } = dateRange;
    return this.db.list<Schedule>(`schedule/${uid}`, ref => ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)).snapshotChanges();
  }

}

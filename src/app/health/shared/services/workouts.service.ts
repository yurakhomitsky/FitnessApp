import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { Workout } from '../interfaces/Workout.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  constructor(private db: AngularFireDatabase) { }

  public findAll(uid: string): Observable<SnapshotAction<Workout>[]> {
    return this.db.list<Workout>(`workouts/${uid}`).snapshotChanges();
  }

  public find(uid: string, key: string): Observable<SnapshotAction<Workout>[]> {
    return this.db.list<Workout>(`workouts/${uid}`, ref => ref.orderByKey().equalTo(key)).snapshotChanges();
  }

  public create(workout: Workout, uid: string): Observable<firebase.database.Reference> {
    return from(this.db.list<Workout>(`workouts/${uid}`).push(workout));
  }

  public update(workout: Workout, uid: string, key: string): Observable<void> {
    return from(this.db.object<Workout>(`workouts/${uid}/${key}`).update(workout));
  }

  public remove(key: string, uid: string): Observable<void> {
    return from(this.db.list<Workout>(`workouts/${uid}`).remove(key));
  }
}

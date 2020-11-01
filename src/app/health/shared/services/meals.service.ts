import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { from, Observable } from 'rxjs';


import { Meal } from '../interfaces/Meal.interface';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private db: AngularFireDatabase) { }

  public findAll(uid: string): Observable<SnapshotAction<Meal>[]> {
    return this.db.list<Meal>(`meals/${uid}`).snapshotChanges();
  }

  public find(uid: string, key: string): Observable<SnapshotAction<Meal>[]> {
    return this.db.list<Meal>(`meals/${uid}`, ref => ref.orderByKey().equalTo(key)).snapshotChanges();
  }

  public create(meal: Meal, uid: string): Observable<firebase.database.Reference> {
    return from(this.db.list<Meal>(`meals/${uid}`).push(meal));
  }

  public update(meal: Meal, uid: string, key: string): Observable<void> {
    return from(this.db.object<Meal>(`meals/${uid}/${key}`).update(meal));
  }

  public remove(key: string, uid: string): Observable<void> {
    return from(this.db.list<Meal>(`meals/${uid}`).remove(key));
  }
}

import { Observable } from 'rxjs';
import { SnapshotAction } from '@angular/fire/database';

export interface BaseCRUD<T> {
  create(T, uid: string): Observable<firebase.database.Reference>;
  update(T, uid: string, key: string): Observable<void>;
  remove(key: string, uid: string): Observable<void>;
  findAll(uid: string, T): Observable<SnapshotAction<T>[]>;
  find(uid: string, key: string): Observable<SnapshotAction<T>[]>;
}

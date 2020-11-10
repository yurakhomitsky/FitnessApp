import { BaseCRUD } from '../interfaces/endPoints/BaseCRUD.interface';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { from, Observable } from 'rxjs';


export class ResourseService<T> implements BaseCRUD<T>  {
  private _endpoint = '';

  get endpoint(): string {
    return this._endpoint;
  }

  set endpoint(endpoint: string) {
    if (endpoint.length <= 0) {
      throw new Error('endpoint should be present');
    }
    this._endpoint = endpoint;
  }

  constructor(protected db: AngularFireDatabase, endpoint: string) {
    this.endpoint = endpoint;
  }
  public findAll(uid: string, ...args: any): Observable<SnapshotAction<T>[]>;
  public findAll(uid: string): Observable<SnapshotAction<T>[]> {
    return this.db.list<T>(`${this.endpoint}/${uid}`).snapshotChanges();
  }

  public find(uid: string, key: string): Observable<SnapshotAction<T>[]> {
    return this.db.list<T>(`${this.endpoint}/${uid}`, ref => ref.orderByKey().equalTo(key)).snapshotChanges();
  }

  public create(item: T, uid: string): Observable<firebase.database.Reference> {
    return from(this.db.list<T>(`${this.endpoint}/${uid}`).push(item));
  }

  public update(item: T, uid: string, key: string): Observable<void> {
    return from(this.db.object<T>(`${this.endpoint}/${uid}/${key}`).update(item));
  }

  public remove(key: string, uid: string): Observable<void> {
    return from(this.db.list<T>(`${this.endpoint}/${uid}`).remove(key));
  }
}

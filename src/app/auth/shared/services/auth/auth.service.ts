import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../../../interfaces/User.interface';
import { AuthStoreService } from '../../../store/services/auth.store.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private authStoreService: AuthStoreService) { }

  get authState(): Observable<firebase.User> {
    return this.auth.authState;
  }

  public createUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.auth.createUserWithEmailAndPassword(email, password));
  }

  public loginUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  public logOutUser(): Observable<void> {
    return from(this.auth.signOut()).pipe(tap(() => this.authStoreService.logOut()));
  }
}

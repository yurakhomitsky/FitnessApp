import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../reducers/index';
import { logOut, logIn, signUp, getCurrentUser } from '../actions/user.actions';
import { User } from '../../../interfaces/User.interface';
import { Observable } from 'rxjs';
import { selectUser, selectUserError, selectUserAuthenticated } from '../selectors/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  constructor(private store: Store<AuthState>) { }

  public logIn(email: string, password: string): void {
    this.store.dispatch(logIn({
      email,
      password
    }));
  }

  public signUp(email: string, password: string): void {
    this.store.dispatch(signUp({
      email,
      password
    }));
  }

  public getCurrentUser(): void {
    this.store.dispatch(getCurrentUser());
  }

  public logOut(): void {
    this.store.dispatch(logOut());
  }

  get selectUser(): Observable<User> {
    return this.store.pipe(select(selectUser));
  }
  get selectUserError(): Observable<string> {
    return this.store.pipe(select(selectUserError));
  }

  get selectUserAuthenticated(): Observable<boolean> {
    return this.store.pipe(select(selectUserAuthenticated));
  }
}

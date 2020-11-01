import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, exhaustMap, withLatestFrom, filter, takeUntil } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { User } from '../../../interfaces/User.interface';
import { of } from 'rxjs';
import { AuthStoreService } from '../services/auth.store.service';

// tslint:disable: typedef

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService) { }

  public getCurrentUser$ = this.getCurrentUser();
  public signUpUser$ = this.signUpUser();
  public logInUser$ = this.logInUser();
  public logInSuccess$ = this.logInSuccess();
  public authFailure$ = this.authFailure();
  public logOutUser$ = this.logOutUser();


  private logInUser() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.logIn),
        exhaustMap(({ email, password }) => this.authService.loginUser(email, password).pipe(
          map((userCredential) => {
            const user = this.getUser(userCredential);
            return UserActions.logInSuccess({ user });
          }),
          catchError(({ message }) => {
            return of(UserActions.logInFailure({ errorMessage: message }));
          })
        )),

      );
    });
  }

  private logInSuccess() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.logInSuccess, UserActions.signUpSuccess),
        tap(() => this.router.navigate(['/']))
      );
    }, {
      dispatch: false
    });
  }

  private signUpUser() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.signUp),
        exhaustMap(({ email, password }) => this.authService.createUser(email, password).pipe(
          map((userCredential) => {
            const user = this.getUser(userCredential);
            return UserActions.signUpSuccess({ user });
          }),
          catchError(({ message }) => {
            return of(UserActions.signUpFailure({ errorMessage: message }));
          })
        )),
      );
    });
  }

  private authFailure() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.logInFailure, UserActions.logInFailure),
        tap(() => { })

      );
    }, {
      dispatch: false
    });
  }

  private logOutUser() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.logOut),
        tap(() => this.router.navigate(['/auth/login']))
      );
    }, {
      dispatch: false
    });
  }

  private getCurrentUser() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.getCurrentUser),
        switchMap(() => this.authService.authState.pipe(
          map((firebaseUser) => {
            if (!firebaseUser) {
              return UserActions.logOut();
            }
            const { email, uid } = firebaseUser;
            const user: User = {
              email,
              uid,
            };
            return UserActions.getCurrentUserSuccess({ user });
          }),
          catchError(({ message }) => {
            return of(UserActions.getCurrentFailure());
          }),
          takeUntil(
            this.actions$.pipe(
              ofType(UserActions.logInSuccess, UserActions.signUpSuccess)),
          )
        )),
      );
    });
  }

  private getUser(userCredential: firebase.auth.UserCredential): User {
    const { email, uid } = userCredential.user;
    const user: User = {
      email,
      uid,
    };
    return user;
  }
}

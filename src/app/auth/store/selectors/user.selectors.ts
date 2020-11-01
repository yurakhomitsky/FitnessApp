import { createSelector } from '@ngrx/store';
import { selectAuthState, AuthState } from '../reducers/index';
import { UserState } from '../reducers/user.reducer';


export const selectUserState = createSelector(
  selectAuthState,
  (state: AuthState) => state.userStatus
);

export const selectUser = createSelector(
  selectUserState,
  (userState: UserState) => userState.user
);

export const selectUserError = createSelector(
  selectUserState,
  (userState: UserState) => userState.errorMessage
);

export const selectUserAuthenticated = createSelector(
  selectUserState,
  (userState: UserState) => userState.authenticated
);

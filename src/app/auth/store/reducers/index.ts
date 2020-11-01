import * as fromUser from './user.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export const authFeatureKey = 'authModule';

export interface AuthState {
  userStatus: fromUser.UserState;
}

export const reducers: ActionReducerMap<AuthState> = {
  userStatus: fromUser.reducer
};

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

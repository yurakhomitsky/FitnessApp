import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from '../../../interfaces/User.interface';


export interface UserState {
  user: User | null;
  authenticated: boolean;
  errorMessage: string;
}

export const initialState: UserState = {
  user: null,
  authenticated: false,
  errorMessage: ''
};


export const userReducer = createReducer(
  initialState,

  on(UserActions.logInSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      errorMessage: '',
      authenticated: true,
    };
  }),
  on(UserActions.signUpSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      errorMessage: '',
      authenticated: true,
    };
  }),
  on(UserActions.getCurrentUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      errorMessage: '',
      authenticated: true,
    };
  }),
  on(UserActions.getCurrentFailure, (state, action) => {
    return {
      ...state,
      user: null,
      errorMessage: '',
      authenticated: false,
    };
  }),
  on(UserActions.logInFailure, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
      authenticated: false
    };
  }),
  on(UserActions.signUpFailure, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
      authenticated: false,
    };
  }),
  on(UserActions.logOut, (state, action) => {
    return initialState;
  }),

);
export function reducer(state: UserState | undefined, action: Action): UserState {
  return userReducer(state, action);
}


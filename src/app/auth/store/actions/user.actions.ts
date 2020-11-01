import { createAction, props } from '@ngrx/store';
import { User } from '../../../interfaces/User.interface';




export const signUp = createAction(
  '[Auth] User SignUp',
  props<{ email: string, password: string; }>()
);

export const signUpSuccess = createAction(
  '[Auth] signUp Success',
  props<{ user: User; }>()
);

export const signUpFailure = createAction(
  '[Auth] signUp Failure',
  props<{ errorMessage: string; }>()
);

export const logIn = createAction(
  '[Auth] User Login',
  props<{ email: string, password: string; }>()
);
export const getCurrentUser = createAction(
  '[Auth] Get Current User'
);

export const getCurrentUserSuccess = createAction(
  '[Auth] Get Current User Success',
  props<{ user: User; }>()
);

export const getCurrentFailure = createAction(
  '[Auth] Get Current User Failure'
);

export const logInSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; }>()
);

export const logInFailure = createAction(
  '[Auth] Login Failure',
  props<{ errorMessage: string; }>()
);

export const logOut = createAction(
  '[Auth] User Logout'
);



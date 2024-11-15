import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { UserActions } from './user.actions';
import { UserEntity } from './user.models';
import { JwtModel } from '../../common/models/jwt.model';

export const USER_FEATURE_KEY = 'user';

export interface UserState extends EntityState<UserEntity> {
  theme: 'light' | 'dark';
  language: 'en' | 'pl';
  user?: JwtModel;
  selectedId?: string | number; // which User record has been selected
  loaded: boolean; // has the User list been loaded
  error?: string | null; // last known error (if any)
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const userAdapter: EntityAdapter<UserEntity> =
  createEntityAdapter<UserEntity>();

export const initialUserState: UserState = userAdapter.getInitialState({
  theme: 'light',
  language: 'en',
  loaded: false,
});

const reducer = createReducer(
  initialUserState,
  on(UserActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(UserActions.loadUserSuccess, (state, { user }) =>
    userAdapter.setAll(user, { ...state, loaded: true }),
  ),
  on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error })),
  on(
    UserActions.languageToggle,
    (state): UserState => ({
      ...state,
      language: state.language === 'en' ? 'pl' : 'en',
    }),
  ),
  on(
    UserActions.themeToggle,
    (state): UserState => ({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light',
    }),
  ),
  on(UserActions.login, (state, { user }): UserState => ({ ...state, user })),
  on(UserActions.logout, (state): UserState => ({ ...state, user: undefined })),
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}

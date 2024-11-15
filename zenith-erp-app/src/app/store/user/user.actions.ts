import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserEntity } from './user.models';
import { JwtModel } from '../../common/models/jwt.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    Init: emptyProps(),
    'Theme toggle': emptyProps(),
    'Language toggle': emptyProps(),
    Login: props<{ user: JwtModel }>(),
    Logout: emptyProps(),
    'Save settings success': emptyProps(),
    'Save settings failure': props<{ error: string }>(),
    'Load User Success': props<{ user: UserEntity[] }>(),
    'Load User Failure': props<{ error: string }>(),
  },
});

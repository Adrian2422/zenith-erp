import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import * as userEffects from './user.effects';

describe('UserEffects', () => {
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideMockActions(() => actions), provideMockStore()],
    });
  });

  it('should be created', () => {
    expect(userEffects).toBeTruthy();
  });
});

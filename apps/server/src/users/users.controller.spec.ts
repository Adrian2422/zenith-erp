import { TestBed } from '@suites/unit';

import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeAll(async () => {
    const { unit } = await TestBed.solitary(UsersController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

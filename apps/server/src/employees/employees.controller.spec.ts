import { TestBed } from '@suites/unit';

import { EmployeesController } from './employees.controller';

describe('EmployeesController', () => {
  let controller: EmployeesController;

  beforeAll(async () => {
    const { unit } = await TestBed.solitary(EmployeesController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

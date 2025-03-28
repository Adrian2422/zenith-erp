import { TestBed } from '@suites/unit';

import { EmployeesService } from './employees.service';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeAll(async () => {
    const { unit } = await TestBed.solitary(EmployeesService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

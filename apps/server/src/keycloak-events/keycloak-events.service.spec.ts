import { TestBed } from '@suites/unit';

import { KeycloakEventsService } from './keycloak-events.service';

describe('KeycloakEventsService', () => {
  let service: KeycloakEventsService;

  beforeAll(async () => {
    const { unit } = await TestBed.solitary(KeycloakEventsService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

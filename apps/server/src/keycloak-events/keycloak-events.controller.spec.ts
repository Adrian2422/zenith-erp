import { TestBed } from '@suites/unit';

import { KeycloakEventsController } from './keycloak-events.controller';

describe('KeycloakEventsController', () => {
  let controller: KeycloakEventsController;

  beforeAll(async () => {
    const { unit } = await TestBed.solitary(KeycloakEventsController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

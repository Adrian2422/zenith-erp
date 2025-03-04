import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Public } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  public getData(): { message: string } {
    return this.appService.getData();
  }
}

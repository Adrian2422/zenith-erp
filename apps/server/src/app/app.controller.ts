import { Controller, Get } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  public getData(): { message: string } {
    return this.appService.getData();
  }
}

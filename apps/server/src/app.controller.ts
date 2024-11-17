import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Public } from './common/decorators/public.decorator';

@Controller('/')
export class AppController {
  @ApiExcludeEndpoint()
  @Public()
  @Get()
  index() {
    return 'Welcome to ZenithERP api!';
  }
}

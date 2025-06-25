import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { EventDTO } from '@kids-app/share';
import { TestService } from './test.service';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @ApiOperation({ description: 'Get all Backend Test' })
  @ApiResponse({ type: String, description: 'Return of test string' })
  @ApiResponse({ status: 200, description: 'Return of test string' })
  getTest(): Observable<string> {
    return this.testService.getBackendTest(); 
  }
}
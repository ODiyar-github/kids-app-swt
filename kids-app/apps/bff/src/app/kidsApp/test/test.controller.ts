import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { EventDTO } from '@kids-app/share';
import { TestService } from './test.service';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @ApiOperation({ summary: 'Test-Endpunkt', description: 'Empfängt ein EventDTO und gibt eine Test-Antwort zurück.' })
  @ApiResponse({ status: 200, description: 'Erfolgreiche Antwort mit einem Test-String', type: String })
  public getTest(): Observable<string> {
    console.log('Empfangene Anfrage vom Test');
    return this.testService.getBackendTest();
  }
}
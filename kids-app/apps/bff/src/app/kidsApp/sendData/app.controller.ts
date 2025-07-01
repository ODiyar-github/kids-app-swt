import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('AppController')
@Controller('appcontroller')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @ApiOperation({ summary: 'Test-Endpunkt', description: 'Empfängt ein EventDTO und gibt eine Test-Antwort zurück.' })
  @ApiResponse({ status: 200, description: 'Erfolgreiche Antwort mit einem Test-String', type: String })
  public getTest(): Observable<string> {
    console.log('Empfangene Anfrage vom Test');
    return this.appService.sendMockupData();
  }
}

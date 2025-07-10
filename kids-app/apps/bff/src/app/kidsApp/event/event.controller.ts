import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable, of } from 'rxjs';
import { EventDTO, EventMockups } from '@kids-app/share';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({ summary: 'Alle Events abrufen' })
  @ApiResponse({ status: 200, description: 'Liste aller Events', type: [EventDTO] })
  getAllEvents(): Observable<EventDTO[]> {
    console.log('📥 Anfrage: Alle Events');
    return this.eventService.getAllEvents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ein Event nach ID abrufen' })
  @ApiResponse({ status: 200, description: 'Einzelnes Event', type: EventDTO })
  getEventById(@Param('id') id: string): Observable<EventDTO> {
    console.log(`📥 Anfrage: Event mit ID ${id}`);
    return this.eventService.getEventById(id);
  }
}
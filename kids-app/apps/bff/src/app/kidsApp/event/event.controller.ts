import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { EventDTO } from '@kids-app/share';

@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({ description: 'Get all Events' })
  @ApiResponse({ type: String, description: 'Return of all events that is currently saved.' })
  @ApiResponse({ status: 200, description: 'A list of the stored events' })
  getAllEvents(): Observable<EventDTO[]> {
    return this.eventService.getAllEvents(); 
  }

  @Get(':id')
  @ApiParam({ name: 'uuid', type: String })
  getEventById(@Param('id') id: string): Observable<EventDTO> {
    return this.eventService.getEventById(id);
  }
}
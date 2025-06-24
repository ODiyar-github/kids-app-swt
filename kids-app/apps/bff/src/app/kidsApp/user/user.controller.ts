import { Controller, Get, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from '@kids-app/share';
import { Observable } from 'rxjs';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  @ApiQuery({ name: 'username', type: String })
  @ApiQuery({ name: 'password', type: String })
  @ApiResponse({ status: 200, description: 'The image with the given uuid.', type: String })
  @ApiResponse({ status: 404, description: 'Image not found' })
  login(@Query('username') username: string, @Query('password') password: string): Observable<UserDTO> {
    return this.userService.login(username, password);
  }

  @Get(':uuid')
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: 200, description: 'The user with the given uuid.', type: String })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUser(@Param('uuid') uuid: string):Observable<UserDTO> {
    return this.userService.getUser(uuid);
  }
}
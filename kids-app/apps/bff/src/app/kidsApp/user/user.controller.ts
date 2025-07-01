import { Controller, Get, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from '@kids-app/share';
import { Observable } from 'rxjs';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'User bei erfolgreichem Login', type: UserDTO })
  login(
    @Query('username') username: string,
    @Query('password') password: string
  ): Observable<UserDTO> {
    console.log(`🔐 Loginversuch für ${username}`);
    return this.userService.login(username, password);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'User nach UUID abrufen' })
  @ApiResponse({ status: 200, description: 'Einzelner User', type: UserDTO })
  getUser(@Param('uuid') uuid: string): Observable<UserDTO> {
    console.log(`📥 Anfrage: User mit UUID ${uuid}`);
    return this.userService.getUser(uuid);
  }
}
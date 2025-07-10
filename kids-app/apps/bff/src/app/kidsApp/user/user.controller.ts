import { Controller, Get, Query, Param, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginDTO, UserDTO } from '@kids-app/share';
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

  @Get('all')
  @ApiOperation({ summary: 'Get All User' })
  @ApiResponse({ status: 200, description: 'Alle User', type: UserDTO })
  @ApiResponse({ status: 404, description: 'Users nicht gefunden' })
  getAllUser():Observable<UserDTO[]>{
    return this.userService.getAllUser();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'User nach UUID abrufen' })
  @ApiResponse({ status: 200, description: 'Einzelner User', type: UserDTO })
  getUser(@Param('uuid') uuid: string): Observable<UserDTO> {
    console.log(`📥 Anfrage: User mit UUID ${uuid}`);
    return this.userService.getUser(uuid);
  }

  @Put() 
  @ApiOperation({ summary: 'AuthLoginDTO und zugehörigen Benutzer aktualisieren' })
  @ApiResponse({ status: 200, description: 'Aktualisierter User', type: UserDTO })
  @ApiResponse({ status: 404, description: 'AuthLoginDTO oder User nicht gefunden' })
  updateAuthLoginDTO(
    @Body() authLoginDTO: AuthLoginDTO // Erwarte das komplette AuthLoginDTO im Body
  ): Observable<UserDTO> {
    return this.userService.updateAuthLoginDTO(authLoginDTO);
  }
}
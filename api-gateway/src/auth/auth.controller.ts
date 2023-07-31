import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiOkResponse({
    description: 'Access token',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Post('/login')
  async login(@Body() login: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(login);
  }
}

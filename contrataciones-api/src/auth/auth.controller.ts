import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  /*
  @Post('/login')
  login(@Body() token: string){
    return this.authService.validateToken(token);
  }
    */

}

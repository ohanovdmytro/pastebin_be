import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body, @Res() res) {
    try {
      const { email, password } = body;
      const user = await this.authService.register(email, password);
      res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  @Post('login')
  async login(@Body() body, @Res() res) {
    try {
      const { email, password } = body;
      const { token, user } = await this.authService.login(email, password);
      res.status(HttpStatus.OK).json({ token, user });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
    }
  }
}

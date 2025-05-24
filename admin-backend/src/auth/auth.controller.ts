import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(
    @Body()
    dto: {
      name: string;
      email: string;
      password: string;
      role: 'admin' | 'viewer';
    },
  ) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: { email: string; password: string }) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  getProfile(@Request() req) {
    return req.user;
  }
}

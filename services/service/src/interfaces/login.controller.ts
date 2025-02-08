import { Controller, Get, Body } from '@nestjs/common';
import { UserService } from '../application/services/user.service';

@Controller('login')
export class LoginController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async login(@Body() body: { email: string; password: string }) {
    return this.userService.login(body.email, body.password);
  }
}

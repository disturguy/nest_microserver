import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthUserDTO } from './users/dto/auth-user.dto';
import { ValidatedUser } from './users/dto/validated-user.dto';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}


  @ApiCreatedResponse({type: ValidatedUser})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Body() body: AuthUserDTO): any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }
}

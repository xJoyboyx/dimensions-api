import {
  Body,
  Controller, Delete, Get,
  HttpCode,
  HttpStatus, Param,
  Post,
  Res
} from "@nestjs/common";
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return this.usersService.findById(userId);
  }
  @Delete(':userId')
  @HttpCode(204) // HTTP 204 No Content on successful deletion
  async deleteById(@Param('userId') userId: string): Promise<void> {
    await this.usersService.deleteById(userId);
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.create(
      createUserDto.service_type,
      createUserDto.external_id,
      createUserDto.email,
    );

    if (user.createdAt === user.updatedAt) {
      res.status(HttpStatus.CREATED).send(user);
    } else {
      res.status(HttpStatus.OK).send(user);
    }
  }
}

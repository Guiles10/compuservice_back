import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUseDto } from './dto/create-user.dto';
import { UpdateUseDto } from './dto/update-user.dto';
import { JWTAuthGuard } from '../auth/jwt.auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiBearerAuth()
  @Post('')
  create(@Body() createUserDto: CreateUseDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUseDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
import { Body, Controller, Get, HttpCode, Param, Delete, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { TimerService } from './timer.service';
import { PomodoroSessionDto } from './dto/session.dto';
import { RoundDto } from './dto/round.dto';

@Controller('user/timer')
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

@Get('today')
 @Auth()
 async getAll(@CurrentUser('id') userId: string){
  return this.timerService.getTodaySession(userId)
 }

 @UsePipes(new ValidationPipe())
 @HttpCode(200)
 @Post('create')
 @Auth()
 async create( @CurrentUser('id') userId: string){
  return this.timerService.create(userId)
 }

 @UsePipes(new ValidationPipe())
 @HttpCode(200)
 @Put(':id')
 @Auth()
 async update(
  @Body() dto: PomodoroSessionDto,
  @CurrentUser('id') userId: string,
  @Param('id') id:string
){
  return this.timerService.update(id, dto, userId)
 }


 @UsePipes(new ValidationPipe())
 @HttpCode(200)
 @Put('/round/:id')
 @Auth()
 async updateRound(
  @Body() dto: RoundDto,
  @Param('id') id:string
){
  return this.timerService.updateRound(id, dto)
 }


 @HttpCode(200)
 @Delete(':id')
 @Auth()
 async delete(@Param('id') id:string){
  return this.timerService.delete(id)
 }
}




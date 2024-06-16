import { Body, Controller, Get, HttpCode, Param, Delete, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { TaskDto } from './dto/task.dto';

@Controller('user/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

 @Get()
 @Auth()
 async getAll(@CurrentUser('id') userId: string){
  return this.taskService.getAll(userId)
 }

 @UsePipes(new ValidationPipe())
 @HttpCode(200)
 @Post('create')
 @Auth()
 async create(@Body() dto: TaskDto, @CurrentUser('id') userId: string){
  return this.taskService.create(dto, userId)
 }



 @UsePipes(new ValidationPipe())
 @HttpCode(200)
 @Put(':id')
 @Auth()
 async update(
  @Body() dto: TaskDto,
  @CurrentUser('id') userId: string,
  @Param('id') id:string
){
  return this.taskService.update(id, dto, userId)
 }

 @HttpCode(200)
 @Delete(':id')
 @Auth()
 async delete(@Param('id') id:string){
  return this.taskService.delete(id)
 }

}




import { Body, Controller, Get, HttpCode, Param, Delete, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { TimeBlockService } from './timeBlock.service';
import { TimeBlockDto } from './dto/timeBlock.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Controller('user/time-block')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

@Get()
 @Auth()
 async getAll(@CurrentUser('id') userId: string){
  return this.timeBlockService.getAll(userId)
 }

 @UsePipes(new ValidationPipe())
 @HttpCode(200)
 @Post('create')
 @Auth()
 async create(@Body() dto: TimeBlockDto, @CurrentUser('id') userId: string){
  return this.timeBlockService.create(dto, userId)
 }

 @UsePipes(new ValidationPipe())
 @HttpCode(200)
 @Put('update-order')
 @Auth()
 async updateOrder(
  @Body() dto: UpdateOrderDto,
){
  return this.timeBlockService.updateOrder(dto.ids)
 }

 
 @UsePipes(new ValidationPipe())
 @HttpCode(200)
 @Put(':id')
 @Auth()
 async update(
  @Body() dto: TimeBlockDto,
  @CurrentUser('id') userId: string,
  @Param('id') id:string
){
  return this.timeBlockService.update(id, dto, userId)
 }

 @HttpCode(200)
 @Delete(':id')
 @Auth()
 async delete(@Param('id') id:string){
  return this.timeBlockService.delete(id)
 }

}




import { Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { TaskDto } from './dto/task.dto';


@Injectable()
export class TaskService {
 constructor(private prisma: PrismaService){}

 getAll(id:string){
  return this.prisma.task.findMany({
    where:{
      id
    }
    
  })
 }

async  create(dto:TaskDto, userId: string){
  return this.prisma.task.create({
    data: {
      ...dto,
      user: {
        connect: {
          id:userId
        }
      }
    }
  })
 }

 async  update(taskId: string, dto: Partial<TaskDto>, userId: string){

  return this.prisma.task.update({
    where: {
      userId,
      id: taskId
    },
    data:dto
  })
 }

 async  delete(taskId: string){
  
  return this.prisma.task.delete({
    where: {
      id:taskId
    }
  })
 }
}

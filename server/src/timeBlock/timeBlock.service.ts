import { Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TimeBlockDto } from './dto/timeBlock.dto';


@Injectable()
export class TimeBlockService {
 constructor(private prisma: PrismaService){}

 getAll(id:string){
  return this.prisma.timeBlock.findMany({
    where:{
      userId:id
    },
    orderBy: {
      order: 'asc'
    }
  })
 }

 async  create(dto:TimeBlockDto, userId: string){
  return this.prisma.timeBlock.create({
    data: {
      ...dto,
      user: {
        connect: {
          id:userId
        }, 
      }
    }
  })
 }

 async  update(timeBlockId: string, dto: Partial<TimeBlockDto>, userId: string){

  return this.prisma.timeBlock.update({
    where: {
      userId,
      id: timeBlockId
    },
    data:dto
  })
 }

 async  delete(timeBlockId: string){
  return this.prisma.timeBlock.delete({
    where: {
      id:timeBlockId
    }
  })
 }

 async updateOrder(ids: string[]){
  return this.prisma.$transaction(
    ids.map((id, i)=>
    this.prisma.timeBlock.update({
      where:{id},
      data: {order: i+1}
    }))
  )
 }
 
}

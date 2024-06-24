import { Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PomodoroSessionDto } from './dto/session.dto';
import { RoundDto } from './dto/round.dto';


@Injectable()
export class TimerService {
 constructor(private prisma: PrismaService){}

 async getTodaySession(userId:string){
  const today = new Date().toISOString().split('T')[0]

  return this.prisma.pomodoroSession.findFirst({
    where:{
      createdAt: {
        gte: new Date(today)
      },
      userId: userId,
    },
    include: {
      rounds:{
        orderBy: {
          id: 'asc'
        }
      }
    }
  })
 }

 async create(userId:string){
  const todaySession = await this.getTodaySession(userId)

  if(todaySession) return todaySession

  const user = this.prisma.user.findUnique({
    where:{
      id: userId
    },
    select: {
      intervalCount: true
    }
  })

  if(!user) throw new NotFoundException('User not found')

    return this.prisma.pomodoroSession.create({
      data:{
        rounds:{
          createMany:{
            data: Array.from({length: (await user).intervalCount},()=>({
              totalSeconds: 0
            }))
          }
        },
        user:{
          connect:{
            id:userId
          }
        }
      },
      include: {
        rounds: true
      }
    })
 }

 async  update(sessionId: string, dto: Partial<PomodoroSessionDto>, userId: string){
  return this.prisma.pomodoroSession.update({
    data:dto,
    where:{
      userId,
      id:sessionId
    }
  })
 }

 async  updateRound(roundId: string, dto: Partial<RoundDto>){
  return this.prisma.pomodoroRound.update({
    where:{
      id:roundId
    },
    data:dto
  })
 }

 async  delete(sessionId: string){
  return this.prisma.pomodoroSession.delete({
    where: {
      id: sessionId
    }
  })
 }


}

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TimeBlockController } from './timeBlock.controller';
import { TimeBlockService } from './timeBlock.service';

@Module({
  controllers: [TimeBlockController],
  providers: [TimeBlockService, PrismaService],
  exports: [TimeBlockService]
})
export class TimeBlockModule {}

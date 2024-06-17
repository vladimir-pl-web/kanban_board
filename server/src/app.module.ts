import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TimeBlockModule } from './timeBlock/timeBlock.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), UserModule, TaskModule, TimeBlockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

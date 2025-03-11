import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GroqService } from './groq.service';
import { GroqController } from './groq.controller';

@Module({
  providers: [GroqService],
  imports:[ConfigModule.forRoot()],
  controllers: [GroqController]
})
export class GroqModule {}

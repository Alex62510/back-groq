import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GroqModule } from './groq/groq.module';

@Module({
  imports: [ConfigModule.forRoot(), GroqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

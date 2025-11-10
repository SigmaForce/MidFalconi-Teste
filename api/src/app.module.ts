import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesService } from './profiles/profiles.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ProfilesService],
})
export class AppModule {}

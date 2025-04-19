import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoritesModule } from './jobs/favorites/favorites.module';

@Module({
  imports: [FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoritesModule } from './jobs/favorites/favorites.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { DBModule } from './db.module';
import { StaticServerModule } from './static-server.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    StaticServerModule,
    DBModule,
    FavoritesModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}

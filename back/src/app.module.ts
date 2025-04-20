import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoritesModule } from './jobs/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // import all entities across the project
      synchronize: true,
    }),
    FavoritesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

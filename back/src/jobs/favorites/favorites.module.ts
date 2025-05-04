import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Job } from './entities/job.entity';
import { Favorite } from './entities/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Job])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [TypeOrmModule],
})
export class FavoritesModule {}

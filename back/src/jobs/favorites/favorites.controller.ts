import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create({poleEmploiRef : createFavoriteDto.poleEmploiRef, userId : createFavoriteDto.userId});
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Delete()
  remove(@Body() deleteFavoriteDto: DeleteFavoriteDto) {
    return this.favoritesService.remove({poleEmploiRef : deleteFavoriteDto.poleEmploiRef, userId : deleteFavoriteDto.userId});
  }
}

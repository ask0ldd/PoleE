import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { Job } from './entities/job.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async create({poleEmploiRef, userId} : {poleEmploiRef : string, userId : number}) : Promise<Favorite> {

    // Check if user exists
    const user = await this.userRepository.findOne({where : {id : userId}})
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`)
    }

    // Check if job exists
    let job = await this.jobsRepository.findOne({where: {poleEmploiRef}})
    if(!job) job = await this.jobsRepository.save({poleEmploiRef})

    const existingFavorite = await this.favoritesRepository.findOne({
      where: { jobId: job.id, userId: user.id },
    })
    if (existingFavorite) {
      throw new ConflictException('Favorite already exists for this user and job')
    }

    // Create and return new favorite
    const favorite = this.favoritesRepository.create({
      jobId: job.id,
      userId: user.id,
    })
    return this.favoritesRepository.save(favorite)
  }

  findAll() {
    return `This action returns all favorites`
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`
  }

  async remove({poleEmploiRef, userId} : {poleEmploiRef : string, userId : number}) {

    const existingFavorite = await this.favoritesRepository.createQueryBuilder('favorite')
    .innerJoinAndSelect('favorite.job', 'job')
    .where('job.poleEmploiRef = :poleEmploiRef', { poleEmploiRef })
    .andWhere('favorite.userId = :userId', { userId })
    .getOne()

    if (!existingFavorite) {
      throw new ConflictException('Favorite doesnt exist for this user and job')
    }

    return await this.favoritesRepository.remove(existingFavorite)
  }
}

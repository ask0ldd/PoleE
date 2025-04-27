import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // import all entities across the project
      synchronize: true,
      dropSchema: true, // !!! dev mode
    }),
  ],
})
export class DBModule {}
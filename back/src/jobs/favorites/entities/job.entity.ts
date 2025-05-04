import { Entity, PrimaryGeneratedColumn, ManyToMany, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";
import { User } from "../../../users/entities/user.entity";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    poleEmploiRef : string
    
    @ManyToMany(() => User, user => user.favoriteJobs)
    favoritedBy: User[];

    @UpdateDateColumn({name : "updated_at"})
    updatedAt : Date

    @CreateDateColumn({name : "created_at"})
    createdAt : Date
}
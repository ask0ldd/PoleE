import { Entity, ManyToOne, JoinColumn, Unique, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Job } from "./job.entity";
import { User } from "../../../users/entities/user.entity";

@Entity('favorites')
@Unique(['user', 'job'])
export class Favorite {
    @PrimaryColumn({ name: 'user_id', type: 'int' })
    userId: number;
  
    @PrimaryColumn({ name: 'job_id', type: 'int' })
    jobId: number;
  
    @ManyToOne(() => User, user => user.favoriteJobs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Job, job => job.favoritedBy, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'job_id' })
    job: Job;

    @UpdateDateColumn({name : "updated_at"})
    updatedAt : Date

    @CreateDateColumn({name : "created_at"})
    createdAt : Date
}
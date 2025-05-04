import { Job } from 'src/jobs/favorites/entities/job.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password : string
        
    @ManyToMany(() => Job, job => job.favoritedBy)
    @JoinTable({ // This side owns the relationship and creates the join table
        name: 'favorites',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'job_id', referencedColumnName: 'id' }
    })
    favoriteJobs: Job[];

    @UpdateDateColumn({name : "updated_at"})
    updatedAt : Date

    @CreateDateColumn({name : "created_at"})
    createdAt : Date
}
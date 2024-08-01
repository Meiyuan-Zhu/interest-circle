// 存储帖子信息
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Circle } from './Circle';
import { Comment } from './Comment';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts)
  author: User;

  @ManyToOne(() => Circle, circle => circle.posts)
  circle: Circle;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @Column('simple-array', { nullable: true })
  images: string[];
}

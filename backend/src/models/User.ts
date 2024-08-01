// 存储用户基本信息
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Circle } from './Circle';
import { Post } from './Post';
import { Comment } from './Comment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Circle, circle => circle.owner)
  circles: Circle[];

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];
}

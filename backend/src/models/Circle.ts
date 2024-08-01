// 存储兴趣圈信息
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Circle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.circles)
  owner: User;

  @OneToMany(() => Post, post => post.circle)
  posts: Post[];
}

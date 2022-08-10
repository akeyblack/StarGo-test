import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @Column()
  completed: boolean;

  @Column({select: false})
  userId: string;
}

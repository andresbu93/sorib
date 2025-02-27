import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalId: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  category: string;

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  amount: string;

  @Column()
  createdAt: string;
}

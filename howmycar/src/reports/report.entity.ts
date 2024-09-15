import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  price: number;
}

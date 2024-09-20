import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from 'src/reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @Column({ default: true })
  isAdmin: boolean;

  @Column()
  email: string;

  @Column()
  password: string;
}

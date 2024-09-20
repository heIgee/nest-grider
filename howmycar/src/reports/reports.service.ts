import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly reportsRepo: Repository<Report>,
  ) {}

  find(): Promise<Report[]> {
    return this.reportsRepo.find({ relations: ['user'] });
  }

  create(newReport: CreateReportDto, user: User): Promise<Report> {
    const report = this.reportsRepo.create(newReport);
    report.user = user;
    return this.reportsRepo.save(report);
  }

  async changeApproval(reportId: number, isApproved: boolean): Promise<Report> {
    const report = await this.reportsRepo.findOne({
      where: { id: reportId },
      relations: ['user'],
    });
    if (!report)
      throw new NotFoundException(`Report with id: ${reportId} is not found.`);
    report.isApproved = isApproved;
    return this.reportsRepo.save(report);
  }
}

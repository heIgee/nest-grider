import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly reportsRepo: Repository<Report>,
  ) {}

  async getEstimate({ make, model, year, lat, lng, mileage }: GetEstimateDto) {
    const subquery = this.reportsRepo
      .createQueryBuilder()
      .select('*')
      .where('upper(make) like upper(:make)', { make: `%${make}%` })
      .andWhere('upper(model) like upper(:model)', { model: `%${model}%` })
      .andWhere('abs(lat - :lat) < 5', { lat })
      .andWhere('abs(lng - :lng) < 5', { lng })
      .andWhere('abs(year - :year) < 3', { year })
      .orderBy('abs(mileage - :mileage)', 'ASC')
      .setParameters({ mileage })
      .limit(3);

    return this.reportsRepo
      .createQueryBuilder()
      .select('round(avg(cars.price))', 'price')
      .from(`(${subquery.getQuery()})`, 'cars')
      .setParameters(subquery.getParameters())
      .getRawOne();
  }

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

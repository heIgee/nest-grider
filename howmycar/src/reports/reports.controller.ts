import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ReportApprovalDto } from './dtos/report-approval.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('/reports')
@Serialize(ReportDto)
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/estimate')
  getEstimate(@Query() query: GetEstimateDto) {
    console.log(query);
    return this.reportsService.getEstimate(query);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAllReports() {
    return this.reportsService.find();
  }

  @Post()
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  changeReportApproval(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ReportApprovalDto,
  ) {
    return this.reportsService.changeApproval(id, body.isApproved);
  }
}

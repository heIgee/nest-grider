import { IsBoolean } from 'class-validator';

export class ReportApprovalDto {
  @IsBoolean() isApproved: boolean;
}

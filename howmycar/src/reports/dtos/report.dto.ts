import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose() id: number;

  @Expose()
  @Transform(({ obj }) => obj.user?.id)
  userId: number;

  @Expose() isApproved: boolean;
  @Expose() price: number;
  @Expose() make: string;
  @Expose() model: string;
  @Expose() year: number;
  @Expose() lat: number;
  @Expose() lng: number;
  @Expose() mileage: number;
}

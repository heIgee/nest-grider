import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(999999)
  price: number;

  @IsString() make: string;
  @IsString() model: string;

  @IsNumber()
  @Min(1945)
  @Max(new Date().getFullYear())
  year: number;

  @IsLatitude() lat: number;
  @IsLongitude() lng: number;

  @IsNumber()
  @Min(0)
  @Max(2999999)
  mileage: number;
}

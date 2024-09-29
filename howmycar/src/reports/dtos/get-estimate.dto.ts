import {
  IsNumber,
  Min,
  Max,
  IsString,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString() make: string;
  @IsString() model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1945)
  @Max(new Date().getFullYear())
  year: number;

  @IsLatitude() lat: number;
  @IsLongitude() lng: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(2999999)
  mileage: number;
}

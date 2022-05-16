import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum FragmentsPeriod {
  ALL,
  TODAY,
  WEEK,
  MONTH,
}

export class FindFragmentsDto {
  @ApiProperty()
  @IsEnum(FragmentsPeriod)
  @IsOptional()
  period?: FragmentsPeriod;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  project?: number;

  @ApiProperty()
  @IsNumber()
  createdBy: number;
}

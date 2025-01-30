import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  name: string;

  @IsString()
  superpower: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  humilityScore: number;
}

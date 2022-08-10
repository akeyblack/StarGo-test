import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class QueryNoteDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  readonly completed: string;
}

import { IsString, Length } from 'class-validator';

export class CreateNoteDto {
  @IsString({ message: 'Must be string' })
  @Length(1, 200, { message: 'Length must be 1 to 200 chars' })
  readonly text: string;
}

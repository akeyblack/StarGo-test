import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from '../notes/entities/note.entity';

@Module({
  providers: [NotesService],
  controllers: [NotesController],
  imports: [TypeOrmModule.forFeature([
    Note,
  ])],
})
export class NotesModule {}
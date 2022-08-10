import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserId } from 'src/users/user-id.decorator';
import { NotesService } from './notes.service';
import { Note } from '../notes/entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { QueryNoteDto } from './dto/query.dto';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService
  ) {}

  @UsePipes(ValidationPipe)
  @Get('my')
  getAllByUserId(@UserId() userId: string, @Query() query: QueryNoteDto): Promise<Note[]> {
    if(query.completed) 
      return this.notesService.getAllByUserIdFiltered(userId, query.completed==='true')

    return this.notesService.getAllByUserId(userId);
  }

  @Get(':id')
  getById(@Param('id') id: string, @UserId() userId: string): Promise<Note> {
    return this.notesService.getById(id, userId);
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @UserId() userId: string): Promise<Note> {
    return this.notesService.create(createNoteDto, userId);
  }

  @Patch(':id')
  update(@Body() updateNoteDto: UpdateNoteDto, 
        @Param('id') id: string, @UserId() userId: string): Promise<boolean> {
    return this.notesService.update(id, updateNoteDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserId() userId: string): Promise<boolean> {
    return this.notesService.remove(id, userId);
  }

  @Patch(':id/mark-as-completed')
  markAsCompleted(@Param('id') id: string, @UserId() userId: string): Promise<boolean> {
    return this.notesService.markAsCompleted(id, userId);
  }

}

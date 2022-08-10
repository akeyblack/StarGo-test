import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserId } from '../users/user-id.decorator';
import { Repository } from 'typeorm';
import { Note } from '../notes/entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, @UserId() userId: string): Promise<Note> {
    const note = {
      ...createNoteDto,
      completed: false,
      userId,
    };
    return this.notesRepository.save(note);
  }

  async getById(id: string, userId: string): Promise<Note> {
    const note = await this.notesRepository.findOneBy({id, userId});
    if(!note)
      throw new NotFoundException();
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, userId: string): Promise<boolean> {
    const result = await this.notesRepository.update({id, userId} , updateNoteDto);
    return !!result.affected;
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const result = await this.notesRepository.delete({id, userId});
    return !!result.affected;
  }

  async markAsCompleted(id: string, userId: string): Promise<boolean> {
    const result = await this.notesRepository.update({id, userId}, {completed: true});
    return !!result.affected;
  }

  async getAllByUserIdFiltered(userId: string, completedFilter: boolean): Promise<Note[]> {
    return this.notesRepository.findBy({userId, completed:completedFilter});
  }

  async getAllByUserId(userId: string): Promise<Note[]> {
    return this.notesRepository.findBy({userId});
  }
}

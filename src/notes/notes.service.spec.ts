import { Test } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NotFoundException } from '@nestjs/common';

describe(' Test suite', () => {
  let service: NotesService;

  const id = '1';
  const userId = '2';
  const note = {text: 'text', completed: false, id}

  const mockNotesRepository = {
    save: jest.fn().mockResolvedValue({...note, userId}),
    findOneBy: jest.fn().mockImplementation(data => 
      Promise.resolve(data.id===data.userId ? null : note) //mock non-existing note
    ),
    findBy: jest.fn().mockResolvedValue([note, note]),
    delete: jest.fn().mockResolvedValue({affected: 1}),
    update: jest.fn().mockResolvedValue({affected: 1}),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        NotesService, {
          provide: getRepositoryToken(Note),
          useValue: mockNotesRepository,
        }
      ],
    })
    .compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find note by id and return', async () => {
    expect(await service.getById(id, userId)).toEqual(note);
  });

  it('should try to find note by id and throw error', async () => {
    expect(service.getById('1', '1')).rejects.toThrow(NotFoundException)
  });

  it('should find user notes', async () => {
    expect(await service.getAllByUserId(userId)).toEqual([note, note]);
  });

  it('should find user notes with completed filter', async () => {
    expect(await service.getAllByUserIdFiltered(userId, false)).toEqual([note, note]);
  });

  it('should create note', async () => {
    expect(await service.create({text: 'text'}, userId)).toEqual({...note, userId});
  });

  it('should update note', async () => {
    expect(await service.update(id, {text: 'text'}, userId)).toEqual(true);
  });

  it('should mark note', async () => {
    expect(await service.markAsCompleted(id, userId)).toEqual(true);
  });

  it('should delete note', async () => {
    expect(await service.remove(id, userId)).toEqual(true);
  });

});
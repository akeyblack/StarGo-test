import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotFoundException } from '@nestjs/common';

describe('NotesController', () => {
  let controller: NotesController;

  const id = '1';
  const userId = '2';
  const note = {text: 'text', completed: false, id}

  const mockNoteService = {
    getAllByUserId: jest.fn().mockResolvedValue([note]),
    getAllByUserIdFiltered: jest.fn().mockResolvedValue([]),
    getById: jest.fn().mockImplementation((id, userId) => 
      id===userId ? //mock non-existing note
        Promise.reject(new NotFoundException()) : Promise.resolve(note)
    ),
    create: jest.fn().mockResolvedValue({...note, userId: '2'}),
    update: jest.fn().mockResolvedValue(true),
    remove: jest.fn().mockResolvedValue(true),
    markAsCompleted: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [{
        provide: NotesService,
        useValue: mockNoteService
      }],
    }).compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find note by id and return', async () => {
    expect(await controller.getById(id, userId)).toEqual(note);
  });

  it('should try to find note by id and throw error', async () => {
    expect(controller.getById('1', '1')).rejects.toThrow(NotFoundException)
  });

  it('should find user notes without completed filter', async () => {
    expect(await controller.getAllByUserId(userId, {})).toEqual([note]);
  });

  it('should find user notes with completed filter', async () => {
    expect(await controller.getAllByUserId(userId, { completed:'true' })).toEqual([]);
  });

  it('should create note', async () => {
    expect(await controller.create({text: 'text'}, userId)).toEqual({...note, userId});
  });

  it('should update note', async () => {
    expect(await controller.update({text: 'text'}, id, userId)).toEqual(true);
  });

  it('should mark note', async () => {
    expect(await controller.markAsCompleted(id, userId)).toEqual(true);
  });

  it('should delete note', async () => {
    expect(await controller.remove(id, userId)).toEqual(true);
  });
});

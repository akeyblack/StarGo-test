import { Test } from '@nestjs/testing';
import { NotesService } from './notes.service';

describe(' Test suite', () => {
  let notesService: NotesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NotesService],
    }).compile();

    notesService = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(notesService).toBeDefined();
  });
});
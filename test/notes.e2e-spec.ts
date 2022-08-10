import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { NotesModule } from '../src/notes/notes.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from '../src/notes/entities/note.entity';
import { NotesService } from '../src/notes/notes.service';

describe('NotesController (e2e)', () => {
  let app: INestApplication;

  const note = {
    id: '1',
    text: 'text',
    completed: false
  }

  const mockNotesService = {
    getAllByUserId: jest.fn().mockResolvedValue([note]),
    getAllByUserIdFiltered: jest.fn().mockResolvedValue([]),
    getById: jest.fn().mockResolvedValue(note),
    create: jest.fn().mockResolvedValue({...note, userId: '2'}),
    update: jest.fn().mockResolvedValue(true),
    remove: jest.fn().mockResolvedValue(true),
    markAsCompleted: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NotesModule],
    })
    .overrideProvider(getRepositoryToken(Note)).useValue({})
    .overrideProvider(NotesService).useValue(mockNotesService)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/notes/my (GET)', () => {
    return request(app.getHttpServer())
      .get('/notes/my')
      .set('User-Id', '2')
      .expect(200)
      .expect([note]);
  });

  it('/notes/my (GET) without userId', () => {
    return request(app.getHttpServer())
      .get('/notes/my') 
      .expect(400);
  });

  it('/notes/my (GET) with filter', () => {
    return request(app.getHttpServer())
      .get('/notes/my?completed=true')
      .set('User-Id', '2')
      .expect(200)
      .expect([]);
  });

  it('/notes/my (GET) with filter and wrong value', () => {
    return request(app.getHttpServer())
      .get('/notes/my?completed=tr')
      .set('User-Id', '2')
      .expect(400)
  });

  it('/notes/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/notes/1')
      .set('User-Id', '2')
      .expect(200)
  });

  it('/notes/1 (POST)', () => {
    return request(app.getHttpServer())
      .post('/notes')
      .set('User-Id', '2')
      .field('text', 'text')
      .expect(201)
      .expect({...note, userId: '2'})
  });

  it('/notes/1 (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/notes/2')
      .set('User-Id', '2')
      .field('text', 'new text')
      .expect(200)
      .expect(res => expect(res.text).toEqual("true"))
  });

  it('/notes/1 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/notes/2')
      .set('User-Id', '2')
      .expect(200)
      .expect(res => expect(res.text).toEqual("true"))
  });

  it('/notes/1/mark-as-completed (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/notes/1/mark-as-completed')
      .set('User-Id', '2')
      .expect(200)
      .expect(res => expect(res.text).toEqual("true"))
  });

  it('/notes/1/mark-as-completed (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/notes/1/mark-as-completed')
      .expect(400)
  });
});

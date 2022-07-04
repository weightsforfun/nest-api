import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getOne', () => {
    it('should return a movie', () => {
      service.postOne({
        title: 'a',
        genre: ['ad', 'dsa'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.postOne({
        title: 'asdasd',
        year: 2001,
        genre: ['213', '123312'],
      });
      const allMovies = service.getAll();
      service.delOne(1);
      const afterDel = service.getAll();
      expect(afterDel.length).toEqual(allMovies.length - 1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('postOne', () => {
    it('creatre a movie', () => {
      const before = service.getAll().length;
      service.postOne({
        title: 'asdasd',
        year: 2001,
        genre: ['213', '123312'],
      });
      const after = service.getAll().length;
      expect(after).toEqual(before + 1);
    });
  });
  describe('update', () => {
    it('update a movie', () => {
      service.postOne({
        title: 'asdasd',
        year: 2001,
        genre: ['213', '123312'],
      });
      service.patchOne(1, {
        title: 'updated',
      });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated');
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

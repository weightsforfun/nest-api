import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from 'src/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/dto/update-movie.dto';
import { Movie } from './movie.entity';
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  getAll(): Movie[] {
    return this.movies;
  }
  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`movie with Id ${id} not found`);
    }
    return movie;
  }
  delOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }
  postOne(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  patchOne(id: number, movieData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.delOne(id);
    this.movies.push({ ...movie, ...movieData });
  }
}

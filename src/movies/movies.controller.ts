import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { CreateMovieDto } from 'src/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/dto/update-movie.dto';
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.movieService.getOne(id);
  }
  @Post()
  postOne(@Body() movieData: CreateMovieDto) {
    return this.movieService.postOne(movieData);
  }
  @Delete('/:id')
  delOne(@Param('id') id: number) {
    return this.movieService.delOne(id);
  }
  @Patch('/:id')
  patchOne(@Param('id') id: number, @Body() movieData: UpdateMovieDto) {
    return this.movieService.patchOne(id, movieData);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Injectable()
export class SuperheroService {
  private superheroes: CreateSuperheroDto[] = [];

  create(createSuperheroDto: CreateSuperheroDto) {
    this.superheroes.push(createSuperheroDto);
    return createSuperheroDto;
  }

  findAll() {
    // Sort by humility score in descending order
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }
}

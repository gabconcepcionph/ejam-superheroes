import { 
  Controller, 
  Post, 
  Get, 
  Body 
} from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Controller('superheroes')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    console.log(`Creating superhero: ${JSON.stringify(createSuperheroDto)}`);
    return this.superheroService.create(createSuperheroDto);
  }

  @Get()
  findAll() {
    console.log('Fetching all superheroes');
    return this.superheroService.findAll();
  }
}

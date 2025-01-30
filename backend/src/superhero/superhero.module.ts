import { Module } from '@nestjs/common';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';

@Module({
  controllers: [SuperheroController],
  providers: [SuperheroService],
  exports: [SuperheroService]
})
export class SuperheroModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

describe('SuperheroController', () => {
  let controller: SuperheroController;
  let service: SuperheroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroController],
      providers: [SuperheroService],
    }).compile();

    controller = module.get<SuperheroController>(SuperheroController);
    service = module.get<SuperheroService>(SuperheroService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new superhero', () => {
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Test Hero',
        superpower: 'Test Power',
        humilityScore: 7,
      };

      const consoleSpy = jest.spyOn(console, 'log');
      const serviceSpy = jest.spyOn(service, 'create');

      const result = controller.create(createSuperheroDto);

      expect(result).toEqual(createSuperheroDto);
      expect(consoleSpy).toHaveBeenCalledWith(
        `Creating superhero: ${JSON.stringify(createSuperheroDto)}`
      );
      expect(serviceSpy).toHaveBeenCalledWith(createSuperheroDto);

      consoleSpy.mockRestore();
      serviceSpy.mockRestore();
    });
  });

  describe('findAll', () => {
    it('should return all superheroes sorted by humility score', () => {
      const superheroes: CreateSuperheroDto[] = [
        { name: 'Hero 1', superpower: 'Power 1', humilityScore: 5 },
        { name: 'Hero 2', superpower: 'Power 2', humilityScore: 8 },
        { name: 'Hero 3', superpower: 'Power 3', humilityScore: 3 },
      ];

      // Manually set superheroes in the service
      (service as any).superheroes = superheroes;

      const consoleSpy = jest.spyOn(console, 'log');
      const serviceSpy = jest.spyOn(service, 'findAll');

      const result = controller.findAll();

      expect(result).toEqual([
        { name: 'Hero 2', superpower: 'Power 2', humilityScore: 8 },
        { name: 'Hero 1', superpower: 'Power 1', humilityScore: 5 },
        { name: 'Hero 3', superpower: 'Power 3', humilityScore: 3 },
      ]);
      expect(consoleSpy).toHaveBeenCalledWith('Fetching all superheroes');
      expect(serviceSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
      serviceSpy.mockRestore();
    });
  });
});

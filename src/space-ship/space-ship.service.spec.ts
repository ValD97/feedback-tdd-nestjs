import { Test, TestingModule } from '@nestjs/testing';
import { SpaceShipService } from './space-ship.service';
import { SpaceShipRepository } from './space-ship-repository';
import { SpaceShip } from './space-ship';
import { SpaceShipId } from './space-ship-id';
import { SpaceShipEntity } from './space-ship-entity';
import { SpaceShipToEntity } from './space-ship-to-entity';
import { UnprocessableEntityException } from '@nestjs/common';
jest.mock('./space-ship-repository');
jest.mock('./space-ship-to-entity');

describe('SpaceShipService', () => {
  let service: SpaceShipService;
  let repository: SpaceShipRepository;
  let converter: SpaceShipToEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceShipService, SpaceShipRepository, SpaceShipToEntity],
    }).compile();

    service = module.get<SpaceShipService>(SpaceShipService);
    repository = module.get<SpaceShipRepository>(SpaceShipRepository);
    converter = module.get<SpaceShipToEntity>(SpaceShipToEntity);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*
   * Here, the goal isn't to validate data. We just want to be sure the service is
   * called with a DTO, and the repository is called with the entity returned by
   * the converter.
   */
  it('should call save', () => {
    const spaceShip: SpaceShip = {
      spaceShipId: SpaceShipId.from('abc-123-ship'),
    } as SpaceShip;
    const spaceShipEntity: SpaceShipEntity = {
      spaceShipId: 'abc-123-ship',
    } as SpaceShipEntity;
    const convertedSpaceShip: SpaceShip = {
      spaceShipId: SpaceShipId.from('abc-123-ship'),
    } as SpaceShip;

    converter.toEntity = jest.fn().mockReturnValue(spaceShipEntity);
    repository.save = jest.fn().mockResolvedValue(spaceShipEntity);
    converter.fromEntity = jest.fn().mockReturnValue(convertedSpaceShip);

    return service.save(spaceShip).then((returnedSpaceShip: SpaceShip) => {
      // Did we converted our DTO in entity ?
      expect(converter.toEntity).toHaveBeenCalledWith(spaceShip);
      // Did we saved the entity ?
      expect(repository.save).toHaveBeenCalledWith(spaceShipEntity);
      // Did we converted our entity in DTO ?
      expect(converter.fromEntity).toHaveBeenCalledWith(spaceShipEntity);
      // Did we returned the saved space shif ?
      expect(returnedSpaceShip).toBe(convertedSpaceShip);
    });
  });

  it('should call save and throw error', () => {
    const spaceShip: SpaceShip = {
      spaceShipId: SpaceShipId.from('abc-123-ship'),
    } as SpaceShip;
    const spaceShipEntity: SpaceShipEntity = {
      spaceShipId: 'abc-123-ship',
    } as SpaceShipEntity;

    converter.toEntity = jest.fn().mockReturnValue(spaceShipEntity);
    repository.save = jest.fn().mockRejectedValue(undefined);
    converter.fromEntity = jest.fn();

    expect(service.save(spaceShip)).rejects.toThrow(UnprocessableEntityException);
  });
});

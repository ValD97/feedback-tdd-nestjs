import { Test, TestingModule } from '@nestjs/testing';
import { SpaceShip } from './space-ship';
import { SpaceShipEntity } from './space-ship-entity';
import { SpaceShipId } from './space-ship-id';
import { SpaceShipToEntity } from './space-ship-to-entity';

describe('SpaceShipToEntity', () => {
  let converter: SpaceShipToEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceShipToEntity],
    }).compile();

    converter = module.get<SpaceShipToEntity>(SpaceShipToEntity);
  });

  it('should be defined', () => {
    expect(converter).toBeDefined();
  });

  it('should convert a DTO in entity', () => {
    const spaceShip: SpaceShip = {
      spaceShipId: SpaceShipId.from('abc-123-ship'),
      spaceShipName: 'Harvester Ship',
      spaceShipNumber: 42,
      isFasterThanLight: true,
    };

    const spaceShipEntity: SpaceShipEntity = {
      spaceShipId: spaceShip.spaceShipId.value(),
      spaceShipName: 'Harvester Ship',
      spaceShipNumber: 42,
      isFasterThanLight: true,
    }

    const convertedEntity = converter.toEntity(spaceShip);

    expect(convertedEntity).toEqual(spaceShipEntity);
  })

  it('should convert an entity in DTO', () => {
    const spaceShip: SpaceShip = {
      spaceShipId: SpaceShipId.from('abc-123-ship'),
      spaceShipName: 'Harvester Ship',
      spaceShipNumber: 42,
      isFasterThanLight: true,
    };

    const spaceShipEntity: SpaceShipEntity = {
      spaceShipId: spaceShip.spaceShipId.value(),
      spaceShipName: 'Harvester Ship',
      spaceShipNumber: 42,
      isFasterThanLight: true,
    }

    const convertedSpaceShip = converter.fromEntity(spaceShipEntity);

    expect(convertedSpaceShip).toEqual(spaceShip);
  })
});

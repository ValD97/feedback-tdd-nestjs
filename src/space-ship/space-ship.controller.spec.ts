import { Test, TestingModule } from '@nestjs/testing';
import { SpaceShipController } from './space-ship.controller';
import { SpaceShipService } from './space-ship.service';
import { SpaceShip } from './space-ship';
import { SpaceShipId } from './space-ship-id';
jest.mock('./space-ship.service');

describe('SpaceShipController', () => {
  let controller: SpaceShipController;
  let service: SpaceShipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceShipController],
      providers: [SpaceShipService],
    }).compile();

    controller = module.get<SpaceShipController>(SpaceShipController);
    service = module.get<SpaceShipService>(SpaceShipService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service', () => {
    const spaceShip: SpaceShip = {
      spaceShipId: SpaceShipId.from('abc-123-ship'),
      spaceShipName: 'Apollo',
      spaceShipNumber: 123,
      isFasterThanLight: true,
    };

    const returnedSpaceShip: SpaceShip = {
      spaceShipName: 'Apollo',
    } as SpaceShip;

    service.save = jest.fn().mockResolvedValue(returnedSpaceShip);

    return controller.save(spaceShip).then((sp) => {
      expect(service.save).toHaveBeenCalledWith(spaceShip);
      expect(sp).toBe(returnedSpaceShip);
    });
  });
});

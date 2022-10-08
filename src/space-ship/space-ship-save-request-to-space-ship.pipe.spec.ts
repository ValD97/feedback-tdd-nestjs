import { BadRequestException } from '@nestjs/common';
import { SpaceShip } from './space-ship';
import { SpaceShipId } from './space-ship-id';
import { SaveSpaceShipRequest, SpaceShipSaveRequestToSpaceShipPipe } from './space-ship-save-request-to-space-ship.pipe';

describe('SpaceShipSaveRequestToSpaceShipPipe', () => {
  let transformer;

  beforeEach(() => {
    transformer = new SpaceShipSaveRequestToSpaceShipPipe();
  });

  it('should be defined', () => {
    expect(transformer).toBeDefined();
  });

  it('should throw an error if no body', () => {
    const response = () => transformer.transform({}, {});
    expect(response).toThrow(BadRequestException);
  })

  it('should convert a valid space ship', () => {
    const spaceShipRequest : SaveSpaceShipRequest = {
      spaceShipId: 'xxx-000-xxxx',
      spaceShipName: 'Harvester',
      spaceShipNumber: 42,
      isFasterThanLight: true
    }

    const spaceShip: SpaceShip = {
      spaceShipId: SpaceShipId.from(spaceShipRequest.spaceShipId),
      spaceShipName: 'Harvester',
      spaceShipNumber: 42,
      isFasterThanLight: true
    }

    const parsedSpaceShip = transformer.transform(spaceShipRequest, {});

    expect(parsedSpaceShip).toEqual(spaceShip);
  })
});

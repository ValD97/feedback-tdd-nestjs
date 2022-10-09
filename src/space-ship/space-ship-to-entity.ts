import { Injectable } from '@nestjs/common';
import { SpaceShip } from './space-ship';
import { SpaceShipEntity } from './space-ship-entity';
import { SpaceShipId } from './space-ship-id';

@Injectable()
export class SpaceShipToEntity {
  toEntity(spaceShip: SpaceShip): SpaceShipEntity {
    return {
      spaceShipId: spaceShip.spaceShipId.value(),
      spaceShipName: spaceShip.spaceShipName,
      spaceShipNumber: spaceShip.spaceShipNumber,
      isFasterThanLight: spaceShip.isFasterThanLight,
    };
  }

  fromEntity(spaceShipEntity: SpaceShipEntity): SpaceShip {
    return {
      spaceShipId: SpaceShipId.from(spaceShipEntity.spaceShipId),
      spaceShipName: spaceShipEntity.spaceShipName,
      spaceShipNumber: spaceShipEntity.spaceShipNumber,
      isFasterThanLight: spaceShipEntity.isFasterThanLight,
    };
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SpaceShip } from './space-ship';
import { SpaceShipEntity } from './space-ship-entity';
import { SpaceShipRepository } from './space-ship-repository';
import { SpaceShipToEntity } from './space-ship-to-entity';

@Injectable()
export class SpaceShipService {
  constructor(
    private spaceShipRepository: SpaceShipRepository,
    private converter: SpaceShipToEntity,
  ) {}

  async save(spaceShip: SpaceShip): Promise<SpaceShip> {
    const spaceShipEntity = this.converter.toEntity(spaceShip);
    return this.spaceShipRepository
      .save(spaceShipEntity)
      .then((savedEntity: SpaceShipEntity) => {
        return this.converter.fromEntity(savedEntity);
      })
      .catch(() => {
        throw new UnprocessableEntityException('Could not save');
      });
  }
}

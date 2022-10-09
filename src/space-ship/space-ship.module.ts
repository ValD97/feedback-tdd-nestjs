import { Module } from '@nestjs/common';
import { SpaceShipRepository } from './space-ship-repository';
import { SpaceShipToEntity } from './space-ship-to-entity';
import { SpaceShipController } from './space-ship.controller';
import { SpaceShipService } from './space-ship.service';

@Module({
  controllers: [SpaceShipController],
  providers: [SpaceShipService, SpaceShipRepository, SpaceShipToEntity],
})
export class SpaceShipModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { SpaceShipService } from './space-ship.service';
import { SpaceShipSaveRequestToSpaceShipPipe } from './space-ship-save-request-to-space-ship.pipe';
import { SpaceShip } from './space-ship';

@Controller('space-ship')
export class SpaceShipController {
  constructor(private spaceShipService: SpaceShipService) {}

  @Post()
  save(
    @Body(new SpaceShipSaveRequestToSpaceShipPipe()) spaceShip: SpaceShip,
  ): Promise<SpaceShip> {
    return this.spaceShipService.save(spaceShip);
  }
}

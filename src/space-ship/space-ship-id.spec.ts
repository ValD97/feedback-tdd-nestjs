import { SpaceShipId } from "./space-ship-id";

describe('SpaceShipId', () => {
  it('should throw an error', () => {
    const id = 'should-fail';

    const spaceShipId = () => SpaceShipId.from(id);

    expect(spaceShipId).toThrow(Error);
  });

  it('should return back a valid id', () => {
    const id = 'abc-123-ship';

    const spaceShipId = SpaceShipId.from(id);

    expect(spaceShipId).toBeTruthy();
  })
})
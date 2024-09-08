import Ship from '../src/ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(1);
  });

  test('Increase hits when ship is hit.', () => {
    const hits = ship.hits;
    ship.hit();
    expect(ship.hits).toBe(hits + 1);
  });

  test('calculate if ship is sunk', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
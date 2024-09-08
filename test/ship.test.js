import Ship from '../src/ship';

test('Increase hits when ship is hit.', () => {
  const ship = new Ship(1);
  const hits = ship.hits;
  ship.hit();
  expect(ship.hits).toBe(hits + 1);
});

test('calculate if ship is sunk', () => {
  const ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
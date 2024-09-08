import Gameboard from '../src/gameboard';

test('place ship at coordinate', () => {
  const board = new Gameboard();
  board.addShip(4, 4, 1);
  expect(board.getCell(4, 4).ship).toBeInstanceOf(Ship);
});

test('place ship at vertical orientation', () => {
  const board = new Gameboard();
  board.addShip(4, 4, 4, true);
  expect(board.getCell(7, 4).ship).toBeInstanceOf(Ship);
});

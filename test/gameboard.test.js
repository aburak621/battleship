import Gameboard from '../src/gameboard';
import Ship from '../src/ship';

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

test('game board receives an attack that hits', () => {
  const board = new Gameboard();
  board.addShip(4, 4, 4);
  expect(board.receiveAttack(4, 6)).toStrictEqual(true);
  expect(board.getCell(4, 4).ship.hits).toStrictEqual(1);
  expect(board.getCell(4, 6).isShot).toStrictEqual(true);
});

test('game board receives an attack that misses', () => {
  const board = new Gameboard();
  expect(board.receiveAttack(4, 6)).toStrictEqual(true);
  expect(board.getCell(4, 6).isShot).toStrictEqual(true);
  expect(board.getCell(4, 4).ship).toBeNull();
});

test('game board denies attacking an attacked cell', () => {
  const board = new Gameboard();
  expect(board.receiveAttack(4, 6)).toStrictEqual(true);
  expect(board.receiveAttack(4, 6)).toStrictEqual(false);
});

test('game board checks for gameover', () => {
  const board = new Gameboard();
  board.addShip(5, 5, 2);
  expect(board.isGameOver()).toStrictEqual(false);
  board.receiveAttack(5, 5);
  board.receiveAttack(5, 6);
  expect(board.isGameOver()).toStrictEqual(true);
});
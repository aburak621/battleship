import Gameboard from '../src/gameboard';
import Ship from '../src/ship';

describe('Gameboard', () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test('place ship at coordinate', () => {
    board.addShip(4, 4, 1);
    expect(board.getCell(4, 4).ship).toBeInstanceOf(Ship);
  });

  test('place ship at vertical orientation', () => {
    expect(board.addShip(4, 4, 4, true)).toStrictEqual(true);
    expect(board.getCell(4, 7).ship).toBeInstanceOf(Ship);
  });

  test('try to place ship that doesn\'t fit', () => {
    expect(board.addShip(4, 0, 6, false)).toStrictEqual(false);
    expect(board.addShip(0, 9, 2, true)).toStrictEqual(false);
  });

  test('receive an attack that hits', () => {
    board.addShip(4, 4, 4);
    expect(board.receiveAttack(6, 4)).toStrictEqual(true);
    expect(board.getCell(4, 4).ship.hits).toStrictEqual(1);
    expect(board.getCell(6, 4).isShot).toStrictEqual(true);
  });

  test('receive an attack that misses', () => {
    expect(board.receiveAttack(4, 6)).toStrictEqual(true);
    expect(board.getCell(4, 6).isShot).toStrictEqual(true);
    expect(board.getCell(4, 4).ship).toBeNull();
  });

  test('deny attacking an attacked cell', () => {
    expect(board.receiveAttack(4, 6)).toStrictEqual(true);
    expect(board.receiveAttack(4, 6)).toStrictEqual(false);
  });

  test('check for gameover', () => {
    board.addShip(5, 5, 2);
    expect(board.isGameOver()).toStrictEqual(false);
    board.receiveAttack(5, 5);
    board.receiveAttack(6, 5);
    expect(board.isGameOver()).toStrictEqual(true);
  });
});
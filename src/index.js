import Gameboard from './gameboard.js';

const board = new Gameboard;
console.log(board.board);
board.addShip(4, 4, 4, false);
board.receiveAttack(4, 4);
console.log(board.getCell(4, 4).isShot);
import Gameboard from './gameboard';

const board = new Gameboard;
console.log(board.board);
board.addShip(0, 0, 4, true);
board.print();
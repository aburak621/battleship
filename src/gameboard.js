import Ship from './ship.js';

class Gameboard {
  constructor() {
    this.board = new Array(10).fill().map(() => new Array(10).fill().map(() => ({ ship: null, isShot: false })));
  }

  getCell(x, y) {
    return this.board[x][y];
  }

  setShip(x, y, value) {
    this.board[x][y].ship = value;
  }

  addShip(x, y, length, vertical = false) {
    const ship = new Ship(length);
    for (let i = 0; i < length; i++) {
      this.setShip(x + i * !!vertical, y + i * !vertical, ship);
    }
  }

  receiveAttack(x, y) {
    const cell = this.getCell(x, y);
    if (cell.isShot) {
      return false;
    }

    if (cell.ship !== null) {
      cell.ship.hit();
    }
    cell.isShot = true;
    return true;
  }
}

export default Gameboard;
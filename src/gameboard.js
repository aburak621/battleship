import Ship from './ship';

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
    if (!vertical && x + length >= this.board.length ||
      vertical && y + length >= this.board[0].length) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (this.getCell(x + i * !vertical, y + i * vertical).ship !== null) {
        return false;
      };
    }

    for (let i = 0; i < length; i++) {
      this.setShip(x + i * !vertical, y + i * vertical, ship);
    }
    return true;
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

  isGameOver() {
    for (let i = 0; i < this.board.length; i++) {
      const col = this.board[i];
      for (let j = 0; j < col.length; j++) {
        const cell = col[j];
        if (cell.ship !== null && !cell.isShot) {
          return false;
        }
      }
    }
    return true;
  }

  print() {
    let str = '';
    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board.length; x++) {
        const cell = this.board[x][y];
        if (cell.ship && cell.isShot) {
          str += 'X';
        } else if (cell.ship) {
          str += 'O';
        } else if (cell.isShot) {
          str += '+';
        } else {
          str += '-';
        }
      }
      str += '\n';
    }
    console.log(str);
  }
}

export default Gameboard;
import Player from './player';

class GameManager {
  constructor(twoPlayer = false) {
    this.players = [];
    this.players.push(new Player('player'));
    if (twoPlayer) {
      this.players.push(new Player('player'));
    } else {
      this.players.push(new Player('cpu'));
    }
    this.shipTypes = [5, 4, 3, 3, 2];
    this.shipsPlaced = 0;
    this.index = 0;
    this.gameOver = false;
    this.winner = -1;
  }

  placeShip(x, y, vertical) {
    const index = this.shipsPlaced < this.shipTypes.length ? 0 : 1;
    const shipPlaced = this.players[index].gameboard.addShip(x, y, this.shipTypes[this.shipsPlaced % this.shipTypes.length], vertical);
    if (!shipPlaced) {
      return false;
    }
    this.shipsPlaced++;
    return true;
  }

  playTurn(x, y) {
    const success = this.players[(this.index + 1) % 2].gameboard.receiveAttack(x, y);
    if (success) {
      if (this.players[(this.index + 1) % 2].gameboard.isGameOver()) {
        this.gameOver = true;
        this.winner = this.index;
        return success;
      }
      this.index = (this.index + 1) % 2;
    }
    return success;
  }

  cpuPlaceShips() {
    for (let i = 0; i < this.shipTypes.length; i++) {
      let x;
      let y;
      let vertical;
      do {
        x = Math.floor(Math.random() * this.players[1].gameboard.board.length);
        y = Math.floor(Math.random() * this.players[1].gameboard.board[0].length);
        vertical = Math.random() < 0.5;
      } while (!this.placeShip(x, y, vertical));
    }
  }
}

export default GameManager;
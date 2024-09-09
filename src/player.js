import Gameboard from './gameboard.js';

class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  cpuPlaceShips(gameManager) {
    for (let i = 0; i < gameManager.shipTypes.length; i++) {
      let x;
      let y;
      let vertical;
      do {
        x = Math.floor(Math.random() * this.gameboard.board.length);
        y = Math.floor(Math.random() * this.gameboard.board[0].length);
        vertical = Math.random() < 0.5;
      } while (!gameManager.placeShip(x, y, vertical));
    }
  }
}

export default Player;
import GameManager from '../src/game-manager';

describe('Game Manager', () => {
  let gameManager;

  beforeEach(() => {
    gameManager = new GameManager();
  });

  test('initialize players', () => {
    expect(gameManager.players[0].type).toStrictEqual('player');
    expect(gameManager.players[1].type).toStrictEqual('cpu');
  });

  test('place both players\' ship', () => {
    for (let i = 0; i < gameManager.shipTypes.length * 2; i++) {
      gameManager.placeShip(0, i, false);
    }

    for (let i = 0; i < gameManager.shipTypes.length; i++) {
      expect(gameManager.players[0].gameboard.getCell(0, i).ship).not.toBeNull();
    }
    for (let i = gameManager.shipTypes.length; i < gameManager.shipTypes.length * 2; i++) {
      expect(gameManager.players[1].gameboard.getCell(0, i).ship).not.toBeNull();
    }
  });

  test('cpu places ships by itself', () => {
    gameManager = new GameManager(true);
    for (let i = 0; i < gameManager.shipTypes.length; i++) {
      gameManager.placeShip(0, i, false);
    }

    gameManager.cpuPlaceShips();

    let shipCells = 0;
    for (let x = 0; x < gameManager.players[1].gameboard.board.length; x++) {
      for (let y = 0; y < gameManager.players[1].gameboard.board[0].length; y++) {
        if (gameManager.players[1].gameboard.getCell(x, y).ship !== null) {
          shipCells++;
        }
      }
    }

    expect(shipCells).toStrictEqual(gameManager.shipTypes.reduce((acc, value) => acc + value, 0));
  });

  test('both players hit, miss, try to select already shot cell', () => {
    for (let i = 0; i < gameManager.shipTypes.length * 2; i++) {
      gameManager.placeShip(0, i, false);
    }

    expect(gameManager.playTurn(0, 5)).toStrictEqual(true); // Player 1 hit
    expect(gameManager.playTurn(0, 0)).toStrictEqual(true); // Player 2 hit
    expect(gameManager.playTurn(9, 5)).toStrictEqual(true); // Player 1 miss
    expect(gameManager.playTurn(9, 0)).toStrictEqual(true); // Player 2 miss
    expect(gameManager.playTurn(0, 5)).toStrictEqual(false); // Player 1 illegal move
    expect(gameManager.playTurn(1, 5)).toStrictEqual(true); // Player 1 hit
    expect(gameManager.playTurn(0, 0)).toStrictEqual(false); // Player 2 illegal move
    expect(gameManager.playTurn(1, 0)).toStrictEqual(true); // Player 2 hit
  });

  test('player one wins', () => {
    gameManager.shipTypes = [2];

    for (let i = 0; i < gameManager.shipTypes.length * 2; i++) {
      gameManager.placeShip(0, i, false);
    }

    gameManager.playTurn(0, 1);
    gameManager.playTurn(0, 0);
    gameManager.playTurn(1, 1);
    expect(gameManager.gameOver).toStrictEqual(true);
    expect(gameManager.winner).toStrictEqual(0);
  });
});
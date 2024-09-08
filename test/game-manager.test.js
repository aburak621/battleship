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
});
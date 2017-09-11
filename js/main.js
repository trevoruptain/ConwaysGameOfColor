const GameView = require('./view.js');
const ConwayGame = require('./game.js');

$( () => {
  const rootEl = $('.conway');
  const game = new ConwayGame;
  new GameView(game, rootEl);
});

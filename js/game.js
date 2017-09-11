const Board = require('./board.js');
const Params = require('./params.js');

class Game {
  constructor() {
    const params = new Params;
    const board = new Board(params);
    this.runGame(board).bind(this);
  }

  runGame(board) {
    //Renders the board and sets an event listener
    //Flashes the squares or click me button
    //Make sure to stop here until click


    while(!board.isEmpty()) {
      this.render(board);
      board.nextGeneration();
      setTimeout(80);
    }
  }

  render(board) {
    //Uses board state to render board changes to canvas
    //This is tough because you don't want to re-render the whole
    //board, only the changes to the board
  }


}

//If they touch the edge of the board, they die. But you render everything
//except for the fifth - -fifth square on each side. You just have to Make
//sure to create a board of input width + 10, height + 10

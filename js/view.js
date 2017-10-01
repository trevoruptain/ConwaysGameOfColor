import Util from './util';
import Board from './board';

class GameView {
  constructor($el) {
    this.$el = $el;

    this.positions = Util.madness;

    this.board = new Board(this.positions);

    this.setupBoard = this.setupBoard.bind(this);
    this.runGame = this.runGame.bind(this);

    this.setupBoard();

    this.$el.on(
      "click",
      this.runGame()
    );
  }

  setupBoard() {
    let html = '';

    for (let i = 0; i < this.board.height; i++) {
      html += '<ul>';
      for (let j = 0; j < this.board.width; j++) {
        let isAlive = false;
        for (let k = 0; k < this.positions.length; k++) {
          if (this.positions[k][0] === i && this.positions[k][1] === j) {
            isAlive = true;
          }
        }
        if (isAlive) {
          html += '<li class="live"></li>';
        } else {
          html += '<li></li>';
        }
      }
      html += '</ul>';
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  runGame() {
    setInterval(() => {
      debugger;
      const livePositions = this.board.nextGeneration();
      this.$li.filter(".live").removeClass();

      livePositions.forEach(position => {
        const flatCoord = (position[0] * this.board.width) + position[1];
        this.$li.eq(flatCoord).addClass(".live");
      });
    }, 500);
  }
}

export default GameView;

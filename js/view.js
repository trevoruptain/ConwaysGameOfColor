import Util from './util';
import Board from './board';

class GameView {
  constructor($el) {
    this.$el = $el;
    this.positions = Util.madness;
    this.board = new Board(this.positions);

    this.setupBoard = this.setupBoard.bind(this);
    this.runGame = this.runGame.bind(this);
    this.getColor = this.getColor.bind(this);

    this.setupBoard();

    this.$el.on("click", e => {
      e.preventDefault();
      this.runGame();
    });
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
          const color = this.getColor(i, j);
          html += `<li class="live radiate ${color}"></li>`;
        } else {
          html += '<li></li>';
        }
      }
      html += '</ul>';
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  getColor(x, y) {
    let color = "";

    this.positions.forEach(position => {
      if (position[0] == x && position[1] == y) {
        color = position[2];
      }
    });

    return color;
  }

  runGame() {
    this.$el.removeClass("clickable");
    this.$li.filter(".radiate").removeClass();
    let isPaused = false;

    $('.pause').on('click', function(e) {
      e.preventDefault();
      isPaused = true;
    });

    $('.play').on('click', function(e) {
      e.preventDefault();
      isPaused = false;
    });

    setInterval(() => {
      if (!isPaused) {
        const livePositions = this.board.nextGeneration();
        this.$li.filter(".live").removeClass();

        livePositions.forEach(position => {
          const flatCoord = (position[0][0] * this.board.width) + position[0][1];
          this.$li.eq(flatCoord).addClass(`live ${position[1]}`);
        });
     }
    }, 50);
  }
}

export default GameView;

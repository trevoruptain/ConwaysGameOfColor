import Util from './util';
import Board from './board';

class GameView {
  constructor($el) {
    this.$el = $el;
    this.positions = Util.blank;
    this.board = new Board(this.positions);

    this.setupBoard = this.setupBoard.bind(this);
    this.runGame = this.runGame.bind(this);

    this.isPaused = false;

    this.setupBoard(this.positions);
    this.addEventListeners();

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
          const color = this.chooseRandomColor();
          html += `<li class="live radiate ${color}" data-pos="${[i, j]}"></li>`;
        } else {
          html += `<li data-pos="${[i, j]}"></li>`;
        }
      }
      html += '</ul>';
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  chooseRandomColor() {
    const colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink"];
    const randomNum = Math.floor(Math.random() * 7);
    return colors[randomNum];
  }

  runGame() {
    this.addEventListeners();
    this.$el.removeClass("clickable");
    this.$li.filter(".radiate").removeClass();
    $('button').addClass("visible");

    setInterval(() => {
      if (!this.isPaused) {
        const livePositions = this.board.nextGeneration();
        this.$li.filter(".live").removeClass();

        livePositions.forEach(position => {
          const flatCoord = (position[0][0] * this.board.width) + position[0][1];
          this.$li.eq(flatCoord).addClass(`live ${position[1]}`);
        });
     }
   }, 100);
  }

  addEventListeners() {
    $('.pause').on('click', e => {
      e.preventDefault();
      this.isPaused = true;
    });

    $('.play').on('click', e => {
      e.preventDefault();
      this.isPaused = false;
    });

    $('.seed').on('click', e => {
      e.preventDefault();
      this.board.addRandomSeeds();
    });

    $('.glider').on('click', () => {
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.glider);
        $('.conway').off();
      });
    });

    $('.small-exploder').on('click', () => {
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.smallExploder);
        $('.conway').off();
      });
    });

    $('.exploder').on('click', () => {
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.exploder);
        $('.conway').off();
      });
    });

    $('.ten-cell-row').on('click', () => {
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.tenCellRow);
        $('.conway').off();
      });
    });

    $('.spaceship').on('click', () => {
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.spaceship);
        $('.conway').off();
      });
    });

    $('.tumbler').on('click', () => {
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.tumbler);
        $('.conway').off();
      });
    });

    $('.gospel-glider-gun').on('click', () => {
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.gospelGliderGun);
        $('.conway').off();
      });
    });
  }
}

export default GameView;

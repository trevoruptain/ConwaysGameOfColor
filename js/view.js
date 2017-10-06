import Util from './util';
import Board from './board';

class GameView {
  constructor($el) {
    this.$el = $el;
    this.positions = Util.clickHere;
    this.board = new Board(this.positions);

    this.setupBoard = this.setupBoard.bind(this);
    this.runGame = this.runGame.bind(this);
    this.addEventListeners = this.addEventListeners.bind(this);

    this.isPaused = false;
    this.canSeed = true;

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

    $('.info').on('click', e => {
      e.preventDefault();
      this.isPaused = true;
      $('.modal-text').addClass('show-modal');
      $('.conway, .modal-text').on('click', event => {
        event.preventDefault();
        $('.modal-text').removeClass('show-modal');
        this.isPaused = false;
        $('.conway, .modal-text').off();
      });
    });

    $('.seed').on('click', e => {
      e.preventDefault();
      if (this.canSeed) {
        this.canSeed = false;
        this.board.addRandomSeeds();
        setTimeout(() => {
          this.canSeed = true;
        }, 1000);
      }
    });

    $('.glider').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.glider);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.small-exploder').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.smallExploder);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.exploder').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.exploder);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.ten-cell-row').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.tenCellRow);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.spaceship').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.spaceship);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.tumbler').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.tumbler);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.gospel-glider-gun').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, Util.gospelGliderGun);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });
  }
}

export default GameView;

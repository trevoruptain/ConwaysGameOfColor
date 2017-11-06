/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__view__ = __webpack_require__(1);


$( () => {
  const rootEl = $('.conway');
  new __WEBPACK_IMPORTED_MODULE_0__view__["a" /* default */](rootEl);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board__ = __webpack_require__(3);



class GameView {
  constructor($el) {
    this.$el = $el;
    this.positions = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].clickHere;
    this.board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* default */](this.positions);

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

    setInterval(() => {
      if (!this.isPaused) {
        const livePositions = this.board.nextGeneration();
        this.$li.filter(".live").removeClass();

        livePositions.forEach(position => {
          const flatCoord = (position[0][0] * this.board.width) + position[0][1];
          this.$li.eq(flatCoord).addClass(`live ${position[1]}`);
        });
     }
   }, 135);
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
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].glider);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.small-exploder').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].smallExploder);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.exploder').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].exploder);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.ten-cell-row').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].tenCellRow);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.spaceship').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].spaceship);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.tumbler').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].tumbler);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });

    $('.gospel-glider-gun').on('click', () => {
      $('html,body').css('cursor','crosshair');
      $('.conway').on('click', e => {
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].gospelGliderGun);
        $('.conway').off();
        $('html,body').css('cursor','default');
      });
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Util = {
  blank: [],

  glider: [
    [1, 0],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1]
  ],

  smallExploder: [
    [1, 0],
    [0, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [-2, 0]
  ],

  exploder: [
    [2, 0],
    [2, -2],
    [2, 2],
    [1, -2],
    [1, 2],
    [0, -2],
    [0, 2],
    [-1, -2],
    [-1, 2],
    [-2, -2],
    [-2, 2],
    [-2, 0]
  ],

  tenCellRow: [
    [0, -4],
    [0, -3],
    [0, -2],
    [0, -1],
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
  ],

  spaceship: [
    [1, -2],
    [2, -1],
    [2, 0],
    [2, 1],
    [2, 2],
    [1, 2],
    [0, 2],
    [-1, 1],
    [-1, -2]
  ],

  tumbler: [
    [2, -2],
    [2, -1],
    [1, -2],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-2, -1],
    [-3, -2],
    [-3, -3],
    [-2, -3],
    [-1, -3],
    [2, 1],
    [2, 2],
    [1, 1],
    [1, 2],
    [0, 1],
    [-1, 1],
    [-2, 1],
    [-3, 2],
    [-3, 3],
    [-2, 3],
    [-1, 3]
  ],

  madness: [
    [25, 137],
    [25, 138],
    [23, 138],
    [24, 140],
    [25, 141],
    [25, 142],
    [25, 143],

    [55, 37],
    [55, 38],
    [53, 38],
    [54, 40],
    [55, 41],
    [55, 42],
    [55, 43],

    [65, 107],
    [65, 108],
    [63, 108],
    [64, 110],
    [65, 111],
    [65, 112],
    [65, 113]
  ],

  gospelGliderGun: [
    [-3, -18],
    [-3, -17],
    [-2, -18],
    [-2, -17],
    [-3, -9],
    [-3, -8],
    [-2, -8],
    [-2, -10],
    [-1, -10],
    [-1, -9],
    [1, -2],
    [0, -2],
    [-1, -2],
    [-1, -1],
    [0, 0],
    [-3, 4],
    [-3, 5],
    [-4, 4],
    [-4, 6],
    [-5, 6],
    [-5, 5],
    [7, 6],
    [7, 7],
    [7, 8],
    [8, 6],
    [9, 7],
    [-4, 16],
    [-4, 17],
    [-5, 16],
    [-5, 17],
    [2, 17],
    [2, 18],
    [3, 17],
    [3, 19],
    [4, 17]
  ],

  clickHere: [[31, 15],
  [31, 14],
  [31, 13],
  [31, 12],
  [31, 11],
  [31, 10],
  [32, 10],
  [33, 10],
  [34, 10],
  [35, 10],
  [36, 10],
  [38, 10],
  [37, 10],
  [38, 12],
  [38, 11],
  [38, 13],
  [38, 14],
  [38, 15],
  [37, 15],
  [37, 14],
  [37, 13],
  [37, 12],
  [37, 11],
  [36, 11],
  [35, 11],
  [34, 11],
  [33, 11],
  [32, 11],
  [32, 12],
  [32, 13],
  [32, 14],
  [32, 15],
  [31, 19],
  [32, 19],
  [33, 19],
  [34, 19],
  [35, 19],
  [36, 19],
  [37, 19],
  [38, 19],
  [38, 20],
  [38, 22],
  [38, 21],
  [38, 23],
  [38, 24],
  [37, 24],
  [37, 23],
  [37, 22],
  [37, 21],
  [37, 20],
  [36, 20],
  [35, 20],
  [34, 20],
  [33, 20],
  [32, 20],
  [31, 20],
  [38, 27],
  [38, 28],
  [37, 28],
  [35, 28],
  [34, 28],
  [33, 28],
  [32, 28],
  [31, 28],
  [31, 27],
  [32, 27],
  [33, 27],
  [34, 27],
  [35, 27],
  [36, 27],
  [36, 28],
  [37, 27],
  [31, 32],
  [32, 32],
  [33, 32],
  [35, 32],
  [34, 32],
  [36, 32],
  [37, 32],
  [38, 32],
  [38, 33],
  [38, 34],
  [38, 35],
  [38, 36],
  [38, 37],
  [31, 33],
  [31, 34],
  [31, 36],
  [31, 35],
  [31, 37],
  [32, 37],
  [32, 36],
  [32, 35],
  [32, 33],
  [32, 34],
  [33, 33],
  [35, 33],
  [34, 33],
  [33, 90],
  [36, 33],
  [37, 33],
  [38, 64],
  [37, 34],
  [37, 35],
  [37, 37],
  [37, 36],
  [31, 40],
  [32, 40],
  [33, 40],
  [34, 40],
  [36, 40],
  [35, 40],
  [37, 40],
  [38, 40],
  [38, 41],
  [36, 41],
  [37, 41],
  [35, 41],
  [36, 42],
  [37, 43],
  [38, 44],
  [34, 41],
  [33, 41],
  [32, 41],
  [31, 41],
  [38, 45],
  [37, 44],
  [36, 43],
  [35, 42],
  [34, 42],
  [33, 43],
  [32, 44],
  [31, 45],
  [31, 44],
  [32, 43],
  [33, 42],
  [31, 55],
  [32, 55],
  [33, 55],
  [34, 55],
  [35, 55],
  [36, 55],
  [37, 55],
  [38, 55],
  [38, 56],
  [37, 56],
  [36, 56],
  [35, 56],
  [34, 56],
  [33, 56],
  [32, 56],
  [31, 56],
  [34, 57],
  [34, 58],
  [34, 59],
  [33, 59],
  [32, 59],
  [31, 59],
  [31, 60],
  [32, 60],
  [33, 60],
  [34, 60],
  [35, 60],
  [36, 60],
  [37, 60],
  [38, 60],
  [38, 59],
  [37, 59],
  [36, 59],
  [35, 59],
  [35, 57],
  [35, 58],
  [31, 63],
  [32, 63],
  [33, 63],
  [34, 63],
  [36, 63],
  [35, 63],
  [37, 63],
  [38, 63],
  [38, 65],
  [37, 64],
  [36, 64],
  [35, 64],
  [34, 64],
  [33, 64],
  [32, 64],
  [31, 64],
  [31, 65],
  [31, 66],
  [31, 68],
  [31, 67],
  [32, 68],
  [32, 67],
  [32, 66],
  [32, 65],
  [34, 65],
  [34, 66],
  [35, 66],
  [35, 65],
  [38, 65],
  [38, 66],
  [38, 67],
  [38, 68],
  [37, 65],
  [37, 66],
  [37, 67],
  [37, 68],
  [31, 71],
  [32, 71],
  [33, 71],
  [34, 71],
  [35, 71],
  [36, 71],
  [37, 71],
  [38, 71],
  [31, 72],
  [32, 72],
  [33, 72],
  [34, 72],
  [36, 72],
  [35, 72],
  [37, 72],
  [38, 72],
  [31, 73],
  [31, 74],
  [31, 75],
  [31, 76],
  [32, 77],
  [33, 77],
  [34, 76],
  [34, 75],
  [34, 74],
  [34, 73],
  [35, 73],
  [35, 74],
  [36, 74],
  [36, 75],
  [37, 75],
  [37, 76],
  [38, 76],
  [38, 77],
  [33, 76],
  [32, 76],
  [31, 80],
  [32, 80],
  [33, 80],
  [34, 80],
  [35, 80],
  [36, 81],
  [37, 81],
  [37, 82],
  [38, 80],
  [38, 81],
  [37, 81],
  [37, 80],
  [36, 80],
  [35, 81],
  [34, 81],
  [33, 81],
  [32, 81],
  [31, 81],
  [32, 82],
  [32, 83],
  [32, 84],
  [32, 85],
  [31, 85],
  [31, 84],
  [31, 83],
  [31, 82],
  [35, 82],
  [35, 83],
  [34, 82],
  [34, 83],
  [38, 82],
  [38, 83],
  [38, 85],
  [38, 84],
  [37, 85],
  [37, 84],
  [37, 83],
  [34, 81],
  [31, 89],
  [32, 89],
  [33, 89],
  [34, 89],
  [35, 89],
  [35, 90],
  [34, 90],
  [32, 90],
  [31, 90],
  [37, 89],
  [38, 89],
  [38, 90],
  [37, 90]]
};

/* harmony default export */ __webpack_exports__["a"] = (Util);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
  constructor(positions) {
    this.width = 100;
    this.height = 70;

    this.grid = new Array(this.height);

    for (let i = 0; i < this.height; i++) {
      this.grid[i] = new Array(this.width);
      this.grid[i].fill([false]);
    }

    this.colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink"];

    this.populateBoard = this.populateBoard.bind(this);
    this.nextGeneration = this.nextGeneration.bind(this);
    this.greetNeighbors = this.greetNeighbors.bind(this);

    this.populateBoard(positions);
  }

  populateBoard(positions) {
    positions.forEach(position => {
      const y = position[0];
      const x = position[1];

      this.grid[y][x] = [true, this.chooseRandomColor()];
    });
  }

  nextGeneration() {
    const newGrid = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      newGrid[i] = new Array(this.width);
    }

    const livePositions = [];

    this.grid.forEach((row, i) => {
      row.forEach((el, j) => {
        const neighborInfo = this.greetNeighbors([i, j]);
        const neighborCount = neighborInfo[0];
        const newColor = neighborInfo[1];

        if (this.grid[i][j][0] === true) {
          if (neighborCount < 2 || neighborCount > 3) {
            newGrid[i][j] = [false];
          } else {
            newGrid[i][j] = [true, newColor];
            livePositions.push([[i, j], newColor]);
          }
        } else if (this.grid[i][j][0] === false) {
          if (neighborCount === 3) {
            newGrid[i][j] = [true, newColor];
            livePositions.push([[i, j], newColor]);
          } else {
            newGrid[i][j] = [false];
          }
        }
      });
    });

    this.grid = newGrid;
    return livePositions;
  }

  greetNeighbors(pos) {
    const directions = [
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0]
    ];

    const y = pos[0];
    const x = pos[1];
    let count = 0;
    let colors = [];

    directions.forEach(direction => {
      const a = direction[0];
      const b = direction[1];
      let newH = (x + a) % this.width;
      let newV = (y + b) % this.height;

      if (newH < 0) {
        newH = this.width + newH;
      }

      if (newV < 0) {
        newV = this.height + newV;
      }

      if (this.grid[newV][newH][0] === true) {
        const color = this.grid[newV][newH][1];
        colors.push(color);
        count++;
      }
    });

    const newColor = this.chooseColor(colors);

    return [count, newColor];
  }

  chooseColor(colors) {
    let randomColorChance = 0.001;
    const num = Math.floor((Math.random() + randomColorChance) * colors.length);
    if (num === colors.length){
      return this.chooseRandomColor();
    } else {
      return colors[num];
    }
  }

  chooseRandomColor() {
    const randomNum = Math.floor(Math.random() * 7);
    return this.colors[randomNum];
  }

  addRandomSeeds() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (Math.floor(Math.random() * 20) === 1) {
          const num = Math.floor(Math.random() * this.colors.length);
          this.grid[i][j] = [true, this.colors[num]];
        }
      }
    }
  }

  addSquares(pos, shape) {
    const selectedCoords = pos.split(',').map(el => parseInt(el));
    shape.forEach(coord => {
      const newY = coord[0] + selectedCoords[0];
      const newX = coord[1] + selectedCoords[1];
      const color = this.chooseRandomColor();
      this.grid[newY][newX] = [true, color];
    });
  }

  reset() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.grid[i][j] = [false];
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
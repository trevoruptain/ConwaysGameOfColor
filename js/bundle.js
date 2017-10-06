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

  clickHere: [[36, 64],
 [36, 63],
 [36, 62],
 [36, 61],
 [36, 60],
 [36, 59],
 [37, 59],
 [38, 59],
 [39, 59],
 [40, 59],
 [41, 59],
 [43, 59],
 [42, 59],
 [43, 61],
 [43, 60],
 [43, 62],
 [43, 63],
 [43, 64],
 [42, 64],
 [42, 63],
 [42, 62],
 [42, 61],
 [42, 60],
 [41, 60],
 [40, 60],
 [39, 60],
 [38, 60],
 [37, 60],
 [37, 61],
 [37, 62],
 [37, 63],
 [37, 64],
 [36, 68],
 [37, 68],
 [38, 68],
 [39, 68],
 [40, 68],
 [41, 68],
 [42, 68],
 [43, 68],
 [43, 69],
 [43, 71],
 [43, 70],
 [43, 72],
 [43, 73],
 [42, 73],
 [42, 72],
 [42, 71],
 [42, 70],
 [42, 69],
 [41, 69],
 [40, 69],
 [39, 69],
 [38, 69],
 [37, 69],
 [36, 69],
 [43, 76],
 [43, 77],
 [42, 77],
 [40, 77],
 [39, 77],
 [38, 77],
 [37, 77],
 [36, 77],
 [36, 76],
 [37, 76],
 [38, 76],
 [39, 76],
 [40, 76],
 [41, 76],
 [41, 77],
 [42, 76],
 [36, 81],
 [37, 81],
 [38, 81],
 [40, 81],
 [39, 81],
 [41, 81],
 [42, 81],
 [43, 81],
 [43, 82],
 [43, 83],
 [43, 84],
 [43, 85],
 [43, 86],
 [36, 82],
 [36, 83],
 [36, 85],
 [36, 84],
 [36, 86],
 [37, 86],
 [37, 85],
 [37, 84],
 [37, 82],
 [37, 83],
 [38, 82],
 [40, 82],
 [39, 82],
 [38, 139],
 [41, 82],
 [42, 82],
 [43, 113],
 [42, 83],
 [42, 84],
 [42, 86],
 [42, 85],
 [36, 89],
 [37, 89],
 [38, 89],
 [39, 89],
 [41, 89],
 [40, 89],
 [42, 89],
 [43, 89],
 [43, 90],
 [41, 90],
 [42, 90],
 [40, 90],
 [41, 91],
 [42, 92],
 [43, 93],
 [39, 90],
 [38, 90],
 [37, 90],
 [36, 90],
 [43, 94],
 [42, 93],
 [41, 92],
 [40, 91],
 [39, 91],
 [38, 92],
 [37, 93],
 [36, 94],
 [36, 93],
 [37, 92],
 [38, 91],
 [36, 104],
 [37, 104],
 [38, 104],
 [39, 104],
 [40, 104],
 [41, 104],
 [42, 104],
 [43, 104],
 [43, 105],
 [42, 105],
 [41, 105],
 [40, 105],
 [39, 105],
 [38, 105],
 [37, 105],
 [36, 105],
 [39, 106],
 [39, 107],
 [39, 108],
 [38, 108],
 [37, 108],
 [36, 108],
 [36, 109],
 [37, 109],
 [38, 109],
 [39, 109],
 [40, 109],
 [41, 109],
 [42, 109],
 [43, 109],
 [43, 108],
 [42, 108],
 [41, 108],
 [40, 108],
 [40, 106],
 [40, 107],
 [36, 112],
 [37, 112],
 [38, 112],
 [39, 112],
 [41, 112],
 [40, 112],
 [42, 112],
 [43, 112],
 [43, 114],
 [42, 113],
 [41, 113],
 [40, 113],
 [39, 113],
 [38, 113],
 [37, 113],
 [36, 113],
 [36, 114],
 [36, 115],
 [36, 117],
 [36, 116],
 [37, 117],
 [37, 116],
 [37, 115],
 [37, 114],
 [39, 114],
 [39, 115],
 [40, 115],
 [40, 114],
 [43, 114],
 [43, 115],
 [43, 116],
 [43, 117],
 [42, 114],
 [42, 115],
 [42, 116],
 [42, 117],
 [36, 120],
 [37, 120],
 [38, 120],
 [39, 120],
 [40, 120],
 [41, 120],
 [42, 120],
 [43, 120],
 [36, 121],
 [37, 121],
 [38, 121],
 [39, 121],
 [41, 121],
 [40, 121],
 [42, 121],
 [43, 121],
 [36, 122],
 [36, 123],
 [36, 124],
 [36, 125],
 [37, 126],
 [38, 126],
 [39, 125],
 [39, 124],
 [39, 123],
 [39, 122],
 [40, 122],
 [40, 123],
 [41, 123],
 [41, 124],
 [42, 124],
 [42, 125],
 [43, 125],
 [43, 126],
 [38, 125],
 [37, 125],
 [36, 129],
 [37, 129],
 [38, 129],
 [39, 129],
 [40, 129],
 [41, 130],
 [42, 130],
 [42, 131],
 [43, 129],
 [43, 130],
 [42, 130],
 [42, 129],
 [41, 129],
 [40, 130],
 [39, 130],
 [38, 130],
 [37, 130],
 [36, 130],
 [37, 131],
 [37, 132],
 [37, 133],
 [37, 134],
 [36, 134],
 [36, 133],
 [36, 132],
 [36, 131],
 [40, 131],
 [40, 132],
 [39, 131],
 [39, 132],
 [43, 131],
 [43, 132],
 [43, 134],
 [43, 133],
 [42, 134],
 [42, 133],
 [42, 132],
 [39, 130],
 [36, 138],
 [37, 138],
 [38, 138],
 [39, 138],
 [40, 138],
 [40, 139],
 [39, 139],
 [37, 139],
 [36, 139],
 [42, 138],
 [43, 138],
 [43, 139],
 [42, 139]]
};

/* harmony default export */ __webpack_exports__["a"] = (Util);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
  constructor(positions) {
    this.width = 200;
    this.height = 80;

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
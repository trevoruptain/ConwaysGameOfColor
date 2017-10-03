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
    this.positions = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].madness;
    this.board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* default */](this.positions);

    this.setupBoard = this.setupBoard.bind(this);
    this.runGame = this.runGame.bind(this);
    this.getColor = this.getColor.bind(this);

    this.isPaused = false;

    this.setupBoard();
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
          const color = this.getColor(i, j);
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
   }, 50);
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
      this.$li.addClass("add-objects");
      this.$li.on('click', e => {
        this.$li.removeClass("add-objects");
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].glider);
      });
    });

    $('.small-exploder').on('click', () => {
      this.$li.addClass("add-objects");
      this.$li.on('click', e => {
        this.$li.removeClass("add-objects");
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].smallExploder);
      });
    });

    $('.exploder').on('click', () => {
      this.$li.addClass("add-objects");
      this.$li.on('click', e => {
        this.$li.removeClass("add-objects");
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].exploder);
      });
    });

    $('.ten-cell-row').on('click', () => {
      this.$li.addClass("add-objects");
      this.$li.on('click', e => {
        this.$li.removeClass("add-objects");
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].tenCellRow);
      });
    });

    $('.spaceship').on('click', () => {
      this.$li.addClass("add-objects");
      this.$li.on('click', e => {
        this.$li.removeClass("add-objects");
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].spaceship);
      });
    });

    $('.tumbler').on('click', () => {
      this.$li.addClass("add-objects");
      this.$li.on('click', e => {
        this.$li.removeClass("add-objects");
        this.board.addSquares(e.target.dataset.pos, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].tumbler);
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
  glider: [
    [4, 3, 'green'],
    [3, 4, 'yellow'],
    [2, 2, 'purple'],
    [2, 3, 'orange'],
    [2, 4, 'pink']
  ],

  smallExploder: [
    [1, 0, 'purple'],
    [0, 0, 'yellow'],
    [0, -1, 'green'],
    [0, 1, 'red'],
    [-1, -1, 'orange'],
    [-1, 1, 'blue'],
    [-2, 0, 'orange']
  ],

  exploder: [
    [2, 0, "green"],
    [2, -2, "red"],
    [2, 2, "blue"],
    [1, -2, "purple"],
    [1, 2, "blue"],
    [0, -2, "pink"],
    [0, 2, "orange"],
    [-1, -2, "green"],
    [-1, 2, "yellow"],
    [-2, -2, "red"],
    [-2, 2, "pink"],
    [-2, 0, "blue"]
  ],

  tenCellRow: [
    [0, -4, 'green'],
    [0, -3, 'green'],
    [0, -2, 'green'],
    [0, -1, 'green'],
    [0, 0, 'green'],
    [0, 1, 'green'],
    [0, 2, 'green'],
    [0, 3, 'green'],
    [0, 4, 'green'],
    [0, 5, 'green'],
  ],

  spaceship: [
    [1, -2, 'red'],
    [2, -1, 'green'],
    [2, 0, 'yellow'],
    [2, 1, 'purple'],
    [2, 2, 'pink'],
    [1, 2, 'yellow'],
    [0, 2, 'blue'],
    [-1, 1, 'green'],
    [-1, -2, 'blue']
  ],

  tumbler: [
    [2, -2, 'orange'],
    [2, 1, 'orange'],
    [1, -2, 'orange'],
    [1, -1, 'orange'],
    [0, -1, 'orange'],
    [-1, -1, 'orange'],
    [-2, -1, 'orange'],
    [-3, -2, 'orange'],
    [-3, -3, 'orange'],
    [-2, -3, 'orange'],
    [-1, -3, 'orange'],
    [2, 1, 'orange'],
    [2, 2, 'orange'],
    [1, 1, 'orange'],
    [1, 2, 'orange'],
    [0, 1, 'orange'],
    [-1, 1, 'orange'],
    [-2, 1, 'orange'],
    [-3, 2, 'orange'],
    [-3, 3, 'orange'],
    [-2, 3, 'orange'],
    [-1, 3, 'orange']
  ],

  madness: [
    [25, 137, 'red'],
    [25, 138, 'green'],
    [23, 138, 'blue'],
    [24, 140, 'yellow'],
    [25, 141, 'orange'],
    [25, 142, 'purple'],
    [25, 143, 'pink'],

    [55, 37, 'pink'],
    [55, 38, 'yellow'],
    [53, 38, 'green'],
    [54, 40, 'pink'],
    [55, 41, 'blue'],
    [55, 42, 'orange'],
    [55, 43, 'purple'],

    [65, 107, 'pink'],
    [65, 108, 'yellow'],
    [63, 108, 'purple'],
    [64, 110, 'blue'],
    [65, 111, 'orange'],
    [65, 112, 'green'],
    [65, 113, 'red']
  ]
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

    this.populateBoard = this.populateBoard.bind(this);
    this.nextGeneration = this.nextGeneration.bind(this);
    this.greetNeighbors = this.greetNeighbors.bind(this);

    this.populateBoard(positions);
  }

  populateBoard(positions) {
    positions.forEach(position => {
      const y = position[0];
      const x = position[1];

      this.grid[y][x] = [true, position[2]];
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
    const rand = Math.floor(Math.random() * 500);

    const num = Math.floor(Math.random() * colors.length);
    return colors[num];
  }

  addRandomSeeds() {
    const colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink"];

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (Math.floor(Math.random() * 20) === 1) {
          const num = Math.floor(Math.random() * colors.length);
          this.grid[i][j] = [true, colors[num]];
        }
      }
    }
  }

  addSquares(pos, shape) {
    const selectedCoords = pos.split(',').map(el => parseInt(el));
    shape.forEach(coord => {
      const newY = coord[0] + selectedCoords[0];
      const newX = coord[1] + selectedCoords[1];
      const color = coord[2];
      this.grid[newY][newX] = [true, color];
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
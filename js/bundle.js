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

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Util = {
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
    [2, 1],
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
    [25, 40],
    [25, 41],
    [23, 41],
    [24, 43],
    [25, 44],
    [25, 45],
    [25, 46]
  ]
};

/* harmony default export */ __webpack_exports__["a"] = (Util);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
  constructor(positions) {
    this.width = 80;
    this.height = 50;

    this.grid = new Array(this.height);

    for (let i = 0; i < this.height; i++) {
      this.grid[i] = new Array(this.width);
    }

    this.populateBoard = this.populateBoard.bind(this);
    this.nextGeneration = this.nextGeneration.bind(this);
    this.countLiveNeighbors = this.countLiveNeighbors.bind(this);
    this.existsOnBoard = this.existsOnBoard.bind(this);

    this.populateBoard(positions);
  }

  populateBoard(positions) {
    //Set all positions to false initially
    positions.forEach(position => {
      const x = position[0];
      const y = position[1];

      this.grid[x][y] = true;
    });
  }

  nextGeneration() {
    const newGrid = new Array(this.height);
    const livePositions = [];

    for (let i = 0; i < this.height; i++) {
      newGrid[i] = new Array(this.width);
    }

    this.grid.forEach((row, i) => {
      row.forEach((el, j) => {
        const neighborCount = this.countLiveNeighbors([i, j]);

        if (this.grid[i][j] === true) {
          if (neighborCount < 2 || neighborCount > 3) {
            newGrid[i][j] = false;
          } else {
            newGrid[i][j] = true;
            livePositions.push([i, j]);
          }
        } else if (this.grid[i][j] === false) {
          if (neighborCount === 3) {
            newGrid[i][j] = true;
            livePositions.push([i, j]);
          } else {
            newGrid[i][j] = false;
          }
        }
      });
    });

    this.grid = newGrid;
    return livePositions;
  }

  countLiveNeighbors(pos) {
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

  const x = pos[0];
  const y = pos[1];
  let count = 0;

  directions.forEach(direction => {
    const a = direction[0];
    const b = direction[1];
    const newH = x + a;
    const newV = y + b;

    if (this.existsOnBoard([newH, newV])) {
      if (this.grid[newH][newV] === true) {
        count++;
      }
    }

  });

  return count;
  }

  existsOnBoard(pos) {
    const x = pos[0];
    const y = pos[1];

    if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
      return false;
    }

    return true;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
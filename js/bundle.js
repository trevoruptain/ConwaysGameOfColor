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
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);
const ConwayGame = __webpack_require__(2);

$( () => {
  const rootEl = $('.conway');
  const game = new ConwayGame;
  new GameView(game, rootEl);
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

//See Towers of Hanoi

class GameView {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.$el.on(
      "click",
      this.startGame()
    ).bind(this);
  }

  startGame() {

  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(3);
const Params = __webpack_require__(4);

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Board {
  construtor(params) {
    const width = params.width;
    const height = params.height;

    this.grid = new Array(height);

    this.grid.forEach(row => {
      row = new Array(width);
    });

    this.populateBoard = this.populateBoard.bind(this);
    this.nextGeneration = this.nextGeneration.bind(this);
    this.countLiveNeighbors = this.countLiveNeighbors.bind(this);
    this.existsOnBoard = this.existsOnBoard.bind(this);

    this.populateBoard(params.positions);
  }

  populateBoard(positions) {
    positions.forEach(position => {
      const x = position[0];
      const y = position[1];

      this.grid[x][y] = true;
    });
  }

  nextGeneration() {
    const newGrid = new Array(this.height);

    newGrid.forEach(row => {
      row = new Array(this.width);
    });

    this.grid.forEach((row, i) => {
      row.forEach((el, j) => {
        const neighborCount = this.countLiveNeighbors([i, j]);

        if (this.grid[i][j] === true) {
          if (neighborCount < 2 || neighborCount > 3) {
            newGrid[i][j] = false;
          } else {
            newGrid[i][j] = true;
          }
        } else if (this.grid[i][j] === false) {
          if (neighborCount === 3) {
            newGrid[i][j] = true;
          } else {
            newGrid[i][j] = false;
          }
        }
      });
    });

    this.grid = newGrid;
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

module.exports = Board;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const WriteJS = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"write.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

class Params {
  constructor() {
    //Receive an Ajax request through a form and return
    //width, height, and text inputs from a form

    //Later you can choose a background image

    //Retrieve the CSS File

    //Create a new instance of write JS with the parameters
    //Return the game parameters to game.js

    //Post the JavaScript and CSS files to the screen with Ajax
  }
}

//Add param for speed


/***/ })
/******/ ]);
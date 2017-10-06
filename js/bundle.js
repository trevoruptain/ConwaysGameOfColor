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

  conway: [
    [22,52],
    [22,51],
    [22,50],
    [22,49],
    [22,48],
    [22,47],
    [22,46],
    [22,45],
    [22,44],
    [22,42],
    [22,42],
    [22,41],
    [23,41],
    [24,41],
    [25,41],
    [26,41],
    [27,41],
    [28,41],
    [29,41],
    [30,41],
    [31,41],
    [32,41],
    [33,41],
    [34,41],
    [35,41],
    [35,42],
    [35,43],
    [36,44],
    [35,44],
    [35,46],
    [35,47],
    [35,48],
    [35,49],
    [35,50],
    [35,51],
    [35,52],
    [34,52],
    [34,51],
    [34,50],
    [34,49],
    [34,48],
    [34,47],
    [34,46],
    [34,45],
    [34,44],
    [34,43],
    [34,42],
    [33,42],
    [32,42],
    [31,42],
    [30,42],
    [29,42],
    [28,42],
    [27,43],
    [26,42],
    [25,42],
    [24,42],
    [23,42],
    [23,43],
    [23,45],
    [23,44],
    [23,46],
    [23,47],
    [23,48],
    [23,49],
    [23,50],
    [23,51],
    [23,52],
    [22,56],
    [23,56],
    [24,56],
    [25,56],
    [26,56],
    [27,56],
    [28,56],
    [29,56],
    [30,56],
    [31,56],
    [33,56],
    [33,56],
    [34,56],
    [35,56],
    [35,57],
    [34,57],
    [33,57],
    [32,57],
    [31,57],
    [30,57],
    [29,57],
    [28,57],
    [27,57],
    [26,57],
    [25,57],
    [24,57],
    [23,57],
    [22,57],
    [22,59],
    [22,58],
    [23,59],
    [23,60],
    [23,61],
    [23,62],
    [23,63],
    [23,64],
    [23,65],
    [22,59],
    [22,60],
    [22,61],
    [22,62],
    [22,63],
    [22,64],
    [22,65],
    [24,65],
    [24,64],
    [25,64],
    [25,65],
    [26,65],
    [26,64],
    [27,64],
    [28,65],
    [28,64],
    [29,64],
    [29,65],
    [30,65],
    [30,64],
    [31,64],
    [31,65],
    [32,65],
    [35,66],
    [35,67],
    [34,67],
    [34,66],
    [33,67],
    [33,66],
    [32,66],
    [32,67],
    [31,67],
    [31,66],
    [30,66],
    [30,67],
    [29,67],
    [29,66],
    [28,66],
    [28,67],
    [27,67],
    [27,66],
    [26,66],
    [26,67],
    [25,67],
    [25,66],
    [24,66],
    [24,68],
    [23,67],
    [22,67],
    [22,66],
    [23,66],
    [22,68],
    [23,71],
    [24,71],
    [25,71],
    [26,71],
    [27,71],
    [28,71],
    [29,71],
    [30,71],
    [31,71],
    [32,71],
    [33,71],
    [34,71],
    [35,71],
    [35,72],
    [34,72],
    [33,72],
    [32,72],
    [31,72],
    [30,72],
    [29,72],
    [28,72],
    [27,72],
    [26,72],
    [25,72],
    [24,72],
    [23,72],
    [22,72],
    [22,73],
    [24,73],
    [25,73],
    [25,74],
    [26,74],
    [26,75],
    [27,75],
    [28,75],
    [28,76],
    [29,76],
    [29,77],
    [30,77],
    [31,77],
    [31,78],
    [32,78],
    [32,79],
    [33,79],
    [34,79],
    [34,80],
    [35,80],
    [35,81],
    [34,81],
    [33,81],
    [33,80],
    [31,80],
    [31,81],
    [32,81],
    [32,80],
    [30,80],
    [30,82],
    [29,81],
    [29,80],
    [28,80],
    [28,81],
    [27,81],
    [27,80],
    [26,80],
    [26,81],
    [25,81],
    [25,80],
    [24,80],
    [24,81],
    [23,81],
    [23,80],
    [22,80],
    [22,81],
    [33,78],
    [32,77],
    [30,76],
    [27,74],
    [29,75],
    [31,76],
    [30,75],
    [28,74],
    [30,75],
    [22,83],
    [23,85],
    [24,85],
    [25,85],
    [26,85],
    [27,85],
    [28,85],
    [29,85],
    [30,85],
    [31,85],
    [32,85],
    [33,85],
    [34,85],
    [35,85],
    [35,86],
    [34,86],
    [33,86],
    [32,86],
    [31,86],
    [30,86],
    [29,86],
    [28,86],
    [27,86],
    [26,86],
    [25,86],
    [24,86],
    [23,86],
    [22,86],
    [35,87],
    [34,87],
    [34,88],
    [33,88],
    [33,89],
    [32,89],
    [32,90],
    [31,91],
    [31,90],
    [32,91],
    [33,92],
    [34,93],
    [35,94],
    [32,92],
    [33,93],
    [34,95],
    [35,95],
    [34,95],
    [34,96],
    [35,96],
    [33,96],
    [33,95],
    [32,95],
    [32,96],
    [31,96],
    [31,95],
    [30,95],
    [30,96],
    [29,96],
    [29,95],
    [28,95],
    [28,96],
    [27,96],
    [27,95],
    [26,95],
    [26,96],
    [24,96],
    [24,95],
    [25,95],
    [25,96],
    [23,96],
    [23,95],
    [22,95],
    [22,96],
    [22,97],
    [23,100],
    [24,100],
    [25,100],
    [26,100],
    [27,100],
    [28,100],
    [29,100],
    [30,100],
    [31,100],
    [32,100],
    [33,100],
    [34,100],
    [35,100],
    [35,101],
    [34,101],
    [33,101],
    [32,101],
    [31,101],
    [30,101],
    [29,101],
    [28,101],
    [27,101],
    [26,101],
    [25,101],
    [24,101],
    [23,101],
    [22,101],
    [23,102],
    [23,103],
    [23,104],
    [23,105],
    [23,107],
    [23,106],
    [23,108],
    [23,109],
    [23,110],
    [22,110],
    [22,109],
    [22,108],
    [22,107],
    [22,106],
    [22,105],
    [22,104],
    [22,103],
    [22,102],
    [22,111],
    [23,111],
    [24,111],
    [24,110],
    [25,110],
    [25,111],
    [26,110],
    [26,111],
    [28,111],
    [28,110],
    [27,110],
    [27,111],
    [29,111],
    [29,110],
    [30,110],
    [30,111],
    [31,111],
    [31,110],
    [32,110],
    [32,111],
    [33,111],
    [33,110],
    [34,110],
    [34,111],
    [35,111],
    [35,110],
    [28,102],
    [28,103],
    [28,104],
    [28,105],
    [28,106],
    [28,107],
    [28,108],
    [28,109],
    [29,102],
    [29,103],
    [29,104],
    [29,105],
    [29,106],
    [29,107],
    [29,108],
    [29,109],
    [22,112],
    [22,116],
    [23,116],
    [23,117],
    [24,117],
    [24,118],
    [25,118],
    [25,119],
    [26,119],
    [26,120],
    [27,120],
    [27,121],
    [27,122],
    [26,122],
    [26,123],
    [25,123],
    [25,124],
    [24,124],
    [26,121],
    [25,122],
    [24,123],
    [23,124],
    [28,120],
    [28,121],
    [29,120],
    [29,121],
    [30,121],
    [30,120],
    [31,120],
    [31,121],
    [32,121],
    [32,120],
    [33,120],
    [33,121],
    [34,121],
    [34,120],
    [35,120],
    [35,121],
    [22,130],
    [23,130],
    [24,130],
    [25,130],
    [26,130],
    [27,130],
    [28,130],
    [29,130],
    [30,130],
    [31,130],
    [32,130],
    [32,131],
    [31,131],
    [30,131],
    [29,131],
    [28,131],
    [27,131],
    [26,131],
    [25,131],
    [24,131],
    [23,131],
    [22,131],
    [35,130],
    [35,131],
    [22,135],
    [23,135],
    [24,135],
    [25,135],
    [26,135],
    [27,135],
    [28,135],
    [29,135],
    [30,135],
    [31,135],
    [31,136],
    [30,136],
    [29,136],
    [28,136],
    [27,136],
    [26,136],
    [24,136],
    [25,136],
    [23,136],
    [22,136],
    [34,135],
    [35,135],
    [35,136],
    [34,136],
    [22,140],
    [23,140],
    [23,141],
    [22,141],
    [24,140],
    [25,140],
    [26,140],
    [27,140],
    [28,140],
    [29,140],
    [30,140],
    [31,140],
    [31,141],
    [30,141],
    [29,141],
    [28,141],
    [27,141],
    [26,141],
    [25,141],
    [24,141],
    [34,140],
    [35,140],
    [35,141],
    [34,141],
    [22,145],
    [23,145],
    [24,145],
    [25,145],
    [26,145],
    [27,145],
    [28,145],
    [29,145],
    [30,145],
    [31,145],
    [31,146],
    [30,146],
    [28,146],
    [29,146],
    [27,146],
    [26,146],
    [25,146],
    [24,146],
    [23,146],
    [22,146],
    [34,145],
    [35,145],
    [35,146],
    [34,146],
    [22,149],
    [23,149],
    [24,149],
    [25,149],
    [26,149],
    [27,149],
    [28,149],
    [29,149],
    [30,149],
    [31,149],
    [31,150],
    [30,150],
    [32,150],
    [34,150],
    [34,151],
    [32,151],
    [31,151],
    [30,151],
    [29,151],
    [28,151],
    [26,151],
    [25,151],
    [27,151],
    [24,151],
    [23,151],
    [22,151],
    [22,155],
    [23,155],
    [24,155],
    [25,155],
    [26,155],
    [27,155],
    [28,155],
    [29,155],
    [30,155],
    [31,155],
    [32,155],
    [32,156],
    [31,156],
    [30,156],
    [29,156],
    [28,156],
    [27,156],
    [25,156],
    [26,156],
    [24,156],
    [23,156],
    [22,156],
    [8,24],
    [9,25],
    [10,25],
    [10,24],
    [10,23],
    [4,53],
    [5,54],
    [6,54],
    [6,53],
    [6,52],
    [4,92],
    [5,93],
    [6,93],
    [6,92],
    [6,91],
    [53,97],
    [54,98],
    [55,98],
    [55,97],
    [55,96],
    [39,36],
    [40,36],
    [41,36],
    [42,36],
    [43,36],
    [39,38],
    [43,38],
    [43,40],
    [42,40],
    [41,40],
    [40,40],
    [39,40],
    [5,176],
    [6,176],
    [7,176],
    [8,176],
    [9,176],
    [9,178],
    [5,178],
    [5,180],
    [6,180],
    [7,180],
    [8,180],
    [9,180],
    [53,130],
    [53,131],
    [53,132],
    [53,133],
    [53,134],
    [55,134],
    [55,130],
    [57,130],
    [57,131],
    [57,132],
    [57,133],
    [57,134],
    [57,33],
    [58,33],
    [59,33],
    [60,33],
    [61,33],
    [61,35],
    [57,35],
    [57,37],
    [58,37],
    [59,37],
    [60,37],
    [61,37],
    [51,71],
    [52,71],
    [53,71],
    [51,70],
    [52,69],
    [42,114],
    [43,114],
    [44,114],
    [42,113],
    [43,112],
    [5,153],
    [6,153],
    [7,153],
    [7,152],
    [6,151],
    [4,106],
    [5,106],
    [6,106],
    [6,105],
    [5,104],
    [48,148],
    [49,148],
    [50,148],
    [48,149],
    [49,150],
    [64,5],
    [65,5],
    [66,5],
    [64,6],
    [65,7],
    [21,18],
    [22,18],
    [23,18],
    [24,18],
    [25,18],
    [26,18],
    [27,18],
    [28,18],
    [29,18],
    [30,18],
    [72,174],
    [72,175],
    [72,176],
    [72,177],
    [72,178],
    [72,179],
    [72,180],
    [72,181],
    [72,182],
    [72,183],
    [14,126],
    [14,127],
    [14,128],
    [14,129],
    [14,130],
    [14,131],
    [14,132],
    [14,134],
    [14,133],
    [14,135],
    [22,159],
    [28,160],
    [28,161],
    [28,162],
    [28,163],
    [28,164],
    [28,165],
    [28,166],
    [28,167],
    [28,168],
    [60,115],
    [61,115],
    [62,115],
    [63,115],
    [64,115],
    [65,115],
    [67,115],
    [66,115],
    [68,115],
    [69,115],
    [74,52],
    [72,52],
    [71,53],
    [71,54],
    [71,55],
    [71,56],
    [72,56],
    [73,56],
    [74,55],
    [47,166],
    [44,166],
    [44,167],
    [44,168],
    [44,169],
    [44,170],
    [45,170],
    [46,170],
    [47,169],
    [29,180],
    [27,180],
    [26,181],
    [26,182],
    [26,183],
    [26,184],
    [27,184],
    [28,184],
    [29,183],
    [41,8],
    [42,8],
    [42,9],
    [41,9],
    [43,9],
    [45,9],
    [44,9],
    [46,8],
    [46,7],
    [45,7],
    [44,7],
    [41,11],
    [42,11],
    [43,11],
    [44,11],
    [45,11],
    [41,12],
    [42,12],
    [46,12],
    [46,13],
    [45,13],
    [44,13],
    [15,65],
    [15,66],
    [14,66],
    [14,65],
    [13,66],
    [12,66],
    [11,66],
    [10,65],
    [10,64],
    [11,64],
    [12,64],
    [15,68],
    [14,68],
    [14,69],
    [15,69],
    [13,68],
    [11,68],
    [12,68],
    [10,69],
    [10,70],
    [11,70],
    [12,70],
    [66,143],
    [67,143],
    [67,144],
    [67,144],
    [66,145],
    [66,146],
    [66,147],
    [67,148],
    [68,148],
    [68,147],
    [68,146],
    [64,143],
    [64,144],
    [64,146],
    [64,145],
    [64,147],
    [63,148],
    [62,148],
    [63,144],
    [63,143],
    [62,147],
    [62,146],
    [12,5],
    [13,5],
    [14,5],
    [12,6],
    [13,7],
    [40,187],
    [41,187],
    [42,187],
    [43,187],
    [45,187],
    [44,187],
    [46,187],
    [47,187],
    [48,187],
    [49,187],
    [65,82],
    [66,82],
    [67,82],
    [65,83],
    [66,84]
  ],

  clickHere: [[36, 61],
 [36, 60],
 [36, 59],
 [36, 58],
 [36, 57],
 [36, 56],
 [37, 56],
 [38, 56],
 [39, 56],
 [40, 56],
 [41, 56],
 [43, 56],
 [42, 56],
 [43, 58],
 [43, 57],
 [43, 59],
 [43, 60],
 [43, 61],
 [42, 61],
 [42, 60],
 [42, 59],
 [42, 58],
 [42, 57],
 [41, 57],
 [40, 57],
 [39, 57],
 [38, 57],
 [37, 57],
 [37, 58],
 [37, 59],
 [37, 60],
 [37, 61],
 [36, 65],
 [37, 65],
 [38, 65],
 [39, 65],
 [40, 65],
 [41, 65],
 [42, 65],
 [43, 65],
 [43, 66],
 [43, 68],
 [43, 67],
 [43, 69],
 [43, 70],
 [42, 70],
 [42, 69],
 [42, 68],
 [42, 67],
 [42, 66],
 [41, 66],
 [40, 66],
 [39, 66],
 [38, 66],
 [37, 66],
 [36, 66],
 [43, 73],
 [43, 74],
 [42, 74],
 [40, 74],
 [39, 74],
 [38, 74],
 [37, 74],
 [36, 74],
 [36, 73],
 [37, 73],
 [38, 73],
 [39, 73],
 [40, 73],
 [41, 73],
 [41, 74],
 [42, 73],
 [36, 78],
 [37, 78],
 [38, 78],
 [40, 78],
 [39, 78],
 [41, 78],
 [42, 78],
 [43, 78],
 [43, 79],
 [43, 80],
 [43, 81],
 [43, 82],
 [43, 83],
 [36, 79],
 [36, 80],
 [36, 82],
 [36, 81],
 [36, 83],
 [37, 83],
 [37, 82],
 [37, 81],
 [37, 79],
 [37, 80],
 [38, 79],
 [40, 79],
 [39, 79],
 [38, 136],
 [41, 79],
 [42, 79],
 [42, 80],
 [42, 81],
 [42, 83],
 [42, 82],
 [36, 86],
 [37, 86],
 [38, 86],
 [39, 86],
 [41, 86],
 [40, 86],
 [42, 86],
 [43, 86],
 [43, 87],
 [41, 87],
 [42, 87],
 [40, 87],
 [41, 88],
 [42, 89],
 [43, 90],
 [39, 87],
 [38, 87],
 [37, 87],
 [36, 87],
 [43, 91],
 [42, 90],
 [41, 89],
 [40, 88],
 [39, 88],
 [38, 89],
 [37, 90],
 [36, 91],
 [36, 90],
 [37, 89],
 [38, 88],
 [36, 101],
 [37, 101],
 [38, 101],
 [39, 101],
 [40, 101],
 [41, 101],
 [42, 101],
 [43, 101],
 [43, 102],
 [42, 102],
 [41, 102],
 [40, 102],
 [39, 102],
 [38, 102],
 [37, 102],
 [36, 102],
 [39, 103],
 [39, 104],
 [39, 105],
 [38, 105],
 [37, 105],
 [36, 105],
 [36, 106],
 [37, 106],
 [38, 106],
 [39, 106],
 [40, 106],
 [41, 106],
 [42, 106],
 [43, 106],
 [43, 105],
 [42, 105],
 [41, 105],
 [40, 105],
 [40, 103],
 [40, 104],
 [36, 109],
 [37, 109],
 [38, 109],
 [39, 109],
 [41, 109],
 [40, 109],
 [42, 109],
 [43, 109],
 [43, 111],
 [42, 110],
 [41, 110],
 [40, 110],
 [39, 110],
 [38, 110],
 [37, 110],
 [36, 110],
 [36, 111],
 [36, 112],
 [36, 114],
 [36, 113],
 [37, 114],
 [37, 113],
 [37, 112],
 [37, 111],
 [39, 111],
 [39, 112],
 [40, 112],
 [40, 111],
 [43, 111],
 [43, 112],
 [43, 113],
 [43, 114],
 [42, 111],
 [42, 112],
 [42, 113],
 [42, 114],
 [36, 117],
 [37, 117],
 [38, 117],
 [39, 117],
 [40, 117],
 [41, 117],
 [42, 117],
 [43, 117],
 [36, 118],
 [37, 118],
 [38, 118],
 [39, 118],
 [41, 118],
 [40, 118],
 [42, 118],
 [43, 118],
 [36, 119],
 [36, 120],
 [36, 121],
 [36, 122],
 [37, 123],
 [39, 123],
 [39, 122],
 [39, 121],
 [39, 120],
 [39, 119],
 [40, 119],
 [40, 120],
 [41, 120],
 [41, 121],
 [42, 121],
 [42, 122],
 [43, 122],
 [43, 123],
 [38, 122],
 [37, 122],
 [36, 126],
 [37, 126],
 [38, 126],
 [39, 126],
 [40, 126],
 [41, 127],
 [42, 127],
 [42, 128],
 [43, 126],
 [43, 127],
 [42, 127],
 [42, 126],
 [41, 126],
 [40, 127],
 [39, 127],
 [38, 127],
 [37, 127],
 [36, 127],
 [37, 128],
 [37, 129],
 [37, 130],
 [37, 131],
 [36, 131],
 [36, 130],
 [36, 129],
 [36, 128],
 [40, 128],
 [40, 129],
 [39, 128],
 [39, 129],
 [43, 128],
 [43, 129],
 [43, 131],
 [43, 130],
 [42, 131],
 [42, 130],
 [42, 129],
 [39, 127],
 [36, 135],
 [37, 135],
 [38, 135],
 [39, 135],
 [40, 135],
 [40, 136],
 [39, 136],
 [37, 136],
 [36, 136],
 [42, 135],
 [43, 135],
 [43, 136],
 [42, 136]]
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
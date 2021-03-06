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
    const newCoords = [];
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

export default Board;

class Board {
  constructor(positions) {
    this.width = 200;
    this.height = 80;

    this.grid = new Array(this.height);

    for (let i = 0; i < this.height; i++) {
      this.grid[i] = new Array(this.width);
      this.grid[i].fill(false);
    }

    this.populateBoard = this.populateBoard.bind(this);
    this.nextGeneration = this.nextGeneration.bind(this);
    this.countLiveNeighbors = this.countLiveNeighbors.bind(this);

    this.populateBoard(positions);
  }

  populateBoard(positions) {
    positions.forEach(position => {
      const y = position[0];
      const x = position[1];

      this.grid[y][x] = true;
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

  const y = pos[0];
  const x = pos[1];
  let count = 0;

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

    if (this.grid[newV][newH] === true) {
      count++;
    }

  });

  return count;
  }
}

export default Board;

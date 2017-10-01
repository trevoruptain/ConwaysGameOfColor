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

export default Board;

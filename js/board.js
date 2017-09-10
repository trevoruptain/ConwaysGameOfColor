class Board {
  construtor(width, height, positions) {
    this.grid = new Array(height);

    this.grid.forEach(row => {
      row = new Array(width);
    });

    this.width = width;
    this.height = height;

    this.populateBoard = this.populateBoard.bind(this);
    this.nextGeneration = this.nextGeneration.bind(this);
    this.countLiveNeighbors = this.countLiveNeighbors.bind(this);
    this.existsOnBoard = this.existsOnBoard.bind(this);

    this.populateBoard(positions);
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

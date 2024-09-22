export const cellTypes = {
  wall: "wall",
  path: "path",
  start: "start",
  end: "end",
} as const;

export type CellType = keyof typeof cellTypes;

export const generateMaze = ({
  rows,
  cols,
}: {
  rows: number;
  cols: number;
}) => {
  const matrix = [] as CellType[][];

  for (let i = 0; i < rows; i++) {
    const row = [] as CellType[];
    for (let j = 0; j < cols; j++) {
      const cellType = "wall";
      row.push(cellType);
    }
    matrix.push(row);
  }

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  function isCellValid(x: number, y: number) {
    return y >= 0 && x >= 0 && x < cols && y < rows && matrix[y][x] === "wall";
  }

  function carvePath(x: number, y: number) {
    matrix[y][x] = "path";

    const directions = dirs.sort(() => Math.random() - 0.5);

    for (const [dx, dy] of directions) {
      const newX = x + dx * 2;
      const newY = y + dy * 2;

      if (isCellValid(newX, newY)) {
        matrix[y + dy][x + dx] = "path";
        carvePath(newX, newY);
      }
    }
  }

  carvePath(1, 1);

  matrix[1][0] = "start";
  matrix[rows - 2][cols - 1] = "end";

  return matrix;
};

export type MazeData = ReturnType<typeof generateMaze>;

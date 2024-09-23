export const cellTypes = {
  wall: "wall",
  path: "path",
  start: "start",
  end: "end",
  visited: "visited",
} as const;

export type CellType = keyof typeof cellTypes;
export type MazeData = CellType[][];

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

type Node = [number, number];

interface IMazeProps {
  cols: number;
  rows: number;
  onDataChange: (data: MazeData) => void;
}

export class Maze {
  matrix: MazeData;
  cols: number;
  rows: number;
  updateData: (data: MazeData) => void;
  constructor({ cols, rows, onDataChange }: IMazeProps) {
    this.matrix = [] as MazeData;
    this.cols = cols;
    this.rows = rows;
    this.updateData = onDataChange;

    this.generateMaze();
  }

  get data() {
    return this.matrix;
  }

  isWithinMazeBound(x: number, y: number) {
    return y >= 0 && x >= 0 && x < this.cols && y < this.rows;
  }

  setMatrix(matrix: MazeData) {
    this.matrix = matrix;
    this.updateData(matrix);
  }

  generateMaze() {
    const matrix = [] as MazeData;

    for (let i = 0; i < this.rows; i++) {
      const row = [] as CellType[];
      for (let j = 0; j < this.cols; j++) {
        const cellType = "wall";
        row.push(cellType);
      }
      matrix.push(row);
    }

    const isCellValid = (x: number, y: number) => {
      return this.isWithinMazeBound(x, y) && matrix[y][x] === "wall";
    };

    function carvePath(x: number, y: number) {
      matrix[y][x] = "path";

      const directions = [...dirs].sort(() => Math.random() - 0.5);

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
    matrix[this.rows - 2][this.cols - 1] = "end";

    this.setMatrix(matrix);

    return matrix;
  }

  visitCell([x, y]: Node) {
    const matrix = [...this.matrix].map((row) => [...row]);
    matrix[y][x] = "visited";
    this.setMatrix(matrix);
  }

  bfs(startNode: Node) {
    const queue = [startNode];

    const visited = new Set(startNode.toString());

    const step = () => {
      if (!queue.length) return;

      const [x, y] = queue.shift() as Node;

      for (const [dx, dy] of dirs) {
        const newX = x + dx;
        const newY = y + dy;

        const nodeKey = [newX, newY].toString();

        if (this.isWithinMazeBound(newX, newY) && !visited.has(nodeKey)) {
          visited.add(nodeKey);

          if (this.matrix[newY][newX] === "end") {
            this.visitCell([newX, newY]);
            console.log("path found!");
            return true;
          }

          if (this.matrix[newY][newX] === "path") {
            this.visitCell([newX, newY]);
            queue.push([newX, newY]);
          }
        }
      }
    };

    step();
  }
}

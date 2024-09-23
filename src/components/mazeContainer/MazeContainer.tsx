import { MazeGrid } from "../mazeGrid";
import { useState } from "react";
import styles from "./styles.module.scss";
import { ControlButtons } from "../controlsButtons";
import { Maze, type MazeData } from "./MazeModel";

interface IProps {
  cols: number;
  rows: number;
}

export const MazeContainer = ({ cols, rows }: IProps) => {
  const [mazeData, setMazeData] = useState<MazeData>();
  const [maze] = useState(
    () => new Maze({ cols, rows, onDataChange: setMazeData })
  );

  const refreshMaze = () => {
    maze.generateMaze();
  };

  if (!mazeData) return "Loading...";

  return (
    <div className={styles.container}>
      <ControlButtons
        generateMaze={refreshMaze}
        breadthFirstSearch={maze.bfs}
        depthFirstSearch={maze.dfs}
      />
      <MazeGrid data={mazeData} />
    </div>
  );
};

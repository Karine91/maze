import { MazeGrid } from "../mazeGrid";
import { useState } from "react";
import styles from "./styles.module.scss";
import { ControlButtons } from "../controlsButtons";
import { generateMaze } from "./generate-maze";

interface IProps {
  cols: number;
  rows: number;
}

export const MazeContainer = ({ cols, rows }: IProps) => {
  const [mazeData, setMazeData] = useState(() => generateMaze({ cols, rows }));

  const refreshMaze = () => {
    setMazeData(generateMaze({ cols, rows }));
  };

  return (
    <div className={styles.container}>
      <ControlButtons generateMaze={refreshMaze} />
      <MazeGrid data={mazeData} />
    </div>
  );
};

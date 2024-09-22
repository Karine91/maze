import { MazeData } from "../mazeContainer";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface IProps {
  data: MazeData;
}

export const MazeGrid = ({ data }: IProps) => {
  return (
    <div className={styles.maze}>
      {data.map((row, ind) => (
        <div className={styles.row} key={ind}>
          {row.map((cell, cellInd) => (
            <div
              className={clsx(styles.cell, styles[cell])}
              key={`${ind}-${cellInd}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

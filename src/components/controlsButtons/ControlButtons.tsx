import { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface IProps {
  generateMaze: () => void;
  breadthFirstSearch: () => void;
  depthFirstSearch: () => void;
}

export const ControlButtons = ({
  generateMaze,
  breadthFirstSearch,
  depthFirstSearch,
}: IProps) => {
  const [active, setActive] = useState<null | "dfs" | "bfs">(null);
  return (
    <div>
      <button
        className={styles.button}
        onClick={() => {
          generateMaze();
          setActive(null);
        }}
      >
        Refresh Maze
      </button>
      <button
        className={clsx(styles.button, { [styles.active]: active === "bfs" })}
        onClick={() => {
          setActive("bfs");
          breadthFirstSearch();
        }}
      >
        BFS
      </button>
      <button
        className={clsx(styles.button, { [styles.active]: active === "dfs" })}
        onClick={() => {
          setActive("dfs");
          depthFirstSearch();
        }}
      >
        DFS
      </button>
    </div>
  );
};

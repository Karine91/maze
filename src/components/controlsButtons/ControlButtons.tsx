import styles from "./styles.module.scss";

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
  return (
    <div>
      <button className={styles.button} onClick={generateMaze}>
        Refresh Maze
      </button>
      <button className={styles.button} onClick={breadthFirstSearch}>
        BFS
      </button>
      <button className={styles.button} onClick={depthFirstSearch}>
        DFS
      </button>
    </div>
  );
};

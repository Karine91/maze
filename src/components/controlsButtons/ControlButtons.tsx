import styles from "./styles.module.scss";

interface IProps {
  generateMaze: () => void;
}

export const ControlButtons = ({ generateMaze }: IProps) => {
  return (
    <div>
      <button className={styles.button} onClick={generateMaze}>
        Refresh Maze
      </button>
      <button className={styles.button}>BFS</button>
      <button className={styles.button}>DFS</button>
    </div>
  );
};

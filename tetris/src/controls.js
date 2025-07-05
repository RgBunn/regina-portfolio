import { gameIsOver, gameIsPaused, currentTetromino } from "./game-logic";
document.addEventListener("keydown", (e) => {
  if (gameIsOver || gameIsPaused) return;
  if (e.key === "ArrowLeft") currentTetromino.moveLeft();
  if (e.key === "ArrowRight") currentTetromino.moveRight();
  if (e.key === "Enter") currentTetromino.rotate();
  if (e.key === "ArrowDown") currentTetromino.moveDown();
  console.log(e.key);
});

import { gridCells, width } from "./grid";
import { getRandomTetromino } from "./tetromino";
import {
  gameScoreContainer,
  updateLevelDisplay,
  showNextTetromino,
  gameOverModal,
  updateFinalScore,
  showLowScoreImage,
  animateLevelUp,
} from "./ui";

export let gameIsPaused = false;
export let gameIsOver = false;
export let lockedCells = new Set();

export let currentLevel = 1;
export let gameScore = 0;
export let rowsCleared = 0;

export let currentTetromino;
export let nextTetromino;

export function pauseTheGame() {
  gameIsPaused = !gameIsPaused;
  return gameIsPaused;
}

export function clearFullRows() {
  for (let i = gridCells.length - width; i >= 0; i -= width) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(i + j);
    }
    const isFull = row.every((cell) => lockedCells.has(cell));

    if (isFull) {
      row.forEach((rowCell) => {
        lockedCells.delete(rowCell);
        gridCells[rowCell].className = "grid-cell";
      });
      gameScore += 10;
      gameScoreContainer.textContent = gameScore;

      rowsCleared += 1;

      if (rowsCleared % 10 === 0) {
        currentLevel += 1;
        updateLevelDisplay();
        animateLevelUp();
      }

      for (let k = i - 1; k >= 0; k--) {
        if (lockedCells.has(k)) {
          lockedCells.delete(k);
          lockedCells.add(k + width);
          const currentClasses = Array.from(gridCells[k].classList).filter(
            (cls) => cls !== "grid-cell"
          );
          gridCells[k + width].className =
            "grid-cell " + currentClasses.join(" ");
          gridCells[k].className = "grid-cell";
        }
      }
      i += width;
    }
  }
}
export function spawnNewTetromino() {
  if (gameIsOver) return;

  if (!nextTetromino) {
    nextTetromino = getRandomTetromino();
  }

  currentTetromino = nextTetromino;

  nextTetromino = getRandomTetromino();
  showNextTetromino(nextTetromino);

  if (
    currentTetromino.cells.some((cell) => cell >= 0 && lockedCells.has(cell))
  ) {
    gameOver();
    return;
  }
  currentTetromino.renderTetromino();
  currentTetromino.fall();
}
export function gameOver() {
  gameIsOver = true;
  clearInterval(currentTetromino.fallInterval);
  updateFinalScore();

  const form = document.querySelector("#add-name__form");
  const resultContainer = document.querySelector("#submission-feedback");
  resultContainer.innerHTML = "";

  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  const qualifiesForLeaderboard =
    gameScore > 0 &&
    (leaderboard.length < 10 ||
      gameScore > leaderboard[leaderboard.length - 1]?.score);

  if (qualifiesForLeaderboard) {
    form.style.display = "block";
  } else {
    form.style.display = "none";
    showLowScoreImage();
  }

  gameOverModal.showModal();
}

export function resetGame() {
  lockedCells.clear();
  gameScore = 0;
  gameScoreContainer.textContent = 0;
  gameIsOver = false;
  rowsCleared = 0;
  currentLevel = 1;
  updateLevelDisplay();
  gridCells.forEach((cell) => {
    cell.className = "grid-cell";
  });
  spawnNewTetromino();
}

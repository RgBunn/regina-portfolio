import { miniGridCells } from "./grid";
import {
  gameIsPaused,
  gameIsOver,
  currentLevel,
  gameScore,
  pauseTheGame,
} from "./game-logic";

export const gameScoreContainer = document.querySelector("#game-score");
const pauseBtn = document.querySelector("#btn-pause");
const pauseOverlay = document.querySelector("#pause-overlay");
export const gameOverModal = document.querySelector("#game-over__modal");
const resultImageContainer = document.querySelector("#submission-feedback");
const resultImage = document.createElement("img");
resultImage.classList.add("game-result-image");
const previewShapes = {
  L: [2, 7, 12, 13],
  J: [2, 3, 7, 12],
  I: [2, 7, 12, 17],
  Z: [6, 7, 12, 13],
  S: [7, 8, 11, 12],
  T: [7, 11, 12, 13],
  O: [6, 7, 11, 12],
};
export function showNextTetromino(tetromino) {
  miniGridCells.forEach((cell) => {
    cell.className = "mini-grid-cell";
  });

  const previewOffsets = previewShapes[tetromino.type];
  previewOffsets.forEach((index) => {
    if (miniGridCells[index]) {
      miniGridCells[index].classList.add("tetromino-cell", tetromino.type);
    }
  });
}
pauseBtn.addEventListener("click", () => {
  if (gameIsOver) return;
  pauseTheGame();

  pauseBtn.textContent = gameIsPaused ? "Resume" : "Pause";
  pauseOverlay.style.visibility = gameIsPaused ? "visible" : "hidden";
});

export function updateLevelDisplay() {
  document.querySelector("#game-level").textContent = currentLevel;
}
export function updateFinalScore() {
  const finalScoreContainer = document.querySelector("#final-score");
  finalScoreContainer.textContent = gameScore;
}

export function showLowScoreImage() {
  const lowScoreMessage = document.createElement("p");
  lowScoreMessage.innerHTML = "Almost legendary! Try again!";
  lowScoreMessage.classList.add("low-score-message");
  resultImage.src = "../images/oops.png";
  resultImageContainer.append(resultImage, lowScoreMessage);
}

export function showHighScoreImage() {
  resultImage.src = "../images/success_name-submitted.png";
  resultImageContainer.appendChild(resultImage);
}

export function animateLevelUp() {
  const levelUpContainer = document.querySelector("#level-up-animation");

  levelUpContainer.classList.remove("level-up-hidden");
  levelUpContainer.classList.add("level-up-show");

  setTimeout(() => {
    levelUpContainer.classList.remove("level-up-show");
    levelUpContainer.classList.add("level-up-hidden");
  }, 1500);
}

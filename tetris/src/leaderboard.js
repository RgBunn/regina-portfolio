import { gameScore, resetGame } from "./game-logic";
import { showHighScoreImage } from "./ui";

const addNameForm = document.querySelector("#add-name__form");
const finalScoreContainer = document.querySelector("#final-score");
const leaderboardContainer = document.querySelector("#leaderboard-list");
const playAgainButton = document.querySelector("#play-again__button");

addNameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const playerName = addNameForm.elements.player.value.trim();
  const input = addNameForm.elements.player;

  if (!playerName) {
    input.classList.add("shake");
    setTimeout(() => {
      input.classList.remove("shake");
    }, 400);
    return;
  }

  const stored = localStorage.getItem("leaderboard");
  let leaderboard = stored ? JSON.parse(stored) : [];

  const sameScoreEntry = leaderboard.find((entry) => entry.score === gameScore);

  if (sameScoreEntry) {
    sameScoreEntry.name = playerName;
  } else {
    leaderboard.push({ name: playerName, score: gameScore });
  }
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  updateLeaderboard();
  finalScoreContainer.textContent = gameScore;
  addNameForm.elements.player.value = "";
  addNameForm.style.display = "none";
  showHighScoreImage();
});

function updateLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboardContainer.innerHTML = "";

  leaderboard.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} - ${entry.score}`;
    leaderboardContainer.appendChild(li);
  });
}
updateLeaderboard();

playAgainButton.addEventListener("click", () => {
  document.querySelector("#game-over__modal").close();

  resetGame();
});

import "./styles/main.css";
import { createGameGrid, createPreviewGrid } from "./grid";
import { spawnNewTetromino } from "./game-logic";
import "./controls.js";
import "./leaderboard.js";

createGameGrid();
createPreviewGrid();
spawnNewTetromino();

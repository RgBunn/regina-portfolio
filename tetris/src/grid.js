export const tetrisGrid = document.querySelector("#tetris-grid");
export const gridCells = [];

export const miniGridContainer = document.querySelector("#mini-grid");
export const miniGridCells = [];
export const width = 10;

export function createGameGrid() {
  for (let i = 0; i < 200; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");
    gridCells.push(gridCell);
    tetrisGrid.append(gridCell);
  }
}

export function createPreviewGrid() {
  for (let i = 0; i < 20; i++) {
    const miniGridCell = document.createElement("div");
    miniGridCell.classList.add("mini-grid-cell");
    miniGridCells.push(miniGridCell);
    miniGridContainer.append(miniGridCell);
  }
}

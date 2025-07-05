import { gridCells, width } from "./grid";
import { currentLevel, gameIsPaused, lockedCells } from "./game-logic";
import { spawnNewTetromino, clearFullRows } from "./game-logic";

export class Tetromino {
  constructor(shape, type) {
    this.shapes = shape;
    this.type = type;
    this.origin = -6;
    this.rotationIndex = 0;
    this.fallInterval = null;
  }
  get cells() {
    return this.shapes[this.rotationIndex].map(
      (offset) => this.origin + offset
    );
  }
  renderTetromino() {
    this.cells.forEach((i) => {
      if (gridCells[i]) {
        gridCells[i].classList.add("tetromino-cell", this.type);
      }
    });
  }

  clearTetromino() {
    this.cells.forEach((i) => {
      if (gridCells[i])
        gridCells[i].classList.remove("tetromino-cell", this.type);
    });
  }

  moveLeft() {
    const canMove = this.cells.every(
      (i) => i % width !== 0 && !lockedCells.has(i - 1)
    );
    if (canMove) {
      this.clearTetromino();
      this.origin -= 1;
      this.renderTetromino();
    }
  }

  moveRight() {
    const canMove = this.cells.every(
      (i) => i % 10 !== 9 && !lockedCells.has(i + 1)
    );
    if (canMove) {
      this.clearTetromino();
      this.origin += 1;
      this.renderTetromino();
    }
  }

  moveDown() {
    const canMove = this.cells.every(
      (i) => i + width < gridCells.length && !lockedCells.has(i + width)
    );
    if (canMove) {
      this.clearTetromino();
      this.origin += width;
      this.renderTetromino();
    }
  }

  rotate() {
    const nextRotationIndex = (this.rotationIndex + 1) % this.shapes.length;

    const tryRotation = (originOffset = 0) => {
      const newOrigin = this.origin + originOffset;
      const nextCells = this.shapes[nextRotationIndex].map(
        (offset) => newOrigin + offset
      );

      const currentCol = newOrigin % width;

      const isValid = nextCells.every((i) => {
        const x = i % width;
        const y = Math.floor(i / width);
        const withinHorizontalBounds = x >= 0 && x < width;
        const withinVerticalBounds = y >= 0 && y < 20;
        const notLocked = !lockedCells.has(i);
        return withinHorizontalBounds && withinVerticalBounds && notLocked;
      });

      const doesNotWrap = nextCells.every(
        (cell) =>
          Math.floor(cell / width) === Math.floor(newOrigin / width) ||
          Math.abs((cell % width) - currentCol) <= 3
      );

      if (isValid && doesNotWrap) {
        this.clearTetromino();
        this.origin = newOrigin;
        this.rotationIndex = nextRotationIndex;
        this.renderTetromino();
        return true;
      }

      return false;
    };
    if (
      tryRotation(0) ||
      tryRotation(-1) ||
      tryRotation(1) ||
      tryRotation(-2) ||
      tryRotation(2)
    ) {
      return;
    }
  }

  fall() {
    const speed = Math.max(100, 500 - (currentLevel - 1) * 50);
    this.fallInterval = setInterval(() => {
      if (gameIsPaused) return;
      const canFall = this.cells.every(
        (i) => i + 10 < 200 && !lockedCells.has(i + 10)
      );
      if (canFall) {
        this.clearTetromino();
        this.origin += 10;
        this.renderTetromino();
      } else {
        this.lockTetromino();
        clearInterval(this.fallInterval);
      }
    }, speed);
  }
  lockTetromino() {
    this.cells.forEach((cell) => {
      lockedCells.add(cell);
    });
    spawnNewTetromino();
    clearFullRows();
  }
}
const tetrominoTypes = [
  {
    shape: [
      [0, 0 + width, 0 + width * 2, 0 + width * 2 + 1],
      [-1, 0, 1, -1 + width],
      [0, 1, 1 + width, 1 + width * 2],
      [1, 1 + width - 2, 1 + width - 1, 1 + width],
    ],
    type: "L",
  },
  {
    shape: [
      [0, 1, width, width * 2],
      [-1, 0, 1, 1 + width],
      [0, width, width * 2 - 1, width * 2],
      [width - 1, width * 2 - 1, width * 2, width * 2 + 1],
    ],
    type: "J",
  },
  {
    shape: [
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3],
    ],
    type: "I",
  },
  {
    shape: [
      [0, 1, width + 1, width + 2],
      [1, width, width + 1, width * 2],
    ],
    type: "Z",
  },
  {
    shape: [
      [0, 1, width - 1, width],
      [-1, width - 1, width, width * 2],
    ],
    type: "S",
  },
  {
    shape: [
      [1, width, width + 1, width + 2],
      [1, width + 1, width + 2, width * 2 + 1],
      [width, width + 1, width + 2, width * 2 + 1],
      [1, width, width + 1, width * 2 + 1],
    ],
    type: "T",
  },
  { shape: [[-1, 0, width - 1, width]], type: "O" },
];

export function getRandomTetromino() {
  const random = Math.floor(Math.random() * tetrominoTypes.length);
  const t = tetrominoTypes[random];
  return new Tetromino(t.shape, t.type);
}

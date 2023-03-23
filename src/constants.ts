import { RobotFaceDirection } from "./enums";

export const X_UNITS = 10;
export const Y_UNITS = 5;

// Define the tabletop dimensions
export const TABLETOP_WIDTH = 5;
export const TABLETOP_HEIGHT = 5;

/**
 * Commander left (X) position, next to Table Top.
 */
export const COMMANDER_LEFT = TABLETOP_WIDTH * X_UNITS + Math.ceil(X_UNITS / 2);

/**
 * Since south/west become the most corner, let's transform it!
 */
export const TRANSFORMED_Y_POS = transformPositions(TABLETOP_HEIGHT);

/**
 * Build key map for reversed sequence of numbers.
 * @param size length of numbers to be reversed.
 * @returns reversed keyed index.
 */
function transformPositions(size: number) {
  return Array.from({ length: size })
    .map((_, idx) => idx)
    .reverse()
    .reduce((prev, curr, index) => {
      prev[index] = curr;
      return prev;
    }, {} as Record<number, number>);
}

export const INDEXED_DIRECTIONS = [
  RobotFaceDirection.SOUTH,
  RobotFaceDirection.WEST,
  RobotFaceDirection.NORTH,
  RobotFaceDirection.EAST,
];

import { RobotFaceDirection } from "./enums";

// Define the tabletop dimensions
export const TABLETOP_WIDTH = 5;
export const TABLETOP_HEIGHT = 5;

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

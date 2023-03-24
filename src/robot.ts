import {
  INDEXED_DIRECTIONS,
  TABLETOP_HEIGHT,
  TABLETOP_WIDTH,
} from "./constants";
import { RobotFaceDirection } from "./enums";
import { RobotPlace } from "./types";

export class Robot {
  placement?: RobotPlace;

  place({ x, y, face }: RobotPlace) {
    if (x > TABLETOP_WIDTH - 1 || y > TABLETOP_HEIGHT - 1 || x < 0 || y < 0) {
      return false;
    }

    this.placement = {
      x,
      y,
      face,
    };

    return true;
  }

  move() {
    if (!this.placement) {
      return;
    }

    const { face, x, y } = this.placement;

    switch (face) {
      case RobotFaceDirection.WEST:
        this.place({ face, x: x - 1, y });
        break;

      case RobotFaceDirection.EAST:
        this.place({ face, x: x + 1, y });
        break;

      case RobotFaceDirection.NORTH:
        this.place({ face, x: x, y: y + 1 });
        break;

      case RobotFaceDirection.SOUTH:
        this.place({ face, x: x, y: y - 1 });
        break;
    }
  }

  rotate(left?: boolean) {
    if (!this.placement) {
      return;
    }

    const { face, x, y } = this.placement;
    const idx = INDEXED_DIRECTIONS.indexOf(face);

    const max = INDEXED_DIRECTIONS.length - 1;
    const nextIndex = left
      ? idx - 1 < 0
        ? max
        : idx - 1
      : idx + 1 > max
      ? 0
      : idx + 1;

    this.place({ x, y, face: INDEXED_DIRECTIONS[nextIndex] });
  }
}

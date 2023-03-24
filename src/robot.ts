import * as blessed from "blessed";
import {
  RobotFaceEastArt,
  RobotFaceIdleArt,
  RobotFaceNorthArt,
  RobotFaceSouthArt,
  RobotFaceWestArt,
} from "./arts";
import {
  INDEXED_DIRECTIONS,
  TABLETOP_HEIGHT,
  TABLETOP_WIDTH,
  TRANSFORMED_Y_POS,
  X_UNITS,
  Y_UNITS,
} from "./constants";
import { RobotFaceDirection } from "./enums";
import { RobotPlace } from "./types";

const ROBOT_WIDTH = 9;
const ROBOT_HEIGHT = 4;

const robotFaces: Record<RobotFaceDirection, string> = {
  IDLE: RobotFaceIdleArt,
  WEST: RobotFaceWestArt,
  EAST: RobotFaceEastArt,
  SOUTH: RobotFaceSouthArt,
  NORTH: RobotFaceNorthArt,
};

export class Robot {
  private box: blessed.Widgets.BoxElement;
  placement?: RobotPlace;

  constructor(private screen: blessed.Widgets.Screen) {
    this.box = blessed.box({
      left: 1,
      top: 1,
      width: ROBOT_WIDTH,
      height: ROBOT_HEIGHT,
      content: RobotFaceIdleArt,
      style: {
        bg: "#55ACEE",
      },
    });
  }

  place({ x, y, face }: RobotPlace) {
    if (x > TABLETOP_WIDTH - 1 || y > TABLETOP_HEIGHT - 1 || x < 0 || y < 0) {
      return false;
    }

    this.screen.remove(this.box);
    this.box.left = x * X_UNITS + 1;
    this.box.top = TRANSFORMED_Y_POS[y] * Y_UNITS + 1;
    this.box.content = robotFaces[face];
    this.screen.append(this.box);
    this.screen.render();

    this.placement = {
      x,
      y,
      face,
    };

    return true;
  }

  move() {
    if (!this.placement) {
      return false;
    }

    const { face, x, y } = this.placement;

    switch (face) {
      case RobotFaceDirection.WEST:
        return this.place({ face, x: x - 1, y });

      case RobotFaceDirection.EAST:
        return this.place({ face, x: x + 1, y });

      case RobotFaceDirection.NORTH:
        return this.place({ face, x: x, y: y + 1 });

      case RobotFaceDirection.SOUTH:
        return this.place({ face, x: x, y: y - 1 });
    }

    return false;
  }

  rotate(left?: boolean) {
    if (!this.placement) {
      return false;
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

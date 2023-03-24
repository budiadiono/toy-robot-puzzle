import { RobotFaceDirection } from "./enums";
import { Robot } from "./robot";

/**
 * Capture user commands
 */
export class Commander {
  private robot = new Robot();

  get latestPlace() {
    return this.robot.placement;
  }

  action(command: string) {
    // validate full place command with facing direction
    const placeFullRegex = /^PLACE (\d+),(\d+),(NORTH|SOUTH|EAST|WEST)$/;
    const placeFullMatch = placeFullRegex.exec(command);
    if (placeFullMatch) {
      const x = parseInt(placeFullMatch[1]);
      const y = parseInt(placeFullMatch[2]);
      const face = placeFullMatch[3] as RobotFaceDirection;

      // move robot and change direction
      this.robot.place({ x, y, face });
      return;
    }

    // validate place command using existing direction
    const placeRegex = /^PLACE (\d+),(\d+)$/;
    const placeMatch = placeRegex.exec(command);
    if (placeMatch && this.latestPlace) {
      // only move when initial movement been made
      const x = parseInt(placeMatch[1]);
      const y = parseInt(placeMatch[2]);

      // move robot with existing facing direction
      this.robot.place({ x, y, face: this.latestPlace.face });
      return;
    }

    if (command === "REPORT" && this.latestPlace) {
      this.announce();
      return;
    }

    if (command === "MOVE") {
      this.robot.move();
      return;
    }

    if (["RIGHT", "LEFT"].includes(command)) {
      this.robot.rotate(command === "LEFT");
    }
  }

  private announce() {
    if (!this.latestPlace) {
      return;
    }

    console.log(
      `The current robot position is x:${this.latestPlace.x}, y:${this.latestPlace.y}, face:${this.latestPlace.face}.`
    );
  }
}

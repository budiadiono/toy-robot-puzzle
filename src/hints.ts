import * as blessed from "blessed";

export class Hints {
  private box: blessed.Widgets.BoxElement;

  constructor(screen: blessed.Widgets.Node) {
    this.box = blessed.box({
      left: 2,
      bottom: 1,
      // TODO: should adjust Hints size & position automatically when table top dimension changed.
      width: 100,
      height: 14,
      content: hints,
    });

    screen.append(this.box);
  }
}

const hints = `COMMANDS:
-------------------------
- PLACE X,Y,F 
  will put the toy robot on the table in position X,Y 
  and facing NORTH, SOUTH, EAST or WEST.
- MOVE
  will move the toy robot one unit forward in the direction it is currently facing.
- LEFT/RIGHT
  rotates the robot 90 degrees in the specified direction 
  without changing the positionof the robot.
- REPORT
  announces the X,Y and F of the robot.
- CTRL+C
  quit`;

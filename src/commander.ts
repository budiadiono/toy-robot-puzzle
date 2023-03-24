import * as blessed from "blessed";
import { COMMANDER_LEFT, TABLETOP_HEIGHT, Y_UNITS } from "./constants";
import { RobotFaceDirection } from "./enums";
import { Robot } from "./robot";

const INPUT_WIDTH = 20;
const INPUT_COLOR = "blue";
const INPUT_TOP_MOST = 1;

type CommanderFormValues = {
  command: string;
};

/**
 * Capture user commands
 */
export class Commander {
  form: blessed.Widgets.FormElement<CommanderFormValues>;
  private textInput: blessed.Widgets.TextboxElement;
  private announcement: blessed.Widgets.MessageElement;

  constructor(private screen: blessed.Widgets.Screen, private robot: Robot) {
    this.form = blessed.form({
      parent: screen,
      keys: true,
      left: COMMANDER_LEFT,
      top: 0,
      height: TABLETOP_HEIGHT * Y_UNITS + 1,
      right: 1,
      content: " Please enter the command",
      border: "line",
    });

    this.textInput = blessed.textbox({
      name: "command",
      parent: this.form,
      inputOnFocus: true,
      width: INPUT_WIDTH,
      bg: INPUT_COLOR,
      top: INPUT_TOP_MOST + 1,
      height: 1,
      left: 2,
    });

    this.textInput.key(["C-c"], () => {
      // trigger form submit on ENTER
      process.exit(0);
    });

    this.textInput.key(["enter"], () => {
      // trigger form submit on ENTER
      this.form.submit();
    });

    this.form.on("submit", (value) => {
      this.handleSubmit(value);
    });

    this.announcement = blessed.message({
      parent: this.form,
      top: INPUT_TOP_MOST + 3,
      height: 1,
      left: 2,
      content: "",
      width: 50,
    });

    this.announcement.on("keypress", () => {
      this.hideAnnouncement();
    });

    this.screen.render();
  }

  get latestPlace() {
    return this.robot.placement;
  }

  /**
   * Focus to text input where user will enter commands.
   * @param clear clear text input. @default true.
   */
  reset(clear = true) {
    if (clear) {
      this.textInput.setValue("");
    }

    this.screen.render();
    setTimeout(() => {
      this.textInput.focus();
    }, 10);
  }

  private handleSubmit({ command }: CommanderFormValues) {
    // validate full place command with facing direction
    const placeFullRegex = /^PLACE (\d+),(\d+),(NORTH|SOUTH|EAST|WEST)$/;
    const placeFullMatch = placeFullRegex.exec(command);
    if (placeFullMatch) {
      const x = parseInt(placeFullMatch[1]);
      const y = parseInt(placeFullMatch[2]);
      const face = placeFullMatch[3] as RobotFaceDirection;

      // move robot and change direction
      this.robot.place({ x, y, face });
      this.reset();
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
      this.reset();
      return;
    }

    if (command === "REPORT" && this.latestPlace) {
      this.announcement.setContent(
        `The current robot position is x:${this.latestPlace.x}, y:${this.latestPlace.y}, face:${this.latestPlace.face}. Press ENTER to continue.`
      );
      this.screen.render();
      setTimeout(() => {
        // trap focus to announcement, so press ENTER will disapear it
        this.announcement.focus();
      }, 10);
      return;
    }

    if (command === "MOVE") {
      if (!this.robot.move()) {
        // no movement can be made, let's clear the text input
        this.reset();
        return;
      }
    }

    if (["RIGHT", "LEFT"].includes(command)) {
      this.robot.rotate(command === "LEFT");
    }

    // should not clear text input for MOVE,RIGHT and LEFT command
    // so user will just press ENTER to continue the same action
    this.reset(!["MOVE", "RIGHT", "LEFT"].includes(command));
  }

  private hideAnnouncement() {
    this.announcement.setContent("");
    this.screen.render();
    this.reset();
  }
}

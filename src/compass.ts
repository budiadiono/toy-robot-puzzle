import * as blessed from "blessed";
import { CompassArt } from "./arts";

const WIDTH = 13;
const HEIGHT = 5;

export class Compass {
  private box: blessed.Widgets.BoxElement;

  constructor(screen: blessed.Widgets.Node) {
    this.box = blessed.box({
      right: 1,
      bottom: 1,
      width: WIDTH,
      height: HEIGHT,
      content: CompassArt,
      fg: "cyan",
    });

    screen.append(this.box);
  }
}

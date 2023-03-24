import * as blessed from "blessed";
import {
  TABLETOP_HEIGHT,
  TABLETOP_WIDTH,
  TRANSFORMED_Y_POS,
  X_UNITS,
  Y_UNITS,
} from "./constants";

export class TableTop {
  constructor(screen: blessed.Widgets.Screen) {
    const width = TABLETOP_WIDTH * X_UNITS;
    const height = TABLETOP_HEIGHT * Y_UNITS;
    const tableTop = blessed.box({
      width,
      height,
    });

    screen.append(tableTop);

    Array.from({ length: TABLETOP_WIDTH }).forEach((_, hIndex) => {
      // render vertical lines
      screen.append(
        blessed.line({
          top: 0,
          left: hIndex * X_UNITS + X_UNITS,
          height: height + 1,
          orientation: "vertical",
        })
      );
    });

    Array.from({ length: TABLETOP_HEIGHT + 1 }).forEach((_, vIndex) => {
      // render horizontal lines
      screen.append(
        blessed.line({
          top: vIndex * Y_UNITS,
          left: 0,
          width: width + 1,
          orientation: "horizontal",
        })
      );

      if (vIndex < TABLETOP_HEIGHT) {
        // render coordinates
        Array.from({ length: TABLETOP_WIDTH }).forEach((_, hIndex) => {
          screen.append(
            blessed.text({
              top: vIndex * Y_UNITS + 1,
              left: hIndex * X_UNITS + 1,
              content: `${hIndex.toString()},${TRANSFORMED_Y_POS[
                vIndex
              ].toString()}`,
              fg: "yellow",
            })
          );
        });
      }
    });
  }
}

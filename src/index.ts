import * as blessed from "blessed";
import { Commander } from "./commander";
import { Compass } from "./compass";
import { Hints } from "./hints";
import { Robot } from "./robot";
import { TableTop } from "./table-top";
import { Title } from "./title";

const screen = blessed.screen({
  smartCSR: true,
  title: "Toy Robot Puzzle",
});

new TableTop(screen);
const robot = new Robot(screen);

const commander = new Commander(screen, robot);
new Hints(commander.form);
new Title(commander.form);
new Compass(commander.form);

screen.key(["C-c"], () => {
  process.exit(0);
});

// Render the screen
screen.render();

// Ensure the main text input focused
commander.reset();

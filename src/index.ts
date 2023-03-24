import { Commander } from "./commander";

const commander = new Commander();
const stdin = process.openStdin();

// ref: https://stackoverflow.com/a/8129748/1586914
stdin.addListener("data", function (d) {
  // note:  d is an object, and when converted to a string it will
  // end with a linefeed.  so we (rather crudely) account for that
  // with toString() and then trim()
  commander.action(d.toString().trim());
});

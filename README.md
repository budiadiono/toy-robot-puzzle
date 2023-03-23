# Toy Robot puzzle

<img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f916.svg" alt="Robot Puzzle" style="height: 100px; width:100px;"/>

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table. Any movement that would result in the robot falling from the table is prevented, however further valid movement commands are still allowed.

The application is a command-line application that accepts commands from the following commands are valid:

- PLACE X,Y,F
- MOVE
- LEFT
- RIGHT
- REPORT

Here are some rules for these commands:

- PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. It is assumed that the PLACE command has only one space, that is PLACE 1, 2, NORTH is an invalid command.
- The direction parameter of the PLACE command should be optional after the first use.
- The origin (0,0) is the SOUTH WEST most corner.
- All commands are ignored until a valid PLACE is made.
- MOVE will move the toy robot one unit forward in the direction it is currently facing.
- LEFT and RIGHT rotates the robot 90 degrees in the specified direction without changing the position of the robot.
- REPORT announces the X,Y and F of the robot.

All commands must be in uppercase, all lower and mixed case commands will be ignored.

## Thanks to

Thanks for introduce me [blessed](https://www.npmjs.com/package/blessed)!

- https://www.npmjs.com/package/blessed
- https://www.taniarascia.com/snake-game-in-javascript/
- https://github.com/vsergeev/snake.ts

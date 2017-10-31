class RobotsProcessor {
  constructor(data) {
    this.orientations = ["N", "E", "S", "W"];
    this.orientationValues = {
      N: 0,
      E: 1,
      S: 2,
      W: 3
    };

    // The world had 4 borders. Setting an item of a border array to true "seals" that border in that position.
    //This happens when a robot falls off an edge. It will sea; (leave a scent) so that other robots will not fall from that same position.
    this.borders = {
      north: [],
      east: [],
      south: [],
      west: []
    };

    var lines = data.split("\n");
    var sizes = lines[0].split(" ");

    this.width = parseInt(sizes[0]) + 1;
    this.height = parseInt(sizes[1]) + 1;

    this.robots = [];

    for (var i = 1; i < lines.length; i += 2) {
      var split = lines[i].split(" ");

      let pos = {
        x: parseInt(split[0]),
        y: parseInt(split[1]),
        orientation: split[2],
        lost: false
      };

      var robot = {
        position: pos,
        instructions: lines[i + 1]
      };
      this.robots.push(robot);
    }
  }

  processAndPrintAllRobots() {
    for (var i in this.robots) {
      var newPos = this.processRobot(
        this.robots[i].position,
        this.robots[i].instructions
      );
      this.printRobotPosition(newPos);
    }
  }

  // given a current orientation and direction, it returns the new orientation
  getNewOrientation(orientation, dir) {
    var val = this.orientationValues[orientation];

    if (dir == "R") {
      val++;
    } else {
      val--;
    }

    if (val == -1) {
      val = 3;
    } else if (val == 4) {
      val = 0;
    }

    return this.orientations[val];
  }

  getNewCoordinatesAfterMove(x, y, orientation) {
    switch (orientation) {
      case "N":
        return { x: x, y: y + 1 };
        break;
      case "E":
        return { x: x + 1, y: y };
        break;
      case "S":
        return { x: x, y: y - 1 };
        break;
      default:
        return { x: x - 1, y: y };
    }
  }

  processRobot(pos, instructions) {
    for (var i in instructions) {
      if (instructions[i] == "R" || instructions[i] == "L") {
        pos.orientation = this.getNewOrientation(
          pos.orientation,
          instructions[i]
        );
      } else {
        var newCoordinates = this.getNewCoordinatesAfterMove(
          pos.x,
          pos.y,
          pos.orientation
        );

        // saving scent so that new robots don't fall on the same edge in the same spot
        if (newCoordinates.x < 0) {
          if ("undefined" == typeof this.borders.west[newCoordinates.y]) {
            this.borders.west[newCoordinates.y] = true;
            pos.lost = true;
            return pos;
          }
        } else if (newCoordinates.y < 0) {
          if ("undefined" == typeof this.borders.south[newCoordinates.x]) {
            this.borders.south[newCoordinates.x] = true;
            pos.lost = true;
            return pos;
          }
        } else if (newCoordinates.x >= this.width) {
          if ("undefined" == typeof this.borders.east[newCoordinates.y]) {
            this.borders.east[newCoordinates.y] = true;
            pos.lost = true;
            return pos;
          }
        } else if (newCoordinates.y >= this.height) {
          if ("undefined" == typeof this.borders.north[newCoordinates.x]) {
            this.borders.north[newCoordinates.x] = true;
            pos.lost = true;
            return pos;
          }
        } else {
          pos.x = newCoordinates.x;
          pos.y = newCoordinates.y;
        }
      }
    }

    return pos;
  }

  printRobotPosition(pos) {
    console.log(
      pos.x + " " + pos.y + " " + pos.orientation + (pos.lost ? " LOST" : "")
    );
  }
}

module.exports = RobotsProcessor;

var fs = require("fs");

var width = 0;
var height = 0;

var orientations = ["N", "E", "S", "W"];
var orientationValues = {
  N: 0,
  E: 1,
  S: 2,
  W: 3
};

/*
The world had 4 borders. Setting an item of a border array to true "seals" that border in that position.
This happens when a robot falls off an edge. It will sea; (leave a scent) so that other robots will not fall from that same position.
*/
var borders = {
  north: [],
  east: [],
  south: [],
  west: []
};

fs.readFile("input.txt", "utf8", function(err, data) {
  if (err) throw err;

  var lines = data.split("\n");
  var sizes = lines[0].split(" ");

  width = parseInt(sizes[0]) + 1;
  height = parseInt(sizes[1]) + 1;

  var robotPositions = [];
  var robotInstructions = [];

  for (var i = 1; i < lines.length; i += 2) {
    var split = lines[i].split(" ");

    let pos = {
      x: parseInt(split[0]),
      y: parseInt(split[1]),
      orientation: split[2],
      lost: false
    };

    robotPositions.push(pos);
    robotInstructions.push(lines[i + 1]);

    var newPos = processRobot(pos, lines[i + 1]);

    printRobotPosition(newPos);
  }
});

// given a current orientation and direction, it returns the new orientation
function getNewOrientation(orientation, dir) {
  var val = orientationValues[orientation];

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

  return orientations[val];
}

function getNewCoordinatesAfterMove(x, y, orientation) {
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

function processRobot(pos, instructions) {
  for (var i in instructions) {
    if (instructions[i] == "R" || instructions[i] == "L") {
      pos.orientation = getNewOrientation(pos.orientation, instructions[i]);
    } else {
      var newCoordinates = getNewCoordinatesAfterMove(
        pos.x,
        pos.y,
        pos.orientation
      );

      // saving scent so that new robots don't fall on the same edge in the same spot
      if (newCoordinates.x < 0) {
        if ("undefined" == typeof borders.west[newCoordinates.y]) {
          borders.west[newCoordinates.y] = true;
          pos.lost = true;
          return pos;
        }
      } else if (newCoordinates.y < 0) {
        if ("undefined" == typeof borders.south[newCoordinates.x]) {
          borders.south[newCoordinates.x] = true;
          pos.lost = true;
          return pos;
        }
      } else if (newCoordinates.x >= width) {
        if ("undefined" == typeof borders.east[newCoordinates.y]) {
          borders.east[newCoordinates.y] = true;
          pos.lost = true;
          return pos;
        }
      } else if (newCoordinates.y >= height) {
        if ("undefined" == typeof borders.north[newCoordinates.x]) {
          borders.north[newCoordinates.x] = true;
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

function printRobotPosition(pos) {
  console.log(
    pos.x + " " + pos.y + " " + pos.orientation + (pos.lost ? " LOST" : "")
  );
}

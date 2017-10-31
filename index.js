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

    console.log(newPos);
  }

  console.log(width, height);
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
  console.log("processing", pos, instructions);
  for (var i in instructions) {
    if (instructions[i] == "R" || instructions[i] == "L") {
      pos.orientation = getNewOrientation(pos.orientation, instructions[i]);
    } else {
      var newCoordinates = getNewCoordinatesAfterMove(
        pos.x,
        pos.y,
        pos.orientation
      );
      if (
        newCoordinates.x < 0 ||
        newCoordinates.y < 0 ||
        newCoordinates.x >= width ||
        newCoordinates.y >= height
      ) {
        pos.lost = true;
        return pos;
      } else {
        pos.x = newCoordinates.x;
        pos.y = newCoordinates.y;
      }
    }
  }

  return pos;
}

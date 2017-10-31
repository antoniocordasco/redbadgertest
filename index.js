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
      x: split[0],
      y: split[1],
      orientation: split[2]
    };

    robotPositions.push(pos);
    robotInstructions.push(lines[i + 1]);

    processRobot(pos, lines[i + 1]);
  }

  console.log(width, height);
  console.log(robotPositions);
  console.log(robotInstructions);
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

function processRobot(pos, instructions) {
  console.log("pos", pos);
  getNewOrientation(pos.orientation, "R");
  getNewOrientation(pos.orientation, "L");

  for (var i in instructions) {
  }

  console.log(width, height);
}

var fs = require("fs");

fs.readFile("input.txt", "utf8", function(err, data) {
  if (err) throw err;

  var lines = data.split("\n");
  var sizes = lines[0].split(" ");

  var width = parseInt(sizes[0]) + 1;
  var height = parseInt(sizes[1]) + 1;

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
  }

  console.log(width, height);
  console.log(robotPositions);
  console.log(robotInstructions);
});

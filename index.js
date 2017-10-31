var fs = require("fs");
var RobotsProcessor = require("./classes/RobotsProcessor");

var width = 0;
var height = 0;

var inputFile = "input.txt";

// checking if input filename has been specified when running the process
if ("undefined" !== typeof process.argv[2]) {
  inputFile = process.argv[2];
}

fs.readFile(inputFile, "utf8", function(err, data) {
  if (err) throw err;

  var p = new RobotsProcessor(data);
  p.processAndPrintAllRobots();
});

var fs = require("fs");
var RobotsProcessor = require('./classes/RobotsProcessor');

var width = 0;
var height = 0;


fs.readFile("input.txt", "utf8", function(err, data) {
  if (err) throw err;

  var p = new RobotsProcessor(data);
  p.processAndPrintAllRobots();

});


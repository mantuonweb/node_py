var express = require("express");
// spawn_python.js
var util = require("util");

var spawn = require("child_process").spawn;

 var app = express();

 /* serves main page */
 app.get("/", function(req, res) {
    //res.send("OK");
    var process = spawn('python',["python_launched_from_nodejs.py"]);
	util.log('readingin')
	process.stdout.on('data',function(chunk){
	    var textChunk = chunk.toString('utf8');// buffer to string
	    console.log('data','mantu',textChunk);
	    util.log(textChunk);
	    res.send(textChunk);
	});
 });

  app.post("/user/add", function(req, res) { 
	/* some server side logic */
	var process = spawn('python',["python_launched_from_nodejs.py"]);
	util.log('readingin')
	process.stdout.on('data',function(chunk){
	    var textChunk = chunk.toString('utf8');// buffer to string
	    console.log('data','mantu',textChunk);
	    util.log(textChunk);
	    res.send(textChunk);
	});
	//res.send("OK");
  });

 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendfile( __dirname + req.params[0]); 
 });

 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
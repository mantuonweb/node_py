var express = require("express");
// spawn_python.js
var util = require("util");

var spawn = require("child_process").spawn;

 var app = express();

 /* serves main page */
 app.get("/", function(req, res) {
    var py    = spawn('python', ['compute_input.py']),
    data = [1,2,3,4,5,6,7,8,9,10],
    dataString = '';
	py.stdout.on('data', function(data){
	  dataString += data.toString();
	  console.log(dataString,data);
	});
	py.stdout.on('end', function(){
	   res.send('Sum of numbers python='+dataString);
	});
	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
 });

app.post("/user/add", function(req, res) { 
	var py    = spawn('python', ['compute_input.py']),
    data = [1,2,3,4,5,6,7,8,9],
    dataString = '';
	py.stdout.on('data', function(data){
	  dataString += data.toString();
	  console.log(dataString,data);
	});
	py.stdout.on('end', function(){
	   res.send('Sum of numbers from python='+dataString);
	});
	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
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
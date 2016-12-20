// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var fs = require('fs');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/point", function(request, response) {
  var id = request.query.id;
  if (!id) {
    console.log("missing point");
    response.sendStatus(400);
    return;
  }
  fs.readFile(__dirname + "/.data/point_" + id, 'utf8', function(err, data) {
    var status = 200;
    if (err) {
      if (err.code == "ENOENT") {
        console.log("no file");
      } else {
        status = 400;
        console.log(err);
      }
      response.sendStatus(status);
    } else {
      response.send(data);
    }
  });
});

app.post("/point", function(request, response) {
  var id = "";
  var data = "";
  if (request.query.id && request.query.time && request.query.value) {
    id = request.query.id;
    data = request.query.time + " " + request.query.value;
  } else {
    console.log("missing data");
    response.sendStatus(400);
    return;
  }
  fs.writeFile(__dirname + "/.data/point_" + id, data, 'utf8', function (err) {
    var status = 200;
    if (err) {
      status = 500;
      console.log(err);
    } else {
      console.log("file saved");
    }
    response.sendStatus(status);
  });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

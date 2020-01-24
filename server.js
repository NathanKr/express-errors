console.log("app is starting ....");
const express = require("express");
const fs = require("fs");
const app = express(),
  PORT = 8080;

const logUrl = req => {
  console.log(`access ${req.url}`);
};

app.get("/api1", (req, res) => {
  //   ******* synchronous code *******
  //   --- This will not stop the server !!!!!
  //   --- express will catch the exception and send 500 status code + error description
  logUrl(req);
  throw new Error("BROKEN");

  res.sendStatus(200);
});

app.get("/api2", (req, res) => {
  //   ******* synchronous code *******
  //   --- This will not stop the server !!!!!
  //   --- express will catch the exception and send 500 status code + error description
  logUrl(req);
  JSON.parse("{a");
  res.send(200);
});

app.get("/api3", (req, res, next) => {
  //   ******* a-synchronous code *******
  //   --- This will not stop the server !!!!!
  //   --- express will handle the error and send status code 500 + error description
  logUrl(req);
  fs.readFile("/file-does-not-exist", function(err, data) {
    if (err) {
      console.log(err);
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});

app.get("/api4", function(req, res, next) {
  //   ******* a-synchronous code *******
  //   --- This will not stop the server !!!!!
  //   --- express will handle the error and send status code 500 + error description
  logUrl(req);
  setTimeout(function() {
    try {
      throw new Error("BROKEN");
    } catch (err) {
      next(err);
    }
  }, 100);
});

app.get("/api5", function(req, res) {
  //   ******* a-synchronous code *******
  //   --- This WILL STOP the server !!!!!
  //   --- express does not know to handle this
  logUrl(req);
  setTimeout(function() {
    throw new Error("BROKEN");
  }, 100);
});
 
app.get("/api6", function(req, res, next) {
  //   ******* a-synchronous code *******
  //   --- This will not stop the server !!!!!
  //   --- express will handle the error and send status code 500 + error description
  logUrl(req);  
  setTimeout(function() {
    try {
      throw new Error("BROKEN");
    } catch (err) {
      next(err); 
    }
  }, 100);
});

app.listen(PORT, () => console.log(`app is listening on port : ${PORT}`));

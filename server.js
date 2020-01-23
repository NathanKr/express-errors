console.log("app is starting ....");
const express = require("express");
const app = express(),
  PORT = 8080;


app.get("/api1", (req, res) => {
  //   ******* synchronous code *******
  //   --- This will not stop the server !!!!!
  //   --- express will catch and send 500 status code
  throw new Error("BROKEN");

  res.sendStatus(200);
});

app.get("/ap2", function(req, res/*, next*/) {
  //   ******* a-synchronous code *******
  //   --- This will not stop the server !!!!!
  //   --- express will catch and send status code according to the error , 404 in this case
  fs.readFile("/file-does-not-exist", function(err, data) {
    //if (err) {
      //next(err); // Pass errors to Express.
    //} 
    //else {
      res.send(data);
    //}
  });
});

app.listen(PORT, () => console.log(`app is listening on port : ${PORT}`));

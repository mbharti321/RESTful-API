//jshint esversion:6
 
const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();
 
app.get("/", function(req, res){
  res.send("Hello");
});
 
app.listen(3000, function () {
    console.log("Server Started!!\nListening to port: http://localhost:3000/")
});
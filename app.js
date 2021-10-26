//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// for useing static files like images, user defined css
app.use(express.static("public"));

const dbConnectionString = "mongodb://localhost:27017/wikiDB";
mongoose.connect(dbConnectionString, { useNewUrlParser: true });

const articlesSchema = {
    title: String,
    content: String
};

const Article = new mongoose.model("Article", articlesSchema);

app.get("/", function (req, res) {
      res.send("Hello, Check for articles domain");
});
app.get("/articles", function (req, res) {
    //   res.send("Hello");
    Article.find(function (err, foundArticles) {
        if (!err) {
            // console.log(foundArticles);
            // foundArticles.forEach(function(article){            
            //     console.log(article.title);            
            // });
            res.send(foundArticles);
        }else{
            res.send(err);
        }
    });
});

app.listen(3000, function () {
    console.log("Server Started!!\nListening to port: http://localhost:3000/")
});
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

///////////////////////////////////// All Articles ////////////////////////////////////////////
app.route("/articles")
    // handeling get request
    .get(function (req, res) {
        //   res.send("Hello");
        Article.find(function (err, foundArticles) {
            if (!err) {
                // console.log(foundArticles);
                // foundArticles.forEach(function(article){            
                //     console.log(article.title);            
                // });
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })


    // handeling post request
    .post(function (req, res) {
        // console.log(req.body.title);
        // console.log(req.body.content);    
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        });
        article.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully posted!!!");
            }
        });
    })

    // handeling delete request
    // get deleted data https://github.com/londonappbrewery/Build-Your-Own-RESTful-API
    .delete(function (req, res) {
        // console.log("delete");
        Article.deleteMany({}, function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully deleted!!!");
            }
        });
    })
///////////////////////////////////// All Articles ////////////////////////////////////////////




///////////////////////////////////// specific Articles ////////////////////////////////////////////

app.route("/articles/:articleTitle")
    .get(function (req, res) {
        // console.log(req.params.article);
        Article.findOne({ title: req.params.articleTitle }, function (err, foundArticles) {
            // console.log(foundArticles);
            if (err) {
                res.send(err);
            } else {

                if (foundArticles) {
                    res.send(foundArticles);
                } else {// if(foundArticles.length === 0){
                    res.send("Not found")
                }
            }
        })
    })

    .put(function (req, res) {
        // console.log(req.params.articleTitle)
        // console.log(req.body.title)
        // console.log(req.body.content)
        Article.updateOne(
            { title: req.params.articleTitle },
            {
                title: req.body.title,
                content: req.body.content
            },
            { overwrite: true },
            function (err) {
                if (!err) {
                    res.send("Updated successfully!");
                } else {
                    res.send("error")
                }
            }
        );
    })
    .patch(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body },
            { overwrite: true },
            function (err) {
                if (!err) {
                    res.send("Article updated successfully!");
                } else {
                    res.send(err)
                }
            }
        );
    })
    .delete();




app.listen(3000, function () {
    console.log("Server Started!!\nListening to port: http://localhost:3000/")
});

// handeling get request
app.get("/articles", function (req, res) {
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
});


// handeling post request
app.post("/articles", function (req, res) {
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
app.delete("/articles", function (req, res) {
    // console.log("delete");
    Article.deleteMany({}, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully deleted!!!");
        }
    });
});

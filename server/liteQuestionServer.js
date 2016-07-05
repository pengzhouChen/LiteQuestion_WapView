/**
 * Created by chenpengzhou on 16/6/17.
 */
var express = require('express');
var app = express();
var redis = require("redis");
var client = redis.createClient();

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get("/getQuestion",function (req, res) {
    var question_id = getUserQuestionList();
    
    console.log(req.query.userId);
    res.send("this is getQuestion return");
});

app.get("/getScore",function (req, res) {
    console.log(req);
    res.send("this is getScore return");
});

app.get("/getAd",function (req, res) {
    console.log(req);

});

app.get("/getAnswer",function (req, res) {
    console.log(req);
});

app.post("/postAnswer",function (req, res) {
    console.log(req);
});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);

});
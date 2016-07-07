/**
 * Created by chenpengzhou on 16/6/17.
 */
var express = require('express');
var app = express();
var http = require("http");
var qs = require("querystring");
var remoteOption = {
    hostname:"",
    port:""
};

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get("/getQuestion",function (req, res) {
    /*var userId = req.query.userId;
    var data = {
        userId : userId
    };
    var content = qs.stringify(data);

    options.path = "/getQuestion?" + content;
    options.method = "GET";
    var req = http.request(options, function (res){
        console.log(res);
    });*/

    console.log(req);
    res.send("this is getQuestion return");
});

app.get("/getScore",function (req, res) {

    console.log(req);
    res.send("this is getScore return");
});

app.get("/getAd",function (req, res) {

    console.log(req);
    res.send("this is getAd return");
});

app.get("/getAnswer",function (req, res) {

    console.log(req);
    res.send("this is getAnswer return");
});

app.post("/postAnswer",function (req, res) {

    console.log(req);
    res.send("this is postAnswer return");
});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);

});
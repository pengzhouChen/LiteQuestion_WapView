/**
 * Created by chenpengzhou on 16/6/21.
 */
var redis = require("redis");
var client = redis.createClient("6397","127.0.0.1");

client.on("error",function (error) {
    console.log(error);
});

//client.auth("");

function getQuestion() {
    this.getUserQuestion = function (user_id) {
        var user_label = getUserLabel(user_id);
        
        client.select("0",function (error) {
            if(error){
                console.log(error);
            }else{
                client.lrange("user_" + user_id + "_question_list", "0", "0", function (error, res) {
                    if(error){
                        console.log(error);
                       
                    }else {
                        
                    }
                });
            }
        });
    }
}

function getUserLabel(user_id) {
    client.select("0",function (error) {
        if(error){
            console.log(error);
        }else{
            client.hgetall("user_" + user_id + "label", function (error, res) {
                if(error){
                    console.log(error);
                }else{
                    return res;
                }
            });
        }
    });
}
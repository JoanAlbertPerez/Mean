
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var bodyParser = require('body-parser');
var app = express();

var db = null;
MongoClient.connect('mongodb://localhost:27017/mean', function(err, dbconn){
  if (!err) {
    console.log("Conectados a la db");
    db = dbconn;
  }
});

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/tweets', function(req, res, next) {

  db.collection('tweets', function(err, tweets) {
    tweets.find().toArray(function(err, tweets){
      return res.json(tweets);
    });
  });

});

app.put('/tweets/remove', function(req, res, next) {
  db.collection('tweets', function(err, tweetsCollection) {
    var tweetID = req.body.tweet._id;
    console.log('algo');

    tweetsCollection.remove({_id: ObjectId(tweetID)}, {w:1}, function(err){
      return res.send();
    });
  });
});


app.post('/tweets', function(req, res, next) {
  db.collection('tweets', function(err, tweetsCollection) {
    var newTweet = {
      text: req.body.newTweet
    };
    tweetsCollection.insert(newTweet, {w:1}, function(err){
      return res.send();
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

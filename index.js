const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const BodyParser = require('body-parser');

const app = express();
app.use(BodyParser.json());

let db = null;

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  db = client.db('js-workshop');
  app.listen(2020, function () {
    console.log('up & running on prt')
  });
});

app.post('/users/signup', function (req, res) {
  let users = db.collection('users');
  users.insertOne(req.body, function(err, result) {
    res.end();
  });
});

app.post('/users/signin', function (req, res) {
  let users = db.collection('users');
  users.findOne(req.body, function(err, result) {
    res.json(result);
  });
});

app.post('/posts', function (req, res) {
  let posts = db.collection('posts');
  posts.insertOne(req.body, function(err, result) {
    res.end();
  });
});

app.get('/posts', function (req, res) {
  let posts = db.collection('posts');
  posts.find({}).toArray(function(err, result) {
    res.json(result);
  });
});
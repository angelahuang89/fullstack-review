const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github');
const db = require('../database/index');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helpers.getReposByUsername(req.body.username, (error, results) => {
    if (error) {
      res.status(400);
      console.log(error);
    } else {
      results.forEach(item => {
        var repoDoc = new db.Repo(item);
        db.save(repoDoc, (error, results) => {
          if (error) {
            console.log(error);
            res.status(400);
            res.end();
          } else {
            res.status(201);
            res.end();
          }
        });
      });
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  var repos;
  db.find((error, results) => {
    if (error) {
      console.log(error);
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.send(results);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


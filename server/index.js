const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github');
const database = require('../database/index');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helpers.getReposByUsername(req.body.username, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      data.forEach(item => {
        var model = new database.Repo(item);
        database.save(model);
      });
    }
  });
  res.status(201);
  res.end();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


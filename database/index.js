const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: { type: String, unique: true },
  // id: Number,
  name: String,
  full_name: String,
  owner: Object,
  html_url: String,
  description: String,
  url: String,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repo.save((error, repo) => {
  	if (error) {
      callback(error, null)
    } else {
      callback(null, repo)
    }
  });
}

let find = (callback) => {
  Repo
    .find({})
    .limit(25)
    .sort({ forks_count: -1 }).
    .exec((error, results) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, results)
    }
  });
}

module.exports = { Repo, save, find }
// module.exports.save = save;
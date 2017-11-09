const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: { type: Number, unique: true },
  // id: Number,
  name: String,
  full_name: String,
  html_url: String,
  description: String,
  url: String,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repo.save((error, repo) => {
  	if (error) return console.log(error);
  });
}

let find = (callback) => {
  Repo.find({}, (error, results) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, results)
    }
  });
}

module.exports = { Repo, save, find }
// module.exports.save = save;
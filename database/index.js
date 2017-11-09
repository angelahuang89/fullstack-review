const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
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
  repo.save((err, repo) => {
  	if (err) return console.log(err);
  })
}

module.exports = { Repo, save }
// module.exports.save = save;
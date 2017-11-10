import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
      {props.repos.map(repo => (
        <div className="repo" key={repo.id}>
          <p>{repo.name}: {repo.html_url}</p>
          <p>Description: {repo.description}</p>
          <p>Forks Count: {repo.forks_count}</p>
        </div>
      ))}
    </div>
  </div>
)

export default RepoList;
import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
      {props.repos.map(repo => (
        <div className="repo" key={repo.id}>
          <p>{repo.name}: <a href={repo.html_url}>{repo.html_url}</a></p>
          <p>Owner: <img src={repo.owner.avatar_url} alt={repo.owner.login} style={{width: 50, height: 50}} /></p> 
          <p>Description: {repo.description}</p>
          <p>Forks Count: {repo.forks_count}</p>
        </div>
      ))}
    </div>
  </div>
)

export default RepoList;
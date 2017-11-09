import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }
  
  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/repos',
      // data: 
      // dataType:
      contentType: 'application/json',
      success: data => {
        console.log('get success', data);
        this.state.repos = data;
        console.log(this.state.repos)
      },
      error: error => console.log('get error', error)
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO    
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: JSON.stringify({ username: term }),
      // dataType: 'json',
      contentType: 'application/json',
      success: data => console.log('post success', data),
      error: error => console.log('post error', error)
    });
    
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
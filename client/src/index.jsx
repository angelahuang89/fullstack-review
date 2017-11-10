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
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }
  
  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/repos',
      // data: 
      // dataType: 'application/json',
      // contentType: 'application/json',
      success: data => {
        console.log('get success');
        this.setState({ repos: data });
      },
      error: error => console.log('get error', error)
    });
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({repos: nextProps});
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
      success: data => {
        console.log('post success', data);
        this.componentWillReceiveProps(this.state.repos);
      },
      error: error => console.log('post error', error)
    });
    
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
import React, { Component } from 'react';
import { HashRouter as Router,Route } from 'react-router-dom';
import Main from './container/main';
import './App.css';


class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
      	<div>
          <Route path='/home' exact component={Main}/>
      	</div>
      </Router>
    );
  }
}

export default App;

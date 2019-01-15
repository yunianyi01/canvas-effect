import React, { Component } from 'react';
import { HashRouter as Router,Route, Redirect} from 'react-router-dom';
import Main from './container/main';
import './App.css';


class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
      	<div>
        <Route path='/home' component={Main}/>
          <Route path='/' exact render={() => (
          <Redirect to="/home"/>
        )}/>
      	</div>
      </Router>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/main" component={App}/>
    </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


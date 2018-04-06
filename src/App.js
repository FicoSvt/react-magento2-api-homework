import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './views/Home'
import Tracks from './views/Tracks'

class App extends Component {
  
  render() {
    return (
      <div className="ui">
        <header className="ui-header">
          <div className="ui-container">
            <img src={logo} className="ui-logo" alt="logo" />
          </div>
        </header>
        <Router>
          <div>
            <nav className="ui-navigation">
              <div className="ui-container">
                <ul className="ui-navigation__list">
                  <li className="ui-navigation__list-item">
                      <NavLink exact={true} to="/" className="ui-navigation__list-link" activeClassName="ui-navigation__list-link--active">Home</NavLink>
                  </li>
                </ul>
              </div>
            </nav>            
            <Route exact path="/" component={Home} />
            <Route path="/tracks" component={Tracks} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

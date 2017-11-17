import React, { Component } from 'react';
import Home from './Components/Home';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" render={props => <Home {...props}/>} />
      </BrowserRouter>
    );
  }
}

export default App;

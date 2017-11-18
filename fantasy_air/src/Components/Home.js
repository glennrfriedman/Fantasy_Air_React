import React, { Component } from 'react';
// import '../App.css';
// import axios from 'axios';
import { Switch, Route } from "react-router-dom";

// import Header from './Header.js';
import Playertable from './Playertable.js'
import Team from './Team.js';
import Compare from './Compare.js';
import About from './About.js';
import Player from './Player.js';

class Home extends Component {

  constructor(props){

    super(props);

    this.state = {
      url: "http://localhost:3000",
    }
  }

  renderView(){
    return(
      <Switch>
        <Route exact path="/" render={props => (<Playertable url={this.state.url}/>)}/>
        <Route path="/teams" render={props => (<Team/>)}/>
        <Route path="/compare" render={props => (<Compare/>)}/>
        <Route path="/player/:full_name/:team" render={props => (<Player routeProps={props}/>)}/>
      </Switch>
    )
  }

  render() {
    return <div>{this.renderView()}</div>;
  }
}

export default Home;

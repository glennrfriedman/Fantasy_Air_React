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
import Landing from './Landing.js';

class Home extends Component {

  constructor(props){

    super(props);

    this.state = {
      url: "https://warm-cliffs-55595.herokuapp.com",
    }
  }

  renderView(){
    return(
      <Switch>
        <Route exact path="/" render={props => (<Landing />)}/>
        <Route path="/players" render={props => (<Playertable url={this.state.url}/>)}/>
        <Route path="/teams" render={props => (<Team url={this.state.url} />)}/>
        <Route path="/compare" render={props => (<Compare url={this.state.url}/>)}/>
        <Route path="/player/:full_name/:team" render={props => (<Player routeProps={props}/>)}/>
        <Route path="/about" render={props => (<About/>)}/>
      </Switch>
    )
  }

  render() {
    return <div>{this.renderView()}</div>;
  }
}

export default Home;

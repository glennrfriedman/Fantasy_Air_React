import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Header from './Components/Header.js';
import Playertable from './Components/Playertable.js'

class App extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      value: "",
      searchResults: [],
      url: "http://localhost:3000",
      searched: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.searchPlayers = this.searchPlayers.bind(this)
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      value: event.target.value, searched: true
    }, this.searchPlayers)
  }

  searchPlayers() {
    if (this.state.value === "") {
      this.setState({searched: false})
      return
    }
    else {
    axios.get(`${this.state.url}/players/${this.state.value}`)
    .then(res => {
      this.setState({searchResults: res.data})
      console.log('search results are ', res.data);
      })
    }
  }

  displayPlayerResults() {
    let results = this.state.searchResults.search_results
    let renderSearch = []
    if (this.state.searchResults.length === 0) {
      return
    }
    else {
      results.map(e => {
        renderSearch.push(    
          <p>{e[0]} ‧ {e[2]} ‧ {e[1]}</p>
          )
      })
    return renderSearch
    }
  }

  render() {
    return (
          <div className="container">
            <Header />
          <div className="data-container">
            <div className="search-container">
              <input className='searchBar' type='text' ref={el=>{this.search=el}} placeholder="Search Players" onChange={this.handleChange} />
              <div className="searchResults"> {this.state.searched && this.displayPlayerResults()} </div>
            </div>

            <div className="weeklyData">
              <Playertable url={this.state.url}/>
            </div>

            </div>
          </div>
    );
  }
}

export default App;

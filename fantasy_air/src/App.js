import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Header from './Components/Header.js';

class App extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      value: "",
      searchResults: [],
      url: "http://localhost:3000/players"
    }

    this.handleChange = this.handleChange.bind(this)
    this.searchPlayers = this.searchPlayers.bind(this)
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      value: event.target.value
    }, this.searchPlayers)
  }

  searchPlayers() {
    if (this.state.value === "") {
      return
    }
    else {
    axios.get(`${this.state.url}/${this.state.value}`)
    .then(res => {
      this.setState({searchResults: res.data})
      console.log('search results are ', res.data);
      })
    }
  }

  displayPlayerResults() {
    let results = this.state.searchResults.search_results
    let renderSearch = []
    console.log(results)
    if (this.state.searchResults.length === 0) {
      return
    }
    else {
      results.map(e => {
        renderSearch.push(    
          <p>{e[0]} {e[2]} {e[1]}</p>
          )
      })
    return renderSearch
    }
  }

  render() {
    return (
        <div>
        <Header />
          <div className="search-bar">
            <input className='searchBar' type='text' ref={el=>{this.search=el}} placeholder="Search Players" onChange={this.handleChange} />
        </div>
        <div> {this.displayPlayerResults()} </div>
        </div>
    );
  }
}

export default App;

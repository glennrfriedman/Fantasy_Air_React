import React, { Component } from 'react';
import axios from 'axios';

import SearchIcon from '../Assets/Search.png';
import { Link } from 'react-router-dom';

class Search extends Component {

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
          <Link className="playerLink" key={e[0]} to={`/player/${e[0]}/${e[1]}`}><div>{e[0]} ‧ {e[2]} ‧ {e[1]}</div></Link>
          )
        return renderSearch
      })
    return renderSearch
    }
  }

render() {
  return(
    <div className="search-container">
        <input className='searchBar' type='text' ref={el=>{this.search=el}} placeholder="   Search Players (Click to Select)" onChange={this.handleChange} />
        <div className="searchResults"> {this.state.searched && this.displayPlayerResults()} </div>
    </div>
    )
  }
}

export default Search;

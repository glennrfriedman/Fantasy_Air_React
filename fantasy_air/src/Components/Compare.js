import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

import Header from './Header.js';
// import Search from './Search.js';

class Comapre extends Component {

constructor(props){
	super(props)
	this.state = {
		players: [],
		value: "",
    searchResults: [],
    searched: false,
    comparePlayers: []
	}
	this.handleChange = this.handleChange.bind(this);
  this.searchPlayers = this.searchPlayers.bind(this);
  this.onClickPlayer = this.onClickPlayer.bind(this);
  this.renderSelectedPlayers = this.renderSelectedPlayers.bind(this);
  this.reset = this.reset.bind(this);
  this.getSeasonStats = this.getSeasonStats.bind(this);
}

componentDidMount(){

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
    axios.get(`${this.props.url}/players/${this.state.value}`)
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
          <div className="playerLink"> <div onClick={this.onClickPlayer} name={e[0]} team={e[1]} pos={e[2]} >{e[0]} ‧ {e[2]} ‧ {e[1]}</div> </div>
          )
        return renderSearch
      })
    return renderSearch
    }
  }

  onClickPlayer(e){
  	e.preventDefault();
  	const players = this.state.players
  	if (players.length < 6) {
  		players.push({name: e.target.getAttribute("name"), team: e.target.getAttribute("team"), pos: e.target.getAttribute("pos")})
  		this.setState({value: "", searchResults: [], searched: false})
  	}
  	// console.log('selected player from onClick is ', e.target.getAttribute("name"), e.target.getAttribute("team") )
  	// console.log('players froms state are ', this.state.players)
  }

 	renderSelectedPlayers(){
 		let renderPlayers = []
  	console.log('players in render players are', this.state.players)
  	if(this.state.players.length < 6){
  	this.state.players.map(e => {
  		renderPlayers.push(<p className="selectedPlayer" onClick={this.removePlayer}>{e.name} ‧ {e.pos} ‧ {e.team}</p>)
  		return renderPlayers
  		})
  	}
  	else if (this.state.players.length > 5) {
	  	return renderPlayers
  	}
  	return renderPlayers
  }

  getSeasonStats(){
  	let playerCalls = [];
  	let playerData = [];
  	const url = this.props.url;
  	let players = this.state.players;
  	players.forEach(function(player) {
  		// console.log('url to push is ', `${url}/players/${player.name}/${player.team}`);
  		playerCalls.push(axios(`${url}/players/${player.name}/${player.team}`));
  	})
  	axios.all(playerCalls)
		.then(res => {
			res.forEach(function(res){
				playerData.push(res.data)
				})
				console.log('playerData outside of axios.all is ', playerData)
				this.setState({ compareData: playerData })
			})
  }

  reset(){
  	this.setState({
  		players: [],
			value: "",
    	searchResults: [],
    	searched: false
  	})
  }


render() {
	return(
		<div className="compareContainer">
		<Header />
		 <div className="search-container">
        <input className='searchBar' type='text' ref={el=>{this.search=el}} placeholder="  Search Players to Compare (Click to Select)" onChange={this.handleChange} />
        <div className="searchResults"> {this.state.searched && this.displayPlayerResults()} </div>
    </div>
		<div className="comparePlayersContainer">
			
			<div className="selectPlayersContainer"> 
				<div className="selectedPlayers"> 
					<div className="selectedPlayersHead">Selected Players To (Up to 5)</div>
						{this.renderSelectedPlayers()}
				</div>
				<button onClick={this.getSeasonStats} className="compareButton"> Compare Players </button><br></br>
				<button onClick={this.reset} className="compareButton"> Reset </button>
			</div>
			
			<div className="compareChartContainer"> 

			</div>

		</div>
		
		</div>
		)
}
}

export default Comapre;
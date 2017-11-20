import React, { Component } from 'react';
import axios from 'axios';
import { ORFrame } from 'semiotic';

import Header from './Header.js';

class Comapre extends Component {

constructor(props){
	super(props)
	this.state = {
		players: [],
		value: "",
    searchResults: [],
    searched: false,
    compare: false,
    comparePlayers: [],
    compareTerm: 'air_yards'
	}
	this.handleChange = this.handleChange.bind(this);
  this.searchPlayers = this.searchPlayers.bind(this);
  this.onClickPlayer = this.onClickPlayer.bind(this);
  this.renderSelectedPlayers = this.renderSelectedPlayers.bind(this);
  this.reset = this.reset.bind(this);
  this.getSeasonStats = this.getSeasonStats.bind(this);
  this.renderCompareChart = this.renderCompareChart.bind(this);
  this.onChange = this.onChange.bind(this);
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
      // console.log('search results are ', res.data);
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
  	// console.log('players in render players are', this.state.players)
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
  	console.log('stat in getSeasonStats is ', this.state.compareTerm)
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
				this.setState({ compareData: playerData, compare: true })
			})
  }

  reset(){
  	this.setState({
  		players: [],
			value: "",
	    searchResults: [],
	    searched: false,
	    compare: false,
	    comparePlayers: [],
	    compareTerm: 'air_yards'
  	})
  }

  onChange(e){
  	this.setState({
      [e.target.name]: e.target.value
		})
  }

  renderCompareChart(){
  		const data = []; 
  		let compareTerm = this.state.compareTerm
  		let compareData = this.state.compareData
  		compareData.forEach(function(compareDatum) {
  				let stepValue = 0;
  				if (compareTerm === undefined) {
  					return 
  				}
  				else if (compareTerm === 'air_yards') { 
  					let stepValue = compareDatum.air_yards
  					data.push({
  									funnelKey: "#6290c3",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
  				}
  				else if (compareTerm === 'ms_air_yards') { 
  					let stepValue = compareDatum.ms_air_yards
  					data.push({
  									funnelKey: "#6290c3",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
  				}
  				else if (compareTerm === 'aypt') { 
  					let stepValue = compareDatum.aypt
  					data.push({
  									funnelKey: "#6290c3",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
  				}
  				else if (compareTerm === 'racr') { 
  					let stepValue = compareDatum.racr
  					data.push({
  									funnelKey: "#6290c3",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
  				}
  				else if (compareTerm === 'target_share') { 
  					let stepValue = compareDatum.target_share
  					data.push({
  									funnelKey: "#6290c3",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
  				}
  			// console.log('compareTerm inside forEach is ', compareTerm)
  			// console.log('compareDatum is ', compareDatum)
  			// const stepValue = compareDatum[compareTerm]
  			// console.log('compare term value is ', compareDatum.compareTerm)
  		})

  		console.log('compare data in renderCompareChart is ', data)

				return (
					<ORFrame
						title={`Season Comparison`}
            size={[600, 600]}
            data={data}
            oAccessor={"player"}
            rAccessor={"air_yards"}
            style={d => {return { fill: d.funnelKey, stroke: 'darkgray', strokeWidth: 1 }}}
            type={"bar"}
            oLabel={true}
            pieceHoverAnnotation={true}
            oLabel={d => (
              <text transform="translate(-15,0)rotate(45)">{d}</text>
            )}
            axis={ {margin: 10, orient: "left", label: `${compareTerm}` } } 
            margin={{ left: 60, top: 60, bottom: 60, right: 100 }}
            oPadding={5}
          /> 
			    )
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
					<div className="selectedPlayersHead">Selected Players (Up to 5)</div>
						{this.renderSelectedPlayers()}
				</div>
				<div className="statSelect">
				<label htmlFor='statSelect'>Compare On:</label><br></br>
				<select className='select-values' id='statSelector' name='compareTerm' value={this.state.compareTerm} onChange={this.onChange}>
						<option defaultValue='air_yards'>Air Yards</option>
						 <option value='aypt'>AYPT</option>
						 <option value='racr'>RACR</option>
						 <option value='ms_air_yards'>MS Air Yards</option>
						 <option value='target_share'>Target Share</option>
				</select>
				</div>
				<button onClick={this.getSeasonStats} className="compareButton"> Compare Players </button><br></br>
				<button onClick={this.reset} className="compareButton"> Reset </button>
			</div>
			
			<div className="compareChartContainer"> 
				{this.state.compare && 
					this.renderCompareChart()}
				{
					this.state.compare !== true && 
					<div className="placeholderText">No players selected</div>
				}
			</div>

		</div>
		
		</div>
		)
}
}

export default Comapre;
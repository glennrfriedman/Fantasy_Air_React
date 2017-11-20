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
    compareTerm: 'air_yards',
    limit: false
	}
	this.handleChange = this.handleChange.bind(this);
  this.searchPlayers = this.searchPlayers.bind(this);
  this.onClickPlayer = this.onClickPlayer.bind(this);
  this.renderSelectedPlayers = this.renderSelectedPlayers.bind(this);
  this.reset = this.reset.bind(this);
  this.getSeasonStats = this.getSeasonStats.bind(this);
  this.renderCompareChart = this.renderCompareChart.bind(this);
  this.onChange = this.onChange.bind(this);
  this.showLimitMessage = this.showLimitMessage.bind(this); 
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
    // console.log(this.state.players)
  	if (this.state.players.length < 5) {
  		this.state.players.push({name: e.target.getAttribute("name"), team: e.target.getAttribute("team"), pos: e.target.getAttribute("pos")})
  		this.setState({value: "", searchResults: [], searched: false})
  	}
    else {
      this.setState({limit: true}, this.showLimitMessage)
    }
  	// console.log('selected player from onClick is ', e.target.getAttribute("name"), e.target.getAttribute("team") )
  	// console.log('players froms state are ', this.state.players)
  }

  showLimitMessage(){
    return (
      <p>Maximum number of players selected, click reset to start again.</p>
      )
  }

 	renderSelectedPlayers(){
 		let renderPlayers = []
  	// console.log('players in render players are', this.state.players)
  	// if(this.state.players.length < 6){
  	this.state.players.map(e => {
  		renderPlayers.push(<p className="selectedPlayer" onClick={this.removePlayer}>{e.name} ‧ {e.pos} ‧ {e.team}</p>)
  		return renderPlayers
  		})
  	// }
  	// else if (this.state.players.length > 5) {
	  // 	return renderPlayers
  	// }
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
				// console.log('playerData outside of axios.all is ', playerData)
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
	    compareTerm: 'air_yards',
      limit: false
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
      // console.log('compare data is ', compareData)
  		compareData.forEach(function(compareDatum) {
          let colorHash = ['#7c9b59', '#6F92BF']
  				if (compareTerm === 'air_yards') {
  					let stepValue = compareDatum.air_yards
            data.push({
                    funnelKey: "#7c9b59",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
  				}
  				else if (compareTerm === 'air_yards') { 
  					let stepValue = compareDatum.air_yards
  					data.push({
  									funnelKey: "#7c9b59",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
  				}
  				else if (compareTerm === 'ms_air_yards') { 
  					let stepValue = compareDatum.ms_air_yards.toFixed(2)
  					data.push({
  									funnelKey: "#7c9b59",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
  				}
  				else if (compareTerm === 'aypt') { 
  					let stepValue = compareDatum.aypt.toFixed(2)
  					data.push({
  									funnelKey: "#7c9b59",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
  				}
  				else if (compareTerm === 'racr') { 
  					let stepValue = compareDatum.racr.toFixed(2)
  					data.push({
  									funnelKey: "#7c9b59",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
  				}
  				else if (compareTerm === 'target_share') { 
  					let stepValue = compareDatum.target_share.toFixed(2)
  					data.push({
  									funnelKey: "#7c9b59",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
  				}
          else if (compareTerm === 'wopr') { 
            let stepValue = compareDatum.wopr.toFixed(2)
            data.push({
                    funnelKey: "#7c9b59",
                    player: compareDatum.player_data[0].full_name, 
                    air_yards: stepValue
                 })
          }
  			// console.log('compareTerm inside forEach is ', compareTerm)
  			// console.log('compareDatum is ', compareDatum)
  			// const stepValue = compareDatum[compareTerm]
  			// console.log('compare term value is ', compareDatum.compareTerm)
  		})

  		// console.log('compare data in renderCompareChart is ', data)

				return (
					<ORFrame
						title={`Season Comparison`}
            size={[800, 500]}
            data={data}
            oAccessor={"player"}
            rAccessor={"air_yards"}
            style={d => {return { fill: d.funnelKey, stroke: 'darkgray', strokeWidth: 1 }}}
            type={"bar"}
            oLabel={true}
            projection={'horizontal'}
            pieceHoverAnnotation={true}
            // oLabel={d => (
            //   <text transform="translate(-30,0)rotate(0)">{d}</text>
            // )}
            axis={ {margin: 10, orient: "left", label: `${compareTerm}` } } 
            margin={{ left: 160, top: 60, bottom: 60, right: 60 }}
            oPadding={30}
          /> 
			    )
  }


render() {
	return(
		<div className="compareContainer">
		<Header />
		 <div className="search-container">
        <div className="addLabel">Add Players:</div>
        <input className='searchBar' type='text' ref={el=>{this.search=el}} placeholder="  Search Players to Compare (Click to Select)" onChange={this.handleChange} />
        <div className="compareResults"> {this.state.searched && this.displayPlayerResults()} </div>
    </div>
		<div className="comparePlayersContainer">
			
			<div className="selectPlayersContainer"> 
				<div className="selectedPlayers"> 
					<div className="selectedPlayersHead">Selected Players (Up to 5)</div>
						{this.renderSelectedPlayers()}
				</div>
				<div className="statSelect">
				<div>Compare On:</div>
				<select className='select-values' id='statSelector' name='compareTerm' value={this.state.compareTerm} onChange={this.onChange}>
						 <option value='air_yards'>Air Yards</option>
						 <option value='aypt'>AYPT</option>
						 <option value='racr'>RACR</option>
						 <option value='ms_air_yards'>MS Air Yards</option>
						 <option value='target_share'>Target Share</option>
             <option value='wopr'>WOPR</option>
				</select>
				</div>
				<button onClick={this.getSeasonStats} className="compareButton"> Compare Players </button><br></br>
				<button onClick={this.reset} className="compareButton"> Reset </button>
			 </div>
			
			<div className="compareChartContainer"> 
				{this.state.compare && 
					this.renderCompareChart()}  
				{this.state.compare !== true && 
					<div className="placeholderText">Search and add players to compare</div>}
			</div>

      <div className="statDesc">
       {this.state.compare && this.state.compareTerm === 'air_yards' &&
          <div>Air yards measure receivers volumne or opportunity. Think of it this way, the higher the volume, the more likely a player is to turn that volume into fantasy points.</div>}
        {this.state.compare && this.state.compareTerm === 'aypt' &&
          <div>Air yards per target is an average measure of how deep down field a receiver is targeted. For example, if a player has an AYPT of 21 that means he is a deep threat, and sees a lot of opportunity to make big plays.</div>}
        {this.state.compare && this.state.compareTerm === 'racr' &&
          <div>RACR is Receiver Air Conversion Ratio. RACR is an efficiency stat that answers the question: “How well does a player convert a yard thrown at him into receiving yards?” The formula for RACR is: Receiving Yards / Total Air Yards. For example, a RB might have a very high RACR (>1) because their AYPT is low where a deep threat might have a lower RACR since their YAC may be lower.</div>}
        {this.state.compare && this.state.compareTerm === 'ms_air_yards' &&
          <div>Market Share Air Yards measure the amount of team Air Yards a player receives. The higher this percentage the more this player is targeted down field compared to other players on the same team.</div>}
        {this.state.compare && this.state.compareTerm === 'target_share' &&
          <div>Target Share measures the amount of team targets a player receives. More targets means more opportunity which usually means more fantasy points.</div>}
        {this.state.compare && this.state.compareTerm === 'wopr' &&
          <div>WOPR allows us to compare slot receivers who get lots of targets but not a lot of air yards with players who receive fewer targets but a greater share of the team’s air yards. WOPR takes share of team air yards and share of team targets and weights them based on how well they predict both PPR and standard fantasy points.</div>}
      </div>

		</div>
		
		</div>
		)
}
}

export default Comapre;
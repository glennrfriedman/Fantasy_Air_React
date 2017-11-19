import React, { Component } from 'react';

import axios from 'axios';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { ORFrame } from 'semiotic';


import Header from './Header.js';
import Search from './Search.js';

class Player extends Component {

constructor(props){
	super(props)
	this.state = {
		url: "http://localhost:3000",
		playerData: [],
		gotData: false
	}
	this.getPlayerData = this.getPlayerData.bind(this);
	this.renderMsChart = this.renderMsChart.bind(this);
	this.renderTsChart = this.renderTsChart.bind(this);
	this.renderRacrChart = this.renderRacrChart.bind(this);
	console.log('props from cons', props);
}

componentDidMount(){
	this.getPlayerData();
}

componentWillUnMount(){
	this.getPlayerData();
}

getPlayerData(){
	const { full_name, team } = this.props.routeProps.match.params
	axios.get(`${this.state.url}/players/${full_name}/${team}`)
    .then(res => {
    	const length = res.data.player_data.length;
    	const {team, full_name, position} = res.data.player_data[0];
      this.setState({playerData: res.data, length: length, team: team, name: full_name, pos: position, gotData: true });
    })
	}

renderMsChart(){
	const { air_yards, tm_airyards } = this.state.playerData
	const ms_air_yards = (this.state.playerData.ms_air_yards).toFixed(2);
		const data = [
  			{ "funnelKey":"#6F92BF", data: `${this.state.name} Season Air Yards: ${air_yards}`, air_yards: air_yards},
  			{ "funnelKey":"#7c9b59", data: `${this.state.team} Season Air Yards: ${tm_airyards}`, air_yards: tm_airyards},
			];
	console.log('air_yards = ', this.state.playerData.air_yards);
	console.log('tm_airyards = ', this.state.playerData.tm_airyards);
	console.log('ms_air_yards = ', this.state.playerData.ms_air_yards);
	return (
		 <ORFrame
		 	t	tooltipContent= {d => 
		 		<div className="tooltip-content">
		 			<p>{d.data}</p>
		 		</div>
		 	}
		 	title={`Season Market Share Air Yards (${ms_air_yards})`}
    	size={[300,300]}
    	data={data}
   		projection={"radial"}
      style={d => {return { fill: d.funnelKey, stroke: 'darkgray', strokeWidth: 1 }}}
    	type={{ type: "bar", innerRadius: 50 }}
    	// oLabel={true}
    	dynamicColumnWidth={"air_yards"}
    	oAccessor={"data"}
    	margin={{ left: 60, top: 60, bottom: 60, right: 60 }}
    	oPadding={3}
    	pieceHoverAnnotation={true}
  />
		)
}

renderTsChart(){
	const { tar, tm_att } = this.state.playerData
	const target_share = (this.state.playerData.target_share).toFixed(2);
		const data = [
  			{ "funnelKey":"#6F92BF", data: `${this.state.name} Sesaon Targets: ${tar}`, targets: tar },
  			{ "funnelKey":"#7c9b59", data: `${this.state.team} Season Attempts: ${tm_att}`, targets: tm_att },
			];
	return (
		 <ORFrame
		 		tooltipContent= {d => 
		 		<div className="tooltip-content">
		 			<p>{d.data}</p>
		 		</div>
		 	}
		 	// title={<g><circle r={5} /><text>Chart Title</text></g>}
		 	title={`Season Target Share (${target_share})`}
    	size={[300,300]}
    	data={data}
   		projection={"radial"}
    	style={d => {return { fill: d.funnelKey, stroke: 'darkgray', strokeWidth: 1 }}}
    	type={{ type: "bar", innerRadius: 50 }}
    	// oLabel={true}
    	dynamicColumnWidth={"targets"}
    	oAccessor={"data"}
    	margin={{ left: 60, top: 60, bottom: 60, right: 60 }}
    	oPadding={3}
    	pieceHoverAnnotation={true}
  />
		)
}

renderRacrChart(){
	const colors = [
    '#00a2ce',
    '#4d430c',
    '#b3331d',
    '#b6a756'
	]
	const { rec_yards, air_yards } = this.state.playerData
	const racr = (this.state.playerData.racr).toFixed(2);
	const data = [
  			{ "funnelKey":"#6F92BF", data: `${this.state.name} Season Recieving Yards: ${rec_yards}`, yards: rec_yards },
  			{ "funnelKey":"#7c9b59", data: `${this.state.name} Season Air Yards: ${air_yards}`, yards: air_yards },
			];
	return (
		 <ORFrame
		 	tooltipContent= {d => 
		 		<div className="tooltip-content">
		 			<p>{d.data}</p>
		 		</div>
		 	}
		 	title={`Season RACR (${racr})`}
    	size={[300,300]}
    	data={data}
   		projection={"radial"}
    	style={d => {return { fill: d.funnelKey, stroke: 'darkgray', strokeWidth: 1 }}}
    	type={{ type: "bar", innerRadius: 50 }}
    	oLabel={d => {d.data}}
    	dynamicColumnWidth={"yards"}
    	oAccessor={"data"}
    	margin={{ left: 60, top: 60, bottom: 60, right: 60 }}
    	oPadding={3}
    	// hoverAnnotation={true}
    	pieceHoverAnnotation={true}
  	/>
		)
}

render() {
	return(
		<div className="playerContainer">
		<Header />
		<Search />
		<div className="playerHeader">
			<h1>{this.state.name} ‧ {this.state.pos} ‧ {this.state.team}</h1>
		</div>
		<div className="playerGraphContainer">
		<div className="graph">
		{this.state.gotData 
			&& this.renderMsChart()}
		</div>
		<div className="graph">
		{this.state.gotData 
			&& this.renderTsChart()}
		</div>
		<div className="graph">
		{this.state.gotData 
			&& this.renderRacrChart()}
		</div>
		</div>
			<div className='onePlayerTable'>
        <ReactTable
          data={this.state.playerData.player_data}
          columns={[
            {
              Header: `Air Yards Data for ${this.state.name}`,
              columns: [
              	{
              		Header: "Week",
              		accessor: "week",
              		desc: true
              	},
                {
                	Header: "Receptions",
                	accessor: "rec"
                },
                {
                	Header: "Targets",
                	accessor: "tar"
                },
                {
                	Header: "Rec. Yards",
                	accessor: "rec_yards"
                },
                {
                	Header: "YAC",
                	accessor: "yac"
                },
                {
                	Header: "Air Yards",
                	accessor: "air_yards"
                },
                {
                	Header: "AYPT",
                	accessor: "aypt"
                },
                {
                	Header: "RACR",
                	accessor: "racr"
                },
                {
                	Header: "Team Attempts",
                	accessor: "tm_att"
                },
                {
                	Header: "Target Share",
                	accessor: "target_share"
                },
                {
                	Header: "Team Air Yards",
                	accessor: "tm_airyards"
                },
                {
                	Header: "MS Air Yards",
                	accessor: "ms_air_yards"
                },
                {
                	Header: "WOPR",
                	accessor: "wopr",
                }
              ]
            }
          ]}
          showPaginationBottom={false}
          showPaginationTop={true}
					className=" -highlight"
					defaultPageSize={5}
					defaultSortDesc={true}
					sorted={[{
      				id: 'week',
      				desc: true
   						 }
   					]}
        />
        </div>
        </div>
		)
}
}

export default Player;
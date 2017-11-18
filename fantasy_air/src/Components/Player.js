import React, { Component } from 'react';

import axios from 'axios';
import ReactTable from 'react-table';
import "react-table/react-table.css";

import Header from './Header.js';
import Search from './Search.js';

class Player extends Component {

constructor(props){
	super(props)
	this.state = {
		url: "http://localhost:3000",
		playerData: []
	}
	this.getPlayerData = this.getPlayerData.bind(this)
	console.log('props from cons', props);
}

componentDidMount(){
	this.getPlayerData();
}

getPlayerData(){
	const { full_name, team } = this.props.routeProps.match.params
	axios.get(`${this.state.url}/players/${full_name}/${team}`)
    .then(res => {
    	const length = res.data.player_data.length
    	const team = res.data.player_data[0].team 
    	const name = res.data.player_data[0].full_name
    	const pos = res.data.player_data[0].position
      this.setState({playerData: res.data.player_data, seasonStats: res.data.season_stats, length: length, team: team, name: name, pos: pos})
      console.log('player data is ', this.state.playerData);
      console.log('season stats are ', this.state.seasonStats);
      console.log(this.state.length)
      })
}

render() {
	return(
		<div>
		<Header />
		<Search />
		<div className="playerContainer">
		<div className="playerHeader">
			<h1>{this.state.name} ‧ {this.state.pos} ‧ {this.state.team}</h1>
			{/*<div className="playerSubHead">
				<h3>{this.state.pos}</h3>
				<h3>‧</h3>
				<h3>{this.state.team}</h3>
			</div>*/}
		</div>
			<div className='onePlayerTable'>
        <ReactTable
          data={this.state.playerData}
          columns={[
            {
              Header: `Air Yards Data for ${this.state.name}`,
              columns: [
              	{
              		Header: "Week",
              		accessor: "week"
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
                	aggregated: true
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
		</div>
		)
}
}

export default Player;
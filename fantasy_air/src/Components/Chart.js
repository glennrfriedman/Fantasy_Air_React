import React, { Component } from 'react';

// import {Doughnut} from 'react-chartjs-2';
// import axios from 'axios';
import { ORFrame } from 'semiotic';
import "../App.css";

class Chart extends Component {

	constructor(props){
		super(props);
		this.state = {
			seasonStats: this.props.data
		}
		console.log('props in chart are ', this.props)
		this.renderMsChart = this.renderMsChart.bind(this);
	}

	componentDidMount(){
		
	}

	renderMsChart(){
	const { air_yards, tm_airyards } = this.state.seasonStats.air_yards
	const colors = [
		    '#00a2ce',
		    '#4d430c',
		    '#b3331d',
		    '#b6a756'
    	]
		const data = [
  			{ data: "Player Air Yards", air_yards: air_yards},
  			{ data: "Team Air Yards", air_yards: tm_airyards},
			];
	console.log('air_yards = ', this.state.seasonStats.air_yards);
	console.log('tm_airyards = ', this.state.seasonStats.tm_airyards);
	return (
		<ORFrame
            size={[300, 300]}
            data={data}
            oAccessor={"air_yards"}
            dynamicColumnWidth={"data"}
            style={{ fill: "#00a2ce", stroke: "white" }}
            type={"bar"}
            projection={"radial"}
            oLabel={true}
          />
		)
	}

	render(){
		return (
			<div>Hello Chart</div>
			)
	}

}

export default Chart;

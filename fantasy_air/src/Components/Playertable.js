import React, {Component} from 'react';
import axios from 'axios';
// import tablesort from 'tablesort';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

// this is doing something
require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');
// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class Playertable extends Component {

	constructor(props) {
		super(props)
		
		 this.state = {
	     week: 10,
	     position: 'All',
	     playerData: []
    }
		this.getPlayerData = this.getPlayerData.bind(this);
		this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.getPlayerData();
	}

	getPlayerData() {
		console.log(this.props.url)
		axios.get(`${this.props.url}/weeks/${this.state.week}`)
		.then(res => {
			this.setState({playerData: res.data}, 
			 	() => {
			 			console.log('state is ', this.state.playerData)
            // tablesort(document.getElementById('myTable'));
     			}) 
			}
		)
	}

	onChange(e) {
		this.setState({
      [e.target.name]: e.target.value
		})
	}

	onSubmit(event) {
		event.preventDefault();
		// /position/:position/:week
		if (this.state.position === 'All') {
			axios.get(`${this.props.url}/weeks/${this.state.week}`)
				.then(res => {
					console.log('res from submit weeks is ', res.data)
					this.setState({playerData: res.data});
			})
		}
		else {
			axios.get(`${this.props.url}/position/${this.state.position}/${this.state.week}`)
				.then(res => {
					console.log('res from submit weeks with position is ', res.data)
					this.setState({playerData: res.data});
			})
		}
	}

	render() {
		// look into below later for player comparison - onSelect - compare players stats
		// const selectRow = {
  	//   mode: 'checkbox',  // multi select
  	//   onSelect: this.handleRowSelect
  	// 	};
		// var selectRowProp = {
  // 		mode: "checkbox",
  // 		clickToSelect: true,
  // 		bgColor: "rgb(238, 193, 213)" 
		// };
		return (
			<div className="oneWeekData">

				<form className='viewSelect' onSubmit={this.onSubmit}>
				<label htmlFor='positionSelect'>Position:</label>
				<select className='select-values' id='positionSelect' name='position' value={this.state.position} onChange={this.onChange}>
						<option defaultValue='all'>All</option>
						 <option value='WR'>WR</option>
						 <option value='TE'>TE</option>
						 <option value='WR'>RB</option>
				</select>
				<label htmlFor='weekSelect'>Week:</label>
				<select className='select-values' id='weekSelect' name='week' value={this.state.week} onChange={this.onChange}>
								<option defaultValue='10'>10</option>
								<option value='9'>9</option>
								<option value='8'>8</option>
								<option value='7'>7</option>
								<option value='6'>6</option>
								<option value='5'>5</option> 
								<option value='4'>4</option>
								<option value='3'>3</option>
								<option value='2'>2</option>
								<option value='1'>1</option>
					</select>
					<div className='submit'>
					<input className="submitButton" type='submit' value='Submit' />
					</div>
				</form>

      	<BootstrapTable data={this.state.playerData} exportCSV keyField='full_name' bordered={true} striped hover scroll>
          <TableHeaderColumn dataSort={ true } dataField='full_name'>Player Name</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='position'>Position</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='team'>Team</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='rec'>Receptions</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='tar'>Targets</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='rec_yards'>Rec. Yards</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='yac'>YAC</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='air_yards'>Air Yards</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='aypt'>AYPT</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='racr'>RACR</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='tm_att'>Team Attempts</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='target_share'>Target Share</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='tm_airyards'>Team Air Yards</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='ms_air_yards'>MS Air Yards</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } dataField='wopr'>WOPR</TableHeaderColumn>
      	</BootstrapTable>
      </div>
			)
	}
}

export default Playertable;

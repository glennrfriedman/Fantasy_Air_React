import React, {Component} from 'react';
import axios from 'axios';
// import tablesort from 'tablesort';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class Playertable extends Component {

	constructor(props) {
		super(props)
		
		 this.state = {
	     week: 10,
	     position: '',
    }
		this.getPlayerData = this.getPlayerData.bind(this);
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

	renderHeader() {
    return (
      <thead>
        <tr>
      		<th>Player</th>
          <th>Position</th>
          <th>Team</th>
          <th data-sort-method='number'>Receptions</th>
          <th data-sort-method='number'>Targets</th>
          <th data-sort-method='number'>Rec. Yards</th>
          <th data-sort-method='number'>YAC</th>
          <th data-sort-method='number'>Air Yards</th>
          <th data-sort-method='number'>AYPT</th>
          <th data-sort-method='number'>RACR</th>
          <th data-sort-method='number'>Team Attempts</th>
          <th data-sort-method='number'>Target Share</th>
          <th data-sort-method='number'>Team Air Yards</th>
          <th data-sort-method='number'>MS Air Yards</th>
          <th data-sort-method='number'>WOPR</th>
        </tr>
      </thead>
    )
  }

  renderTable() {

    const renderTable = [];
    this.state.playerData.map(e => {
      renderTable.push(
        <tr className={e.id} key={e.id}>
      		<td className='playerRow'>{e.full_name}</td>
      		<td className='playerRow'>{e.position}</td>
      		<td className='playerRow'>{e.team}</td>
      		<td className='playerRow'>{Number(e.rec)}</td>
      		<td className='playerRow'>{Number(e.tar)}</td>
      		<td className='playerRow'>{Number(e.rec_yards)}</td>
      		<td className='playerRow'>{Number(e.yac)}</td>
      		<td className='playerRow'>{Number(e.air_yards)}</td>
      		<td className='playerRow'>{Number(e.aypt)}</td>
      		<td className='playerRow'>{Number(e.racr)}</td>
      		<td className='playerRow'>{Number(e.tm_att)}</td>
      		<td className='playerRow'>{Number(e.target_share)}</td>
      		<td className='playerRow'>{Number(e.tm_airyards)}</td>
      		<td className='playerRow'>{Number(e.ms_air_yards)}</td>
      		<td className='playerRow'>{Number(e.wopr)}</td>
        </tr>
      )
      return renderTable;
    })
    return renderTable;
  }

	render() {
		var selectRowProp = {
  	mode: "checkbox",
  	clickToSelect: true,
  	bgColor: "rgb(238, 193, 213)" 
		};
		return (
			<div className="oneWeekData">
      	<BootstrapTable data={this.state.playerData} selectRow={selectRowProp} exportCSV keyField='full_name' bordered={ true } >
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
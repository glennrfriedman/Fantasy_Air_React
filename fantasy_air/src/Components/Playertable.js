import React, {Component} from 'react';
import axios from 'axios';
// import tablesort from 'tablesort';
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ReactTable from 'react-table'
import "react-table/react-table.css";

// this is doing something
require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css');
// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class Playertable extends Component {

	constructor(props) {
		super(props)
		
		 this.state = {
	     position: 'All',
	     showWeek: '',
	     playerData: [],
	     weeks: [],
	     week: 0
    }
		this.getPlayerData = this.getPlayerData.bind(this);
		this.getWeeks = this.getWeeks.bind(this);
		this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderWeeks = this.renderWeeks.bind(this);
	}

	componentDidMount() {
		this.getWeeks();
	}

	getWeeks() {
		axios.get(`${this.props.url}/showWeek`)
		.then(res => {
			// console.log('weeks are', res.data.weeks)
			let current_week = Math.max(...res.data.weeks)
			console.log('current_week is ', current_week)
			this.setState({	week: current_week, weeks: res.data.weeks })
			this.getPlayerData();
		})
	}

	renderWeeks() {
		const renderOptions = [];
		this.state.weeks.map(e => {
			renderOptions.push(
					<option key={e} value={e}>{e}</option>
				)
			return renderOptions;
		})
		return renderOptions;
	}

	getPlayerData() {
		console.log(this.props.url)
		axios.get(`${this.props.url}/weeks/${this.state.week}`)
		.then(res => {
			this.setState({playerData: res.data, showWeek: this.state.week})
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
					this.setState({playerData: res.data, showWeek: this.state.week});
			})
		}
		else {
			axios.get(`${this.props.url}/position/${this.state.position}/${this.state.week}`)
				.then(res => {
					console.log('res from submit weeks with position is ', res.data)
					this.setState({playerData: res.data, showWeek: this.state.week});
			})
		}
	}

	render() {
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
								{this.renderWeeks()}
								{/*<option value='17'>17</option>
								<option value='16'>16</option>
								<option value='15'>15</option>
								<option value='14'>14</option>
								<option value='13'>13</option>
								<option value='12'>12</option>
								<option value='11'>11</option>
								<option defaultValue='10'>10</option>
								<option value='9'>9</option>
								<option value='8'>8</option>
								<option value='7'>7</option>
								<option value='6'>6</option>
								<option value='5'>5</option> 
								<option value='4'>4</option>
								<option value='3'>3</option>
								<option value='2'>2</option>
								<option value='1'>1</option>*/}
					</select>
					<div className='submit'>
					<input className="submitButton" type='submit' value='Submit' />
					</div>
				</form>

				<div className='playerTable'>
        <ReactTable
          data={this.state.playerData}
          columns={[
            {
              Header: `Air Yards Data for Week ${this.state.showWeek}`,
              columns: [
                {
                  Header: "Full Name",
                  accessor: "full_name",
                  width: 150
                },
                {
                  Header: "Position",
                  accessor: "position"
                },
                {
                  Header: "Team",
                  accessor: "team"
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
                	accessor: "wopr"
                },
              ]
            }
          ]}
          className="-striped -highlight"
        />
        </div>
      </div>
			)
	}
}

export default Playertable;
